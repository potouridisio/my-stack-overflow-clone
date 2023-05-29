import { Form, Link, useActionData, useLoaderData } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { convertToRelativeDate, indexBy } from "../lib/utils";

function validateAnswerBody(body) {
  if (!body) {
    return "Body is missing.";
  }

  if (body.length < 30) {
    return `Body must be at least 30 characters; you entered ${body.length}.`;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ params, request }) {
  const formData = await request.formData();

  const newAnswer = {
    body: formData.get("body"),
    userId: 1,
  };

  const fieldErrors = {
    body: validateAnswerBody(newAnswer.body),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    };
  }

  await fetch(`/api/questions/${params.questionId}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAnswer),
  }).then((res) => res.json());

  return {};
}

// eslint-disable-next-line react-refresh/only-export-components
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
    tags: indexBy(tags, "id"),
    users: indexBy(users, "id"),
    answers,
  };
}

export default function Question() {
  const actionData = useActionData();
  const { question, tags, users, answers } = useLoaderData();

  return (
    <main className="grow p-6">
      <div className="relative flex min-h-[4rem] items-center px-6" />

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 flex-[1] text-xl font-medium leading-[1.6] tracking-[0.0075em]">
            {question.title}
          </div>
          <Button component={Link} to="/questions/ask" variant="contained">
            Ask Question
          </Button>
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
                <span className="truncate px-3">{tags[tagId].name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end p-2">
          <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
            asked {convertToRelativeDate(question.createdAt)}{" "}
            {users[question.userId].name} {users[question.userId].reputation}
          </p>
        </div>
      </div>

      <div className="relative left-auto right-0 top-0 z-[1100] box-border flex w-full shrink-0 flex-col bg-transparent text-inherit">
        <div className="relative flex min-h-[4rem] items-center">
          <div className="m-0 text-xl font-medium leading-[1.6] tracking-[0.0075em] text-inherit">
            {answers.length} Answer{answers.length === 1 ? "" : "s"}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Answer */}
        {answers.map((answer) => (
          <div
            className="overflow-hidden rounded bg-white text-black text-opacity-[0.87] shadow-[rgba(0,_0,_0,_0.2)_0px_2px_1px_-1px,_rgba(0,_0,_0,_0.14)_0px_1px_1px_0px,_rgba(0,_0,_0,_0.12)_0px_1px_3px_0px]"
            key={answer.id}
          >
            <div className="p-4">
              <p className="mb-3 leading-normal tracking-[0.00938em] text-black text-opacity-60">
                {answer.body}
              </p>
            </div>

            <div className="flex items-center justify-end p-2">
              <p className="m-0 text-sm leading-[1.43] tracking-[0.01071em]">
                answered {convertToRelativeDate(answer.createdAt)}{" "}
                {users[answer.userId].name} {users[answer.userId].reputation}
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
          <Form
            className="flex flex-col space-y-4"
            id="new-answer"
            method="post"
          >
            <TextField
              error={actionData?.fieldErrors?.body}
              helperText={actionData?.fieldErrors?.body}
              multiline
              name="body"
              rows={4}
            />
          </Form>

          <div className="flex justify-end">
            <Button
              form="new-answer"
              sx={{ ml: 1, mt: 3 }}
              type="submit"
              variant="contained"
            >
              Post Your Answer
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
