"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, BookOpen, Award, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

// Schema validation
const formSchema = z.object({
  ho_ten: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự")
    .regex(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐÊÔƠƯưăâđêôơư\s]+$/,
      "Họ tên chỉ được chứa chữ cái và khoảng trắng"
    ),
  ma_sinh_vien: z
    .string()
    .min(5, "Mã sinh viên phải có ít nhất 5 ký tự")
    .max(15, "Mã sinh viên không được quá 15 ký tự")
    .regex(/^[A-Za-z0-9]+$/, "Mã sinh viên chỉ được chứa chữ cái và số"),
  email: z
    .string()
    .email("Email không hợp lệ")
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(100, "Email không được quá 100 ký tự"),
  so_dien_thoai: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      // Đếm số chữ số trong chuỗi
      const digitCount = (val.match(/\d/g) || []).length;
      return /^[0-9+\-\s()]+$/.test(val) && digitCount >= 8 && digitCount <= 15;
    }, "Số điện thoại phải có ít nhất 8 chữ số và tối đa 15 chữ số"),
  khoa_nganh: z.string().min(1, "Vui lòng chọn khoa/ngành"),
  nam_hoc: z.string().min(1, "Vui lòng chọn năm học"),
  linh_vuc_quan_tam: z
    .array(z.string())
    .min(1, "Vui lòng chọn ít nhất một lĩnh vực")
    .max(6, "Bạn chỉ có thể chọn tối đa 6 lĩnh vực"),
  ban_tham_gia: z.string().min(1, "Vui lòng chọn ban muốn tham gia"),
  kinh_nghiem_blockchain: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return val.length <= 500;
    }, "Kinh nghiệm không được quá 500 ký tự"),
  ly_do_tham_gia: z
    .string()
    .min(10, "Lý do tham gia phải có ít nhất 10 ký tự")
    .max(1000, "Lý do tham gia không được quá 1000 ký tự")
    .refine(
      (val) => val.trim().length >= 10,
      "Lý do tham gia không được chỉ chứa khoảng trắng"
    ),
  truong: z.string().min(1, "Vui lòng chọn trường/đơn vị"),
});

type FormData = z.infer<typeof formSchema>;

