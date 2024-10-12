import mongoose from 'mongoose'
import { DB_URI_MONGO } from '../../constants/env'

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URI_MONGO)
    console.log('Connected to the DB')
  } catch (error) {
    console.log('Could not connect to the database', error)
    process.exit(1)
  }
}
export default connectToDatabase
