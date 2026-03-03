import { Header, Footer } from "@layouts";
import { BackButton } from "@base-components";
import { SearchInput, SearchResult } from "@entities/search/components";

interface SearchPageProps {
  searchParams: Promise<{ keyword?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { keyword } = await searchParams;

  return (
    <>
      <Header />
      <div className="relative flex-1 px-36 flex flex-col gap-y-20">
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
