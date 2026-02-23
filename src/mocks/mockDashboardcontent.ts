import { DashboardData } from "@/types/dashboard";

export const DashboardContentsMockData: DashboardData = {
  labels: ["#태그1", "#태그2", "#태그3", "#태그4", "기타"],
  datasets: [
    {
      label: "시청 통계",
      data: [45, 25, 15, 10, 5],
      backgroundColor: ["#9d0037", "#f10059", "#ff768f", "#ffa4b2", "#ffecef"],
      borderColor: ["#9d0037", "#f10059", "#ff768f", "#ffa4b2", "#ffecef"],
      borderWidth: 0,
    },
  ],
  tagDetails: [
    // #태그1 상세 데이터
    {
      monthlyStats: { thisMonth: 30, lastMonth: 26 },
      recommendations: [
        { id: 101, image: "/images/recommendcontent_img.png" },
        { id: 102, image: "/images/recommendcontent_img.png" },
        { id: 103, image: "/images/recommendcontent_img.png" },
        { id: 104, image: "/images/recommendcontent_img.png" },
        { id: 105, image: "/images/recommendcontent_img.png" },
        { id: 106, image: "/images/recommendcontent_img.png" },
        { id: 107, image: "/images/recommendcontent_img.png" },
        { id: 108, image: "/images/recommendcontent_img.png" },
        { id: 109, image: "/images/recommendcontent_img.png" },
        { id: 110, image: "/images/recommendcontent_img.png" },
      ],
    },
    // #태그2 상세 데이터
    {
      monthlyStats: { thisMonth: 25, lastMonth: 20 },
      recommendations: [
        { id: 201, image: "/images/recommendcontent_img.png" },
        { id: 202, image: "/images/recommendcontent_img.png" },
        { id: 203, image: "/images/recommendcontent_img.png" },
        { id: 204, image: "/images/recommendcontent_img.png" },
        { id: 205, image: "/images/recommendcontent_img.png" },
        { id: 206, image: "/images/recommendcontent_img.png" },
        { id: 207, image: "/images/recommendcontent_img.png" },
        { id: 208, image: "/images/recommendcontent_img.png" },
        { id: 209, image: "/images/recommendcontent_img.png" },
        { id: 210, image: "/images/recommendcontent_img.png" },
      ],
    },
    // #태그3 상세 데이터
    {
      monthlyStats: { thisMonth: 15, lastMonth: 23 },
      recommendations: [
        { id: 301, image: "/images/recommendcontent_img.png" },
        { id: 302, image: "/images/recommendcontent_img.png" },
        { id: 303, image: "/images/recommendcontent_img.png" },
        { id: 304, image: "/images/recommendcontent_img.png" },
        { id: 305, image: "/images/recommendcontent_img.png" },
        { id: 306, image: "/images/recommendcontent_img.png" },
        { id: 307, image: "/images/recommendcontent_img.png" },
        { id: 308, image: "/images/recommendcontent_img.png" },
        { id: 309, image: "/images/recommendcontent_img.png" },
        { id: 310, image: "/images/recommendcontent_img.png" },
      ],
    },
    // #태그4 상세 데이터
    {
      monthlyStats: { thisMonth: 17, lastMonth: 26 },
      recommendations: [
        { id: 401, image: "/images/recommendcontent_img.png" },
        { id: 402, image: "/images/recommendcontent_img.png" },
        { id: 403, image: "/images/recommendcontent_img.png" },
        { id: 404, image: "/images/recommendcontent_img.png" },
        { id: 405, image: "/images/recommendcontent_img.png" },
        { id: 406, image: "/images/recommendcontent_img.png" },
        { id: 407, image: "/images/recommendcontent_img.png" },
        { id: 408, image: "/images/recommendcontent_img.png" },
        { id: 409, image: "/images/recommendcontent_img.png" },
        { id: 410, image: "/images/recommendcontent_img.png" },
      ],
    },
  ],
};
