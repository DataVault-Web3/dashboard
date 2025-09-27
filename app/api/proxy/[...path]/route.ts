import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5007';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = new URL(`${API_BASE_URL}/${path}`);
    
    // Copy query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    console.log('Proxying GET request to:', url.toString());
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Forward any custom headers from the original request
        ...Object.fromEntries(request.headers.entries()),
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.text();
    
    // Create response with same status and headers
    const nextResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy important headers from the original response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = new URL(`${API_BASE_URL}/${path}`);
    
    const body = await request.text();

    console.log('Proxying POST request to:', url.toString());

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any custom headers from the original request
        ...Object.fromEntries(request.headers.entries()),
      },
      body: body,
    });

    const data = await response.text();
    
    // Create response with same status and headers
    const nextResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy important headers from the original response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = new URL(`${API_BASE_URL}/${path}`);
    
    const body = await request.text();

    console.log('Proxying PUT request to:', url.toString());

    const response = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Forward any custom headers from the original request
        ...Object.fromEntries(request.headers.entries()),
      },
      body: body,
    });

    const data = await response.text();
    
    // Create response with same status and headers
    const nextResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy important headers from the original response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = new URL(`${API_BASE_URL}/${path}`);
    
    // Copy query parameters from the request
    const searchParams = request.nextUrl.searchParams;
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });

    console.log('Proxying DELETE request to:', url.toString());

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Forward any custom headers from the original request
        ...Object.fromEntries(request.headers.entries()),
      },
    });

    const data = await response.text();
    
    // Create response with same status and headers
    const nextResponse = new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
    });

    // Copy important headers from the original response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-encoding') {
        nextResponse.headers.set(key, value);
      }
    });

    return nextResponse;
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Proxy request failed' },
      { status: 500 }
    );
  }
}
