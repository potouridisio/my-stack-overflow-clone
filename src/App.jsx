import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon } from "@heroicons/react/24/solid";

export default function App() {
  return (
    <div className="flex">
      {/* Header */}
      <header className="fixed left-auto right-0 top-0 z-50 box-border flex w-full shrink-0 flex-col bg-blue-500 text-white shadow-lg">
        <div className="relative flex h-16 items-center px-6">
          <div className="m-0 truncate text-xl font-medium leading-relaxed tracking-wide">
            My Stack Overflow Clone
          </div>

          <div className="relative ml-6 w-auto rounded bg-white bg-opacity-20 hover:bg-opacity-30">
            <div className="pointer-events-none absolute flex h-full items-center justify-center px-4">
              <MagnifyingGlassIcon className="inline-block h-6 w-6 shrink-0 select-none" />
            </div>
            <div className="relative box-border inline-flex cursor-text items-center leading-snug tracking-wide text-inherit">
              <input
                className="m-0 box-content block h-6 w-60 min-w-0 border-0 p-2 pl-[calc(1em_+_32px)] tracking-[inherit] text-current [background:none] [font:inherit] placeholder:!block placeholder:text-current placeholder:opacity-50 focus:outline-0"
                placeholder="Search..."
                type="text"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="w-60 flex-none shrink-0">
        <div className="fixed left-0 top-0 z-40 box-border flex h-full w-60 flex-col overflow-y-auto border-r border-r-black border-opacity-10 bg-white text-black outline-0">
          <div className="relative flex h-16 items-center px-6" />

          <div className="overflow-auto">
            <ul className="relative m-0 list-none p-0 py-2">
              <li className="sticky top-0 z-10 box-border list-none bg-white px-4 text-sm font-medium leading-10 text-black text-opacity-60">
                Public
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <div
                  className="relative m-0 box-border flex min-w-0 grow cursor-pointer select-none items-center justify-start rounded-none border-0 bg-blue-500 bg-opacity-10 p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 hover:bg-blue-500 hover:bg-opacity-20"
                  role="button"
                  tabIndex={0}
                >
                  <div className="inline-flex min-w-[3.5rem] shrink-0 text-black text-opacity-50">
                    <GlobeAmericasIcon className="inline-block h-6 w-6 shrink-0 select-none" />
                  </div>
                  <div className="my-1 min-w-0 flex-auto">
                    <span className="m-0 block tracking-wide">Questions</span>
                  </div>
                </div>
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <div
                  className="relative m-0 box-border flex min-w-0 grow cursor-pointer select-none items-center justify-start rounded-none border-0 bg-transparent p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 hover:bg-black hover:bg-opacity-5"
                  role="button"
                  tabIndex={0}
                >
                  <div className="my-1 min-w-0 flex-auto pl-14">
                    <span className="m-0 block tracking-wide">Tags</span>
                  </div>
                </div>
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <div
                  className="relative m-0 box-border flex min-w-0 grow cursor-pointer select-none items-center justify-start rounded-none border-0 bg-transparent p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 hover:bg-black hover:bg-opacity-5"
                  role="button"
                  tabIndex={0}
                >
                  <div className="my-1 min-w-0 flex-auto pl-14">
                    <span className="m-0 block tracking-wide">Users</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="grow p-6">
        <div className="relative flex h-16 items-center px-6" />

        <div className="static box-border flex w-full flex-col bg-transparent text-inherit shadow-none">
          <div className="relative flex h-16 items-center">
            <div className="m-0 grow truncate text-xl font-medium leading-relaxed tracking-wide">
              All Questions
            </div>

            <button
              className="relative  m-0 box-border inline-flex min-w-[4rem] cursor-pointer select-none appearance-none items-center justify-center rounded border-0 border-current bg-transparent px-2 py-1.5 align-middle text-sm font-medium uppercase leading-relaxed tracking-wide text-inherit no-underline outline-0 hover:bg-black hover:bg-opacity-5 hover:no-underline"
              tabIndex={0}
              type="button"
            >
              Ask Question
            </button>
          </div>
        </div>

        <div className="static box-border flex w-full flex-col bg-transparent text-inherit shadow-none">
          <div className="relative flex h-16 items-center">
            <div className="m-0 grow truncate font-medium leading-relaxed tracking-wide">
              1 question
            </div>

            <div className="inline-flex rounded" role="group">
              <button
                className="relative m-0 box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-br-none rounded-tr-none border border-black border-opacity-10 bg-blue-500 bg-opacity-10 p-3 align-middle text-sm font-medium uppercase leading-relaxed tracking-wide text-blue-500 no-underline outline-0 hover:bg-blue-500 hover:bg-opacity-20"
                tabIndex={0}
                type="button"
              >
                Newest
              </button>

              <button
                className="border-bl-none relative m-0 -ml-px box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-tl-none border border-black border-l-transparent border-opacity-10 bg-transparent p-3 align-middle text-sm font-medium uppercase leading-relaxed tracking-wide text-black text-opacity-50 no-underline outline-0 hover:bg-black hover:bg-opacity-5 hover:no-underline"
                tabIndex={0}
                type="button"
              >
                Unanswered
              </button>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col space-y-4">
            {/* Question  */}
            <div className="overflow-hidden rounded bg-white text-black text-opacity-90 shadow">
              <div className="p-4">
                <p className="mb-1.5 text-sm leading-normal tracking-wide text-black text-opacity-60">
                  10 votes
                  <span className="mx-0.5 inline-block scale-90">•</span>5
                  answers
                </p>
                <div className="m-0 mb-1.5 text-2xl leading-tight tracking-normal">
                  How to loop through an array in JavaScript?
                </div>
                <p className="m-0 text-sm leading-snug tracking-wide text-black text-opacity-60">
                  I have an array of items and need to iterate over them. What
                  is the best way to achieve this?
                </p>
              </div>
              <div className="flex items-center p-2">
                <div className="flex flex-row space-x-2">
                  <div
                    className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-10 p-0 align-middle text-sm text-black text-opacity-90 no-underline outline-0 hover:bg-black hover:bg-opacity-10"
                    role="button"
                    tabIndex={0}
                  >
                    <span className="truncate px-2.5">javascript</span>
                  </div>

                  <div
                    className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-10 p-0 align-middle text-sm text-black text-opacity-90 no-underline outline-0 hover:bg-black hover:bg-opacity-10"
                    role="button"
                    tabIndex={0}
                  >
                    <span className="truncate px-2.5">arrays</span>
                  </div>

                  <div
                    className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-10 p-0 align-middle text-sm text-black text-opacity-90 no-underline outline-0 hover:bg-black hover:bg-opacity-10"
                    role="button"
                    tabIndex={0}
                  >
                    <span className="truncate px-2.5">loops</span>
                  </div>
                </div>

                <span className="m-0 ml-auto block text-sm leading-snug text-black text-opacity-60">
                  Asked by John Doe, 1 hour ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
