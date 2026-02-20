'use client';

import { Link } from "lucide-react";

interface ShortsInformationProps {
  contentLink: {
    title: string;
    url: string;
    editor: string;
    date: string;
  };
  onContentLinkClick: () => void;
}

export const ShortsInformation = ({
  contentLink,
  onContentLinkClick,
}: ShortsInformationProps) => {
  return (
    <div className="bg-ot-background rounded-lg">
      <div 
        className="p-3 bg-ot-gray-800 rounded-lg hover:bg-ot-gray-700 transition cursor-pointer"
        onClick={onContentLinkClick}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-ot-primary-500 rounded text-white text-xs font-bold">
            <Link size={12} />
            <span>원본</span>
          </div>
        </div>

        <h3 className="text-white font-bold text-xs mb-2 line-clamp-2">
          {contentLink.title}
        </h3>

        <div className="flex items-center gap-2 text-ot-gray-400 text-xs">
          <span>{contentLink.editor}</span>
          <span>|</span>
          <span>{contentLink.date}</span>
        </div>
      </div>
    </div>
  );
};