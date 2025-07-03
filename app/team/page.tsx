"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Linkedin, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  AnimatedSection,
  AnimatedHeading,
  AnimatedDivider,
  AnimatedCard,
} from "@/components/ui/animated-section";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail } from "lucide-react";

// Định nghĩa type cho member
export type Member = {
  id: number;
  name: string;
  role: string;
  image_url: string;
  bio: string;
  achievements: string[];
  github: string;
  linkedin: string;
  email: string;
  team_name: string;
};

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<{ [team: string]: number }>(
    {}
  );
  const [modalTeam, setModalTeam] = useState<string | null>(null);
  const [modalPage, setModalPage] = useState(1);
  const membersPerPage = 9;
  const modalMembersPerPage = 12;

  // Fetch members từ API
  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data.data || []);
    };
    fetchMembers();
  }, []);

  // Danh sách thứ tự ban ưu tiên
  const teamOrder = [
    "Ban Cố vấn",
    "Ban Chủ nhiệm",
    "Ban Chuyên môn",
    "Ban Truyền thông",
    "Ban Hậu cần",
  ];

  // Lấy danh sách các ban từ dữ liệu members, giữ thứ tự ưu tiên, các ban khác xếp sau
  const allTeams = Array.from(new Set(members.map((m) => m.team_name)));
  const teams = [
    ...teamOrder.filter((t) => allTeams.includes(t)),
    ...allTeams.filter((t) => !teamOrder.includes(t)),
  ];

  // Nhóm thành viên theo team_name
  const membersByTeam: { [team: string]: Member[] } = {};
  teams.forEach((team) => {
    membersByTeam[team] = members.filter((m) => m.team_name === team);
  });

  // Lọc theo search cho từng ban
  const filteredMembersByTeam: { [team: string]: Member[] } = {};
  teams.forEach((team) => {
    filteredMembersByTeam[team] = membersByTeam[team].filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.bio.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Phân trang cho từng ban
  const paginatedMembersByTeam: { [team: string]: Member[] } = {};
  teams.forEach((team) => {
    const page = currentPage[team] || 1;
    paginatedMembersByTeam[team] = filteredMembersByTeam[team].slice(
      (page - 1) * membersPerPage,
      page * membersPerPage
    );
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#004987] to-[#0070b8] text-white">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <AnimatedHeading className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Đội ngũ của chúng tôi
            </AnimatedHeading>
            <AnimatedDivider className="w-24 h-1 bg-white mx-auto mb-8" />
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Gặp gỡ những người đang xây dựng và phát triển cộng đồng
              Blockchain Pioneer Student
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search */}
      <div className="container px-4 md:px-6 mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Tìm kiếm thành viên..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004987] focus:border-transparent"
        />
      </div>

      {/* Hiển thị từng ban */}
      {teams.map((team) => {
        const totalPages = Math.ceil(
          filteredMembersByTeam[team].length / membersPerPage
        );
        const page = currentPage[team] || 1;
        const teamMembers = paginatedMembersByTeam[team];
        const showMore = filteredMembersByTeam[team].length > 2;
        const representatives = teamMembers.slice(0, 3);
        return (
          <section key={team} className="py-16 md:py-24 bg-white border-b">
            <div className="container px-4 md:px-6">
              <AnimatedSection className="text-center mb-12">
                <AnimatedHeading className="text-2xl md:text-3xl font-bold text-[#004987] mb-4">
                  {team}
                </AnimatedHeading>
                <AnimatedDivider />
              </AnimatedSection>
              {representatives.length === 0 ? (
                <div className="text-center text-gray-400 italic py-8">
                  Chưa có thành viên
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                  {representatives.map((member) => (
                    <AnimatedCard
                      key={member.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                          <Image
                            src={member.image_url}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-semibold text-[#004987] mb-1">
                              {member.name}
                            </h3>
                            <p className="text-gray-600 mb-3">{member.role}</p>
                            <p className="text-sm text-gray-600 mb-4">
                              {member.bio}
                            </p>
                          </div>
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-[#004987] mb-2">
                              Thành tích nổi bật:
                            </h4>
                            <ul className="space-y-1">
                              {Array.isArray(member.achievements) &&
                              member.achievements.length > 0 ? (
                                member.achievements.map(
                                  (achievement: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-start text-sm text-gray-600"
                                    >
                                      <span className="w-1.5 h-1.5 bg-[#004987] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                      <span>
                                        {String(achievement ?? "").trim()}
                                      </span>
                                    </li>
                                  )
                                )
                              ) : typeof member.achievements === "string" &&
                                String(member.achievements).trim() !== "" ? (
                                String(member.achievements)
                                  .split(/;|,|\n/)
                                  .map((achievement: string, index: number) => (
                                    <li
                                      key={index}
                                      className="flex items-start text-sm text-gray-600"
                                    >
                                      <span className="w-1.5 h-1.5 bg-[#004987] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                      <span>
                                        {String(achievement ?? "").trim()}
                                      </span>
                                    </li>
                                  ))
                              ) : (
                                <li className="text-gray-400 italic">
                                  Chưa có thành tích
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="flex gap-3 mt-4">
                            <Link
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Github className="w-4 h-4 text-[#004987]" />
                              </motion.div>
                            </Link>
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Linkedin className="w-4 h-4 text-[#004987]" />
                              </motion.div>
                            </Link>
                            <Link href={member.email}>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                              >
                                <Mail className="w-4 h-4 text-[#004987]" />
                              </motion.div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              )}
              {/* Nút xem thêm thành viên */}
              {showMore && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white transition-all duration-300"
                    onClick={() => {
                      setModalTeam(team);
                      setModalPage(1);
                    }}
                  >
                    Xem thêm thành viên
                  </Button>
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* Modal hiển thị toàn bộ thành viên của ban */}
      <AnimatePresence>
        {modalTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setModalTeam(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#004987]">
                  {modalTeam} - Danh sách thành viên
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setModalTeam(null)}
                  className="text-gray-500 hover:text-black"
                >
                  Đóng
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembersByTeam[modalTeam]
                      ?.slice(
                        (modalPage - 1) * modalMembersPerPage,
                        modalPage * modalMembersPerPage
                      )
                      .map((member) => (
                        <AnimatedCard
                          key={member.id}
                          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex flex-col md:flex-row">
                            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
                              <Image
                                src={member.image_url}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="mb-4">
                                <h3 className="text-xl font-semibold text-[#004987] mb-1">
                                  {member.name}
                                </h3>
                                <p className="text-gray-600 mb-3">
                                  {member.role}
                                </p>
                                <p className="text-sm text-gray-600 mb-4">
                                  {member.bio}
                                </p>
                              </div>
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold text-[#004987] mb-2">
                                  Thành tích nổi bật:
                                </h4>
                                <ul className="space-y-1">
                                  {Array.isArray(member.achievements) &&
                                  member.achievements.length > 0 ? (
                                    member.achievements.map(
                                      (achievement: string, index: number) => (
                                        <li
                                          key={index}
                                          className="flex items-start text-sm text-gray-600"
                                        >
                                          <span className="w-1.5 h-1.5 bg-[#004987] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                          <span>
                                            {String(achievement ?? "").trim()}
                                          </span>
                                        </li>
                                      )
                                    )
                                  ) : typeof member.achievements === "string" &&
                                    String(member.achievements).trim() !==
                                      "" ? (
                                    String(member.achievements)
                                      .split(/;|,|\n/)
                                      .map(
                                        (
                                          achievement: string,
                                          index: number
                                        ) => (
                                          <li
                                            key={index}
                                            className="flex items-start text-sm text-gray-600"
                                          >
                                            <span className="w-1.5 h-1.5 bg-[#004987] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                            <span>
                                              {String(achievement ?? "").trim()}
                                            </span>
                                          </li>
                                        )
                                      )
                                  ) : (
                                    <li className="text-gray-400 italic">
                                      Chưa có thành tích
                                    </li>
                                  )}
                                </ul>
                              </div>
                              <div className="flex gap-3 mt-4">
                                <Link
                                  href={member.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                  >
                                    <Github className="w-4 h-4 text-[#004987]" />
                                  </motion.div>
                                </Link>
                                <Link
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                  >
                                    <Linkedin className="w-4 h-4 text-[#004987]" />
                                  </motion.div>
                                </Link>
                                <Link href={member.email}>
                                  <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                                  >
                                    <Mail className="w-4 h-4 text-[#004987]" />
                                  </motion.div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </AnimatedCard>
                      ))}
                  </div>
                  {/* Pagination cho modal */}
                  {filteredMembersByTeam[modalTeam] &&
                    filteredMembersByTeam[modalTeam].length >
                      modalMembersPerPage && (
                      <div className="flex justify-center items-center gap-2 mt-8">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setModalPage((p) => Math.max(1, p - 1))
                          }
                          disabled={modalPage === 1}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Trước
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from(
                            {
                              length: Math.ceil(
                                filteredMembersByTeam[modalTeam].length /
                                  modalMembersPerPage
                              ),
                            },
                            (_, i) => i + 1
                          ).map((p) => (
                            <Button
                              key={p}
                              variant={modalPage === p ? "default" : "outline"}
                              size="sm"
                              onClick={() => setModalPage(p)}
                              className="w-8 h-8"
                            >
                              {p}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setModalPage((p) =>
                              Math.min(
                                Math.ceil(
                                  filteredMembersByTeam[modalTeam].length /
                                    modalMembersPerPage
                                ),
                                p + 1
                              )
                            )
                          }
                          disabled={
                            modalPage ===
                            Math.ceil(
                              filteredMembersByTeam[modalTeam].length /
                                modalMembersPerPage
                            )
                          }
                          className="flex items-center gap-1"
                        >
                          Sau
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section ở cuối trang */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-[#004987] to-[#0070b8] text-white text-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Muốn trở thành một phần của đội ngũ?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Chúng tôi luôn tìm kiếm những tài năng trẻ đam mê công nghệ
            Blockchain và Web3. Hãy tham gia cùng chúng tôi để xây dựng tương
            lai của công nghệ!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-[#004987] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Đăng ký tham gia
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-[#004987] hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Liên hệ với chúng tôi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
