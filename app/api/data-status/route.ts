import clientPromise from "@/app/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mongo-analytics");
    
    const orderCount = await db.collection("orders").countDocuments();
    
    return Response.json({
      hasData: orderCount > 0,
      counts: {
        orders: orderCount,
      }
    });
  } catch (err) {
    console.error(err);
    return Response.json({ hasData: false }, { status: 500 });
  }
}
