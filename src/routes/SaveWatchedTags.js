import { redirect } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();

  await fetch("/api/users/1/watchedTags", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData.get("watchedTags").split(" ")),
  });

  return {};
}

export function loader() {
  return redirect("/");
}
