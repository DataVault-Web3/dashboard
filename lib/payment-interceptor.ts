/**
 * Payment Interceptor for handling 402 Payment Required responses
 * 
 * This interceptor automatically handles 402 errors by:
 * 1. Extracting payment scheme data from the 402 response
 * 2. Finding the appropriate payment scheme (exact scheme for polygon-amoy)
 * 3. Generating EIP-712 signature data based on the payment scheme
 * 4. Requesting a signature from the connected wallet
 * 5. Adding the signature to the X-PAYMENT header
 * 6. Retrying the original request
 * 
 * The 402 response format:
 * {
 *   "x402Version": 1,
 *   "error": "X-PAYMENT header is required",
 *   "accepts": [
 *     {
 *       "scheme": "exact",
 *       "network": "polygon-amoy",
 *       "maxAmountRequired": "1000",
 *       "payTo": "0x...",
 *       "asset": "0x...",
 *       "extra": { "name": "USDC", "version": "2" }
 *     }
 *   ]
 * }
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { WalletClient } from 'viem';
import jwt from 'jsonwebtoken';

interface EIP712Domain {
  name: string;
  version: string;
  chainId: string;
  verifyingContract: string;
}

interface TransferWithAuthorization {
  from: string;
  to: string;
  value: string;
  validAfter: string;
  validBefore: string;
  nonce: string;
}

interface EIP712SignatureData {
  types: {
    EIP712Domain: Array<{ name: string; type: string }>;
    TransferWithAuthorization: Array<{ name: string; type: string }>;
  };
  primaryType: string;
  domain: EIP712Domain;
  message: TransferWithAuthorization;
}

interface PaymentScheme {
  scheme: string;
  network: string;
  maxAmountRequired: string;
  resource: string;
  description: string;
  mimeType: string;
  payTo: string;
  maxTimeoutSeconds: number;
  asset: string;
  outputSchema: {
    input: {
      type: string;
      method: string;
      discoverable: boolean;
    };
  };
  extra: {
    name: string;
    version: string;
  };
}

interface X402Response {
  x402Version: number;
  error: string;
  accepts: PaymentScheme[];
}

// JWT secret for signing payment tokens
const JWT_SECRET = 'your-secret-key-change-this-in-production';

interface PaymentJWTPayload {
  signature: string;
  domain: EIP712Domain;
  message: TransferWithAuthorization;
  types: {
    EIP712Domain: Array<{ name: string; type: string }>;
    TransferWithAuthorization: Array<{ name: string; type: string }>;
  };
  primaryType: string;
  iat: number;
  exp: number;
}

export function createPaymentInterceptor(axiosInstance: AxiosInstance, walletClient: WalletClient) {
  console.log('Creating payment interceptor...');
  
  // Add request interceptor for debugging
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('Making request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor to handle 402 errors
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('Response received:', response.status);
      return response;
    },
    async (error: AxiosError) => {
      console.log('Error received:', error.response?.status, error.message);
      if (error.response?.status === 402) {
        console.log('Received 402 Payment Required, initiating signature flow...');
        
        try {
          // Extract payment scheme data from 402 response
          const x402Response = error.response.data as X402Response;
          
          if (!x402Response || !x402Response.accepts || x402Response.accepts.length === 0) {
            console.error('Invalid 402 response data:', x402Response);
            throw new Error('Invalid payment scheme data received from server');
          }

          console.log('X402 response data:', x402Response);

          console.log('Payment scheme data received:', x402Response);

          // Find the appropriate payment scheme (exact scheme for polygon-amoy)
          const paymentScheme = x402Response.accepts.find(scheme => 
            scheme.scheme === 'exact' && scheme.network === 'polygon-amoy'
          );

          if (!paymentScheme) {
            throw new Error('No compatible payment scheme found for polygon-amoy network');
          }

          console.log('Using payment scheme:', paymentScheme);

          // Generate EIP-712 signature data based on the payment scheme
          const signatureTime = Math.floor(Date.now() / 1000);
          const validAfter = signatureTime;
          const validBefore = signatureTime + paymentScheme.maxTimeoutSeconds;
          
          // Generate a random nonce (32 bytes)
          const nonce = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
          
          // Get the user's wallet address
          const userAddress = walletClient.account?.address;
          if (!userAddress) {
            throw new Error('Wallet account not found');
          }

          // Create the EIP-712 signature data
          const signatureData: EIP712SignatureData = {
            types: {
              EIP712Domain: [
                { name: "name", type: "string" },
                { name: "version", type: "string" },
                { name: "chainId", type: "uint256" },
                { name: "verifyingContract", type: "address" }
              ],
              TransferWithAuthorization: [
                { name: "from", type: "address" },
                { name: "to", type: "address" },
                { name: "value", type: "uint256" },
                { name: "validAfter", type: "uint256" },
                { name: "validBefore", type: "uint256" },
                { name: "nonce", type: "bytes32" }
              ]
            },
            primaryType: "TransferWithAuthorization",
            domain: {
              name: paymentScheme.extra.name, // "USDC"
              version: paymentScheme.extra.version, // "2"
              chainId: "80002", // polygon-amoy chain ID
              verifyingContract: paymentScheme.asset // ERC20 token contract address
            },
            message: {
              from: userAddress,
              to: paymentScheme.payTo,
              value: paymentScheme.maxAmountRequired,
              validAfter: validAfter.toString(),
              validBefore: validBefore.toString(),
              nonce: nonce
            }
          };

          console.log('Generated EIP-712 signature data:', signatureData);

          // Sign the EIP-712 message
          console.log('Requesting signature from wallet...');
          const signature = await walletClient.signTypedData({
            account: walletClient.account!,
            domain: {
              name: signatureData.domain.name,
              version: signatureData.domain.version,
              chainId: BigInt(signatureData.domain.chainId),
              verifyingContract: signatureData.domain.verifyingContract as `0x${string}`,
            },
            types: signatureData.types as any,
            primaryType: signatureData.primaryType as any,
            message: {
              from: signatureData.message.from as `0x${string}`,
              to: signatureData.message.to as `0x${string}`,
              value: BigInt(signatureData.message.value),
              validAfter: BigInt(signatureData.message.validAfter),
              validBefore: BigInt(signatureData.message.validBefore),
              nonce: signatureData.message.nonce as `0x${string}`,
            },
          });

          console.log('Signature generated:', signature);

          // Create JWT token with signature and payment data
          const currentTime = Math.floor(Date.now() / 1000);
          const expirationTime = currentTime + (paymentScheme.maxTimeoutSeconds || 300); // 5 minutes default

          const jwtPayload = {
            x402Version: 1,
            scheme: "exact",
            network: "polygon-amoy",
            payload: {
              signature: signature,
              authorization: {
                from: userAddress,
                to  : paymentScheme.payTo,
                value: paymentScheme.maxAmountRequired,
                validAfter: validAfter.toString(),
                validBefore: validBefore.toString(),
                nonce: nonce
              }
            },
            iat: currentTime,
            exp: expirationTime
          };

          let jwtToken;
          try {
            jwtToken = jwt.sign(jwtPayload, JWT_SECRET);
            console.log('JWT token created:', jwtToken);
          } catch (jwtError) {
            console.error('JWT signing failed:', jwtError);
            throw new Error(`JWT token creation failed: ${jwtError && typeof jwtError === 'object' && 'message' in jwtError ? (jwtError as any).message : 'Unknown error'}`);
          }

          // Retry the original request with the signature in X-PAYMENT header
          const originalRequest = error.config;
          if (originalRequest) {
            // Set the X-PAYMENT header
            if (!originalRequest.headers) {
              originalRequest.headers = {} as any;
            }
            (originalRequest.headers as any)['X-PAYMENT'] = jwtToken;

            console.log('Retrying request with X-PAYMENT JWT header...');
            return axiosInstance(originalRequest);
          } else {
            throw new Error('Original request configuration not found');
          }
        } catch (signatureError) {
          console.error('Payment signature failed:', signatureError);
          console.error('Error type:', typeof signatureError);
          console.error('Error constructor:', signatureError?.constructor?.name);
          
          // Provide more specific error messages
          try {
            if (signatureError && typeof signatureError === 'object' && signatureError.constructor === Error) {
              if (signatureError.message && signatureError.message.includes('User rejected')) {
                return Promise.reject(new Error('Payment signature was rejected by user'));
              } else if (signatureError.message && signatureError.message.includes('Invalid')) {
                return Promise.reject(new Error('Invalid payment request data'));
              } else {
                return Promise.reject(new Error(`Payment signature failed: ${signatureError.message || 'Unknown error'}`));
              }
            }
          } catch (instanceofError) {
            console.error('Error in instanceof check:', instanceofError);
          }
          
          // Fallback error handling
          const errorMessage = signatureError && typeof signatureError === 'string' 
            ? signatureError 
            : signatureError && signatureError.message 
            ? signatureError.message 
            : 'Unknown payment signature error';
            
          return Promise.reject(new Error(`Payment signature failed: ${errorMessage}`));
        }
      }

      return Promise.reject(error);
    }
  );

  console.log('Payment interceptor attached successfully');
  return axiosInstance;
}

// Helper function to create a wallet client compatible with the interceptor
export function createWalletClientForPayment(account: any, chain: any) {
  return {
    account,
    chain,
    signTypedData: async (params: any) => {
      // This will be implemented by the actual wallet client
      throw new Error('Wallet client not properly configured');
    },
  };
}
