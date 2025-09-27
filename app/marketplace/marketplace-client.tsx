
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useWeb3Auth } from '@/hooks/use-web3-auth'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { DataPreviewDialog } from '@/components/data-preview-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Database, 
  Search, 
  Filter, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Heart,
  MapPin,
  Calendar,
  Building2,
  Eye,
  Download,
  Star,
  IndianRupee
} from 'lucide-react'

const platforms = [
  {
    id: 'amazon',
    name: 'Amazon India',
    logo: '🛒',
    color: 'bg-orange-500',
    description: 'World\'s largest e-commerce platform with diverse product categories',
    dataPoints: '2.5M+',
    categories: ['Electronics', 'Fashion', 'Books', 'Home & Garden'],
    datasets: [
      {
        id: 1,
        title: 'Purchase History Analytics',
        description: 'Detailed purchase patterns, product preferences, and seasonal buying trends',
        price: 899,
        dataPoints: 125000,
        timeRange: 'Last 12 months',
        category: 'Purchase Behavior',
        rating: 4.8,
        buyers: 324
      },
      {
        id: 2,
        title: 'Product Search Analytics',
        description: 'Search queries, click-through rates, and product discovery patterns',
        price: 649,
        dataPoints: 85000,
        timeRange: 'Last 6 months',
        category: 'User Behavior',
        rating: 4.6,
        buyers: 187
      }
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    logo: '🛍️',
    color: 'bg-blue-500',
    description: 'India\'s leading e-commerce platform with strong mobile commerce focus',
    dataPoints: '1.8M+',
    categories: ['Electronics', 'Fashion', 'Home', 'Mobile'],
    datasets: [
      {
        id: 3,
        title: 'Mobile Shopping Behavior',
        description: 'Mobile app usage patterns, cart abandonment, and purchase completion rates',
        price: 749,
        dataPoints: 95000,
        timeRange: 'Last 9 months',
        category: 'Mobile Commerce',
        rating: 4.7,
        buyers: 256
      },
      {
        id: 4,
        title: 'Big Billion Days Analytics',
        description: 'Festival shopping patterns, discount sensitivity, and bulk purchase behavior',
        price: 1299,
        dataPoints: 185000,
        timeRange: 'Last 24 months',
        category: 'Seasonal Trends',
        rating: 4.9,
        buyers: 445
      }
    ]
  },
  {
    id: 'myntra',
    name: 'Myntra',
    logo: '👗',
    color: 'bg-pink-500',
    description: 'India\'s top fashion and lifestyle platform with curated brand selection',
    dataPoints: '950K+',
    categories: ['Fashion', 'Beauty', 'Lifestyle', 'Accessories'],
    datasets: [
      {
        id: 5,
        title: 'Fashion Trend Analytics',
        description: 'Style preferences, brand loyalty, size distribution, and seasonal fashion trends',
        price: 1099,
        dataPoints: 120000,
        timeRange: 'Last 18 months',
        category: 'Fashion Insights',
        rating: 4.8,
        buyers: 312
      }
    ]
  },
  {
    id: 'nykaa',
    name: 'Nykaa',
    logo: '💄',
    color: 'bg-purple-500',
    description: 'Premier beauty and wellness platform with expert curation',
    dataPoints: '650K+',
    categories: ['Beauty', 'Skincare', 'Wellness', 'Personal Care'],
    datasets: [
      {
        id: 6,
        title: 'Beauty Product Preferences',
        description: 'Skincare routines, brand preferences, ingredient analysis, and review patterns',
        price: 799,
        dataPoints: 75000,
        timeRange: 'Last 12 months',
        category: 'Beauty & Wellness',
        rating: 4.5,
        buyers: 198
      }
    ]
  }
]

const categories = [
  'All Categories',
  'Purchase Behavior',
  'User Behavior',
  'Mobile Commerce',
  'Seasonal Trends',
  'Fashion Insights',
  'Beauty & Wellness'
]

export default function MarketplaceClient() {
  const { address, isConnected } = useWeb3Auth()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [previewDataset, setPreviewDataset] = useState<any>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const filteredPlatforms = platforms.filter(platform => {
    if (selectedPlatform !== 'all' && platform.id !== selectedPlatform) return false
    if (searchQuery && !platform.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const allDatasets = platforms.flatMap(platform => 
    platform.datasets.map(dataset => ({
      ...dataset,
      platform: platform.name,
      platformId: platform.id,
      platformLogo: platform.logo,
      platformColor: platform.color
    }))
  ).filter(dataset => {
    if (selectedCategory !== 'All Categories' && dataset.category !== selectedCategory) return false
    if (searchQuery && !dataset.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DataVault</span>
            <Badge variant="secondary" className="ml-2">Marketplace</Badge>
          </Link>
          <div className="flex items-center space-x-4">
            {isConnected && (
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            )}
            <ConnectWalletButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">Data Marketplace</h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 mb-8">
            Explore and purchase verified consumer data from India's leading e-commerce platforms
          </p>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search datasets, platforms, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-48">
                <Building2 className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                {platforms.map(platform => (
                  <SelectItem key={platform.id} value={platform.id}>{platform.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Featured Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlatforms.map((platform) => (
              <Card key={platform.id} className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto mb-4 h-16 w-16 rounded-lg ${platform.color} flex items-center justify-center text-2xl`}>
                    {platform.logo}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{platform.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{platform.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{platform.dataPoints} users</span>
                    <Badge variant="secondary">{platform.datasets.length} datasets</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Datasets */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Datasets</h2>
            <Badge variant="outline" className="text-sm">
              {allDatasets.length} datasets available
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {allDatasets.map((dataset) => (
              <Card key={dataset.id} className="card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-lg ${dataset.platformColor} flex items-center justify-center text-lg`}>
                        {dataset.platformLogo}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{dataset.title}</CardTitle>
                        <p className="text-sm text-gray-600">{dataset.platform}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star className="h-4 w-4 fill-current" />
                      {dataset.rating}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {dataset.description}
                  </CardDescription>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{dataset.dataPoints.toLocaleString()} data points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{dataset.timeRange}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{dataset.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Download className="h-4 w-4" />
                      {dataset.buyers} purchases
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                      <IndianRupee className="h-5 w-5" />
                      {dataset.price}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setPreviewDataset(dataset)
                          setIsPreviewOpen(true)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button 
                        className="bg-gradient-primary hover:opacity-90" 
                        size="sm"
                        onClick={() => {
                          if (isConnected) {
                            alert(`Purchase initiated for ${dataset.title}\n\nPrice: ₹${dataset.price}\nData Points: ${dataset.dataPoints.toLocaleString()}\n\nRedirecting to secure payment gateway...`)
                          } else {
                            alert('Please connect your wallet to purchase datasets')
                          }
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Purchase
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {allDatasets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No datasets found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      {previewDataset && (
        <DataPreviewDialog
          dataset={previewDataset}
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
        />
      )}
    </div>
  )
}
