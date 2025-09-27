
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Database, Building2, Mail, Lock, User, Globe, FileText, Briefcase } from 'lucide-react'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

const industries = [
  'Technology',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Marketing & Advertising',
  'Real Estate',
  'Education',
  'Other'
]

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    companyName: '',
    contactPerson: '',
    industry: '',
    website: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      toast.success('Business account created successfully!')
      
      // Sign in automatically after successful signup
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.ok) {
        router.push('/dashboard')
      } else {
        router.push('/auth/signin')
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <Database className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-2xl font-bold text-gray-900">DataVault</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Business Account</h1>
          <p className="text-gray-600">Get access to verified consumer data insights</p>
        </div>

        <Card className="card-hover">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2">
              <Building2 className="h-5 w-5" />
              Business Registration
            </CardTitle>
            <CardDescription>
              Join leading enterprises using DataVault for consumer intelligence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>

                {/* Contact Person */}
                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Contact Person
                  </Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    placeholder="John Smith"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Business Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    minLength={6}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Industry
                  </Label>
                  <Select onValueChange={(value) => handleChange('industry', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Company Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your company and how you plan to use consumer data insights..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Creating Account...' : 'Create Business Account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-semibold text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
