import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../constants/env'

export const hashValue = async (value: string): Promise<string> =>
  await bcrypt.hash(value, SALT_ROUNDS)

export const compareValue = async (value: string, hashedValue: string): Promise<boolean> =>
  await bcrypt.compare(value, hashedValue).catch(() => false)
