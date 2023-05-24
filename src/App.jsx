import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";

export default function App() {
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
            <div className="relative box-border inline-flex cursor-text items-center leading-[1.4375em] tracking-[0.00938em] text-inherit">
              <input
                className="m-0 box-content block h-[1.4375em] w-full min-w-0 border-0 p-2 pl-[calc(1em_+_32px)] tracking-[inherit] text-current [background:none] [font:inherit] placeholder:!block placeholder:text-current placeholder:opacity-[0.42] focus:outline-0"
                placeholder="Search…"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="w-60 flex-none shrink-0">
        <div className="fixed left-0 top-0 z-[1200] box-border flex h-full w-60 flex-col overflow-y-auto border-r border-r-black border-opacity-[0.12] bg-white text-black text-opacity-[0.87] shadow-none outline-0">
          <div className="relative flex min-h-[4rem] items-center px-6" />

          <div className="overflow-auto">
            <ul className="relative m-0 list-none p-0 py-2">
              <li className="sticky top-0 z-[1] box-border list-none bg-white px-4 text-sm font-medium leading-[48px] text-black text-opacity-60">
                Public
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <div
                  className="relative m-0 box-border flex min-w-0 grow cursor-pointer select-none appearance-none items-center justify-start rounded-none border-0 bg-[rgba(25,_118,_210,_0.08)] p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 hover:bg-[rgba(25,_118,_210,_0.12)] hover:no-underline"
                  role="button"
                  tabIndex={0}
                >
                  <div className="inline-flex min-w-[56px] shrink-0 text-black text-opacity-[0.54]">
                    <GlobeAmericasIcon className="inline-block h-[1em] w-[1em] shrink-0 select-none fill-current text-2xl" />
                  </div>
                  <div className="my-1 min-w-0 flex-auto">
                    <span className="m-0 block leading-normal tracking-[0.00938em]">
                      Questions
                    </span>
                  </div>
                </div>
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <div
                  className="relative m-0 box-border flex min-w-0 grow cursor-pointer select-none appearance-none items-center justify-start rounded-none border-0 bg-transparent p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 hover:bg-black hover:bg-opacity-[0.04] hover:no-underline"
                  role="button"
                  tabIndex={0}
                >
                  <div className="my-1 min-w-0 flex-auto pl-14">
                    <span className="m-0 block leading-normal tracking-[0.00938em]">
                      Tags
                    </span>
                  </div>
                </div>
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <div
                  className="relative m-0 box-border flex min-w-0 grow cursor-pointer select-none appearance-none items-center justify-start rounded-none border-0 bg-transparent p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 hover:bg-black hover:bg-opacity-[0.04] hover:no-underline"
                  role="button"
                  tabIndex={0}
                >
                  <div className="my-1 min-w-0 flex-auto pl-14">
                    <span className="m-0 block leading-normal tracking-[0.00938em]">
                      Users
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="grow p-6">
        {/*  */}
        {/*  */}
      </main>
    </div>
  );
}
