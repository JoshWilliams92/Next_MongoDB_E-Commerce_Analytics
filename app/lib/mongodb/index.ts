import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URL to .env')
}

const uri = process.env.MONGODB_URI;

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    },
    // Fail fast if the server isn't found within 5 seconds
    serverSelectionTimeoutMS: 5000,
    // Maximise connection reuse in serverless environments
    maxIdleTimeMS: 60000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // Prevent multiple connections during Next.js Hot Module Replacement (HMR)
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };
if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
    .catch(err => {
        console.error("Failed to connect to MongoDB in Development:", err);
        throw err;
    });
}
clientPromise = globalWithMongo._mongoClientPromise
} else {
    // Production: Standard singleton promise
    client = new MongoClient(uri, options);
    clientPromise = client.connect()
    .catch(err => {
        console.error("Failed to connect to MongoDB in Production", err)
        throw err;
    });
}

export default clientPromise;