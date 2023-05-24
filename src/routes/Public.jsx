import { NavLink, Outlet } from "react-router-dom";

import { GlobeAmericasIcon } from "@heroicons/react/24/solid";

export default function Public() {
  return (
    <>
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
                <NavLink
                  className={({ isActive }) =>
                    `relative m-0 box-border flex min-w-0 grow cursor-pointer select-none appearance-none items-center justify-start rounded-none border-0 ${
                      isActive
                        ? "bg-[rgba(25,_118,_210,_0.08)]"
                        : "bg-transparent"
                    } p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 ${
                      isActive
                        ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
                        : "hover:bg-black hover:bg-opacity-[0.04]"
                    } hover:no-underline`
                  }
                  tabIndex={0}
                  to="/"
                >
                  <div className="inline-flex min-w-[56px] shrink-0 text-black text-opacity-[0.54]">
                    <GlobeAmericasIcon className="inline-block h-[1em] w-[1em] shrink-0 select-none fill-current text-2xl" />
                  </div>
                  <div className="my-1 min-w-0 flex-auto">
                    <span className="m-0 block leading-normal tracking-[0.00938em]">
                      Questions
                    </span>
                  </div>
                </NavLink>
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <NavLink
                  className={({ isActive }) =>
                    `relative m-0 box-border flex min-w-0 grow cursor-pointer select-none appearance-none items-center justify-start rounded-none border-0 ${
                      isActive
                        ? "bg-[rgba(25,_118,_210,_0.08)]"
                        : "bg-transparent"
                    } p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 ${
                      isActive
                        ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
                        : "hover:bg-black hover:bg-opacity-[0.04]"
                    } hover:no-underline`
                  }
                  tabIndex={0}
                  to="tags"
                >
                  <div className="my-1 min-w-0 flex-auto pl-14">
                    <span className="m-0 block leading-normal tracking-[0.00938em]">
                      Tags
                    </span>
                  </div>
                </NavLink>
              </li>

              <li className="relative box-border flex w-full items-center justify-start text-left no-underline">
                <NavLink
                  className={({ isActive }) =>
                    `relative m-0 box-border flex min-w-0 grow cursor-pointer select-none appearance-none items-center justify-start rounded-none border-0 ${
                      isActive
                        ? "bg-[rgba(25,_118,_210,_0.08)]"
                        : "bg-transparent"
                    } p-0 px-4 py-2 text-left align-middle text-inherit no-underline outline-0 ${
                      isActive
                        ? "hover:bg-[rgba(25,_118,_210,_0.12)]"
                        : "hover:bg-black hover:bg-opacity-[0.04]"
                    } hover:no-underline`
                  }
                  tabIndex={0}
                  to="users"
                >
                  <div className="my-1 min-w-0 flex-auto pl-14">
                    <span className="m-0 block leading-normal tracking-[0.00938em]">
                      Users
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main */}
      <Outlet />
    </>
  );
}
