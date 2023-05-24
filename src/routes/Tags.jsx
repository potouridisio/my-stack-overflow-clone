import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const tags = await fetch("/api/tags").then((res) => res.json());
  return tags;
}

export default function Tags() {
  const tags = useLoaderData();

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <h2 className="mb-[0.35em] text-2xl leading-[1.334] tracking-normal">
        {tags.map((tag) => (
          <div
            className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-[0.08] p-0 align-middle text-[0.8125rem] text-black text-opacity-[0.87] no-underline outline-0 hover:bg-opacity-[0.12]"
            role="button"
            tabIndex={0}
          >
            <Link
              to={`/questions/tagged/${tag.name}`}
              className="truncate px-3"
            >
              {tag.name}
            </Link>
          </div>
        ))}
      </h2>
    </main>
  );
}
