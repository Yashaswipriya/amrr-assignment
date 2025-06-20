import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);


if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  cached.conn = await (cached.promise ||= mongoose.connect(MONGODB_URI, { bufferCommands: false }));
  return cached.conn;
}

export default dbConnect;
