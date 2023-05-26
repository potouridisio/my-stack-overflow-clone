import { Link, useLoaderData } from "react-router-dom";

import { convertToRelativeDate, indexBy, truncateText } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  const [questions, tags, users] = await Promise.all([
    fetch(`/api/questions${searchTerm ? `?q=${searchTerm}` : ""}`).then((res) =>
      res.json()
    ),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return {
    questions,
    tags: indexBy(tags, "id"),
    users: indexBy(users, "id"),
  };
}

export default function Questions() {
  const { questions, tags, users } = useLoaderData();

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 flex-[1] text-xl font-medium leading-[1.6] tracking-[0.0075em]">
            All Questions
          </div>
          <Link
            className="relative m-0 box-border inline-flex min-w-[64px] cursor-pointer select-none appearance-none items-center justify-center rounded border-0 bg-[#1976d2] px-4 py-1.5 align-middle text-sm font-medium uppercase leading-[1.75] tracking-[0.02857em] text-white no-underline outline-0 hover:bg-[#1565c0] hover:no-underline hover:shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.2),_0px_4px_5px_0px_rgba(0,_0,_0,_0.14),_0px_1px_10px_0px_rgba(0,0,0,0.12)]"
            to="/questions/ask"
          >
            Ask Question
          </Link>
        </div>
      </div>

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 flex-[1] leading-[1.75] tracking-[0.00938em]">
            {questions.length} question{questions.length === 1 ? "" : "s"}
          </div>

          <div className="inline-flex rounded" role="group">
            <button
              className="relative m-0 box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-br-none rounded-tr-none border border-solid border-black border-opacity-[0.12] bg-[rgba(25,_118,_210,_0.08)] p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em] text-[rgb(25,_118,_210)] no-underline outline-0 hover:bg-[rgba(25,_118,_210,_0.12)] hover:no-underline"
              type="button"
            >
              Newest
            </button>
            <button
              className="relative m-0 -ml-px box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-bl-none rounded-br-none rounded-tl-none rounded-tr-none border border-solid border-black border-l-transparent border-opacity-[0.12] p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em] no-underline outline-0 hover:bg-[rgba(0,_0,_0,_0.04)] hover:no-underline"
              type="button"
            >
              Active
            </button>
            <button
              className="relative m-0 -ml-px box-border inline-flex cursor-pointer select-none appearance-none items-center justify-center rounded rounded-bl-none rounded-tl-none border border-solid border-black border-l-transparent border-opacity-[0.12] p-[7px] align-middle text-[0.8125rem] font-medium uppercase leading-[1.75] tracking-[0.02857em] no-underline outline-0 hover:bg-[rgba(0,_0,_0,_0.04)] hover:no-underline"
              type="button"
            >
              Unanswered
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Question */}
        {questions.map((question) => (
          <div
            className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]"
            key={question.id}
          >
            <Link
              className="group relative m-0 box-border block w-full cursor-pointer select-none appearance-none rounded-[inherit] border-0 bg-transparent p-0 align-middle text-inherit no-underline outline-0 [text-align:inherit]"
              tabIndex={0}
              to={`/questions/${question.id}`}
            >
              <div className="p-4">
                <p className="mb-[0.35em] text-sm leading-normal tracking-[0.00938em] text-black text-opacity-60">
                  {question.voteCount} vote
                  {question.voteCount === 1 ? "" : "s"} {question.answerCount}{" "}
                  answer
                  {question.answerCount === 1 ? "" : "s"}
                </p>
                <div className="m-0 text-2xl leading-[1.334] tracking-normal">
                  {question.title}
                </div>
                <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                  {truncateText(question.body, 200)}
                </p>
                <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
                  {users[question.userId].name}{" "}
                  {users[question.userId].reputation} asked{" "}
                  {convertToRelativeDate(question.createdAt)}
                </p>
              </div>
              <span className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 overflow-hidden rounded-[inherit] bg-current opacity-0 group-hover:opacity-[0.04]" />
            </Link>

            <div className="flex items-center p-2">
              <div className="flex flex-row space-x-2">
                {question.tagIds.map((tagId) => (
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
