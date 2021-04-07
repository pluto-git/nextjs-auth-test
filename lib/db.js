require('dotenv').config();
import { MongoClient } from 'mongodb';

export async function connectToDataBase() {
  const client = await MongoClient.connect(
    'mongodb+srv://'+process.env.DB_LOGIN+':'+process.env.DB_PASSWORD+'@cluster0.hwdm7.mongodb.net/nextAuthDB?retryWrites=true&w=majority'
  );

  return client;
}