type FormFields = keyof FormData;

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ho_ten: "",
      ma_sinh_vien: "",
      email: "",
      so_dien_thoai: "",
      khoa_nganh: "",
      nam_hoc: "",
      linh_vuc_quan_tam: [],
      ban_tham_gia: "",
      kinh_nghiem_blockchain: "",
      ly_do_tham_gia: "",
      truong: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      setIsSubmitting(true);

      // Hiển thị thông báo đang xử lý
      toast.loading("Đang xử lý đơn đăng ký của bạn...", {
        id: "submitting-form",
      });

      // Chuyển đổi mảng lĩnh vực quan tâm thành chuỗi
      const submitData = {
        ...data,
        linh_vuc_quan_tam: data.linh_vuc_quan_tam.join(", "),
      };

      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Dismiss loading toast
        toast.dismiss("submitting-form");

        if (result.errors) {
          result.errors.forEach((error: { field: string; message: string }) => {
            form.setError(error.field as FormFields, {
              type: "server",
              message: error.message,
            });
          });
          toast.error("Vui lòng kiểm tra lại thông tin đã nhập", {
            description: "Có một số trường chưa đúng định dạng",
          });
          return;
        }

        // Xử lý lỗi duplicate email
        if (result.errorType === "duplicate_email") {
          form.setError("email", {
            type: "server",
            message: "Email này đã được đăng ký",
          });
          toast.error("📧 Email đã được đăng ký", {
            description:
              "Vui lòng sử dụng email khác hoặc liên hệ ban chủ nhiệm CLB nếu bạn đã đăng ký trước đó.",
            duration: 6000,
          });
          return;
        }

        // Xử lý lỗi duplicate mã sinh viên
        if (result.errorType === "duplicate_ma_sinh_vien") {
          form.setError("ma_sinh_vien", {
            type: "server",
            message: "Mã sinh viên này đã được đăng ký",
          });
          toast.error("🆔 Mã sinh viên đã được đăng ký", {
            description:
              "Vui lòng kiểm tra lại mã sinh viên hoặc liên hệ ban chủ nhiệm CLB.",
            duration: 6000,
          });
          return;
        }

        throw new Error(result.message || "Đăng ký thất bại");
      }

      // Dismiss loading toast
      toast.dismiss("submitting-form");

      // Hiển thị thông báo thành công chi tiết
      toast.success("🎉 Đăng ký thành công!", {
        description: `Xin chào ${data.ho_ten}! Chúng tôi đã nhận được đơn đăng ký của bạn. Ban chủ nhiệm CLB sẽ xem xét và liên hệ với bạn qua email ${data.email} trong vòng 3-5 ngày làm việc.`,
        duration: 8000,
      });

      // Reset form sau khi thành công
      form.reset();

      // Scroll lên đầu trang để người dùng thấy thông báo
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss("submitting-form");

      // Xử lý các loại lỗi khác nhau
      if (error instanceof TypeError && error.message.includes("fetch")) {
        // Lỗi kết nối mạng
        toast.error("🌐 Lỗi kết nối mạng", {
          description:
            "Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet và thử lại.",
          duration: 6000,
        });
      } else if (error instanceof Error) {
        // Lỗi từ server hoặc validation
        if (error.message.includes("Failed to fetch")) {
          toast.error("🔌 Không thể kết nối", {
            description:
              "Server hiện đang bảo trì hoặc không khả dụng. Vui lòng thử lại sau ít phút.",
            duration: 6000,
          });
        } else if (error.message.includes("timeout")) {
          toast.error("⏰ Hết thời gian chờ", {
            description:
              "Yêu cầu của bạn mất quá nhiều thời gian để xử lý. Vui lòng thử lại.",
            duration: 5000,
          });
        } else {
          toast.error("❌ Đăng ký thất bại", {
            description:
              error.message ||
              "Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại sau.",
            duration: 6000,
          });
        }
      } else {
        // Lỗi không xác định
        toast.error("⚠️ Lỗi không xác định", {
          description:
            "Đã xảy ra lỗi không mong muốn. Vui lòng làm mới trang và thử lại, hoặc liên hệ ban chủ nhiệm CLB nếu vấn đề vẫn tiếp diễn.",
          duration: 7000,
        });
      }

      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Tham gia CLB
          </h1>
          <p className="text-lg max-w-2xl">
            Trở thành thành viên của CLB Blockchain Pioneer Student và bắt đầu
            hành trình khám phá công nghệ đột phá
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">
              Tại sao nên tham gia CLB?
            </h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Tham gia CLB Blockchain Pioneer Student mang đến cho bạn nhiều cơ
              hội học tập, phát triển và kết nối
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                Học tập & Phát triển
              </h3>
              <p className="text-gray-600">
                Tiếp cận kiến thức mới nhất về Blockchain và Web3 thông qua các
                workshop, seminar và khóa học do chuyên gia trong ngành giảng
                dạy.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                Kết nối & Networking
              </h3>
              <p className="text-gray-600">
                Gặp gỡ và kết nối với cộng đồng sinh viên, chuyên gia và doanh
                nghiệp trong lĩnh vực Blockchain và công nghệ.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                Cơ hội việc làm
              </h3>
              <p className="text-gray-600">
                Tiếp cận với các cơ hội thực tập, việc làm và dự án thực tế từ
                các đối tác doanh nghiệp của CLB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">
              Đăng ký tham gia
            </h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Điền thông tin vào mẫu đơn dưới đây để đăng ký trở thành thành
              viên CLB Blockchain Pioneer Student
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            {/* Thông báo hướng dẫn */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                📝 Hướng dẫn điền form
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Các trường có dấu * là bắt buộc</li>
                <li>• Vui lòng điền đầy đủ và chính xác thông tin</li>
                <li>• Sau khi gửi, bạn sẽ nhận được email xác nhận</li>
                <li>
                  • Ban chủ nhiệm sẽ liên hệ với bạn trong 3-5 ngày làm việc
                </li>
                <li>
                  • Nếu gặp lỗi, vui lòng kiểm tra kết nối mạng và thử lại
                </li>
              </ul>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#004987]">
                    Thông tin cá nhân
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ho_ten"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ và tên *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ví dụ: Nguyễn Văn A"
                              {...field}
                              onChange={(e) => {
                                // Chỉ cho phép chữ cái và khoảng trắng
                                const value = e.target.value.replace(
                                  /[^a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂĐÊÔƠƯưăâđêôơư\s]/g,
                                  ""
                                );
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ma_sinh_vien"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã sinh viên *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ví dụ: 2021001234"
                              {...field}
                              onChange={(e) => {
                                // Chỉ cho phép chữ cái và số
                                const value = e.target.value.replace(
                                  /[^A-Za-z0-9]/g,
                                  ""
                                );
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Ví dụ: nguyenvana@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="so_dien_thoai"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại (tùy chọn)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ví dụ: 0123456789 hoặc +84 123 456 789"
                              {...field}
                              onChange={(e) => {
                                // Chỉ cho phép số, dấu +, -, (), khoảng trắng
                                const value = e.target.value.replace(
                                  /[^0-9+\-\s()]/g,
                                  ""
                                );
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="truong"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trường/Đơn vị *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn trường/đơn vị của bạn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="truong_dai_hoc_bach_khoa_ha_noi">
                              Đại học Bách khoa Hà Nội
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_ngoai_thuong">
                              Trường Đại học Ngoại thương
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_kinh_te_quoc_dan">
                              Trường Đại học Kinh tế Quốc dân
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_giao_thong_van_tai">
                              Trường Đại học Giao thông Vận tải
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_fpt">
                              Trường Đại học FPT
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_ha_noi">
                              Trường Đại học Hà Nội
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_huflit">
                              Trường Đại học Ngoại ngữ – Tin học TP.HCM (HUFLIT)
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_ton_duc_thang">
                              Trường Đại học Tôn Đức Thắng
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_van_lang">
                              Trường Đại học Văn Lang
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_cong_nghe_dhqg_ha_noi">
                              Trường Đại học Công nghệ – Đại học Quốc gia Hà Nội
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_bach_khoa_tp_hcm">
                              Trường Đại học Bách khoa TP.HCM – Đại học Quốc gia
                              TP.HCM
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_cong_nghiep_ha_noi">
                              Trường Đại học Công nghiệp Hà Nội
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_cong_nghiep_tp_hcm">
                              Trường Đại học Công nghiệp TP.HCM
                            </SelectItem>
                            <SelectItem value="hoc_vien_cong_nghe_buu_chinh_vien_thong">
                              Học viện Công nghệ Bưu chính Viễn thông
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_su_pham_ky_thuat_tp_hcm">
                              Trường Đại học Sư phạm Kỹ thuật TP.HCM
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_su_pham_ky_thuat_vinh_long">
                              Trường Đại học Sư phạm Kỹ thuật Vĩnh Long
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_cong_nghe_thong_tin_dhqg_tp_hcm">
                              Trường Đại học Công nghệ Thông tin – Đại học Quốc
                              gia TP.HCM
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_cong_nghe_giao_thong_van_tai">
                              Trường Đại học Công nghệ Giao thông Vận tải
                            </SelectItem>
                            <SelectItem value="truong_dai_hoc_ky_thuat_cong_nghiep_thai_nguyen">
                              Trường Đại học Kỹ thuật Công nghiệp – Đại học Thái
                              Nguyên
                            </SelectItem>

                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="khoa_nganh"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Khoa/Ngành *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn khoa/ngành của bạn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cntt">
                              Công nghệ thông tin
                            </SelectItem>
                            <SelectItem value="dtvt">
                              Điện tử viễn thông
                            </SelectItem>
                            <SelectItem value="ktxd">
                              Kỹ thuật xây dựng
                            </SelectItem>
                            <SelectItem value="ktct">
                              Kinh tế vận tải
                            </SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nam_hoc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Năm học *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn năm học của bạn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Năm 1</SelectItem>
                            <SelectItem value="2">Năm 2</SelectItem>
                            <SelectItem value="3">Năm 3</SelectItem>
                            <SelectItem value="4">Năm 4</SelectItem>
                            <SelectItem value="5">Năm 5</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#004987]">
                    Thông tin bổ sung
                  </h3>

                  <FormField
                    control={form.control}
                    name="linh_vuc_quan_tam"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Bạn quan tâm đến lĩnh vực nào trong Blockchain? *
                        </FormLabel>
                        <p className="text-sm text-gray-500 mb-2">
                          Chọn ít nhất 1 và tối đa 6 lĩnh vực
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            {
                              id: "dev",
                              label: "Phát triển (Development)",
                              value: "dev",
                            },
                            {
                              id: "research",
                              label: "Nghiên cứu (Research)",
                              value: "research",
                            },
                            {
                              id: "defi",
                              label: "Tài chính phi tập trung (DeFi)",
                              value: "defi",
                            },
                            {
                              id: "nft",
                              label: "NFT & Metaverse",
                              value: "nft",
                            },
                            {
                              id: "trading",
                              label: "Giao dịch (Trading)",
                              value: "trading",
                            },
                            { id: "other", label: "Khác", value: "other" },
                          ].map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="linh_vuc_quan_tam"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          item.value
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.value,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== item.value
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ban_tham_gia"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>
                          Bạn muốn tham gia ban nào trong CLB? *
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ban_ky_thuat" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Ban Chuyên môn
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ban_truyen_thong" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Ban Truyền thông
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ban_noi_bo" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Ban Hậu cần
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="ban_quan_he_doi_tac_tai_tro" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Ban Quan hệ đối tác và tài trợ
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="kinh_nghiem_blockchain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Kinh nghiệm về Blockchain (nếu có)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mô tả kinh nghiệm của bạn về Blockchain..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ly_do_tham_gia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lý do tham gia CLB *</FormLabel>
                        <p className="text-sm text-gray-500 mb-2">
                          Viết ít nhất 10 ký tự để chia sẻ lý do bạn muốn tham
                          gia CLB
                        </p>
                        <FormControl>
                          <Textarea
                            placeholder="Chia sẻ lý do bạn muốn tham gia CLB Blockchain Pioneer Student..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#004987] hover:bg-[#003b6d]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng ký tham gia"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">
              Câu hỏi thường gặp
            </h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Ai có thể tham gia CLB Blockchain Pioneer Student?",
                answer:
                  "Tất cả sinh viên đang học tại Trường Đại học Giao thông Vận tải đều có thể đăng ký tham gia CLB, không phân biệt khoa, ngành hay năm học.",
              },
              {
                question:
                  "Tôi cần có kiến thức về Blockchain để tham gia không?",
                answer:
                  "Không, CLB chào đón tất cả sinh viên có đam mê và quan tâm đến công nghệ Blockchain, bất kể trình độ kiến thức. Chúng tôi có các khóa học và workshop từ cơ bản đến nâng cao phù hợp với mọi đối tượng.",
              },
              {
                question: "Quy trình đăng ký tham gia CLB như thế nào?",
                answer:
                  "Bạn cần điền đầy đủ thông tin vào mẫu đơn đăng ký trực tuyến. Sau đó, Ban chủ nhiệm CLB sẽ xem xét đơn và liên hệ với bạn để phỏng vấn ngắn (nếu cần). Cuối cùng, bạn sẽ nhận được thông báo kết quả qua email.",
              },
              {
                question: "CLB có thu phí thành viên không?",
                answer:
                  "CLB có thu một khoản phí thành viên nhỏ hàng năm để duy trì hoạt động và tổ chức các sự kiện. Tuy nhiên, chúng tôi có chính sách miễn giảm phí cho sinh viên có hoàn cảnh khó khăn.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#004987] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="#">
              <Button
                variant="outline"
                className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
              >
                Xem tất cả câu hỏi
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
