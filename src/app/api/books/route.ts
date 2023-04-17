import {NextResponse } from "next/server";
import postgres from "postgres";

export async function GET() {
  const conn = postgres({
    ssl: require,
  });
  const result = await conn.unsafe("SELECT * FROM books");
  return new NextResponse(JSON.stringify(result));
}