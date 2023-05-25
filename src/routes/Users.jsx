import { useLoaderData } from "react-router";

import { indexBy } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const [tags, users] = await Promise.all([
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { tags: indexBy(tags, "id"), users };
}

export default function Users() {
  const { tags, users } = useLoaderData();

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            Users
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]"
            key={user.id}
          >
            <div className="p-4">
              <div className="m-0 text-2xl leading-[1.334] tracking-normal">
                {user.name}
              </div>
              <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                {user.location}
              </p>
              <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
                {user.reputation}
              </p>
            </div>

            <div className="flex items-center p-2">
              <div className="flex flex-row space-x-2">
                {user.tagIds.map((tagId) => (
                  <div
                    className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-[0.08] p-0 align-middle text-[0.8125rem] text-black text-opacity-[0.87] no-underline outline-0 hover:bg-opacity-[0.12]"
                    key={tagId}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="truncate px-3">{tags[tagId].name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
