import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// Lấy tất cả thành viên hoặc lọc theo team_name
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team"); // ?team=Ban%20Kỹ%20thuật

  try {
    let query = "SELECT * FROM members";
    let params: any[] = [];
    if (team) {
      query += " WHERE team_name = $1";
      params.push(team);
    }
    const result = await sql.query(query, params);
    return NextResponse.json({ data: result.rows });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch members", details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
}

// Thêm thành viên mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, role, image_url, bio, achievements, github, linkedin, email, team_name,
    } = body;

    const result = await sql.query(
      `INSERT INTO members (name, role, image_url, bio, achievements, github, linkedin, email, team_name)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, role, image_url, bio, achievements, github, linkedin, email, team_name]
    );
    return NextResponse.json({ data: result.rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add member", details: error instanceof Error ? error.message : error },
      { status: 500 }
    );
  }
} 