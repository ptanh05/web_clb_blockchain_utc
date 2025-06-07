export type MediaType = "image" | "video" | "document";

export interface BaseMedia {
  id: number;
  title: string;
  type: MediaType;
  url: string;
  thumbnail: string;
  category: string;
  date: string;
  time: string;
  views: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface ImageMedia extends BaseMedia {
  type: "image";
  downloads: number;
  width: number;
  height: number;
  file_size: string;
}

export interface VideoMedia extends BaseMedia {
  type: "video";
  duration: string;
  thumbnail_time: string;
  platform: string;
  video_id: string;
}

export interface DocumentMedia extends BaseMedia {
  type: "document";
  downloads: number;
  file_size: string;
  file_type: string;
  page_count: number | null;
}

export type Media = ImageMedia | VideoMedia | DocumentMedia;

export interface MediaResponse {
  data: Media;
}

export interface MediaListResponse {
  data: Media[];
}

// Database types
export interface MediaDB {
  id: number;
  title: string;
  type: MediaType;
  url: string;
  thumbnail: string;
  category: string;
  date: string;
  time: string;
  views: number;
  tags: string;
  downloads: number | null;
  file_size: string | null;
  width: number | null;
  height: number | null;
  duration: string | null;
  thumbnail_time: string | null;
  platform: string | null;
  video_id: string | null;
  file_type: string | null;
  page_count: number | null;
  created_at: string;
  updated_at: string;
}

export interface ErrorResponse {
  error: string;
}

// Helper functions
export function convertDBMediaToMedia(dbMedia: MediaDB): Media {
  const baseMedia: BaseMedia = {
    id: dbMedia.id,
    title: dbMedia.title,
    type: dbMedia.type,
    url: dbMedia.url,
    thumbnail: dbMedia.thumbnail,
    category: dbMedia.category,
    date: dbMedia.date,
    time: dbMedia.time,
    views: dbMedia.views,
    tags: dbMedia.tags.split(','),
    created_at: dbMedia.created_at,
    updated_at: dbMedia.updated_at
  };

  switch (dbMedia.type) {
    case 'image':
      return {
        ...baseMedia,
        type: 'image',
        downloads: dbMedia.downloads || 0,
        width: dbMedia.width || 0,
        height: dbMedia.height || 0,
        file_size: dbMedia.file_size || '0 B'
      };
    case 'video':
      return {
        ...baseMedia,
        type: 'video',
        duration: dbMedia.duration || '0:00',
        thumbnail_time: dbMedia.thumbnail_time || '0:00',
        platform: dbMedia.platform || 'youtube',
        video_id: dbMedia.video_id || ''
      };
    case 'document':
      return {
        ...baseMedia,
        type: 'document',
        downloads: dbMedia.downloads || 0,
        file_size: dbMedia.file_size || '0 B',
        file_type: dbMedia.file_type || 'pdf',
        page_count: dbMedia.page_count
      };
  }
}

export function convertMediaToDBMedia(media: Media): MediaDB {
  const baseDBMedia: Partial<MediaDB> = {
    title: media.title,
    type: media.type,
    url: media.url,
    thumbnail: media.thumbnail,
    category: media.category,
    date: media.date,
    time: media.time,
    views: media.views,
    tags: media.tags.join(','),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  switch (media.type) {
    case 'image':
      return {
        ...baseDBMedia,
        downloads: media.downloads,
        file_size: media.file_size,
        width: media.width,
        height: media.height,
        duration: null,
        thumbnail_time: null,
        platform: null,
        video_id: null,
        file_type: null,
        page_count: null
      } as MediaDB;
    case 'video':
      return {
        ...baseDBMedia,
        downloads: null,
        file_size: null,
        width: null,
        height: null,
        duration: media.duration,
        thumbnail_time: media.thumbnail_time,
        platform: media.platform,
        video_id: media.video_id,
        file_type: null,
        page_count: null
      } as MediaDB;
    case 'document':
      return {
        ...baseDBMedia,
        downloads: media.downloads,
        file_size: media.file_size,
        width: null,
        height: null,
        duration: null,
        thumbnail_time: null,
        platform: null,
        video_id: null,
        file_type: media.file_type,
        page_count: media.page_count
      } as MediaDB;
  }
} 