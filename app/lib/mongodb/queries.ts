import clientPromise from "."

const DB_NAME = "mongo-analytics";

export async function getUsers() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        const users = await db.collection('users')
        .find()
        .toArray()
    
        return users
    } catch (err) {
        console.error(err)
    }
}

export async function getProducts() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        const products = await db.collection('products')
        .find()
        .toArray()
    
        return products
    } catch (err) {
        console.error(err);
    }
}

export async function getOrders() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        const orders = await db.collection('orders')
        .find()
        .toArray()
    
        return orders
    } catch (err) {
        console.error(err)
    }
}