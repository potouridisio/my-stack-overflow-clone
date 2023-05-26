import { Link, useLoaderData } from "react-router-dom";

import TextField from "../components/TextField";

import { convertToRelativeDate } from "../lib/utils";

export async function loader({ params }) {
  const [question, tags, users, answers] = await Promise.all([
    fetch(`/api/questions/${params.questionId}`).then((res) => res.json()),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
    fetch(`/api/questions/${params.questionId}/answers`).then((res) =>
      res.json()
    ),
  ]);

  return {
    question,
    tags,
    users,
    answers,
  };
}

export default function Question() {
  const { question, tags, users, answers } = useLoaderData();

  const sortedAnswers = answers.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 flex-[1] text-xl font-medium leading-[1.6] tracking-[0.0075em]">
            {question.title}
          </div>
          <Link
            className="relative m-0 box-border inline-flex min-w-[64px] cursor-pointer select-none appearance-none items-center justify-center rounded border-0 bg-[#1976d2] px-4 py-1.5 align-middle text-sm font-medium uppercase leading-[1.75] tracking-[0.02857em] text-white no-underline outline-0 hover:bg-[#1565c0] hover:no-underline hover:shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.2),_0px_4px_5px_0px_rgba(0,_0,_0,_0.14),_0px_1px_10px_0px_rgba(0,0,0,0.12)]"
            to="/questions/ask"
          >
            Ask Question
          </Link>
        </div>
      </div>

      {/* Question */}
      <div className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
        <div className="p-4">
          <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
            {question.body}
          </p>

          <div className="flex flex-row space-x-2">
            {question.tagIds.map((tagId) => (
              <div
                className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-[0.08] p-0 align-middle text-[0.8125rem] text-black text-opacity-[0.87] no-underline outline-0 hover:bg-opacity-[0.12]"
                key={tagId}
                role="button"
                tabIndex={0}
              >
                <span className="truncate px-3">{tags[tagId - 1].name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end p-2">
          <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
            asked {convertToRelativeDate(question.createdAt)}{" "}
            {users[question.userId - 1].name}{" "}
            {users[question.userId - 1].reputation}
          </p>
        </div>
      </div>

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            {answers.length} {answers.length > 1 ? "Answers" : "Answer"}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Answer */}
        {sortedAnswers.map((answer) => (
          <div className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
            <div className="p-4">
              <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                {answer.body}
              </p>
            </div>

            <div className="flex items-center justify-end p-2">
              <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
                answered {convertToRelativeDate(answer.createdAt)}{" "}
                {users.find((user) => user.id === answer.userId).name}{" "}
                {users.find((user) => user.id === answer.userId).reputation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            Your Answer
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
        <div className="p-4">
          <form className="flex flex-col space-y-4" id="new-answer">
            <TextField multiline name="body" rows={4} />
          </form>

          <div className="flex justify-end">
            <button
              className="relative m-0 ml-2 mt-6 box-border inline-flex min-w-[64px] cursor-pointer select-none appearance-none items-center justify-center rounded border-0 bg-[#1976d2] px-4 py-1.5 align-middle text-sm font-medium uppercase leading-[1.75] tracking-[0.02857em] text-white no-underline outline-0 hover:bg-[#1565c0] hover:no-underline hover:shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.2),_0px_4px_5px_0px_rgba(0,_0,_0,_0.14),_0px_1px_10px_0px_rgba(0,0,0,0.12)]"
              form="new-answer"
              type="submit"
            >
              Post Your Answer
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
