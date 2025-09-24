import { NextResponse } from "next/server";
import { themSinhVien } from "../sinhvien.service";
import { z } from "zod";

// Schema validation for registration payload
const joinSchema = z.object({
  ho_ten: z.string().min(2, "Full name must be at least 2 characters"),
  ma_sinh_vien: z.string().min(5, "Invalid student ID"),
  email: z.string().email("Invalid email"),
  so_dien_thoai: z.string().optional(),
  truong: z.string().min(1, "Please select your university/organization"),
  khoa_nganh: z.string().min(1, "Please select faculty/major"),
  nam_hoc: z.string().min(1, "Please select your year of study"),
  linh_vuc_quan_tam: z.string(),
  ban_tham_gia: z.string().min(1, "Please choose a division to join"),
  kinh_nghiem_blockchain: z.string().optional(),
  ly_do_tham_gia: z.string().min(10, "Reason must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate data with schema
    const validatedData = joinSchema.parse(body);
    
    // Thêm vào database
    await themSinhVien({
      ...validatedData,
      // Ensure optional fields handled correctly
      so_dien_thoai: validatedData.so_dien_thoai || undefined,
      kinh_nghiem_blockchain: validatedData.kinh_nghiem_blockchain || undefined,
      truong: validatedData.truong,
    });
    
    return NextResponse.json(
      { 
        success: true,
        message: "Registration successful! We will contact you soon." 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in join API:", error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          message: "Invalid data", 
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    // DB error - duplicate email
    if (error instanceof Error && error.message === 'duplicate email') {
      return NextResponse.json(
        { 
          success: false,
          message: "This email has already been registered. Please use a different email or contact the club board if you registered before.",
          errorType: "duplicate_email"
        },
        { status: 400 }
      );
    }

    // DB error - duplicate student id
    if (error instanceof Error && error.message === 'duplicate ma_sinh_vien') {
      return NextResponse.json(
        { 
          success: false,
          message: "This student ID has already been registered. Please verify your student ID or contact the club board.",
          errorType: "duplicate_ma_sinh_vien"
        },
        { status: 400 }
      );
    }
    
    // Generic error
    return NextResponse.json(
      { 
        success: false,
        message: "An error occurred, please try again later" 
      },
      { status: 500 }
    );
  }
} 