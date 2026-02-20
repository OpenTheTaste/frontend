export interface ContentLink {
  title: string;
  url: string;
  editor: string;
  date: string;
}

export interface ShortsData {
  id: string;
  src: string;
  contentLink: ContentLink;
}

export interface ShortsContainerProps {
  initialData: ShortsData[];
}