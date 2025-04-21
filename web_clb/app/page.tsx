"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Calendar,
  BookOpen,
  Users,
  Award,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="w-full relative overflow-hidden py-40 min-h-[650px]">
        {/* Background image without overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-[url('/a8fd3637dcec6fb236fd.jpg?height=1080&width=1920')] bg-cover bg-center" />
          {/* Decorative blobs */}
          <div className="absolute -top-10 -left-10 w-[300px] h-[300px] bg-white opacity-5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-2xl animate-ping" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* LEFT: Content */}
            <div className="text-white text-center md:text-left">
              <p className="text-sm text-[#cce8ff] uppercase tracking-widest mb-3">
                Cộng đồng Web3 tiên phong của sinh viên Việt Nam
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white drop-shadow-md">
                Blockchain Pioneer Student
              </h1>
              <p className="text-lg md:text-xl text-[#e6f1ff] mb-6 max-w-lg mx-auto md:mx-0 drop-shadow-sm">
                Khám phá, học hỏi và phát triển cùng cộng đồng Blockchain tại
                Trường Đại học Giao thông Vận tải.
              </p>
              <Link href="/join">
                <Button
                  size="lg"
                  className="bg-white text-[#004987] hover:bg-gray-100 shadow-md"
                >
                  Đăng ký tham gia CLB
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* RIGHT: (Chừa trống nếu cần thêm animation/image sau) */}
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* Quick Introduction */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">
              Giới thiệu về CLB Blockchain UTC
            </h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Câu lạc bộ Blockchain UTC là nơi quy tụ những sinh viên đam mê
              công nghệ Blockchain và Web3. Chúng tôi tạo ra môi trường học tập,
              nghiên cứu và thực hành, giúp các bạn sinh viên tiếp cận với công
              nghệ đang thay đổi tương lai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                Học tập
              </h3>
              <p className="text-gray-600">
                Workshop, seminar và khóa học từ cơ bản đến chuyên sâu về
                Blockchain, Crypto và Web3
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                Cộng đồng
              </h3>
              <p className="text-gray-600">
                Kết nối với cộng đồng sinh viên, chuyên gia và doanh nghiệp
                trong lĩnh vực Blockchain
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                Thực hành
              </h3>
              <p className="text-gray-600">
                Tham gia các dự án thực tế, hackathon và cơ hội thực tập tại các
                công ty công nghệ hàng đầu
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">
              Hoạt động nổi bật
            </h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Event+${item}`}
                    alt={`Event ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>20/04/2023</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                    {item === 1 && "Workshop: Blockchain Fundamentals"}
                    {item === 2 && "Hackathon: Build Your First dApp"}
                    {item === 3 && "Seminar: Crypto Market Insights"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item === 1 &&
                      "Tìm hiểu về công nghệ Blockchain từ cơ bản đến nâng cao với các chuyên gia hàng đầu."}
                    {item === 2 &&
                      "Thử thách xây dựng ứng dụng phi tập trung đầu tiên của bạn trong 48 giờ."}
                    {item === 3 &&
                      "Phân tích thị trường tiền điện tử và xu hướng đầu tư 2023."}
                  </p>
                  <Link href={`/events/${item}`}>
                    <Button
                      variant="outline"
                      className="w-full text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                    >
                      Xem chi tiết
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/events">
              <Button
                variant="outline"
                className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
              >
                Xem tất cả sự kiện
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#004987] to-[#0070b8] text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Sẵn sàng tham gia cùng chúng tôi?
            </h2>
            <p className="text-lg mb-8 text-white/80">
              Đăng ký ngay hôm nay để trở thành thành viên của CLB Blockchain
              UTC và bắt đầu hành trình khám phá công nghệ đột phá này!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-[#004987] hover:bg-gray-100"
              >
                Đăng ký tham gia CLB
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white hover:bg-white/10 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                  Click đi ngại gì
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 text-white" />
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white via-white/80 to-white/20"></span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">
              Đối tác & Nhà tài trợ
            </h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="overflow-hidden whitespace-nowrap relative">
            <div className="inline-flex animate-marquee">
              {[...Array(300)]
                .flatMap(() => [1, 2, 3, 4, 5, 6, 7, 8])
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-4 mx-4 w-[200px]"
                  >
                    <Image
                      src={`/placeholder.svg?height=100&width=200&text=Partner+${item}`}
                      alt={`Partner ${item}`}
                      width={200}
                      height={100}
                      className="object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/partners">
              <Button variant="link" className="text-[#004987]">
                Xem tất cả đối tác
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { name: "Giới thiệu", href: "/about" },
              { name: "Tin tức", href: "/news" },
              { name: "Sự kiện", href: "/events" },
              { name: "Thư viện", href: "/media" },
              { name: "Liên hệ", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="py-2 px-4 text-[#004987] hover:underline font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
