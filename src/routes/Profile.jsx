import { Link, useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";

export async function loader() {
  const [questions, users] = await Promise.all([
    fetch(`/api/questions`).then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { users, questions };
}

export default function Profile() {
  const { users, questions } = useLoaderData();
  const user = users.find((user) => user.id === 1);
  const userQuestions = questions.filter(
    (question) => question.userId === user.id
  );

  return (
    <Box sx={{ display: "flex", p: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0.25,
          height: 500,
          gap: 2,
        }}
      >
        <Typography sx={{ mt: 2 }} variant="h5">
          Stats
        </Typography>
        <Card sx={{ flexGrow: 0.1, inlineSize: 300 }}>
          <CardContent sx={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>
                {user.reputation}
              </Typography>
              <Typography sx={{ ml: 0, mt: 0, pt: 0 }}>reputation</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>0</Typography>
              <Typography sx={{ ml: 0, mt: 0, pt: 0 }}>reached</Typography>
            </Box>
            <Box sx={{ flexGrow: 0.2 }}>
              <Typography sx={{ fontWeight: 700 }}>0</Typography>
              <Typography sx={{ ml: 0, mt: 0, pt: 0 }}>answers</Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>
                {userQuestions.length}
              </Typography>
              <Typography sx={{ ml: 0, mt: 0, pt: 0 }}>questions</Typography>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mt: 2, mr: 16 }} variant="h5">
            Communities
          </Typography>
          <Link style={{ alignSelf: "flex-end", textDecoration: "none" }}>
            Edit
          </Link>
        </Box>
        <Card sx={{ flexGrow: 0.3, inlineSize: 300 }}>
          <CardContent sx={{ display: "flex" }}>
            <Link to={"/users/1/JohnDoe"} style={{ textDecoration: "none" }}>
              Stack Overflow
            </Link>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0.25,
          height: 500,
          gap: 2,
        }}
      >
        <Typography sx={{ mt: 2 }} variant="h5">
          About
        </Typography>
        <Card sx={{ flexGrow: 0.2, inlineSize: 800 }}>
          <CardContent>
            <Typography>
              Your about me section is currently blank. Would you like to add
              one?{" "}
              <Link to={"/users/1/edit"} style={{ textDecoration: "none" }}>
                Edit profile
              </Link>
            </Typography>
          </CardContent>
        </Card>

        <Typography sx={{ mt: 2, mr: 16 }} variant="h5">
          Badges
        </Typography>
        <Card sx={{ flexGrow: 0.2, inlineSize: 800 }}>
          <CardContent>
            <Typography>
              You have not earned any{" "}
              <Link to={""} style={{ textDecoration: "none" }}>
                badges
              </Link>
              .
            </Typography>
          </CardContent>
        </Card>

        <Typography sx={{ mt: 2, mr: 16 }} variant="h5">
          Posts
        </Typography>
        <Card sx={{ flexGrow: 0.5, inlineSize: 800 }}>
          <CardContent>
            <Typography sx={{ textAlign: "center", mt: 2, mb: 4 }}>
              Just getting started? Try answering a question!
            </Typography>
            <Typography sx={{ ml: 4, mb: 4 }}>
              Your most helpful questions, answers and tags will appear here.
              Start by{" "}
              <Link to={"/"} style={{ textDecoration: "none" }}>
                answering a question
              </Link>{" "}
              or{" "}
              <Link to={"/tags"} style={{ textDecoration: "none" }}>
                selecting tags
              </Link>{" "}
              that match topics you’re interested in.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
