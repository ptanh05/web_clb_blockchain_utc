import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Tin tức</h1>
          <p className="text-lg max-w-2xl">Cập nhật tin tức mới nhất về Blockchain, Web3 và hoạt động của CLB</p>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Tin tức nổi bật</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Featured+News"
                alt="Featured News"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center text-sm text-white/80 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>15/03/2023</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Hội thảo Blockchain UTC 2023: Kết nối và Phát triển
                </h3>
                <p className="text-white/80 mb-4">
                  Sự kiện quy tụ hơn 500 sinh viên và chuyên gia hàng đầu trong lĩnh vực Blockchain và Web3.
                </p>
                <Link href="/news/1">
                  <Button className="bg-white text-[#004987] hover:bg-gray-100">Đọc tiếp</Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-4 border-b pb-4">
                  <div className="relative w-24 h-24 rounded overflow-hidden shrink-0">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=News+${item}`}
                      alt={`News ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>10/0{item}/2023</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#004987] mb-1">
                      {item === 1 && "Xu hướng Blockchain 2023: DeFi, NFT và hơn thế nữa"}
                      {item === 2 && "Sinh viên UTC giành giải tại Hackathon Blockchain toàn quốc"}
                      {item === 3 && "CLB Blockchain UTC ký kết hợp tác với các doanh nghiệp công nghệ"}
                    </h3>
                    <Link href={`/news/${item + 1}`} className="text-sm text-[#004987] hover:underline">
                      Đọc tiếp
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Tất cả tin tức</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=News+${item}`}
                    alt={`News ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>0{item}/03/2023</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#004987]">{`Tiêu đề bài viết tin tức số ${item}`}</h3>
                  <p className="text-gray-600 mb-4">
                    Mô tả ngắn về nội dung bài viết tin tức. Đây là phần tóm tắt giúp người đọc nắm được thông tin
                    chính.
                  </p>
                  <Link href={`/news/${item + 5}`}>
                    <Button
                      variant="outline"
                      className="w-full text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                    >
                      Đọc tiếp
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white">
              Xem thêm tin tức
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
