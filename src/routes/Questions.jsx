import { Link, useLoaderData } from "react-router-dom";

import { convertToRelativeDate, indexBy, truncateText } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const [questions, tags, users] = await Promise.all([
    fetch("/api/questions").then((res) => res.json()),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  const tagName = params.tagName;

  if (tagName) {
    return {
      questions: questions.filter((question) =>
        question.tagIds.includes(tags.find((tag) => tag.name === tagName).id)
      ),
      tags: indexBy(tags, "id"),
      users,
    };
  }

  return {
    questions: questions,
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

      <div className="w-full">
        <div className="flex flex-col space-y-4">
          {/* Question */}
          {questions.map((question) => (
            <div
              className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]"
              key={question.id}
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
      </div>
    </main>
  );
}
