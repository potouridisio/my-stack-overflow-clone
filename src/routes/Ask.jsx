import TextField from "../components/TextField";

// Validation messages:
// Title is missing.
// Title must be at least 15 characters.
// Body is missing.

export default function Ask() {
  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            Ask a public question
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
        <div className="p-4">
          <div className="flex max-w-xl flex-row items-center pb-10 pt-6">
            <div className="px-2">
              <span className="flex items-center">
                <span className="flex shrink-0 pr-2">
                  <svg
                    className="block h-[1em] w-[1em] shrink-0 select-none fill-current text-2xl text-[rgb(25,_118,_210)]"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"></path>
                  </svg>
                </span>
                <span className="w-full text-black text-opacity-60">
                  <span className="block text-sm font-medium leading-[1.43] tracking-[0.01071em] text-black text-opacity-[0.87]">
                    Draft your question
                  </span>
                </span>
              </span>
            </div>

            <div className="flex-auto">
              <span className="block border-t border-solid border-[rgb(189,_189,_189)]" />
            </div>

            <div className="px-2">
              <span className="flex items-center">
                <span className="flex shrink-0 pr-2">
                  <svg
                    aria-hidden="true"
                    className="block h-[1em] w-[1em] shrink-0 select-none fill-current text-2xl text-[rgb(25,_118,_210)]"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="12"></circle>
                    <text
                      className="fill-white text-xs"
                      dominantBaseline="central"
                      textAnchor="middle"
                      x="12"
                      y="12"
                    >
                      2
                    </text>
                  </svg>
                </span>
                <span className="w-full text-black text-opacity-60">
                  <span className="block text-sm font-medium leading-[1.43] tracking-[0.01071em] text-black text-opacity-[0.87]">
                    Review your question
                  </span>
                </span>
              </span>
            </div>
          </div>

          <form className="flex flex-col space-y-4">
            <TextField
              autoFocus
              helperText="Be specific and imagine you're asking a question to another person"
              label="Title"
              name="title"
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            />

            <TextField
              helperText="Include all the information someone would need to answer your question"
              label="Body"
              multiline
              name="body"
              rows={4}
            />
          </form>

          <div className="flex justify-end">
            <button
              className="relative m-0 ml-2 mt-6 box-border inline-flex min-w-[64px] cursor-pointer select-none appearance-none items-center justify-center rounded border-0 bg-[#1976d2] px-4 py-1.5 align-middle text-sm font-medium uppercase leading-[1.75] tracking-[0.02857em] text-white no-underline outline-0 hover:bg-[#1565c0] hover:no-underline hover:shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.2),_0px_4px_5px_0px_rgba(0,_0,_0,_0.14),_0px_1px_10px_0px_rgba(0,0,0,0.12)]"
              type="submit"
            >
              Post your question
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
