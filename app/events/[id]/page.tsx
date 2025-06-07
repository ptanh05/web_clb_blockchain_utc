"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  ArrowLeft,
  Share2,
  BookmarkPlus,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  EventResponse,
  ErrorResponse,
  Event,
  EventScheduleItem,
  EventSpeaker,
} from "@/app/api/events/types";

export default function EventDetailPage() {
  const params = useParams();
  // Assuming the parameter is the slug of the event
  const eventSlug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch event data by slug
  useEffect(() => {
    if (!eventSlug) {
      setError("Missing event slug");
      setIsLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Assuming the API endpoint for a single event by slug is /api/events/[slug]
        const response = await fetch(`/api/events/${eventSlug}`);

        if (response.ok) {
          const result: EventResponse = await response.json();
          setEvent(result.data || null);
        } else {
          const result: ErrorResponse = await response.json();
          throw new Error(result.error || "Failed to fetch event data");
        }

        // Note: Related events are not fetched by this endpoint.
        // We would need a separate API call or logic to get related events.
        // Removing related events section for now.
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        toast.error("Failed to load event data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventSlug]); // Re-fetch if eventSlug changes

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#004987] border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Đang tải thông tin sự kiện...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">Lỗi: {error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="text-[#004987] border-[#004987] hover:bg-[#004987] hover:text-white"
        >
          Thử lại
        </Button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Không tìm thấy sự kiện.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-[#004987] to-[#0070b8] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image || ""}
            alt={event.title}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#004987]/90 to-[#0070b8]/90" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/events">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 mb-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại danh sách sự kiện
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    event.status === "upcoming"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.status === "upcoming" ? "Sắp diễn ra" : "Đã kết thúc"}
                </span>
                <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                  {event.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center text-white/90">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center text-white/90">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{event.time}</span>
                  </div>
                )}
                <div className="flex items-center text-white/90">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="flex gap-4">
                {event.registrationLink && (
                  <Link href={event.registrationLink}>
                    <Button
                      size="lg"
                      className="bg-white text-[#004987] hover:bg-gray-100"
                    >
                      Đăng ký tham gia
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Chia sẻ
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                  Lưu lại
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-[#004987] mb-6">
                  Giới thiệu sự kiện
                </h2>
                <div className="prose max-w-none">
                  <p className="mb-4 text-gray-600">{event.description}</p>
                </div>

                {event.schedule && event.schedule.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold text-[#004987] mt-12 mb-6">
                      Lịch trình
                    </h2>
                    <div className="space-y-4">
                      {event.schedule.map(
                        (item: EventScheduleItem, index: number) => (
                          <div
                            key={index}
                            className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="w-32 flex-shrink-0">
                              <span className="text-sm font-medium text-[#004987]">
                                {item.time}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {item.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}

                {event.speakers && event.speakers.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold text-[#004987] mt-12 mb-6">
                      Diễn giả
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {event.speakers.map(
                        (speaker: EventSpeaker, index: number) => (
                          <div
                            key={index}
                            className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={speaker.image || ""}
                                alt={speaker.name}
                                fill
                                className="object-cover rounded-full"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {speaker.name}
                              </h3>
                              <p className="text-sm text-[#004987] mb-2">
                                {speaker.role}
                              </p>
                              <p className="text-sm text-gray-600">
                                {speaker.bio}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="sticky top-8"
              >
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-[#004987] mb-4">
                    Thông tin sự kiện
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Thời gian
                      </p>
                      <p className="text-gray-900">
                        {event.date} {event.time && `| ${event.time}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Địa điểm
                      </p>
                      <p className="text-gray-900">{event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Danh mục
                      </p>
                      <p className="text-gray-900">{event.category}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    {event.registrationLink && (
                      <Link href={event.registrationLink}>
                        <Button className="w-full bg-[#004987] text-white hover:bg-[#003d6d]">
                          Đăng ký tham gia
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
