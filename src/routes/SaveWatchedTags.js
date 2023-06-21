import { redirect } from "react-router-dom";

let location = null;

export async function action({ request }) {
  const formData = await request.formData();
  const watchedTags = formData.get("watchedTags");
  const submitLocation = formData.get("submitLocation");
  location = submitLocation;

  await fetch("/api/users/1/watchedTags", {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
      "Submit-Location": "tagWatching",
    }),
    body: JSON.stringify(watchedTags ? watchedTags.split(",") : []),
  });

  return {};
}

export async function loader() {
  return location ? redirect("/users/1/tag-notifications") : redirect("/");
}
