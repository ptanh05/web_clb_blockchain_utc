import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, Play, FileText, Headphones } from "lucide-react"
import Link from "next/link"

export default function MediaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Thư viện</h1>
          <p className="text-lg max-w-2xl">
            Khám phá hình ảnh, video, tài liệu và các nội dung đa phương tiện của CLB Blockchain UTC
          </p>
        </div>
      </section>

      {/* Photos Gallery */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#004987] mb-2">Hình ảnh hoạt động</h2>
              <p className="text-gray-600">Những khoảnh khắc đáng nhớ từ các sự kiện của CLB</p>
            </div>
            <Link href="/media/photos">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
              >
                Xem tất cả
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={`/placeholder.svg?height=400&width=400&text=Photo+${item}`}
                  alt={`Photo ${item}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#004987] mb-2">Video</h2>
              <p className="text-gray-600">Các video recap sự kiện, bài giảng và hướng dẫn</p>
            </div>
            <Link href="/media/videos">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
              >
                Xem tất cả
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative aspect-video group">
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=Video+${item}`}
                    alt={`Video ${item}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/50 transition-all">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#004987]">
                    {item === 1 && "Recap: Hội thảo Blockchain UTC 2023"}
                    {item === 2 && "Workshop: Xây dựng Smart Contract đầu tiên"}
                    {item === 3 && "Phỏng vấn chuyên gia: Tương lai của Web3"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Thời lượng: {10 + item * 5} phút</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#004987] mb-2">Tài liệu học tập</h2>
              <p className="text-gray-600">Tài liệu học Blockchain miễn phí cho cộng đồng</p>
            </div>
            <Link href="/media/documents">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
              >
                Xem tất cả
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-[#004987]" />
                </div>
                <h3 className="text-lg font-semibold text-[#004987] mb-2">
                  {item === 1 && "Blockchain cơ bản"}
                  {item === 2 && "Smart Contract và Solidity"}
                  {item === 3 && "DeFi và các ứng dụng"}
                  {item === 4 && "NFT và Metaverse"}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tài liệu học tập từ cơ bản đến nâng cao dành cho người mới bắt đầu.
                </p>
                <Button
                  variant="outline"
                  className="mt-auto text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                >
                  Tải xuống
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcasts */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#004987] mb-2">Podcast</h2>
              <p className="text-gray-600">Các bản ghi âm buổi chia sẻ và thảo luận</p>
            </div>
            <Link href="/media/podcasts">
              <Button
                variant="outline"
                className="mt-4 md:mt-0 text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
              >
                Xem tất cả
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center shrink-0">
                    <Headphones className="h-8 w-8 text-[#004987]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#004987] mb-1">
                      {item === 1 && "Blockchain Talk #1: Tương lai của tiền điện tử"}
                      {item === 2 && "Blockchain Talk #2: Web3 và cơ hội việc làm"}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">Thời lượng: {30 + item * 10} phút</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Cuộc trò chuyện với các chuyên gia trong ngành về những xu hướng mới nhất và cơ hội trong lĩnh vực
                      Blockchain.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                    >
                      Nghe ngay
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
