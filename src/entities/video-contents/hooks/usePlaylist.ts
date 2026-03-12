import { useInfiniteQuery } from "@tanstack/react-query";
import { bookmarkPlaylistApi } from "@entities/bookmark/api";
import {
  getTagsTopList,
  historyListApi,
  trendingListApi,
} from "@entities/home/apis";
import { searchPlaylistApi } from "@entities/search/api";
import { withdrawcontentsApi } from "@entities/withdraw-recommends/api";
import { PlaylistSource } from "@shared/types";
import { PlaylistResponse } from "@shared/types";

export const parsePlaylistSource = (
  searchParams: URLSearchParams,
): PlaylistSource => {
  const playlist = searchParams.get("playlist");
  switch (playlist) {
    case "topTag":
      const rawIndex = Number(searchParams.get("index"));
      const index = [0, 1, 2].includes(rawIndex) ? (rawIndex as 0 | 1 | 2) : 0;
      return {
        type: "topTag",
        index: index,
      };
    case "search":
      return { type: "search" };
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
  const query = useInfiniteQuery({
    queryKey: ["playlist", source, excludeMediaId],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }): Promise<PlaylistResponse> => {
      const baseParams = { excludeMediaId, page: pageParam, size: 20 };
      switch (source.type) {
        case "trending":
          return trendingListApi(baseParams) as Promise<PlaylistResponse>;
        case "recommend":
          return withdrawcontentsApi
            .getWithdrawRecommendsContents(baseParams)
            .then((res) => res.data.data as PlaylistResponse);
        case "topTag": {
          return getTagsTopList({ ...baseParams, index: source.index }).then(
            (res) => res.medias as PlaylistResponse,
          );
        }
        case "history":
          return historyListApi(baseParams) as Promise<PlaylistResponse>;
        case "bookmarks":
          return bookmarkPlaylistApi(baseParams) as Promise<PlaylistResponse>;
        case "search":
          return searchPlaylistApi(baseParams) as Promise<PlaylistResponse>;
        default:
          return trendingListApi(baseParams) as Promise<PlaylistResponse>;
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.dataList || lastPage.dataList.length === 0)
        return undefined;
      return lastPage.pageInfo.currentPage + 1 < lastPage.pageInfo.totalPage
        ? lastPage.pageInfo.currentPage + 1
        : undefined;
    },
  });

  const rawItems = query.data?.pages.flatMap((page) => page.dataList) ?? [];
  const items = rawItems.filter(
    (item, index, self) =>
      self.findIndex((i) => i.mediaId === item.mediaId) === index,
  );

  return { ...query, items };
};
