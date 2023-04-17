import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"
import postgres from "postgres";

export async function GET(req : NextRequest , res: NextResponse) {
    const id = req.url.slice(req.url.lastIndexOf('/') + 1)
    
    const conn = postgres({
        ssl: require,
      });
      const result = await conn.unsafe(`SELECT * FROM books WHERE id = ${id}`);
      return new NextResponse(JSON.stringify(result));
}