import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM wedding_gifts ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}
