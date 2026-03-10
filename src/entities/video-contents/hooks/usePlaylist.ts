import { useQuery } from "@tanstack/react-query";
import { TrendingListApi } from "@entities/home/apis";
import { HistoryListApi } from "@entities/home/apis";
import { getTagsTopList } from "@entities/home/apis";
import { withdrawcontentsApi } from "@entities/withdraw-recommends/api";
import { PlaylistSource } from "@shared/types";
import { PlaylistResponse } from "@shared/types";
import { bookmarkApi } from "@/entities/bookmark/api";

export const parsePlaylistSource = (
  searchParams: URLSearchParams,
): PlaylistSource => {
  const playlist = searchParams.get("playlist");
  switch (playlist) {
    case "topTag":
      return {
        type: "topTag",
        index: Number(searchParams.get("index")) as 0 | 1 | 2,
      };
    case "search":
      return { type: "search", query: searchParams.get("query") ?? "" };
    case "history":
      return { type: "history" };
    case "bookmarks":
      return { type: "bookmarks" };
    case "recommend":
      return { type: "recommend" };
    default:
      return { type: "trending" };
  }
};

export const usePlaylist = (source: PlaylistSource, excludeMediaId: number) => {
  return useQuery({
    queryKey: ["playlist", source, excludeMediaId],
    queryFn: async (): Promise<PlaylistResponse> => {
      const baseParams = { excludeMediaId, page: 0, size: 20 };
      switch (source!.type) {
        case "trending":
          return TrendingListApi(baseParams) as Promise<PlaylistResponse>;
        case "recommend":
          return withdrawcontentsApi
            .getWithdrawRecommendsContents(baseParams)
            .then((res) => res.data.data as PlaylistResponse);
        case "topTag":
          return getTagsTopList({ ...baseParams, index: source!.index }).then(
            (res) => res.medias as unknown as PlaylistResponse,
          );
        case "history":
          return HistoryListApi(baseParams) as Promise<PlaylistResponse>;
        // case "bookmarks":
        //   return;
        // case "search": return;
        default:
          return TrendingListApi(baseParams) as Promise<PlaylistResponse>;
      }
    },
  });
};
