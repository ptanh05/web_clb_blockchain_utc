import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Briefcase, Award, Handshake } from "lucide-react"
import Link from "next/link"

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Đối tác & Nhà tài trợ</h1>
          <p className="text-lg max-w-2xl">Những tổ chức, doanh nghiệp đồng hành cùng CLB Blockchain UTC</p>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Đối tác chiến lược</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Các đối tác chiến lược đã và đang đồng hành cùng CLB Blockchain UTC trong các hoạt động học thuật, nghiên
              cứu và phát triển.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="relative w-40 h-40 mb-6">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=Partner+${item}`}
                      alt={`Partner ${item}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-[#004987] mb-2">
                    {item === 1 && "Công ty Blockchain ABC"}
                    {item === 2 && "Tập đoàn Công nghệ XYZ"}
                    {item === 3 && "Viện Nghiên cứu Blockchain"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {item === 1 && "Đối tác chiến lược về công nghệ và đào tạo Blockchain."}
                    {item === 2 && "Nhà tài trợ chính cho các sự kiện và hackathon của CLB."}
                    {item === 3 && "Đơn vị tư vấn chuyên môn và cung cấp tài liệu học thuật."}
                  </p>
                  <Link href={`https://example.com/partner${item}`} target="_blank">
                    <Button
                      variant="outline"
                      className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                    >
                      Tìm hiểu thêm
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Nhà tài trợ</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Các đơn vị tài trợ tài chính và vật chất cho hoạt động của CLB Blockchain UTC.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg flex items-center justify-center">
                <div className="relative w-full h-20">
                  <Image
                    src={`/placeholder.svg?height=100&width=200&text=Sponsor+${item}`}
                    alt={`Sponsor ${item}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Partners */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Đối tác học thuật</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Các trường đại học, viện nghiên cứu và tổ chức giáo dục hợp tác với CLB Blockchain UTC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-32 h-32 shrink-0">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&text=Academic+${item}`}
                      alt={`Academic Partner ${item}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#004987] mb-2">
                      {item === 1 && "Trường Đại học Công nghệ"}
                      {item === 2 && "Viện Nghiên cứu Khoa học và Công nghệ"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {item === 1 && "Hợp tác trong đào tạo và nghiên cứu về công nghệ Blockchain và ứng dụng."}
                      {item === 2 && "Đối tác trong các dự án nghiên cứu khoa học và phát triển ứng dụng Blockchain."}
                    </p>
                    <Link href={`https://example.com/academic${item}`} target="_blank">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
                      >
                        Tìm hiểu thêm
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Lợi ích hợp tác</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Những lợi ích khi trở thành đối tác của CLB Blockchain UTC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">Tiếp cận nhân tài</h3>
              <p className="text-gray-600">
                Kết nối với sinh viên tài năng, đam mê công nghệ Blockchain và Web3, tiềm năng cho tuyển dụng trong
                tương lai.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">Quảng bá thương hiệu</h3>
              <p className="text-gray-600">
                Thương hiệu được quảng bá trong các sự kiện, ấn phẩm và nền tảng truyền thông của CLB Blockchain UTC.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">Hợp tác nghiên cứu</h3>
              <p className="text-gray-600">
                Cơ hội hợp tác trong các dự án nghiên cứu và phát triển ứng dụng Blockchain trong lĩnh vực giao thông
                vận tải.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 bg-gradient-to-r from-[#004987] to-[#0070b8] text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Trở thành đối tác của chúng tôi</h2>
            <p className="text-lg mb-8 text-white/80">
              Bạn quan tâm đến việc hợp tác với CLB Blockchain UTC? Hãy liên hệ với chúng tôi để biết thêm thông tin và
              cơ hội hợp tác.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-[#004987] hover:bg-gray-100">
                Liên hệ ngay
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
