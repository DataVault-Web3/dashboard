
export interface Platform {
  id: string
  name: string
  slug: string
  description: string
  logo: string
  website: string
  color: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface DataCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  createdAt: Date
  updatedAt: Date
}

export interface DataListing {
  id: string
  title: string
  description: string
  platformId: string
  categoryId: string
  price: number
  currency: string
  dataPoints: number
  timeRange: string
  updateFrequency: string
  sampleData?: any
  metadata?: any
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  platform?: Platform
  category?: DataCategory
}

export interface Purchase {
  id: string
  userId: string
  businessId: string
  dataListingId: string
  amount: number
  currency: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  transactionId?: string
  downloadUrl?: string
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
  dataListing?: DataListing
}

export interface Business {
  id: string
  userId: string
  companyName: string
  contactPerson: string
  industry: string
  website?: string
  description?: string
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED'
  createdAt: Date
  updatedAt: Date
}
