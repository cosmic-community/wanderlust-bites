import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import type { JWTPayload } from '@/types'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string)
const TOKEN_NAME = 'auth-token'

export async function createToken(payload: JWTPayload): Promise<string> {
  const token = await new SignJWT({ userId: payload.userId, email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
  
  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_NAME)
  return token?.value || null
}

export async function setTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  })
}

export async function removeTokenCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_NAME)
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  
  return verifyToken(token)
}