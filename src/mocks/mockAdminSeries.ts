import { Category } from "@/types/category";

export interface AdminSeries {
    id: number;
    thumbnail: string;
    title: string;
    category: Category;
    tags: string[];
    isPublic: boolean;
}

export const mockAdminSeries: AdminSeries[] = [
    {
        id: 1,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 2,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "영화",
        tags: ["로맨스"],
        isPublic: true,
    },
    {
        id: 3,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 4,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 5,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 6,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 7,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 8,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 9,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
    {
        id: 10,
        thumbnail: "/images/recent_img.png",
        title: "더 글로리",
        category: "드라마",
        tags: ["스릴러"],
        isPublic: true,
    },
]