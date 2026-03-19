import { Footer, Header } from "@layouts";
import { SearchInput, SearchResult } from "@entities/search/components";
import { BackButton } from "@shared/components";

interface SearchPageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword } = await searchParams;

  return (
    <>
      <Header />
      <div className="relative flex flex-1 flex-col gap-y-20 px-36">
        <div>
          <BackButton />
        </div>
        <SearchInput keyword={keyword} />
        <SearchResult keyword={keyword} />
      </div>
      <Footer />
    </>
  );
}
