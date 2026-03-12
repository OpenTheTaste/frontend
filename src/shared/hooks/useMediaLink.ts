// useMediaLink.ts

import { MediaType, PlaylistSource } from "@shared/types";

export const useMediaLink = () => {
  const getMediaHref = (
    mediaId: number,
    mediaType: MediaType,
    playlistSource?: PlaylistSource,
    commentId?: number,
  ) => {
    const type = mediaType === "SERIES" ? "SERIES" : "CONTENTS";
    const base = `/contents/${mediaId}?type=${type}`;

    const params = new URLSearchParams();

    if (playlistSource && mediaType !== "SERIES") {
      switch (playlistSource.type) {
        case "trending":
          params.set("playlist", "trending");
          break;
        case "topTag":
          params.set("playlist", "topTag");
          params.set("index", String(playlistSource.index));
          break;
        case "search":
          params.set("playlist", "search");
          break;
        case "recommend":
          params.set("playlist", "recommend");
          break;
        case "history":
          params.set("playlist", "history");
          break;
        case "bookmarks":
          params.set("playlist", "bookmarks");
          break;
      }
    }

    if (commentId) params.set("commentId", String(commentId));

    const query = params.toString();
    return query ? `${base}&${query}` : base;
  };

  return { getMediaHref };
};