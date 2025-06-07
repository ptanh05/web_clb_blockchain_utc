import { NextRequest, NextResponse } from "next/server";
import {
  PartnerType, PartnerStatus, PartnerResponse, PartnersResponse, parseStringArray, PartnerDB
} from "./types";
import { sql } from "@vercel/postgres";

// GET /api/partners
export async function GET(request: NextRequest): Promise<NextResponse<PartnersResponse>> {
  console.log('GET /api/partners called');
  
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as PartnerType | "all";
  const search = searchParams.get("search") || "";
  
  console.log('Request params:', { type, search });

  try {
    // Validate database connection
    console.log('Checking database connection...');
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Database URL exists:', !!process.env.POSTGRES_URL);
    console.log('Database host:', process.env.POSTGRES_HOST);
    console.log('Database name:', process.env.POSTGRES_DATABASE);

    if (!process.env.POSTGRES_URL) {
      console.error('Database connection string is missing');
      throw new Error("Database connection string is not configured");
    }

    // Build query with proper type checking
    let query = "SELECT * FROM partners";
    const params: (string | PartnerType)[] = [];
    const conditions: string[] = [];
    
    if (type && type !== "all") {
      console.log('Adding type condition:', type);
      conditions.push("type = $1");
      params.push(type);
    }
    
    if (search) {
      console.log('Adding search condition:', search);
      const searchParamIndex = params.length + 1;
      conditions.push(`(name ILIKE $${searchParamIndex} OR description ILIKE $${searchParamIndex})`);
      params.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    console.log('Final query:', query);
    console.log('Query params:', params);

    // Add error handling for database query
    let rows;
    try {
      console.log('Executing database query...');
      const result = await sql.query(query, params);
      rows = result.rows;
      console.log('Query returned rows:', rows.length);
    } catch (dbError) {
      console.error("Database query error:", dbError);
      if (dbError instanceof Error) {
        console.error("Database error details:", {
          message: dbError.message,
          stack: dbError.stack
        });
      }
      throw new Error("Failed to execute database query");
    }

    // Transform and validate data
    console.log('Transforming data...');
    const partners = rows.map((row: PartnerDB) => {
      try {
        const transformed = {
          ...row,
          achievements: parseStringArray(row.achievements),
          collaboration: parseStringArray(row.collaboration),
          created_at: new Date(row.created_at).toISOString(),
          updated_at: new Date(row.updated_at).toISOString()
        };
        console.log('Transformed row:', transformed);
        return transformed;
      } catch (transformError) {
        console.error("Data transformation error:", transformError, row);
        throw new Error("Failed to transform partner data");
      }
    });

    console.log('Returning response with partners:', partners.length);
    return NextResponse.json({ data: partners });
  } catch (error) {
    console.error("Error in GET /api/partners:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      });
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        error: "Failed to fetch partners", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

// POST /api/partners
export async function POST(request: NextRequest): Promise<NextResponse<PartnerResponse>> {
  try {
    // Validate database connection
    if (!process.env.POSTGRES_URL) {
      throw new Error("Database connection string is not configured");
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json(
        { error: "Invalid request body", details: "Failed to parse JSON" },
        { status: 400 }
      );
    }

    const { 
      name, 
      logo, 
      type, 
      description, 
      website, 
      email, 
      phone, 
      address, 
      achievements, 
      collaboration, 
      status 
    } = body;

    // Validate required fields
    const requiredFields = { name, logo, type, description };
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: "Missing required fields", 
          details: `Required fields missing: ${missingFields.join(", ")}` 
        },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes: PartnerType[] = ["academic", "business", "community", "government", "technology"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { 
          error: "Invalid partner type", 
          details: `Type must be one of: ${validTypes.join(", ")}` 
        },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses: PartnerStatus[] = ["active", "inactive", "pending"];
    const partnerStatus = status || "active";
    if (!validStatuses.includes(partnerStatus)) {
      return NextResponse.json(
        { 
          error: "Invalid status", 
          details: `Status must be one of: ${validStatuses.join(", ")}` 
        },
        { status: 400 }
      );
    }

    // Insert into database with error handling
    let rows;
    try {
      const result = await sql.query(
        `INSERT INTO partners (
          name, logo, type, description, website, email, phone, address, 
          achievements, collaboration, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING *`,
        [
          name, 
          logo, 
          type, 
          description, 
          website || null, 
          email || null, 
          phone || null, 
          address || null,
          achievements || '',
          collaboration || '',
          partnerStatus
        ]
      );
      rows = result.rows;
    } catch (dbError) {
      console.error("Database insert error:", dbError);
      throw new Error("Failed to insert partner into database");
    }

    if (!rows || rows.length === 0) {
      throw new Error("No data returned after insert");
    }

    const newPartner = {
      ...rows[0],
      created_at: new Date(rows[0].created_at).toISOString(),
      updated_at: new Date(rows[0].updated_at).toISOString()
    };

    return NextResponse.json({ data: newPartner }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/partners:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        error: "Failed to create partner", 
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

// PUT /api/partners/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<PartnerResponse>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID", details: "Partner ID must be a number" },
        { status: 400 }
      );
    }

    const body = await request.json();
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "No update data provided", details: "Request body is empty" },
        { status: 400 }
      );
    }
    
    // Tạo câu query động dựa trên các trường được cập nhật
    const updateFields = Object.keys(body)
      .filter(key => key !== 'id')
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = Object.values(body);
    const query = `
      UPDATE partners 
      SET ${updateFields}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await sql.query(query, [id, ...values]);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Partner not found", details: `No partner found with ID ${id}` },
        { status: 404 }
      );
    }

    const updatedPartner = {
      ...rows[0],
      created_at: new Date(rows[0].created_at).toISOString(),
      updated_at: new Date(rows[0].updated_at).toISOString()
    };

    return NextResponse.json({ data: updatedPartner });
  } catch (error) {
    console.error("Error updating partner:", error);
    return NextResponse.json(
      { 
        error: "Failed to update partner", 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/partners/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<{ success: boolean } | { error: string; details: string }>> {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid ID", details: "Partner ID must be a number" },
        { status: 400 }
      );
    }
    
    const { rows } = await sql.query(
      "DELETE FROM partners WHERE id = $1 RETURNING id",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Partner not found", details: `No partner found with ID ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting partner:", error);
    return NextResponse.json(
      { 
        error: "Failed to delete partner", 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 