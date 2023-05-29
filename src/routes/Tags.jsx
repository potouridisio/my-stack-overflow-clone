import { useLoaderData, useSearchParams } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ request }) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab");

  let sortBy = "";

  switch (tab) {
    case "popular":
      sortBy = "popularity";
      break;
    case "name":
      sortBy = "name";
      break;
    case "new":
      sortBy = "latest";
      break;
  }

  return fetch(`/api/tags${tab ? `?sortBy=${sortBy}` : ""}`);
}

export default function Tags() {
  const tags = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            Tags {tab}
          </div>
        </div>
      </div>

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center justify-end">
          <div className="inline-flex rounded" role="group">
            <button
              className={`relative m-0 box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-br-none rounded-tr-none border border-solid border-black border-opacity-[0.12]${
                // eslint-disable-next-line no-constant-condition
                tab === "popular" ? " bg-[rgba(25,_118,_210,_0.08)]" : ""
              } p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em]${
                // eslint-disable-next-line no-constant-condition
                tab === "popular" ? " text-[rgb(25,_118,_210)]" : ""
              } no-underline outline-0 ${
                // eslint-disable-next-line no-constant-condition
                tab === "popular"
                  ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
                  : "hover:bg-[rgba(0,_0,_0,_0.04)]"
              } hover:no-underline`}
              type="button"
              onClick={() => setSearchParams({ tab: "popular" })}
            >
              Popular
            </button>
            <button
              className={`relative m-0 box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-br-none rounded-tr-none border border-solid border-black border-opacity-[0.12]${
                // eslint-disable-next-line no-constant-condition
                tab === "name" ? " bg-[rgba(25,_118,_210,_0.08)]" : ""
              } p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em]${
                // eslint-disable-next-line no-constant-condition
                tab === "name" ? " text-[rgb(25,_118,_210)]" : ""
              } no-underline outline-0 ${
                // eslint-disable-next-line no-constant-condition
                tab === "name"
                  ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
                  : "hover:bg-[rgba(0,_0,_0,_0.04)]"
              } hover:no-underline`}
              type="button"
              onClick={() => setSearchParams({ tab: "name" })}
            >
              Name
            </button>
            <button
              className={`relative m-0 box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-br-none rounded-tr-none border border-solid border-black border-opacity-[0.12]${
                // eslint-disable-next-line no-constant-condition
                tab === "new" ? " bg-[rgba(25,_118,_210,_0.08)]" : ""
              } p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em]${
                // eslint-disable-next-line no-constant-condition
                tab === "new" ? " text-[rgb(25,_118,_210)]" : ""
              } no-underline outline-0 ${
                // eslint-disable-next-line no-constant-condition
                tab === "new"
                  ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
                  : "hover:bg-[rgba(0,_0,_0,_0.04)]"
              } hover:no-underline`}
              type="button"
              onClick={() => setSearchParams({ tab: "new" })}
            >
              New
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div
            className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]"
            key={tag.id}
          >
            <div className="p-4">
              <div
                className="relative m-0 mb-3 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-[0.08] p-0 align-middle text-[0.8125rem] text-black text-opacity-[0.87] no-underline outline-0 hover:bg-opacity-[0.12]"
                role="button"
                tabIndex={0}
              >
                <span className="truncate px-3">{tag.name}</span>
              </div>

              <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                {tag.description}
              </p>

              <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
                {tag.occurrenceCount} question
                {tag.occurrenceCount === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
