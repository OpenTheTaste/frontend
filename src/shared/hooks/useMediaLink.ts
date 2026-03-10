import { MediaType, PlaylistSource } from "@shared/types";

export const useMediaLink = () => {
  const getMediaHref = (
    mediaId: number,
    mediaType: MediaType,
    playlistSource?: PlaylistSource,
  ) => {
    const type = mediaType === "SERIES" ? "SERIES" : "CONTENTS";
    const base = `/contents/${mediaId}?type=${type}`;

    if (!playlistSource || mediaType === "SERIES") return base;

    const params = new URLSearchParams();
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
        params.set("query", playlistSource.query);
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
    return `${base}&${params.toString()}`;
  };

  return { getMediaHref };
};
