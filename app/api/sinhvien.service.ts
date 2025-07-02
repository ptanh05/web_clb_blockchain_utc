import pool from './db';

export interface SinhVien {
  ho_ten: string;
  ma_sinh_vien: string;
  email: string;
  so_dien_thoai?: string;
  truong?: string;
  khoa_nganh?: string;
  nam_hoc?: string;
  linh_vuc_quan_tam?: string;
  ban_tham_gia?: string;
  kinh_nghiem_blockchain?: string;
  ly_do_tham_gia?: string;
}

export async function themSinhVien(data: SinhVien): Promise<void> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Kiểm tra trùng lặp email hoặc mã sinh viên
    const checkResult = await client.query(
      `SELECT 1 FROM sinh_vien WHERE email = $1 OR ma_sinh_vien = $2`,
      [data.email, data.ma_sinh_vien]
    );

    if (checkResult.rows.length > 0) {
      throw new Error('duplicate key');
    }

    // Thêm sinh viên mới
    await client.query(
      `INSERT INTO sinh_vien (
        ho_ten, ma_sinh_vien, email, so_dien_thoai,
        truong,
        khoa_nganh, nam_hoc, linh_vuc_quan_tam,
        ban_tham_gia, kinh_nghiem_blockchain, ly_do_tham_gia,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())`,
      [
        data.ho_ten,
        data.ma_sinh_vien,
        data.email,
        data.so_dien_thoai,
        data.truong,
        data.khoa_nganh,
        data.nam_hoc,
        data.linh_vuc_quan_tam,
        data.ban_tham_gia,
        data.kinh_nghiem_blockchain,
        data.ly_do_tham_gia,
      ]
    );

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function layTatCaSinhVien() {
  const result = await pool.query(
    'SELECT * FROM sinh_vien ORDER BY created_at DESC'
  );
  return result.rows;
}
