import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  MessageCircle,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#004987] text-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 w-full bg-[#004987] pt-4 pb-0">
              <Image
                src="/logo2.png"
                alt="Blockchain Pioneer Student Logo"
                width={180}
                height={0}
                style={{ height: "auto" }}
              />
            </div>
            <p className="text-white/80 text-sm">
              Câu lạc bộ tiên phong phát triển lĩnh vực Blockchain trong cộng
              đồng sinh viên Việt Nam.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/bpsclub.utc"
                target="_blank"
                className="hover:text-white/80"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/106421064/"
                target="_blank"
                className="hover:text-white/80"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" target="_blank" className="hover:text-white/80">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </Link>

              <Link
                href="https://x.com/bps_club"
                target="_blank"
                className="hover:text-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1200 1227"
                  className="h-4 w-4 mt-0.5 fill-current"
                >
                  <path d="M1101 0H891L600 428 309 0H0l480 678L0 1227h309l291-428 291 428h309L720 678z" />
                </svg>
                <span className="sr-only">X (Twitter)</span>
              </Link>

              <Link
                href="https://www.youtube.com/@BlockchainPioneerStudent"
                target="_blank"
                className="hover:text-white/80"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/80 hover:text-white">
                  Sự kiện 
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-white/80 hover:text-white">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-white/80 hover:text-white">
                  Thư viện
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-white/80 hover:text-white"
                >
                  Đối tác
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-white/80 hover:text-white">
                  Thành viên
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Tham gia</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/join" className="text-white/80 hover:text-white">
                  Đăng ký thành viên
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/80 hover:text-white">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span className="text-white/80">
                  Blockchain Labs, Trường Đại Học Giao Thông Vận Tải, Số 03 Cầu
                  Giấy, Phường Láng, Thành phố Hà Nội
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <Link
                  href="mailto:blockchainutc@gmail.com"
                  className="text-white/80 hover:text-white"
                >
                  blockchainutc@gmail.com
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <Link
                  href="tel:+84325045633"
                  className="text-white/80 hover:text-white"
                >
                  +84325045633
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm">
          <p>
            © {new Date().getFullYear()} Blockchain Pioneer Student. Tất cả các
            quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
