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
  const [showAll, setShowAll] = useState(false);

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
    <div className="min-h-screen bg-white text-black">
      <section className="py-20 md:py-32 text-center bg-white">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-[#004987]">
            Đội ngũ của chúng tôi
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
            {(showAll ? members : members.slice(0, 3)).map((member) => (
              <div
                key={member.id}
                className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-lg border border-blue-700"
              >
                <div className="w-32 h-32 rounded-full border-4 border-blue-700 overflow-hidden mb-4 flex items-center justify-center">
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover w-32 h-32"
                  />
                </div>
                <div className="text-lg font-semibold text-blue-500 mb-1 text-center">
                  {member.name}
                </div>
                <div className="uppercase text-sm text-gray-800 mb-2 text-center tracking-widest">
                  {member.role}
                </div>
                <div className="flex gap-4 mt-3">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5 text-gray-700 hover:text-blue-500 transition" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-gray-700 hover:text-blue-500 transition" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} aria-label="Email">
                      <Mail className="w-5 h-5 text-gray-700 hover:text-blue-500 transition" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {members.length > 3 && !showAll && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
                onClick={() => setShowAll(true)}
              >
                Xem thêm thành viên
              </button>
            </div>
          )}
          {showAll && (
            <div className="flex justify-center mt-8">
              <button
                className="px-6 py-2 rounded-lg bg-gray-200 text-blue-700 font-semibold hover:bg-gray-300 transition"
                onClick={() => setShowAll(false)}
              >
                Ẩn bớt
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
