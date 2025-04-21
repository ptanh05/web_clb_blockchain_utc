import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Sự kiện & Dự án</h1>
          <p className="text-lg max-w-2xl">Khám phá các sự kiện, workshop và dự án của Câu lạc bộ Blockchain UTC</p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Sự kiện sắp diễn ra</h2>
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
                    {item === 2 && "Thử thách xây dựng ứng dụng phi tập trung đầu tiên của bạn trong 48 giờ."}
                    {item === 3 && "Phân tích thị trường tiền điện tử và xu hướng đầu tư 2023."}
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
        </div>
      </section>

      {/* Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Dự án nổi bật</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-full min-h-[200px]">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&text=Project+${item}`}
                      alt={`Project ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#004987]">
                      {item === 1 && "UTC Token"}
                      {item === 2 && "Blockchain for Supply Chain"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item === 1 &&
                        "Dự án token thử nghiệm cho sinh viên UTC, giúp hiểu rõ cách thức hoạt động của cryptocurrency."}
                      {item === 2 &&
                        "Ứng dụng công nghệ Blockchain vào chuỗi cung ứng và logistics trong lĩnh vực giao thông vận tải."}
                    </p>
                    <Link href={`/projects/${item}`}>
                      <Button
                        variant="outline"
                        className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                      >
                        Xem chi tiết
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Sự kiện đã diễn ra</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg overflow-hidden p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>10/0{item}/2023</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#004987]">{`Workshop: Blockchain Topic ${item}`}</h3>
                <Link href={`/events/past/${item}`} className="text-sm text-[#004987] hover:underline">
                  Xem báo cáo
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/events/past">
              <Button variant="outline" className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white">
                Xem tất cả sự kiện đã diễn ra
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
