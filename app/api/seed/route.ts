import clientPromise from "@/app/lib/mongodb";

// Helper to generate random price variance
function randomizePrice(basePrice: number): number {
  const variance = 0.8 + Math.random() * 0.4; // 80% to 120% of base price
  return Math.round(basePrice * variance * 100) / 100;
}

// Helper to generate random rating
function randomizeRating(): number {
  return Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
}

// Helper to generate random review count
function randomizeReviews(): number {
  return Math.floor(5 + Math.random() * 70);
}

// Helper to generate random stock
function randomizeStock(): number {
  return Math.floor(10 + Math.random() * 80);
}

// Helper to generate random quantity in order
function randomizeQuantity(): number {
  return Math.floor(1 + Math.random() * 3);
}

// Helper to randomize delivery status
function randomizeDeliveryStatus(): boolean {
  return Math.random() > 0.3; // 70% delivered
}

async function seedDatabase(seed: boolean = false) {
  try {
    const client = await clientPromise;
    const db = client.db("mongo-analytics");

    // --- USERS (static, no randomization) ---
    const users = [
      { name: "Admin User", email: "admin@example.com", password: "123456", isAdmin: true, createdAt: new Date("2025-09-05"), updatedAt: new Date("2025-09-05") },
      { name: "John Doe", email: "john@example.com", password: "123456", isAdmin: false, createdAt: new Date("2025-09-12"), updatedAt: new Date("2025-09-12") },
      { name: "Sarah Connor", email: "sarah@example.com", password: "123456", isAdmin: false, createdAt: new Date("2025-10-01"), updatedAt: new Date("2025-10-01") },
      { name: "Emily Zhang", email: "emily@example.com", password: "123456", isAdmin: false, createdAt: new Date("2025-10-15"), updatedAt: new Date("2025-10-15") },
      { name: "Marcus Reed", email: "marcus@example.com", password: "123456", isAdmin: false, createdAt: new Date("2025-11-02"), updatedAt: new Date("2025-11-02") },
      { name: "Priya Patel", email: "priya@example.com", password: "123456", isAdmin: false, createdAt: new Date("2025-11-18"), updatedAt: new Date("2025-11-18") },
      { name: "Liam O'Brien", email: "liam@example.com", password: "123456", isAdmin: false, createdAt: new Date("2025-12-01"), updatedAt: new Date("2025-12-01") },
      { name: "Sofia Martinez", email: "sofia@example.com", password: "123456", isAdmin: false, createdAt: new Date("2026-01-10"), updatedAt: new Date("2026-01-10") },
      { name: "David Kim", email: "david@example.com", password: "123456", isAdmin: false, createdAt: new Date("2026-01-25"), updatedAt: new Date("2026-01-25") },
      { name: "Rachel Adams", email: "rachel@example.com", password: "123456", isAdmin: false, createdAt: new Date("2026-02-08"), updatedAt: new Date("2026-02-08") },
    ];

    // --- PRODUCTS (with randomization if enabled) ---
    const baseProducts = [
      { name: "Wireless Headphones", slug: "wireless-headphones", category: "Electronics", image: "/images/headphones.jpg", basePrice: 129.99, brand: "SoundMax", baseRating: 4.3, baseReviews: 22, baseStock: 50, description: "High-quality wireless headphones with noise cancellation", createdAt: new Date("2025-09-01"), updatedAt: new Date("2025-09-01") },
      { name: "Mechanical Keyboard", slug: "mechanical-keyboard", category: "Electronics", image: "/images/keyboard.jpg", basePrice: 89.99, brand: "KeyPro", baseRating: 4.7, baseReviews: 40, baseStock: 30, description: "RGB mechanical keyboard with cherry switches", createdAt: new Date("2025-09-01"), updatedAt: new Date("2025-09-01") },
      { name: "Running Shoes", slug: "running-shoes", category: "Sports", image: "/images/shoes.jpg", basePrice: 79.99, brand: "RunFast", baseRating: 4.2, baseReviews: 33, baseStock: 40, description: "Lightweight running shoes with cushioned sole", createdAt: new Date("2025-09-01"), updatedAt: new Date("2025-09-01") },
      { name: "Yoga Mat", slug: "yoga-mat", category: "Sports", image: "/images/yoga-mat.jpg", basePrice: 34.99, brand: "FlexFit", baseRating: 4.5, baseReviews: 18, baseStock: 60, description: "Non-slip eco-friendly yoga mat", createdAt: new Date("2025-09-15"), updatedAt: new Date("2025-09-15") },
      { name: "Coffee Maker", slug: "coffee-maker", category: "Home", image: "/images/coffee-maker.jpg", basePrice: 199.99, brand: "BrewMaster", baseRating: 4.6, baseReviews: 55, baseStock: 20, description: "12-cup programmable coffee maker", createdAt: new Date("2025-09-15"), updatedAt: new Date("2025-09-15") },
      { name: "Desk Lamp", slug: "desk-lamp", category: "Home", image: "/images/desk-lamp.jpg", basePrice: 45.99, brand: "LightWell", baseRating: 4.1, baseReviews: 12, baseStock: 35, description: "Adjustable LED desk lamp with USB port", createdAt: new Date("2025-10-01"), updatedAt: new Date("2025-10-01") },
      { name: "Leather Wallet", slug: "leather-wallet", category: "Accessories", image: "/images/wallet.jpg", basePrice: 59.99, brand: "CraftHide", baseRating: 4.4, baseReviews: 28, baseStock: 45, description: "Genuine leather bifold wallet", createdAt: new Date("2025-10-01"), updatedAt: new Date("2025-10-01") },
      { name: "Smartwatch", slug: "smartwatch", category: "Electronics", image: "/images/smartwatch.jpg", basePrice: 249.99, brand: "TechTime", baseRating: 4.0, baseReviews: 65, baseStock: 25, description: "Fitness tracking smartwatch with GPS", createdAt: new Date("2025-10-15"), updatedAt: new Date("2025-10-15") },
      { name: "Winter Jacket", slug: "winter-jacket", category: "Clothing", image: "/images/jacket.jpg", basePrice: 149.99, brand: "NorthEdge", baseRating: 4.8, baseReviews: 37, baseStock: 15, description: "Insulated waterproof winter jacket", createdAt: new Date("2025-11-01"), updatedAt: new Date("2025-11-01") },
      { name: "Backpack", slug: "backpack", category: "Accessories", image: "/images/backpack.jpg", basePrice: 69.99, brand: "PackPro", baseRating: 4.3, baseReviews: 42, baseStock: 55, description: "Water-resistant travel backpack with laptop sleeve", createdAt: new Date("2025-11-01"), updatedAt: new Date("2025-11-01") },
      { name: "Bluetooth Speaker", slug: "bluetooth-speaker", category: "Electronics", image: "/images/speaker.jpg", basePrice: 79.99, brand: "SoundMax", baseRating: 4.5, baseReviews: 31, baseStock: 40, description: "Portable waterproof bluetooth speaker", createdAt: new Date("2025-11-15"), updatedAt: new Date("2025-11-15") },
      { name: "Denim Jeans", slug: "denim-jeans", category: "Clothing", image: "/images/jeans.jpg", basePrice: 64.99, brand: "UrbanFit", baseRating: 4.1, baseReviews: 19, baseStock: 50, description: "Slim fit stretch denim jeans", createdAt: new Date("2025-12-01"), updatedAt: new Date("2025-12-01") },
      { name: "Sunglasses", slug: "sunglasses", category: "Accessories", image: "/images/sunglasses.jpg", basePrice: 39.99, brand: "ShadeX", baseRating: 3.9, baseReviews: 14, baseStock: 70, description: "Polarized UV400 sunglasses", createdAt: new Date("2025-12-01"), updatedAt: new Date("2025-12-01") },
      { name: "Cast Iron Skillet", slug: "cast-iron-skillet", category: "Home", image: "/images/skillet.jpg", basePrice: 44.99, brand: "IronChef", baseRating: 4.7, baseReviews: 48, baseStock: 30, description: "Pre-seasoned 12-inch cast iron skillet", createdAt: new Date("2026-01-01"), updatedAt: new Date("2026-01-01") },
    ];

    const products = baseProducts.map(p => ({
      name: p.name,
      slug: p.slug,
      category: p.category,
      image: p.image,
      price: seed ? randomizePrice(p.basePrice) : p.basePrice,
      brand: p.brand,
      rating: seed ? randomizeRating() : p.baseRating,
      numReviews: seed ? randomizeReviews() : p.baseReviews,
      countInStock: seed ? randomizeStock() : p.baseStock,
      description: p.description,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    // Clear existing data
    await db.collection("users").deleteMany({});
    await db.collection("products").deleteMany({});
    await db.collection("orders").deleteMany({});

    // Insert users + products
    const insertedUsers = await db.collection("users").insertMany(users);
    const insertedProducts = await db.collection("products").insertMany(products);

    const userIds = Object.values(insertedUsers.insertedIds);
    const productIds = Object.values(insertedProducts.insertedIds);

    // Helper to build orderItems
    const item = (index: number, quantity?: number) => ({
      name: products[index].name,
      quantity: quantity || (seed ? randomizeQuantity() : 1),
      image: products[index].image,
      price: products[index].price,
      _id: productIds[index].toString(),
    });

    // Helper to calculate order totals
    const calcOrder = (items: { price: number; quantity: number }[], shippingPrice: number, taxRate: number) => {
      const itemsPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const taxPrice = Math.round(itemsPrice * taxRate * 100) / 100;
      return { itemsPrice, shippingPrice, taxPrice, totalPrice: Math.round((itemsPrice + shippingPrice + taxPrice) * 100) / 100 };
    };

    // --- ORDERS (spread across Oct 2025 – Mar 2026) ---
    const orders = [
      // October 2025
      { user: userIds[1], orderItems: [item(0, seed ? undefined : 1), item(1, seed ? undefined : 1)], shippingAddress: { fullName: "John Doe", address: "123 Main St", city: "London", postalCode: "EC1A 1BB", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[0].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[1].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-10-03T09:15:00Z"), updatedAt: new Date("2025-10-05T14:00:00Z") },
      { user: userIds[2], orderItems: [item(2, seed ? undefined : 2)], shippingAddress: { fullName: "Sarah Connor", address: "42 Future Rd", city: "London", postalCode: "N1 4AB", country: "UK" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[2].price, quantity: seed ? randomizeQuantity() : 2 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-10-07T11:30:00Z"), updatedAt: new Date("2025-10-10T09:00:00Z") },
      { user: userIds[3], orderItems: [item(4, seed ? undefined : 1)], shippingAddress: { fullName: "Emily Zhang", address: "88 Park Ave", city: "Manchester", postalCode: "M1 2AB", country: "UK" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[4].price, quantity: seed ? randomizeQuantity() : 1 }], 15, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-10-12T14:20:00Z"), updatedAt: new Date("2025-10-15T10:00:00Z") },
      { user: userIds[1], orderItems: [item(3, seed ? undefined : 1), item(6, seed ? undefined : 1)], shippingAddress: { fullName: "John Doe", address: "123 Main St", city: "London", postalCode: "EC1A 1BB", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[3].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[6].price, quantity: seed ? randomizeQuantity() : 1 }], 5, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-10-20T16:45:00Z"), updatedAt: new Date("2025-10-23T11:00:00Z") },

      // November 2025
      { user: userIds[4], orderItems: [item(7, seed ? undefined : 1), item(1, seed ? undefined : 1)], shippingAddress: { fullName: "Marcus Reed", address: "7 King St", city: "Birmingham", postalCode: "B1 1AA", country: "UK" }, paymentMethod: "Apple Pay", ...calcOrder([{ price: products[7].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[1].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-11-02T10:00:00Z"), updatedAt: new Date("2025-11-05T14:00:00Z") },
      { user: userIds[5], orderItems: [item(8, seed ? undefined : 1)], shippingAddress: { fullName: "Priya Patel", address: "15 Queens Rd", city: "Edinburgh", postalCode: "EH1 1AB", country: "UK" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[8].price, quantity: seed ? randomizeQuantity() : 1 }], 12, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-11-05T13:15:00Z"), updatedAt: new Date("2025-11-08T09:00:00Z") },
      { user: userIds[2], orderItems: [item(5, seed ? undefined : 2), item(10, seed ? undefined : 1)], shippingAddress: { fullName: "Sarah Connor", address: "42 Future Rd", city: "London", postalCode: "N1 4AB", country: "UK" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[5].price, quantity: seed ? randomizeQuantity() : 2 }, { price: products[10].price, quantity: seed ? randomizeQuantity() : 1 }], 8, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-11-10T08:30:00Z"), updatedAt: new Date("2025-11-13T16:00:00Z") },
      { user: userIds[3], orderItems: [item(9, seed ? undefined : 1), item(12, seed ? undefined : 2)], shippingAddress: { fullName: "Emily Zhang", address: "88 Park Ave", city: "Manchester", postalCode: "M1 2AB", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[9].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[12].price, quantity: seed ? randomizeQuantity() : 2 }], 8, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2025-11-15T17:00:00Z"), updatedAt: new Date("2025-11-15T17:00:00Z") },
      { user: userIds[6], orderItems: [item(0, seed ? undefined : 1), item(10, seed ? undefined : 1), item(3, seed ? undefined : 1)], shippingAddress: { fullName: "Liam O'Brien", address: "22 Grafton St", city: "Dublin", postalCode: "D02 Y728", country: "Ireland" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[0].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[10].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[3].price, quantity: seed ? randomizeQuantity() : 1 }], 15, 0.12), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-11-22T12:00:00Z"), updatedAt: new Date("2025-11-26T10:00:00Z") },

      // December 2025
      { user: userIds[1], orderItems: [item(8, seed ? undefined : 1), item(11, seed ? undefined : 2)], shippingAddress: { fullName: "John Doe", address: "123 Main St", city: "London", postalCode: "EC1A 1BB", country: "UK" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[8].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[11].price, quantity: seed ? randomizeQuantity() : 2 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-12-01T09:45:00Z"), updatedAt: new Date("2025-12-04T15:00:00Z") },
      { user: userIds[5], orderItems: [item(4, seed ? undefined : 1), item(13, seed ? undefined : 1)], shippingAddress: { fullName: "Priya Patel", address: "15 Queens Rd", city: "Edinburgh", postalCode: "EH1 1AB", country: "UK" }, paymentMethod: "Apple Pay", ...calcOrder([{ price: products[4].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[13].price, quantity: seed ? randomizeQuantity() : 1 }], 12, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-12-05T14:30:00Z"), updatedAt: new Date("2025-12-08T11:00:00Z") },
      { user: userIds[4], orderItems: [item(6, seed ? undefined : 1), item(12, seed ? undefined : 1)], shippingAddress: { fullName: "Marcus Reed", address: "7 King St", city: "Birmingham", postalCode: "B1 1AA", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[6].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[12].price, quantity: seed ? randomizeQuantity() : 1 }], 5, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-12-10T11:00:00Z"), updatedAt: new Date("2025-12-13T09:00:00Z") },
      { user: userIds[7], orderItems: [item(0, seed ? undefined : 2), item(7, seed ? undefined : 1)], shippingAddress: { fullName: "Sofia Martinez", address: "5 Gran Via", city: "Madrid", postalCode: "28013", country: "Spain" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[0].price, quantity: seed ? randomizeQuantity() : 2 }, { price: products[7].price, quantity: seed ? randomizeQuantity() : 1 }], 20, 0.15), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-12-14T16:20:00Z"), updatedAt: new Date("2025-12-18T10:00:00Z") },
      { user: userIds[2], orderItems: [item(8, seed ? undefined : 1), item(9, seed ? undefined : 1)], shippingAddress: { fullName: "Sarah Connor", address: "42 Future Rd", city: "London", postalCode: "N1 4AB", country: "UK" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[8].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[9].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2025-12-18T10:15:00Z"), updatedAt: new Date("2025-12-18T10:15:00Z") },
      { user: userIds[6], orderItems: [item(11, seed ? undefined : 1), item(5, seed ? undefined : 1)], shippingAddress: { fullName: "Liam O'Brien", address: "22 Grafton St", city: "Dublin", postalCode: "D02 Y728", country: "Ireland" }, paymentMethod: "Apple Pay", ...calcOrder([{ price: products[11].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[5].price, quantity: seed ? randomizeQuantity() : 1 }], 12, 0.12), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2025-12-22T15:00:00Z"), updatedAt: new Date("2025-12-27T09:00:00Z") },

      // January 2026
      { user: userIds[8], orderItems: [item(1, seed ? undefined : 2), item(10, seed ? undefined : 1)], shippingAddress: { fullName: "David Kim", address: "30 Sunset Blvd", city: "Cardiff", postalCode: "CF10 1AA", country: "UK" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[1].price, quantity: seed ? randomizeQuantity() : 2 }, { price: products[10].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2026-01-05T11:30:00Z"), updatedAt: new Date("2026-01-08T14:00:00Z") },
      { user: userIds[3], orderItems: [item(4, seed ? undefined : 1)], shippingAddress: { fullName: "Emily Zhang", address: "88 Park Ave", city: "Manchester", postalCode: "M1 2AB", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[4].price, quantity: seed ? randomizeQuantity() : 1 }], 15, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2026-01-10T09:00:00Z"), updatedAt: new Date("2026-01-13T10:00:00Z") },
      { user: userIds[7], orderItems: [item(13, seed ? undefined : 2), item(5, seed ? undefined : 1)], shippingAddress: { fullName: "Sofia Martinez", address: "5 Gran Via", city: "Madrid", postalCode: "28013", country: "Spain" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[13].price, quantity: seed ? randomizeQuantity() : 2 }, { price: products[5].price, quantity: seed ? randomizeQuantity() : 1 }], 18, 0.15), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2026-01-15T13:45:00Z"), updatedAt: new Date("2026-01-15T13:45:00Z") },
      { user: userIds[9], orderItems: [item(2, seed ? undefined : 1), item(3, seed ? undefined : 2), item(12, seed ? undefined : 1)], shippingAddress: { fullName: "Rachel Adams", address: "99 High St", city: "Bristol", postalCode: "BS1 1AA", country: "UK" }, paymentMethod: "Apple Pay", ...calcOrder([{ price: products[2].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[3].price, quantity: seed ? randomizeQuantity() : 2 }, { price: products[12].price, quantity: seed ? randomizeQuantity() : 1 }], 8, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2026-01-20T10:30:00Z"), updatedAt: new Date("2026-01-23T16:00:00Z") },
      { user: userIds[4], orderItems: [item(8, seed ? undefined : 1)], shippingAddress: { fullName: "Marcus Reed", address: "7 King St", city: "Birmingham", postalCode: "B1 1AA", country: "UK" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[8].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: false, isDelivered: false, createdAt: new Date("2026-01-28T17:00:00Z"), updatedAt: new Date("2026-01-28T17:00:00Z") },

      // February 2026
      { user: userIds[1], orderItems: [item(7, seed ? undefined : 1), item(6, seed ? undefined : 1)], shippingAddress: { fullName: "John Doe", address: "123 Main St", city: "London", postalCode: "EC1A 1BB", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[7].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[6].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2026-02-02T10:00:00Z"), updatedAt: new Date("2026-02-05T12:00:00Z") },
      { user: userIds[5], orderItems: [item(10, seed ? undefined : 2)], shippingAddress: { fullName: "Priya Patel", address: "15 Queens Rd", city: "Edinburgh", postalCode: "EH1 1AB", country: "UK" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[10].price, quantity: seed ? randomizeQuantity() : 2 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2026-02-06T14:15:00Z"), updatedAt: new Date("2026-02-09T09:00:00Z") },
      { user: userIds[8], orderItems: [item(9, seed ? undefined : 1), item(11, seed ? undefined : 1), item(13, seed ? undefined : 1)], shippingAddress: { fullName: "David Kim", address: "30 Sunset Blvd", city: "Cardiff", postalCode: "CF10 1AA", country: "UK" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[9].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[11].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[13].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2026-02-12T08:30:00Z"), updatedAt: new Date("2026-02-12T08:30:00Z") },
      { user: userIds[6], orderItems: [item(0, seed ? undefined : 1), item(2, seed ? undefined : 1)], shippingAddress: { fullName: "Liam O'Brien", address: "22 Grafton St", city: "Dublin", postalCode: "D02 Y728", country: "Ireland" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[0].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[2].price, quantity: seed ? randomizeQuantity() : 1 }], 15, 0.12), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : true, createdAt: new Date("2026-02-18T11:00:00Z"), updatedAt: new Date("2026-02-22T10:00:00Z") },
      { user: userIds[9], orderItems: [item(4, seed ? undefined : 1), item(1, seed ? undefined : 1)], shippingAddress: { fullName: "Rachel Adams", address: "99 High St", city: "Bristol", postalCode: "BS1 1AA", country: "UK" }, paymentMethod: "Apple Pay", ...calcOrder([{ price: products[4].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[1].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: false, isDelivered: false, createdAt: new Date("2026-02-25T16:30:00Z"), updatedAt: new Date("2026-02-25T16:30:00Z") },

      // March 2026
      { user: userIds[2], orderItems: [item(7, seed ? undefined : 1), item(12, seed ? undefined : 2)], shippingAddress: { fullName: "Sarah Connor", address: "42 Future Rd", city: "London", postalCode: "N1 4AB", country: "UK" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[7].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[12].price, quantity: seed ? randomizeQuantity() : 2 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2026-03-01T09:00:00Z"), updatedAt: new Date("2026-03-01T09:00:00Z") },
      { user: userIds[3], orderItems: [item(8, seed ? undefined : 1), item(6, seed ? undefined : 1), item(3, seed ? undefined : 1)], shippingAddress: { fullName: "Emily Zhang", address: "88 Park Ave", city: "Manchester", postalCode: "M1 2AB", country: "UK" }, paymentMethod: "Credit Card", ...calcOrder([{ price: products[8].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[6].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[3].price, quantity: seed ? randomizeQuantity() : 1 }], 10, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2026-03-08T14:30:00Z"), updatedAt: new Date("2026-03-08T14:30:00Z") },
      { user: userIds[7], orderItems: [item(10, seed ? undefined : 1), item(9, seed ? undefined : 1)], shippingAddress: { fullName: "Sofia Martinez", address: "5 Gran Via", city: "Madrid", postalCode: "28013", country: "Spain" }, paymentMethod: "Stripe", ...calcOrder([{ price: products[10].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[9].price, quantity: seed ? randomizeQuantity() : 1 }], 20, 0.15), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2026-03-15T12:00:00Z"), updatedAt: new Date("2026-03-15T12:00:00Z") },
      { user: userIds[4], orderItems: [item(0, seed ? undefined : 1), item(13, seed ? undefined : 1)], shippingAddress: { fullName: "Marcus Reed", address: "7 King St", city: "Birmingham", postalCode: "B1 1AA", country: "UK" }, paymentMethod: "PayPal", ...calcOrder([{ price: products[0].price, quantity: seed ? randomizeQuantity() : 1 }, { price: products[13].price, quantity: seed ? randomizeQuantity() : 1 }], 8, 0.1), isPaid: true, isDelivered: seed ? randomizeDeliveryStatus() : false, createdAt: new Date("2026-03-20T15:45:00Z"), updatedAt: new Date("2026-03-20T15:45:00Z") },
    ];

    await db.collection("orders").insertMany(orders);

    return { users: users.length, products: products.length, orders: orders.length };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function GET() {
  try {
    const result = await seedDatabase(false);
    return Response.json({
      message: "Database seeded successfully",
      counts: result,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Seeding failed" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await seedDatabase(false);
    return Response.json({
      message: "Database seeded successfully",
      counts: result,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Seeding failed" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db("mongo-analytics");
    
    await db.collection("users").deleteMany({});
    await db.collection("products").deleteMany({});
    await db.collection("orders").deleteMany({});

    return Response.json({
      message: "Database cleared successfully",
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const result = await seedDatabase(true);
    return Response.json({
      message: "Database randomized successfully",
      counts: result,
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Randomizing failed" }, { status: 500 });
  }
}