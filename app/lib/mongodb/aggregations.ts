import clientPromise from ".";

const DB_NAME = "mongo-analytics";

export async function getTotalSales() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const orders = await db.collection('orders').aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt'}},
                    totalSales: { $sum: '$totalPrice' }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        return orders
    } catch (err) {
        console.error(err)
    }
}

export async function getUserSales() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const orders = await db.collection('orders').aggregate([
            {
                $group: {
                _id: '$shippingAddress.fullName',
                totalRevenue: { $sum: '$totalPrice' }
            }
        },
        { $sort: { totalRevenue: -1 } }
    ]).toArray();
    
        return orders
    } catch(err) {
    console.error(err)
    }      
}

export async function calculateAverageOrderValue() {
    try {
      const client = await clientPromise;
      const db = client.db(DB_NAME);
  
      const result = await db.collection('orders').aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalPrice' },
            totalOrders: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            averageOrderValue: { $divide: ['$totalRevenue', '$totalOrders'] },
          },
        },
      ]).toArray();
  
      return result[0]?.averageOrderValue ?? 0;
    } catch (err) {
      console.error(err);
    }
  }

export async function getPopularItems() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)
        const orders = await db.collection('orders').aggregate([
            { $unwind: "$orderItems" },
            {
              $group: {
                _id: "$orderItems.name",
                itemCount: { $sum: 1 }
              }
            },
            { $sort: { itemCount: -1 } }
          ]).toArray()
        return orders
    } catch(err) {
        console.error(err)
    }
}

export async function bestSellingOrders() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const products = await db.collection('orders').aggregate([
            { $unwind: "$orderItems" },
            { 
              $group: {
                _id: "$orderItems.name",
                totalQuantity: { $sum: "$orderItems.quantity" }
              }
            },
            { $sort: { totalQuantity: -1 } }
          ])
        .toArray()
        return products   
    } catch (err) {
        console.error(err);
    }
} 

export async function getOrdersByMinute() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const orders = await db.collection('orders').aggregate([
        {
            $group: {
            _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
                day: { $dayOfMonth: "$createdAt" },
                hour: { $hour: "$createdAt" },
                minute: { $minute: "$createdAt" }
            },
            ordersCount: { $sum: 1 },
            totalSales: { $sum: "$totalPrice" }
            }
        },
        {
            $addFields: {
            minuteOfDay: {
                $add: [
                { $multiply: ["$_id.hour", 60] },
                "$_id.minute"
                ]
            }
            }
        },
        {
            $group: {
            _id: {
                year: "$_id.year",
                month: "$_id.month"
            },
            minutesData: {
                $push: {
                minuteOfDay: "$minuteOfDay",
                ordersCount: "$ordersCount",
                totalSales: "$totalSales"
                }
            }
            }
        },
        {
            $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            minutesData: 1
            }
        },
        {
            $unwind: "$minutesData"
        },
        {
            $sort: { year: 1, month: 1, "minutesData.minuteOfDay": 1 }
        }
        ]).toArray()

        return orders
          
    } catch(err) {
        console.error(err)
    }
}

// --- New E-Commerce KPI Aggregations ---

export async function getRevenueByPaymentMethod() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            {
                $group: {
                    _id: "$paymentMethod",
                    totalRevenue: { $sum: "$totalPrice" },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]).toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}

export async function getRevenueByCategory() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            { $unwind: "$orderItems" },
            {
                $lookup: {
                    from: "products",
                    localField: "orderItems.name",
                    foreignField: "name",
                    as: "productInfo"
                }
            },
            { $unwind: "$productInfo" },
            {
                $group: {
                    _id: "$productInfo.category",
                    totalRevenue: { $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] } },
                    itemsSold: { $sum: "$orderItems.quantity" }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]).toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}

export async function getOrderFulfillmentRate() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            {
                $group: {
                    _id: {
                        isPaid: "$isPaid",
                        isDelivered: "$isDelivered"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    status: {
                        $switch: {
                            branches: [
                                { case: { $and: [{ $eq: ["$_id.isPaid", true] }, { $eq: ["$_id.isDelivered", true] }] }, then: "Paid & Delivered" },
                                { case: { $and: [{ $eq: ["$_id.isPaid", true] }, { $eq: ["$_id.isDelivered", false] }] }, then: "Paid, Not Delivered" },
                                { case: { $and: [{ $eq: ["$_id.isPaid", false] }, { $eq: ["$_id.isDelivered", false] }] }, then: "Unpaid" },
                            ],
                            default: "Other"
                        }
                    },
                    count: 1
                }
            }
        ]).toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}

export async function getCustomerLifetimeValue() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            {
                $group: {
                    _id: "$shippingAddress.fullName",
                    totalSpent: { $sum: "$totalPrice" },
                    orderCount: { $sum: 1 },
                    avgOrderValue: { $avg: "$totalPrice" }
                }
            },
            { $sort: { totalSpent: -1 } }
        ]).toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}

export async function getAverageItemsPerOrder() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            {
                $project: {
                    itemCount: { $size: "$orderItems" }
                }
            },
            {
                $group: {
                    _id: null,
                    averageItems: { $avg: "$itemCount" }
                }
            }
        ]).toArray()

        return result[0]?.averageItems ?? 0
    } catch (err) {
        console.error(err)
    }
}

export async function getRevenueByCity() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            {
                $group: {
                    _id: "$shippingAddress.city",
                    totalRevenue: { $sum: "$totalPrice" },
                    orderCount: { $sum: 1 }
                }
            },
            { $sort: { totalRevenue: -1 } }
        ]).toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}

export async function getMonthlyOrderCount() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('orders').aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                    orderCount: { $sum: 1 },
                    totalRevenue: { $sum: "$totalPrice" }
                }
            },
            { $sort: { _id: 1 } }
        ]).toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}

export async function getProductRatings() {
    try {
        const client = await clientPromise
        const db = client.db(DB_NAME)

        const result = await db.collection('products')
            .find({}, { projection: { name: 1, rating: 1, numReviews: 1, _id: 0 } })
            .sort({ rating: -1 })
            .toArray()

        return result
    } catch (err) {
        console.error(err)
    }
}