import { useLoaderData } from "react-router";
import { useEffect, useState } from "react";

export async function loader() {
  const [questions, tags, users] = await Promise.all([
    fetch("/api/questions").then((res) => res.json()),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { questions, tags, users };
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const months = Math.floor(seconds / 2592000);
  const years = Math.floor(seconds / 31536000);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes}  ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 30) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

export default function Questions() {
  const { questions, tags, users } = useLoaderData();

  console.log({ questions, tags, users });

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <h2 className="mb-[0.35em] text-2xl leading-[1.334] tracking-normal">
        All Questions
      </h2>

      {questions.map((question) => {
        const questionUser = users.find((user) => user.id === question.userId);
        console.log("tags", tags);
        const questionTags = tags.filter((tag) =>
          question.tagIds.includes(tag.id)
        );

        console.log("question Tags: ", questionTags);
        return (
          <div className="w-full">
            <div className="flex flex-col space-y-4">
              {/* Question */}

              <div className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]">
                <div className="p-4">
                  <p className="mb-[0.35em] text-sm leading-normal tracking-[0.00938em] text-black text-opacity-60">
                    {question.voteCount} votes {question.answerCount} answer
                  </p>
                  <div className="m-0 text-2xl leading-[1.334] tracking-normal">
                    {question.title}
                  </div>
                  <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                    {question.body}
                  </p>
                  <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
                    {/* John Doe 1000 asked 1 year ago */}
                    {questionUser.name} {questionUser.reputation} asked{" "}
                    {timeAgo(new Date(question.createdAt))}
                  </p>
                </div>

                <div className="flex items-center p-2">
                  <div className="flex flex-row space-x-2">
                    {questionTags.map((tag) => (
                      <div
                        className="relative m-0 box-border inline-flex h-8 max-w-full cursor-pointer select-none appearance-none items-center justify-center whitespace-nowrap rounded-2xl border-0 bg-black bg-opacity-[0.08] p-0 align-middle text-[0.8125rem] text-black text-opacity-[0.87] no-underline outline-0 hover:bg-opacity-[0.12]"
                        role="button"
                        tabIndex={0}
                      >
                        <span className="truncate px-3"> {tag.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}
