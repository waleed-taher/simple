import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
import postgres from "postgres";

export async function GET(req : NextRequest , res: NextResponse) {
  try {
    const id = req.url.slice(req.url.lastIndexOf('/') + 1)
    const conn = postgres({
        ssl: require,
      });
      const result = await conn.unsafe(`SELECT * FROM orders WHERE orderId = '${id}'`);
      return new NextResponse(JSON.stringify(result));
    
  } catch (error) {
    console.log(error)
  }
}

export async function PATCH(req: NextRequest){
  const { customerName } = await req.json()
  const id = req.url.slice(req.url.lastIndexOf('/') + 1)
  const conn = postgres({
    ssl: require,
  });
  await conn.unsafe(`UPDATE orders SET customerName='${customerName}' WHERE orderId= '${id}'`)
  const res = await conn.unsafe(`SELECT * FROM orders WHERE orderId = '${id}'`);
  return new NextResponse(JSON.stringify(res))
}

export async function DELETE(req: NextRequest) {
  const id = req.url.slice(req.url.lastIndexOf('/') + 1)
  const conn = postgres({
    ssl: require,
  });
  await conn.unsafe(`DELETE FROM orders WHERE orderId= '${id}'`)
  const res = await conn.unsafe('SELECT * FROM orders');
  return new NextResponse(JSON.stringify(res))
}