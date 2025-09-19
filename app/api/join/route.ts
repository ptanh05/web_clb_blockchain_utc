import { NextResponse } from "next/server";
import { themSinhVien } from "../sinhvien.service";
import { z } from "zod";

// Schema validation cho dữ liệu đăng ký
const joinSchema = z.object({
  ho_ten: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  ma_sinh_vien: z.string().min(5, "Mã sinh viên không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  so_dien_thoai: z.string().optional(),
  truong: z.string().min(1, "Vui lòng chọn trường/đơn vị"),
  khoa_nganh: z.string().min(1, "Vui lòng chọn khoa/ngành"),
  nam_hoc: z.string().min(1, "Vui lòng chọn năm học"),
  linh_vuc_quan_tam: z.string(),
  ban_tham_gia: z.string().min(1, "Vui lòng chọn ban muốn tham gia"),
  kinh_nghiem_blockchain: z.string().optional(),
  ly_do_tham_gia: z.string().min(10, "Lý do tham gia phải có ít nhất 10 ký tự"),
});

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate dữ liệu với schema
    const validatedData = joinSchema.parse(body);
    
    // Thêm vào database
    await themSinhVien({
      ...validatedData,
      // Đảm bảo các trường optional được xử lý đúng
      so_dien_thoai: validatedData.so_dien_thoai || undefined,
      kinh_nghiem_blockchain: validatedData.kinh_nghiem_blockchain || undefined,
      truong: validatedData.truong,
    });
    
    return NextResponse.json(
      { 
        success: true,
        message: "Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm." 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in join API:", error);
    
    // Xử lý lỗi validation
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          message: "Dữ liệu không hợp lệ", 
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { status: 400 }
      );
    }
    
    // Xử lý lỗi database - Email đã tồn tại
    if (error instanceof Error && error.message === 'duplicate email') {
      return NextResponse.json(
        { 
          success: false,
          message: "Email này đã được đăng ký. Vui lòng sử dụng email khác hoặc liên hệ ban chủ nhiệm CLB nếu bạn đã đăng ký trước đó.",
          errorType: "duplicate_email"
        },
        { status: 400 }
      );
    }

    // Xử lý lỗi database - Mã sinh viên đã tồn tại
    if (error instanceof Error && error.message === 'duplicate ma_sinh_vien') {
      return NextResponse.json(
        { 
          success: false,
          message: "Mã sinh viên này đã được đăng ký. Vui lòng kiểm tra lại mã sinh viên hoặc liên hệ ban chủ nhiệm CLB.",
          errorType: "duplicate_ma_sinh_vien"
        },
        { status: 400 }
      );
    }
    
    // Xử lý các lỗi khác
    return NextResponse.json(
      { 
        success: false,
        message: "Có lỗi xảy ra, vui lòng thử lại sau" 
      },
      { status: 500 }
    );
  }
} 