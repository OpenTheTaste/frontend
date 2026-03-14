export interface ContentLink {
  title: string;
  url: string;
  editor: string;
  date: string;
}

import { MediaType } from "@shared/types";

export interface ShortsData {
  id: number;
  src: string;
  isLiked: boolean;
  isBookmarked: boolean;
  originMediaId: number;
  mediaType: MediaType;
  contentLink: ContentLink;
}

export interface ShortsContainerProps {
  initialData: ShortsData[];
}