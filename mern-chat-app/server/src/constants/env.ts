const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue

  if (value === undefined) {
    throw new Error(`Missing enviroment key ${key}`)
  }
  return value
}
// BACK
export const NODE_ENV = getEnv('NODE_ENV', 'development')
export const DB_URI_MONGO = getEnv('DB_URI_MONGO')
export const SERVER_PORT = getEnv('SERVER_PORT', '3000')
export const SALT_ROUNDS = getEnv('SALT_ROUNDS', '2')

// FRONT
export const VITE_HOST_URL = getEnv('VITE_HOST_URL')
export const VITE_CLIENT_PORT = getEnv('VITE_CLIENT_PORT', '5000')

// AUTH
export const SECRET_JWT_KEY = getEnv('SECRET_JWT_KEY')

// export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET')
// export const EMAIL_SENDER = getEnv('EMAIL_SENDER')
// export const RESEND_API_KEY = getEnv('RESEND_API_KEY')
