import { Footer, Header } from "@/components/common";
import { SearchInput, SearchResult } from "@search";

interface SearchPageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword } = await searchParams;

  return (
    <>
      <Header />
      <div className="flex-1 mt-12 px-36 flex flex-col gap-y-20">
        <SearchInput keyword={keyword} />
        <SearchResult keyword={keyword} />
      </div>
      <Footer />
    </>
  );
}
