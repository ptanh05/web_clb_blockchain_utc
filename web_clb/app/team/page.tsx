"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function TeamPage() {
  const [advisorsPage, setAdvisorsPage] = useState(1)
  const [technicalPage, setTechnicalPage] = useState(1)
  const [communicationPage, setCommPage] = useState(1)
  const [logisticsPage, setLogisticsPage] = useState(1)

  // Số lượng thành viên hiển thị trên mỗi trang
  const advisorsPerPage = 2
  const itemsPerPage = 6

  // Dữ liệu thành viên
  const advisors = [
    { name: "TS. Nguyễn Văn R", role: "Giảng viên Khoa CNTT", org: "Trường Đại học Giao thông Vận tải" },
    { name: "TS. Trần Thị S", role: "Chuyên gia Blockchain", org: "Viện Nghiên cứu Công nghệ" },
    { name: "TS. Lê Văn A1", role: "Giảng viên Khoa CNTT", org: "Trường Đại học Bách Khoa Hà Nội" },
    { name: "TS. Phạm Thị A2", role: "Chuyên gia Blockchain", org: "Viện Công nghệ Thông tin" },
    { name: "TS. Hoàng Văn A3", role: "Giảng viên", org: "Đại học Quốc gia Hà Nội" },
    { name: "TS. Vũ Thị A4", role: "Chuyên gia Tài chính", org: "Ngân hàng Nhà nước" },
  ]

  const technicalMembers = [
    { name: "Nguyễn Văn E", role: "Phó ban Kỹ thuật" },
    { name: "Trần Văn F", role: "Thành viên" },
    { name: "Lê Thị G", role: "Thành viên" },
    { name: "Phạm Văn H", role: "Thành viên" },
    { name: "Hoàng Thị I", role: "Thành viên" },
    { name: "Vũ Văn K", role: "Thành viên" },
    { name: "Nguyễn Văn X1", role: "Thành viên" },
    { name: "Trần Văn X2", role: "Thành viên" },
    { name: "Lê Thị X3", role: "Thành viên" },
    { name: "Phạm Văn X4", role: "Thành viên" },
    { name: "Hoàng Thị X5", role: "Thành viên" },
    { name: "Vũ Văn X6", role: "Thành viên" },
  ]

  const commMembers = [
    { name: "Nguyễn Thị L", role: "Phó ban Truyền thông" },
    { name: "Trần Văn M", role: "Thành viên" },
    { name: "Lê Văn N", role: "Thành viên" },
    { name: "Phạm Thị O", role: "Thành viên" },
    { name: "Hoàng Văn P", role: "Thành viên" },
    { name: "Vũ Thị Q", role: "Thành viên" },
    { name: "Nguyễn Thị Y1", role: "Thành viên" },
    { name: "Trần Văn Y2", role: "Thành viên" },
    { name: "Lê Văn Y3", role: "Thành viên" },
    { name: "Phạm Thị Y4", role: "Thành viên" },
    { name: "Hoàng Văn Y5", role: "Thành viên" },
    { name: "Vũ Thị Y6", role: "Thành viên" },
  ]

  const logisticsMembers = [
    { name: "Nguyễn Văn R", role: "Trưởng ban Hậu cần" },
    { name: "Trần Thị S", role: "Phó ban Hậu cần" },
    { name: "Lê Văn T", role: "Thành viên" },
    { name: "Phạm Thị U", role: "Thành viên" },
    { name: "Hoàng Văn V", role: "Thành viên" },
    { name: "Vũ Thị X", role: "Thành viên" },
    { name: "Nguyễn Văn Z1", role: "Thành viên" },
    { name: "Trần Thị Z2", role: "Thành viên" },
    { name: "Lê Văn Z3", role: "Thành viên" },
    { name: "Phạm Thị Z4", role: "Thành viên" },
    { name: "Hoàng Văn Z5", role: "Thành viên" },
    { name: "Vũ Thị Z6", role: "Thành viên" },
  ]

  // Tính toán số trang
  const totalAdvisorsPages = Math.ceil(advisors.length / advisorsPerPage)
  const totalTechnicalPages = Math.ceil(technicalMembers.length / itemsPerPage)
  const totalCommPages = Math.ceil(commMembers.length / itemsPerPage)
  const totalLogisticsPages = Math.ceil(logisticsMembers.length / itemsPerPage)

  // Lấy dữ liệu cho trang hiện tại
  const currentAdvisors = advisors.slice((advisorsPage - 1) * advisorsPerPage, advisorsPage * advisorsPerPage)
  const currentTechnical = technicalMembers.slice((technicalPage - 1) * itemsPerPage, technicalPage * itemsPerPage)
  const currentComm = commMembers.slice((communicationPage - 1) * itemsPerPage, communicationPage * itemsPerPage)
  const currentLogistics = logisticsMembers.slice((logisticsPage - 1) * itemsPerPage, logisticsPage * itemsPerPage)
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Đội ngũ CLB</h1>
          <p className="text-lg max-w-2xl">
            Gặp gỡ những thành viên tài năng đang xây dựng và phát triển CLB Blockchain UTC
          </p>
        </div>
      </section>

      {/* Academic Advisors */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Cố vấn học thuật</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">Các giảng viên, chuyên gia tư vấn và hỗ trợ CLB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentAdvisors.map((advisor, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-full min-h-[200px]">
                    <Image
                      src={`/placeholder.svg?height=400&width=300&text=${advisor.name}`}
                      alt={advisor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#004987] mb-1">{advisor.name}</h3>
                    <p className="text-gray-600 mb-1">{advisor.role}</p>
                    <p className="text-gray-500 text-sm mb-4">{advisor.org}</p>
                    <p className="text-gray-600 text-sm mb-4">
                      Chuyên gia trong lĩnh vực Blockchain và công nghệ Web3, với nhiều năm kinh nghiệm nghiên cứu và
                      giảng dạy.
                    </p>
                    <div className="flex gap-4">
                      <Link href="#" className="text-gray-500 hover:text-[#004987]">
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalAdvisorsPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setAdvisorsPage((prev) => Math.max(prev - 1, 1))}
                disabled={advisorsPage === 1}
              >
                Trang trước
              </Button>
              <span className="text-gray-600">
                Trang {advisorsPage} / {totalAdvisorsPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setAdvisorsPage((prev) => Math.min(prev + 1, totalAdvisorsPages))}
                disabled={advisorsPage === totalAdvisorsPages}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Ban điều hành</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">Đội ngũ lãnh đạo CLB Blockchain UTC nhiệm kỳ 2023-2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Nguyễn Văn A", role: "Chủ nhiệm CLB" },
              { name: "Trần Thị B", role: "Phó chủ nhiệm" },
              { name: "Lê Văn C", role: "Trưởng ban Kỹ thuật" },
              { name: "Phạm Thị D", role: "Trưởng ban Truyền thông" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden text-center hover:shadow-lg transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={`/placeholder.svg?height=400&width=300&text=${member.name}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#004987]">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <div className="flex justify-center gap-4">
                    <Link href="#" className="text-gray-500 hover:text-[#004987]">
                      <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-[#004987]">
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="#" className="text-gray-500 hover:text-[#004987]">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Team */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Ban Kỹ thuật</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">Đội ngũ phát triển và nghiên cứu công nghệ Blockchain</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentTechnical.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center p-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=${member.name.charAt(0)}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#004987]">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalTechnicalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setTechnicalPage((prev) => Math.max(prev - 1, 1))}
                disabled={technicalPage === 1}
              >
                Trang trước
              </Button>
              <span className="text-gray-600">
                Trang {technicalPage} / {totalTechnicalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setTechnicalPage((prev) => Math.min(prev + 1, totalTechnicalPages))}
                disabled={technicalPage === totalTechnicalPages}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Communication Team */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Ban Truyền thông</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">Đội ngũ phụ trách truyền thông, sự kiện và đối ngoại</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentComm.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center p-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=${member.name.charAt(0)}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#004987]">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalCommPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setCommPage((prev) => Math.max(prev - 1, 1))}
                disabled={communicationPage === 1}
              >
                Trang trước
              </Button>
              <span className="text-gray-600">
                Trang {communicationPage} / {totalCommPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setCommPage((prev) => Math.min(prev + 1, totalCommPages))}
                disabled={communicationPage === totalCommPages}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Logistics Team */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Ban Hậu cần</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-gray-600">
              Đội ngũ phụ trách cơ sở vật chất, tài chính và hỗ trợ hoạt động
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentLogistics.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center p-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={`/placeholder.svg?height=100&width=100&text=${member.name.charAt(0)}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#004987]">{member.name}</h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalLogisticsPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setLogisticsPage((prev) => Math.max(prev - 1, 1))}
                disabled={logisticsPage === 1}
              >
                Trang trước
              </Button>
              <span className="text-gray-600">
                Trang {logisticsPage} / {totalLogisticsPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-[#004987] border-[#004987]"
                onClick={() => setLogisticsPage((prev) => Math.min(prev + 1, totalLogisticsPages))}
                disabled={logisticsPage === totalLogisticsPages}
              >
                Trang sau
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-16 bg-gradient-to-r from-[#004987] to-[#0070b8] text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Tham gia đội ngũ CLB</h2>
            <p className="text-lg mb-8 text-white/80">
              Bạn muốn trở thành một phần của đội ngũ CLB Blockchain UTC? Hãy đăng ký ngay hôm nay để bắt đầu hành trình
              khám phá và phát triển cùng chúng tôi!
            </p>
            <Link href="/join">
              <Button size="lg" className="bg-white text-[#004987] hover:bg-gray-100">
                Đăng ký tham gia CLB
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
