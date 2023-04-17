import { NextResponse, NextRequest } from "next/server";
import postgres from "postgres";




export async function POST(req:Request){
    try{
        const { bookId, customerName } = await req.json()
            if(!bookId && !customerName) {
                return new NextResponse(JSON.stringify({
                    "message" : "data not entered"
                }))
            } else {
                const conn = postgres({
                    ssl: require,
                });
                const orderId = Math.random().toString(36).substring(2,100)
                await conn.unsafe(`INSERT INTO orders(orderId, bookId, customerName) SELECT '${orderId}' , ${bookId}, '${customerName}'`)
                return NextResponse.json({
                    "created" : true,
                    "orderId" : `${orderId}`
                })
            }

    } catch (error) {
        return new NextResponse(JSON.stringify({
            "message" : "check header params"
        }))
    }
}



export async function GET(req : NextRequest) {
    const conn = postgres({
        ssl: require,
      });
      const orderData = await conn.unsafe("SELECT * FROM orders");
      return new NextResponse(JSON.stringify(orderData));
}