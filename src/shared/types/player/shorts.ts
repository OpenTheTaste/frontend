export interface ContentLink {
  title: string;
  url: string;
  editor: string;
  date: string;
}

export interface ShortsData {
  id: number;
  src: string;
  contentLink: ContentLink;
}

export interface ShortsContainerProps {
  initialData: ShortsData[];
}