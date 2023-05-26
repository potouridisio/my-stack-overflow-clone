import { Link, useLoaderData } from "react-router-dom";
import { convertToRelativeDate } from "../lib/utils.js";
import TextField from "../components/TextField";

export async function loader({ params }) {
  const [question, users, tags, answers] = await Promise.all([
    fetch(`/api/questions/${params.questionId}`).then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
    fetch("/api/tags").then((res) => res.json()),
    fetch(`/api/questions/${params.questionId}/answers`).then((res) =>
      res.json()
    ),
  ]);

  return {
    question,
    users,
    tags,
    answers,
  };
}

export default function Question() {
  const { question, users, tags, answers } = useLoaderData();

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

          {tags
            .filter((tag) => question.tagIds.includes(tag.id))
            .map((tag) => (
              <div key={tag.id} className="flex items-center p-2">
                <div className="flex flex-row space-x-2">
                  <div
                    className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-[0.08] p-0 align-middle text-[0.8125rem] text-black text-opacity-[0.87] no-underline outline-0 hover:bg-opacity-[0.12]"
                    role="button"
                    tabIndex={0}
                  >
                    <span className="truncate px-3">{tag.name}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-end p-2">
          {users.map((user) => {
            if (user.id === question.userId) {
              return (
                <p
                  key={user.id}
                  className="m-0 text-sm leading-[1.43] tracking-[0.01071em]"
                >
                  {" "}
                  asked {convertToRelativeDate(question.createdAt)} {""}
                  {user.name} {user.reputation}{" "}
                </p>
              );
            }
          })}
        </div>
      </div>

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            {question.answerCount} Answer
          </div>
        </div>
      </div>

      {answers.map((answer) => {
        return (
          <div key={answer.id} className="flex flex-col space-y-4">
            {/* Answer */}
            <div className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
              <div className="p-4">
                <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                  {answer.body}
                </p>
              </div>

              <div className="flex items-center justify-end p-2">
                {users.map((user) => {
                  if (user.id === answer.userId) {
                    return (
                      <p
                        key={user.id}
                        className="m-0 text-sm leading-[1.43] tracking-[0.01071em]"
                      >
                        answered {convertToRelativeDate(answer.createdAt)} {""}{" "}
                        {user.name} {user.reputation}{" "}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      })}

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
