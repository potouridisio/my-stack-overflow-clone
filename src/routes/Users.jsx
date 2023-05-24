import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const [tags, users] = await Promise.all([
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { tags, users };
}

export default function Users() {
  const { tags, users } = useLoaderData();

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <h2 className="mb-[0.35em] text-2xl leading-[1.334] tracking-normal">
        Users
      </h2>

      {users.map((user) => (
        <div className="mb-3 overflow-hidden rounded border bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
          <div className="p-4 ">
            <h1 className="text-xl">{user.name}</h1>
            <p className="font-bold">{user.location}</p>
            <p className="mb-2">{user.reputation}</p>
            {tags
              .filter((tag) => user.tags.includes(tag.id))
              .map((tag) => (
                <Link
                  to={`/questions/tagged/${tag.name}`}
                  className="mr-2 rounded border  p-1"
                >
                  {tag.name}{" "}
                </Link>
              ))}
          </div>
        </div>
      ))}
    </main>
  );
}
