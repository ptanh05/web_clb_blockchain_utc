// db/schema.js
import pool from './db.js';

async function createTables() {
  try {
    // Tạo bảng sinh viên
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sinh_vien (
        id BIGINT PRIMARY KEY,
        ho_ten TEXT,
        ma_sinh_vien TEXT,
        email TEXT,
        so_dien_thoai TEXT,
        khoa_nganh TEXT,
        nam_hoc TEXT,
        linh_vuc_quan_tam TEXT,
        ban_tham_gia TEXT,
        kinh_nghiem_blockchain TEXT,
        ly_do_tham_gia TEXT
      );
    `);

    console.log('Đã tạo bảng sinh_vien thành công');
  } catch (error) {
    console.error('Lỗi khi tạo bảng:', error);
  }
}

// Thực thi tạo bảng
createTables();
