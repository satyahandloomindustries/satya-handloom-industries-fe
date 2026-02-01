import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

if (!MONGODB_URI) throw new Error('Please define MONGODB_URI in .env.local');

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDB() {
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI)
        .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to connect to database');
  }
}

export default connectToDB;

export const db = async (handler) => {
  await connectToDB();
  return await handler();
};
