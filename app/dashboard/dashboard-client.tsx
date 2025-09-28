
'use client'

import { useWeb3Auth } from '@/hooks/use-web3-auth'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Database, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Download, 
  Calendar,
  Building2,
  IndianRupee,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Star,
  Clock
} from 'lucide-react'
export default function DashboardClient() {
  const { address, isConnected, disconnect, shortAddress } = useWeb3Auth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router, mounted])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return null
  }

  const mockPurchases = [
    {
      id: 1,
      title: 'Amazon Purchase History Analytics',
      platform: 'Amazon India',
      amount: 899,
      date: '2024-01-15',
      status: 'completed',
      dataPoints: 125000,
      downloads: 3
    },
    {
      id: 2,
      title: 'Flipkart Mobile Shopping Behavior',
      platform: 'Flipkart',
      amount: 749,
      date: '2024-01-10',
      status: 'completed',
      dataPoints: 95000,
      downloads: 1
    },
    {
      id: 3,
      title: 'Myntra Fashion Trend Analytics',
      platform: 'Myntra',
      amount: 1099,
      date: '2024-01-08',
      status: 'processing',
      dataPoints: 120000,
      downloads: 0
    }
  ]

  const totalSpent = mockPurchases.reduce((sum, purchase) => sum + purchase.amount, 0)
  const totalDataPoints = mockPurchases.reduce((sum, purchase) => sum + purchase.dataPoints, 0)
  const totalDownloads = mockPurchases.reduce((sum, purchase) => sum + purchase.downloads, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Concentra</span>
            <Badge variant="secondary" className="ml-2">Dashboard</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/marketplace">
              <Button variant="ghost">Marketplace</Button>
            </Link>
            <Button 
              variant="ghost" 
              onClick={() => {
                disconnect()
                router.push('/')
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Business Dashboard
          </h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="h-4 w-4" />
            <span>Connected: {shortAddress}</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <div className="flex items-center mt-1">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">{totalSpent.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Points</p>
                  <p className="text-2xl font-bold text-gray-900">{(totalDataPoints / 1000).toFixed(0)}K</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Purchases</p>
                  <p className="text-2xl font-bold text-gray-900">{mockPurchases.length}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDownloads}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="purchases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Purchases
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Purchases Tab */}
          <TabsContent value="purchases" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
              <Link href="/marketplace">
                <Button className="bg-gradient-primary hover:opacity-90">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Browse Marketplace
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {mockPurchases.map((purchase) => (
                <Card key={purchase.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{purchase.title}</h3>
                            <p className="text-sm text-gray-600">{purchase.platform}</p>
                          </div>
                          <Badge 
                            variant={purchase.status === 'completed' ? 'default' : 'secondary'}
                          >
                            {purchase.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-4 w-4 text-gray-400" />
                            <span>{purchase.amount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span>{new Date(purchase.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span>{purchase.dataPoints.toLocaleString()} points</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Download className="h-4 w-4 text-gray-400" />
                            <span>{purchase.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6 flex gap-2">
                        {purchase.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              alert(`Downloading ${purchase.title}\n\nFormat: JSON, CSV\nFile size: ~${Math.round(purchase.dataPoints / 1000)}MB\n\nDownload will begin shortly...`)
                            }}
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            alert(`${purchase.title} Details\n\nPlatform: ${purchase.platform}\nPurchase Date: ${new Date(purchase.date).toLocaleDateString()}\nAmount: ₹${purchase.amount}\nData Points: ${purchase.dataPoints.toLocaleString()}\nStatus: ${purchase.status}\nDownloads: ${purchase.downloads}\n\nFull analytics dashboard coming soon!`)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Usage Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Purchase Trends</CardTitle>
                  <CardDescription>Your data acquisition over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    Analytics Chart Coming Soon
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Data sources breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    Distribution Chart Coming Soon
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Manage your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Wallet Address</p>
                    <p className="text-gray-900 font-mono text-sm">{address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Account Type</p>
                    <p className="text-gray-900">Business Account</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Network</p>
                    <p className="text-gray-900">Ethereum Mainnet</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-green-600">✓ Connected</p>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    alert('Account Update Feature\n\nThis will allow you to:\n• Update company information\n• Change contact details\n• Modify industry classification\n• Update billing preferences\n\nFull profile management coming soon!')
                  }}
                >
                  Update Information
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
