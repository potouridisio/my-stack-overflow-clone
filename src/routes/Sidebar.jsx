import { Outlet } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <Outlet />

      {/* Sidebar */}
      <div className="w-60 flex-none shrink-0">
        <div className="fixed right-0 top-0 z-[1200] box-border flex h-full w-60 flex-col overflow-y-auto border-l border-l-black border-opacity-[0.12] bg-white text-black text-opacity-[0.87] shadow-none outline-0">
          <div className="relative flex min-h-[4rem] items-center px-6" />

          <div className="overflow-auto"></div>
        </div>
      </div>
    </>
  );
}
