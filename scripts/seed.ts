
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create test business user
  const hashedPassword = await bcrypt.hash('johndoe123', 10)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'John Smith',
      companyName: 'TechCorp Analytics',
      contactPerson: 'John Smith',
      industry: 'Technology',
      business: {
        create: {
          companyName: 'TechCorp Analytics',
          contactPerson: 'John Smith',
          industry: 'Technology',
          website: 'https://techcorp.com',
          description: 'Leading technology analytics company specializing in consumer insights'
        }
      }
    }
  })

  console.log('✅ Test business user created')

  // Create data categories
  const categories = [
    {
      name: 'Purchase Behavior',
      slug: 'purchase-behavior',
      description: 'Consumer purchasing patterns, frequency, and preferences',
      icon: 'ShoppingCart',
      color: '#10B981'
    },
    {
      name: 'Demographics',
      slug: 'demographics',
      description: 'Age, location, income, and lifestyle demographic data',
      icon: 'Users',
      color: '#3B82F6'
    },
    {
      name: 'Product Preferences',
      slug: 'product-preferences',
      description: 'Brand loyalty, product categories, and preference analysis',
      icon: 'Heart',
      color: '#EC4899'
    },
    {
      name: 'Seasonal Trends',
      slug: 'seasonal-trends',
      description: 'Holiday shopping, seasonal variations, and trend analysis',
      icon: 'TrendingUp',
      color: '#F59E0B'
    },
    {
      name: 'Mobile Commerce',
      slug: 'mobile-commerce',
      description: 'Mobile app usage patterns and mobile shopping behavior',
      icon: 'Smartphone',
      color: '#8B5CF6'
    },
    {
      name: 'Fashion Insights',
      slug: 'fashion-insights',
      description: 'Style preferences, fashion trends, and apparel analytics',
      icon: 'Shirt',
      color: '#EF4444'
    },
    {
      name: 'Beauty & Wellness',
      slug: 'beauty-wellness',
      description: 'Beauty product preferences and wellness shopping patterns',
      icon: 'Sparkles',
      color: '#06B6D4'
    }
  ]

  for (const category of categories) {
    await prisma.dataCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  console.log('✅ Data categories created')

  // Create e-commerce platforms
  const platforms = [
    {
      name: 'Amazon India',
      slug: 'amazon-india',
      description: 'World\'s largest e-commerce platform with diverse product categories and millions of users',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/amazon.svg',
      website: 'https://amazon.in',
      color: '#FF9900'
    },
    {
      name: 'Flipkart',
      slug: 'flipkart',
      description: 'India\'s leading e-commerce platform with strong mobile commerce and diverse product range',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/flipkart.svg',
      website: 'https://flipkart.com',
      color: '#047BD6'
    },
    {
      name: 'Myntra',
      slug: 'myntra',
      description: 'India\'s top fashion and lifestyle platform with curated brand selection',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/65c5da9f878952603e370d03_Myntra-Logo_1.svg/1200px-65c5da9f878952603e370d03_Myntra-Logo_1.svg.png',
      website: 'https://myntra.com',
      color: '#FF3F6C'
    },
    {
      name: 'Nykaa',
      slug: 'nykaa',
      description: 'Premier beauty and wellness platform with expert product curation',
      logo: 'https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/erkxwhl1gd48xfhe2yld',
      website: 'https://nykaa.com',
      color: '#FC2779'
    },
    {
      name: 'BigBasket',
      slug: 'bigbasket',
      description: 'India\'s largest online grocery and food delivery platform',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/BigBasket_Logo.svg/250px-BigBasket_Logo.svg.png',
      website: 'https://bigbasket.com',
      color: '#84C441'
    },
    {
      name: 'Swiggy',
      slug: 'swiggy',
      description: 'Leading food delivery platform with extensive restaurant network',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/swiggy.svg',
      website: 'https://swiggy.com',
      color: '#FC8019'
    },
    {
      name: 'Zomato',
      slug: 'zomato',
      description: 'Popular food discovery and delivery platform with detailed restaurant data',
      logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v9/icons/zomato.svg',
      website: 'https://zomato.com',
      color: '#CB202D'
    },
    {
      name: 'MakeMyTrip',
      slug: 'makemytrip',
      description: 'Leading travel booking platform with comprehensive travel data',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Makemytrip_logo.svg',
      website: 'https://makemytrip.com',
      color: '#EF4444'
    }
  ]

  for (const platform of platforms) {
    await prisma.ecommercePlatform.upsert({
      where: { slug: platform.slug },
      update: {},
      create: platform
    })
  }

  console.log('✅ E-commerce platforms created')

  // Get created categories and platforms for foreign keys
  const createdCategories = await prisma.dataCategory.findMany()
  const createdPlatforms = await prisma.ecommercePlatform.findMany()

  // Helper function to get category and platform by slug
  const getCategory = (slug: string) => createdCategories.find(c => c.slug === slug)!
  const getPlatform = (slug: string) => createdPlatforms.find(p => p.slug === slug)!

  // Create data listings
  const dataListings = [
    // Amazon India listings
    {
      title: 'Amazon Purchase History Analytics',
      description: 'Comprehensive analysis of consumer purchase patterns, product preferences, cart behavior, and seasonal buying trends on Amazon India. Includes demographic breakdowns and price sensitivity analysis.',
      platformId: getPlatform('amazon-india').id,
      categoryId: getCategory('purchase-behavior').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 125000,
      timeRange: 'Last 12 months',
      updateFrequency: 'Monthly',
      sampleData: {
        totalOrders: 125000,
        avgOrderValue: 1850,
        topCategories: ['Electronics', 'Books', 'Home & Kitchen'],
        peakShoppingHours: ['20:00-22:00', '12:00-14:00'],
        deviceBreakdown: { mobile: 68, desktop: 22, tablet: 10 }
      }
    },
    {
      title: 'Amazon Product Search Analytics',
      description: 'Search query patterns, product discovery behavior, and conversion rates. Understand what customers are looking for and how they navigate product catalogs.',
      platformId: getPlatform('amazon-india').id,
      categoryId: getCategory('product-preferences').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 85000,
      timeRange: 'Last 6 months',
      updateFrequency: 'Weekly',
      sampleData: {
        totalSearches: 85000,
        avgSearchesPerUser: 12,
        topSearchTerms: ['iPhone', 'laptop', 'books'],
        conversionRate: 23.5,
        zeroResultQueries: 8.2
      }
    },
    {
      title: 'Amazon Demographics & Location Data',
      description: 'Geographic distribution of customers, age groups, income brackets, and lifestyle preferences across different Indian cities and regions.',
      platformId: getPlatform('amazon-india').id,
      categoryId: getCategory('demographics').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 200000,
      timeRange: 'Last 18 months',
      updateFrequency: 'Quarterly',
      sampleData: {
        totalUsers: 200000,
        ageGroups: { '18-25': 28, '26-35': 42, '36-50': 22, '50+': 8 },
        topCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
        incomeRanges: { '0-3L': 35, '3-6L': 30, '6-10L': 20, '10L+': 15 }
      }
    },

    // Flipkart listings
    {
      title: 'Flipkart Mobile Commerce Analytics',
      description: 'Deep insights into mobile app usage patterns, mobile-specific purchase behavior, push notification effectiveness, and mobile conversion funnels.',
      platformId: getPlatform('flipkart').id,
      categoryId: getCategory('mobile-commerce').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 95000,
      timeRange: 'Last 9 months',
      updateFrequency: 'Monthly',
      sampleData: {
        mobileUsers: 95000,
        appSessions: 8.5,
        avgSessionDuration: 12.3,
        mobileConversionRate: 19.8,
        pushNotificationCTR: 4.2
      }
    },
    {
      title: 'Big Billion Days Festival Analytics',
      description: 'Comprehensive analysis of festival shopping behavior, discount sensitivity, bulk purchase patterns, and seasonal demand fluctuations during Flipkart\'s biggest sale events.',
      platformId: getPlatform('flipkart').id,
      categoryId: getCategory('seasonal-trends').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 185000,
      timeRange: 'Last 24 months',
      updateFrequency: 'Event-based',
      sampleData: {
        festivalOrders: 185000,
        avgDiscountSeeking: 67,
        bulkOrderIncrease: 340,
        topFestivalCategories: ['Electronics', 'Fashion', 'Home'],
        peakShoppingDays: ['Day 1', 'Weekend', 'Last Day']
      }
    },

    // Myntra listings
    {
      title: 'Fashion Trend Analytics',
      description: 'Style preferences, seasonal fashion trends, brand loyalty patterns, size distribution analysis, and emerging fashion categories. Perfect for fashion retailers and brands.',
      platformId: getPlatform('myntra').id,
      categoryId: getCategory('fashion-insights').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 120000,
      timeRange: 'Last 18 months',
      updateFrequency: 'Monthly',
      sampleData: {
        fashionOrders: 120000,
        topBrands: ['H&M', 'Zara', 'Nike', 'Adidas'],
        trendingStyles: ['Minimalist', 'Casual', 'Ethnic'],
        sizeDistribution: { XS: 8, S: 22, M: 35, L: 25, XL: 10 },
        seasonalPreferences: { summer: 'Cotton', winter: 'Woolen', monsoon: 'Quick-dry' }
      }
    },
    {
      title: 'Brand Loyalty & Preferences',
      description: 'Customer loyalty patterns across fashion brands, repeat purchase behavior, brand switching patterns, and premium vs budget preferences.',
      platformId: getPlatform('myntra').id,
      categoryId: getCategory('product-preferences').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 78000,
      timeRange: 'Last 12 months',
      updateFrequency: 'Monthly',
      sampleData: {
        loyalCustomers: 78000,
        avgBrandsPerUser: 3.2,
        brandRetentionRate: 45.6,
        premiumVsBudget: { premium: 35, budget: 65 },
        crossCategoryPurchases: 67.8
      }
    },

    // Nykaa listings
    {
      title: 'Beauty Product Preferences',
      description: 'Skincare routines, makeup preferences, brand analysis, ingredient consciousness, and beauty trend adoption patterns across different demographics.',
      platformId: getPlatform('nykaa').id,
      categoryId: getCategory('beauty-wellness').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 75000,
      timeRange: 'Last 12 months',
      updateFrequency: 'Monthly',
      sampleData: {
        beautyUsers: 75000,
        topCategories: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care'],
        skinConcerns: ['Acne', 'Aging', 'Pigmentation', 'Dryness'],
        organicPreference: 42,
        avgProductsPerOrder: 2.8
      }
    },

    // BigBasket listings
    {
      title: 'Grocery Purchase Patterns',
      description: 'Household shopping behavior, staple vs premium product preferences, bulk buying patterns, and grocery delivery timing analysis.',
      platformId: getPlatform('bigbasket').id,
      categoryId: getCategory('purchase-behavior').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 110000,
      timeRange: 'Last 12 months',
      updateFrequency: 'Weekly',
      sampleData: {
        groceryOrders: 110000,
        avgOrderValue: 850,
        topCategories: ['Vegetables', 'Dairy', 'Staples', 'Snacks'],
        bulkBuyingTrends: 34,
        organicAdoption: 28
      }
    },

    // Swiggy listings
    {
      title: 'Food Delivery Behavior Analytics',
      description: 'Order timing patterns, cuisine preferences, location-based food trends, and price sensitivity in food delivery across Indian cities.',
      platformId: getPlatform('swiggy').id,
      categoryId: getCategory('purchase-behavior').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 140000,
      timeRange: 'Last 8 months',
      updateFrequency: 'Weekly',
      sampleData: {
        foodOrders: 140000,
        avgOrderValue: 320,
        topCuisines: ['North Indian', 'Chinese', 'South Indian', 'Continental'],
        peakOrderTimes: ['12:00-14:00', '19:00-22:00'],
        healthyOptionsGrowth: 45
      }
    },

    // Zomato listings
    {
      title: 'Restaurant Discovery & Reviews',
      description: 'Restaurant selection criteria, review patterns, rating behavior, and dining preferences across different customer segments.',
      platformId: getPlatform('zomato').id,
      categoryId: getCategory('product-preferences').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 95000,
      timeRange: 'Last 10 months',
      updateFrequency: 'Monthly',
      sampleData: {
        restaurantUsers: 95000,
        avgRating: 3.8,
        reviewLength: 45,
        discoveryMethods: ['Search', 'Browse', 'Recommendations'],
        pricePreferences: { budget: 45, mid: 40, premium: 15 }
      }
    },

    // MakeMyTrip listings
    {
      title: 'Travel Booking Patterns',
      description: 'Travel planning behavior, destination preferences, booking lead times, and travel spending patterns across different customer segments.',
      platformId: getPlatform('makemytrip').id,
      categoryId: getCategory('seasonal-trends').id,
      price: 0.1,
      currency: 'USD',
      dataPoints: 65000,
      timeRange: 'Last 24 months',
      updateFrequency: 'Monthly',
      sampleData: {
        travelBookings: 65000,
        avgBookingValue: 8500,
        popularDestinations: ['Goa', 'Kerala', 'Rajasthan', 'Himachal'],
        bookingLeadTime: 21,
        travelPurpose: { leisure: 70, business: 30 }
      }
    }
  ]

  for (const listing of dataListings) {
    await prisma.dataListing.create({
      data: {
        ...listing,
        metadata: {
          tags: ['verified', 'gdpr-compliant', 'zero-knowledge'],
          quality: 'premium',
          format: ['json', 'csv'],
          apiAccess: true
        }
      }
    })
  }

  console.log('✅ Data listings created')

  // Create some sample purchases for the test user
  const sampleListings = await prisma.dataListing.findMany({ take: 3 })
  const testBusiness = await prisma.business.findFirst({
    where: { userId: testUser.id }
  })

  if (testBusiness && sampleListings.length > 0) {
    for (let i = 0; i < sampleListings.length; i++) {
      const listing = sampleListings[i]
      await prisma.purchase.create({
        data: {
          userId: testUser.id,
          businessId: testBusiness.id,
          dataListingId: listing.id,
          amount: listing.price,
          currency: listing.currency,
          status: i < 2 ? 'COMPLETED' : 'PENDING',
          transactionId: `TXN_${Date.now()}_${i}`,
          downloadUrl: i < 2 ? `https://Concentra.com/downloads/${listing.id}` : null,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
        }
      })
    }
  }

  console.log('✅ Sample purchases created')
  console.log('🎉 Database seeding completed!')
  
  // Print summary
  const stats = {
    users: await prisma.user.count(),
    businesses: await prisma.business.count(),
    platforms: await prisma.ecommercePlatform.count(),
    categories: await prisma.dataCategory.count(),
    listings: await prisma.dataListing.count(),
    purchases: await prisma.purchase.count()
  }

  console.log('\n📊 Database Summary:')
  console.log(`Users: ${stats.users}`)
  console.log(`Businesses: ${stats.businesses}`)
  console.log(`Platforms: ${stats.platforms}`)
  console.log(`Categories: ${stats.categories}`)
  console.log(`Data Listings: ${stats.listings}`)
  console.log(`Purchases: ${stats.purchases}`)
  console.log('\n🔑 Test Account:')
  console.log('Email: john@doe.com')
  console.log('Password: johndoe123')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
