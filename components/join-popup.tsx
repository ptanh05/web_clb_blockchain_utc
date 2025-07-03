import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function JoinPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nút chính */}
      <Button
        size="lg"
        variant="outline"
        onClick={() => setOpen(true)}
        className="bg-white text-[#004987] hover:text-black hover:bg-gray-100 transition-all duration-300 hover:scale-105"
      >
        <span className="relative z-10 flex items-center gap-2 font-semibold">
          Click đi ngại gì
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white via-white/80 to-white/20"></span>
      </Button>

      {/* Popup khung bo góc */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl border border-blue-400 shadow-[0_0_25px_#00f0ff] animate-fadeIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-4 text-gray-400 hover:text-black text-2xl font-bold"
              aria-label="Đóng"
            >
              &times;
            </button>

            {/* Nội dung bên trong */}
            <div className="text-gray-800 space-y-4">
              <h2 className="text-xl font-bold text-blue-700 text-center">
                🤖 Xin chào bạn đến với Blockchain Pioneer Student!
              </h2>
              <p className="text-center">
                Chúng mình là cộng đồng sinh viên đam mê Blockchain & Web3!
              </p>
              <div className="space-y-1">
                <p>🔥 Bạn muốn:</p>
                <ul className="list-decimal pl-5 text-left">
                  <li>Tham gia ngay cộng đồng?</li>
                  <li>Xem lại những hoạt động gần nhất?</li>
                  <li>Kết nối với đội ngũ?</li>
                </ul>
              </div>
              <p className="text-center">
                👉 Chọn một hành động bên dưới hoặc nhắn chúng mình qua{" "}
                <a
                  href="https://www.facebook.com/bpsclub.utc"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Facebook
                </a>
                !
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
