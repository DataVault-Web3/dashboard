
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Eye,
  Users,
  Calendar,
  TrendingUp,
  BarChart3,
  ShoppingBag,
  MapPin,
  Clock,
  Star,
  IndianRupee
} from 'lucide-react'

interface Dataset {
  id: number
  title: string
  description: string
  price: number
  dataPoints: number
  timeRange: string
  category: string
  rating: number
  buyers: number
  platform: string
  platformLogo: string
  platformColor: string
}

interface DataPreviewDialogProps {
  dataset: Dataset
  open: boolean
  onOpenChange: (open: boolean) => void
}

const generateSampleData = (dataset: Dataset) => {
  const samples = {
    'Purchase History Analytics': [
      { category: 'Electronics', avgOrderValue: '₹2,847', frequency: '2.3x/month', topBrand: 'Samsung' },
      { category: 'Fashion', avgOrderValue: '₹1,234', frequency: '1.8x/month', topBrand: 'Nike' },
      { category: 'Books', avgOrderValue: '₹567', frequency: '0.9x/month', topBrand: 'Penguin' },
      { category: 'Home & Garden', avgOrderValue: '₹3,456', frequency: '0.5x/month', topBrand: 'Philips' }
    ],
    'Product Search Analytics': [
      { searchTerm: 'wireless headphones', searches: 15420, clickRate: '12.4%', conversionRate: '3.2%' },
      { searchTerm: 'smartphone under 20000', searches: 8934, clickRate: '18.7%', conversionRate: '5.1%' },
      { searchTerm: 'laptop for students', searches: 6721, clickRate: '14.2%', conversionRate: '4.8%' },
      { searchTerm: 'home decor items', searches: 4892, clickRate: '9.8%', conversionRate: '2.1%' }
    ],
    'Mobile Shopping Behavior': [
      { metric: 'App Session Duration', value: '4.2 minutes', trend: '+12%' },
      { metric: 'Cart Abandonment Rate', value: '68.3%', trend: '-8%' },
      { metric: 'Push Notification CTR', value: '7.8%', trend: '+15%' },
      { metric: 'Mobile Conversion Rate', value: '3.4%', trend: '+9%' }
    ],
    'Fashion Trend Analytics': [
      { trend: 'Sustainable Fashion', popularity: '87%', growth: '+34%', peakSeason: 'Spring' },
      { trend: 'Vintage Style', popularity: '76%', growth: '+28%', peakSeason: 'Fall' },
      { trend: 'Minimalist Design', popularity: '92%', growth: '+19%', peakSeason: 'All Year' },
      { trend: 'Bold Patterns', popularity: '68%', growth: '+45%', peakSeason: 'Summer' }
    ],
    'Beauty Product Preferences': [
      { skinType: 'Oily', topConcern: 'Acne Control', avgSpend: '₹1,234/month', preferredBrands: 'The Ordinary, Cetaphil' },
      { skinType: 'Dry', topConcern: 'Hydration', avgSpend: '₹987/month', preferredBrands: 'Neutrogena, Olay' },
      { skinType: 'Combination', topConcern: 'Pore Minimizing', avgSpend: '₹1,456/month', preferredBrands: 'Lakme, Maybelline' },
      { skinType: 'Sensitive', topConcern: 'Gentle Care', avgSpend: '₹2,134/month', preferredBrands: 'Aveeno, CeraVe' }
    ]
  }

  return samples[dataset.title as keyof typeof samples] || []
}

const generateDemographics = () => ({
  ageGroups: [
    { range: '18-25', percentage: 28 },
    { range: '26-35', percentage: 42 },
    { range: '36-45', percentage: 21 },
    { range: '46+', percentage: 9 }
  ],
  locations: [
    { city: 'Mumbai', percentage: 18 },
    { city: 'Delhi', percentage: 16 },
    { city: 'Bangalore', percentage: 14 },
    { city: 'Chennai', percentage: 12 },
    { city: 'Kolkata', percentage: 10 },
    { city: 'Others', percentage: 30 }
  ],
  genderSplit: [
    { gender: 'Female', percentage: 54 },
    { gender: 'Male', percentage: 42 },
    { gender: 'Other', percentage: 4 }
  ]
})

export function DataPreviewDialog({ dataset, open, onOpenChange }: DataPreviewDialogProps) {
  const sampleData = generateSampleData(dataset)
  const demographics = generateDemographics()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`h-12 w-12 rounded-lg ${dataset.platformColor} flex items-center justify-center text-lg`}>
              {dataset.platformLogo}
            </div>
            <div>
              <DialogTitle className="text-xl">{dataset.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{dataset.platform}</p>
            </div>
          </div>
          <DialogDescription className="text-base">
            {dataset.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{dataset.dataPoints.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Data Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{dataset.timeRange}</div>
            <div className="text-xs text-muted-foreground">Time Range</div>
          </div>
          <div className="text-center flex items-center justify-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <div className="text-2xl font-bold text-primary">{dataset.rating}</div>
            <div className="text-xs text-muted-foreground ml-1">Rating</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-2xl font-bold text-primary">
              <IndianRupee className="h-5 w-5" />
              {dataset.price}
            </div>
            <div className="text-xs text-muted-foreground">Price</div>
          </div>
        </div>

        <Tabs defaultValue="sample" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sample">Sample Data</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="sample" className="space-y-4">
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {sampleData.map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(item).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium capitalize text-muted-foreground">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Age Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {demographics.ageGroups.map(group => (
                    <div key={group.range} className="flex justify-between text-sm">
                      <span>{group.range}</span>
                      <span className="font-medium">{group.percentage}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Top Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {demographics.locations.map(location => (
                    <div key={location.city} className="flex justify-between text-sm">
                      <span>{location.city}</span>
                      <span className="font-medium">{location.percentage}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Gender Split
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {demographics.genderSplit.map(gender => (
                    <div key={gender.gender} className="flex justify-between text-sm">
                      <span>{gender.gender}</span>
                      <span className="font-medium">{gender.percentage}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="font-semibold">Data Quality</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  All data points are verified through zero-knowledge proofs, ensuring authenticity without compromising user privacy.
                </p>
                <Badge variant="secondary">99.7% Accuracy</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">Update Frequency</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Data is refreshed weekly with new user interactions and purchase patterns.
                </p>
                <Badge variant="secondary">Weekly Updates</Badge>
              </Card>

              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <ShoppingBag className="h-5 w-5 text-purple-500 mr-2" />
                  <h3 className="font-semibold">Use Cases</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Market research & competitor analysis</li>
                  <li>• Product recommendation engines</li>
                  <li>• Customer segmentation strategies</li>
                  <li>• Pricing optimization models</li>
                </ul>
              </Card>

              <Card className="p-4">
                <div className="flex items-center mb-2">
                  <Eye className="h-5 w-5 text-orange-500 mr-2" />
                  <h3 className="font-semibold">Privacy Compliance</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  GDPR compliant with user consent and anonymization protocols.
                </p>
                <Badge variant="secondary">Fully Compliant</Badge>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
