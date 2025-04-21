import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Calendar, BookOpen, Lightbulb, Rocket, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] bg-gradient-to-r from-[#004987] to-[#0070b8] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center" />
        </div>
        <div className="container relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Giới thiệu</h1>
          <p className="text-lg max-w-2xl">
            Tìm hiểu về Câu lạc bộ Blockchain UTC - Lịch sử, sứ mệnh và tầm nhìn của chúng tôi
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#004987] mb-6">Về Câu lạc bộ Blockchain UTC</h2>
              <p className="text-gray-600 mb-4">
                Câu lạc bộ Blockchain UTC được thành lập vào năm 2022, là tổ chức sinh viên chính thức thuộc Trường Đại
                học Giao thông Vận tải. Chúng tôi tập trung vào việc nghiên cứu, học tập và ứng dụng công nghệ
                Blockchain và Web3 trong môi trường giáo dục đại học.
              </p>
              <p className="text-gray-600 mb-4">
                Với sự hỗ trợ từ các giảng viên, chuyên gia trong ngành và các đối tác doanh nghiệp, CLB Blockchain UTC
                đã và đang tạo ra một hệ sinh thái học thuật năng động, nơi sinh viên có thể tiếp cận với những kiến
                thức và kỹ năng mới nhất trong lĩnh vực công nghệ đột phá này.
              </p>
              <p className="text-gray-600">
                Chúng tôi tin rằng Blockchain là một trong những công nghệ quan trọng của tương lai, và việc trang bị
                kiến thức về lĩnh vực này sẽ mang lại lợi thế cạnh tranh cho sinh viên trong thị trường lao động ngày
                càng đòi hỏi cao về công nghệ.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=800&width=600&text=About+Us"
                alt="About Blockchain UTC Club"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Tầm nhìn & Sứ mệnh</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#004987]">Tầm nhìn</h3>
              <p className="text-gray-600">
                Trở thành câu lạc bộ sinh viên hàng đầu về Blockchain tại Việt Nam, tạo ra một cộng đồng học thuật năng
                động và đổi mới, nơi sinh viên được trang bị kiến thức, kỹ năng và cơ hội để trở thành những nhà lãnh
                đạo tương lai trong lĩnh vực công nghệ Blockchain và Web3.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[#004987]">Sứ mệnh</h3>
              <p className="text-gray-600">
                Xây dựng một môi trường học tập, nghiên cứu và thực hành về công nghệ Blockchain cho sinh viên UTC. Kết
                nối sinh viên với các chuyên gia, doanh nghiệp và cơ hội việc làm trong ngành. Thúc đẩy sự đổi mới và
                ứng dụng công nghệ Blockchain trong giáo dục và các lĩnh vực liên quan đến giao thông vận tải.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Giá trị cốt lõi</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">Học tập liên tục</h3>
              <p className="text-gray-600">
                Chúng tôi tin vào việc học tập không ngừng nghỉ và chia sẻ kiến thức. Công nghệ Blockchain phát triển
                nhanh chóng, và chúng tôi cam kết luôn cập nhật những kiến thức mới nhất.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">Cộng đồng & Hợp tác</h3>
              <p className="text-gray-600">
                Chúng tôi xây dựng một cộng đồng mở, nơi mọi ý tưởng đều được tôn trọng. Sự hợp tác giữa các thành viên,
                giảng viên và đối tác là nền tảng cho sự phát triển của CLB.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-8 w-8 text-[#004987]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#004987]">Đổi mới & Sáng tạo</h3>
              <p className="text-gray-600">
                Chúng tôi khuyến khích tư duy đổi mới và sáng tạo. Mỗi thành viên đều có cơ hội thử nghiệm, phát triển ý
                tưởng mới và tạo ra các giải pháp đột phá.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Lịch sử phát triển</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {[
              {
                year: "2022",
                title: "Thành lập CLB",
                description: "Câu lạc bộ Blockchain UTC chính thức được thành lập với 15 thành viên sáng lập.",
              },
              {
                year: "2022",
                title: "Workshop đầu tiên",
                description: "Tổ chức workshop đầu tiên về 'Blockchain cơ bản' với sự tham gia của hơn 100 sinh viên.",
              },
              {
                year: "2023",
                title: "Hackathon UTC Blockchain",
                description: "Tổ chức cuộc thi Hackathon đầu tiên với chủ đề 'Blockchain trong Giao thông Vận tải'.",
              },
              {
                year: "2023",
                title: "Hợp tác doanh nghiệp",
                description: "Ký kết hợp tác với các công ty công nghệ hàng đầu trong lĩnh vực Blockchain.",
              },
              {
                year: "2024",
                title: "Mở rộng quy mô",
                description: "CLB đạt mốc 100 thành viên chính thức và tổ chức hơn 20 sự kiện trong năm.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#004987] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded shadow-md">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-[#004987]">{item.title}</div>
                    <time className="text-xs font-semibold text-gray-500">{item.year}</time>
                  </div>
                  <div className="text-gray-600">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Ban điều hành</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
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
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#004987]">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/team">
              <Button variant="outline" className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white">
                Xem tất cả thành viên
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#004987] mb-4">Thành tựu nổi bật</h2>
            <div className="w-20 h-1 bg-[#004987] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "20+ sự kiện",
                description: "Tổ chức hơn 20 sự kiện học thuật và networking về Blockchain",
              },
              {
                title: "500+ sinh viên",
                description: "Kết nối hơn 500 sinh viên với kiến thức và cơ hội trong lĩnh vực Blockchain",
              },
              {
                title: "10+ đối tác",
                description: "Hợp tác với hơn 10 doanh nghiệp công nghệ hàng đầu",
              },
            ].map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#004987]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-[#004987]" />
                </div>
                <h3 className="text-2xl font-bold text-[#004987] mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#004987] to-[#0070b8] text-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Tham gia cùng chúng tôi</h2>
            <p className="text-lg mb-8 text-white/80">
              Bạn muốn trở thành một phần của cộng đồng Blockchain UTC? Hãy đăng ký ngay hôm nay để bắt đầu hành trình
              khám phá công nghệ đột phá này!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join">
                <Button size="lg" className="bg-white text-[#004987] hover:bg-gray-100">
                  Đăng ký tham gia CLB
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Liên hệ với chúng tôi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
