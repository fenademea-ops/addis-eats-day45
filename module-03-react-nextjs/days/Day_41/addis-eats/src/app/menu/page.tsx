import SearchBox from "./SearchBox";
import DishList from "./DishList";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const params = await searchParams;
  const pageParam = Array.isArray(params.page)
    ? params.page[0]
    : params.page;
  const requestedPage = Number(pageParam ?? "1");
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Addis Eats Menu
      </h1>

      <SearchBox />
      <DishList page={page} />
    </main>
  );
}