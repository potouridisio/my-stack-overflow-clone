import { Outlet, Link, useLoaderData } from "react-router-dom";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Root() {
  return (
    <div className="flex">
      {/* Header */}
      <header className="fixed left-auto right-0 top-0 z-[1201] box-border flex w-full shrink-0 flex-col bg-[#1976d2] text-white shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.2),_0px_4px_5px_0px_rgba(0,_0,_0,_0.14),_0px_1px_10px_0px_rgba(0,_0,_0,_0.12)]">
        <div className="relative flex min-h-[4rem] items-center px-6">
          <div className="m-0 truncate text-xl font-medium leading-[1.6] tracking-[0.0075em]">
            Stack Overflow Clone
          </div>

          {/* Search */}
          <div className="relative ml-6 mr-4 w-auto rounded bg-white bg-opacity-[0.15] hover:bg-opacity-[0.25]">
            <div className="pointer-events-none absolute flex h-full items-center justify-center px-4">
              <MagnifyingGlassIcon className="inline-block h-[1em] w-[1em] shrink-0 select-none stroke-current text-2xl" />
            </div>

            <Link
              to="search"
              className="relative box-border inline-flex cursor-text items-center leading-[1.4375em] tracking-[0.00938em] text-inherit"
            >
              <form>
                <input
                  className="m-0 box-content block h-[1.4375em] w-full min-w-0 border-0 p-2 pl-[calc(1em_+_32px)] tracking-[inherit] text-current [background:none] [font:inherit] placeholder:!block placeholder:text-current placeholder:opacity-[0.42] focus:outline-0"
                  placeholder="Search…"
                  name="q"
                />
              </form>
            </Link>
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
