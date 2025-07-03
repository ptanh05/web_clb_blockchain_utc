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

// Schema validation
const formSchema = z.object({
  ho_ten: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  ma_sinh_vien: z.string().min(5, "Mã sinh viên không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  so_dien_thoai: z.string().optional(),
  khoa_nganh: z.string().min(1, "Vui lòng chọn khoa/ngành"),
  nam_hoc: z.string().min(1, "Vui lòng chọn năm học"),
  linh_vuc_quan_tam: z
    .array(z.string())
    .min(1, "Vui lòng chọn ít nhất một lĩnh vực"),
  ban_tham_gia: z.string().min(1, "Vui lòng chọn ban muốn tham gia"),
  kinh_nghiem_blockchain: z.string().optional(),
  ly_do_tham_gia: z.string().min(10, "Lý do tham gia phải có ít nhất 10 ký tự"),
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
        if (result.errors) {
          result.errors.forEach((error: { field: string; message: string }) => {
            form.setError(error.field as FormFields, {
              type: "server",
              message: error.message,
            });
          });
          throw new Error("Vui lòng kiểm tra lại thông tin");
        }
        throw new Error(result.message || "Đăng ký thất bại");
      }

      toast.success(
        result.message ||
          "Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm."
      );
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
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
                          <FormLabel>Họ và tên</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập họ và tên của bạn"
                              {...field}
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
                          <FormLabel>Mã sinh viên</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập mã sinh viên của bạn"
                              {...field}
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Nhập địa chỉ email của bạn"
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
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập số điện thoại của bạn"
                              {...field}
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
                        <FormLabel>Trường/Đơn vị</FormLabel>
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
                            <SelectItem value="dai_hoc_gtvt">
                              Đại học GTVT
                            </SelectItem>
                            <SelectItem value="bach_khoa">
                              Đại học Bách Khoa
                            </SelectItem>
                            <SelectItem value="ngoai_thuong">
                              Đại học Ngoại Thương
                            </SelectItem>
                            <SelectItem value="kinh_te_quoc_dan">
                              Đại học Kinh tế Quốc dân
                            </SelectItem>
                            <SelectItem value="fpt">Đại học FPT</SelectItem>
                            <SelectItem value="hust">
                              Đại học Bách Khoa Hà Nội (HUST)
                            </SelectItem>
                            <SelectItem value="hanu">
                              Đại học Hà Nội (HANU)
                            </SelectItem>
                            <SelectItem value="huflit">
                              Đại học HUFLIT
                            </SelectItem>
                            <SelectItem value="ton_duc_thang">
                              Đại học Tôn Đức Thắng
                            </SelectItem>
                            <SelectItem value="van_lang">
                              Đại học Văn Lang
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
                        <FormLabel>Khoa/Ngành</FormLabel>
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
                        <FormLabel>Năm học</FormLabel>
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
                          Bạn quan tâm đến lĩnh vực nào trong Blockchain?
                        </FormLabel>
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
                          Bạn muốn tham gia ban nào trong CLB?
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
                                Ban Kỹ thuật
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
                                Ban Nội bộ
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
                        <FormLabel>Lý do tham gia CLB</FormLabel>
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
            <Link href="/faq">
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
