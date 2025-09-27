
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      companyName?: string
      contactPerson?: string
      industry?: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string
    companyName?: string
    contactPerson?: string
    industry?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    companyName?: string
    contactPerson?: string
    industry?: string
  }
}
