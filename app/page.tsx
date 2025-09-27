
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Users, TrendingUp, Database, CheckCircle, ArrowRight, Building2, Lock, Zap } from 'lucide-react'
import Image from 'next/image'
import { ConnectWalletButton } from '@/components/connect-wallet-button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DataVault</span>
            <Badge variant="secondary" className="ml-2">Business</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectWalletButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <div className="animate-fade-in-up">
            <Badge variant="outline" className="mb-4">
              <Shield className="mr-1 h-3 w-3" />
              Privacy-First Data Marketplace
            </Badge>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 lg:text-6xl">
              Access Verified
              <span className="gradient-text"> Consumer Data</span>
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Purchase authenticated e-commerce data from millions of verified consumers across platforms like Amazon, Flipkart, and Myntra. 
              Built with zero-knowledge proofs for privacy and stored on Walrus blockchain.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex items-center gap-4">
                <ConnectWalletButton />
              </div>
              <Link href="#platforms">
                <Button size="lg" variant="outline">
                  Explore Data Sources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold stats-number animate-count-up">2.5M+</div>
              <div className="text-gray-600">Verified Users</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold stats-number animate-count-up">15+</div>
              <div className="text-gray-600">E-commerce Platforms</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold stats-number animate-count-up">500TB+</div>
              <div className="text-gray-600">Data Available</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold stats-number animate-count-up">99.9%</div>
              <div className="text-gray-600">Privacy Compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Enterprise-Grade Data Intelligence</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Built for businesses that need reliable, privacy-compliant consumer insights
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Zero-Knowledge Privacy</CardTitle>
                <CardDescription>
                  Consumer data is verified through zero-knowledge proofs, ensuring privacy while maintaining authenticity.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Lock className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Walrus Blockchain Storage</CardTitle>
                <CardDescription>
                  Decentralized storage ensures data integrity, immutability, and transparent access controls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Real-Time Insights</CardTitle>
                <CardDescription>
                  Access fresh consumer behavior data with automated updates from verified browser extensions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Verified Consumer Base</CardTitle>
                <CardDescription>
                  Every data point comes from authenticated users who've opted in through our browser extension.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Pre-processed data with trend analysis, segmentation, and predictive insights ready for your business.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <Database className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Multiple Data Formats</CardTitle>
                <CardDescription>
                  Download data in CSV, JSON, or connect via API. Seamlessly integrate with your existing systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Platforms Preview */}
      <section id="platforms" className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Supported E-commerce Platforms</h2>
            <p className="text-gray-600">Access verified consumer data from India's largest e-commerce platforms</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
            {[
              { name: 'Amazon', color: 'bg-orange-500' },
              { name: 'Flipkart', color: 'bg-blue-500' },
              { name: 'Myntra', color: 'bg-pink-500' },
              { name: 'Nykaa', color: 'bg-purple-500' },
              { name: 'BigBasket', color: 'bg-green-500' },
              { name: 'Swiggy', color: 'bg-orange-600' },
              { name: 'Zomato', color: 'bg-red-500' },
              { name: 'BookMyShow', color: 'bg-blue-600' },
              { name: 'MakeMyTrip', color: 'bg-indigo-500' },
              { name: 'Urban Company', color: 'bg-teal-500' }
            ].map((platform) => (
              <Card key={platform.name} className="card-hover text-center">
                <CardContent className="p-6">
                  <div className={`mx-auto mb-3 h-12 w-12 rounded-lg ${platform.color} flex items-center justify-center`}>
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to Access Consumer Intelligence?</h2>
          <p className="mb-8 text-xl text-blue-100">
            Join leading enterprises using DataVault for data-driven decision making
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-4">
              <ConnectWalletButton />
            </div>
            <Link href="/marketplace">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Data Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">DataVault Business</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-gray-600">
              <Link href="/marketplace" className="hover:text-gray-900">Marketplace</Link>
              <Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link>
              <Link href="#platforms" className="hover:text-gray-900">Data Sources</Link>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 DataVault. Built for ETHGlobal New Delhi.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
