import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Typography } from "@mui/material";

export async function loader() {
  const users = await fetch("/api/users").then((res) => res.json());
  return { users };
}

export default function Profile() {
  const { users } = useLoaderData();
  const user = users.find((user) => user.id === 1);

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
        <Card sx={{ flexGrow: 0.5, inlineSize: 300 }}>
          <CardContent sx={{ fontWeight: 700 }}>{user.reputation}</CardContent>
          <Typography sx={{ ml: 2, mt: 0, pt: 0 }}>reputation</Typography>
        </Card>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mt: 2, mr: 16 }} variant="h5">
            Communities
          </Typography>
          <Link style={{ alignSelf: "flex-end", textDecoration: "none" }}>
            Edit
          </Link>
        </Box>
        <Card sx={{ flexGrow: 0.2, inlineSize: 300 }}></Card>
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
        <Card sx={{ flexGrow: 0.2, inlineSize: 500 }}></Card>
        <Typography sx={{ mt: 2, mr: 16 }} variant="h5">
          Badges
        </Typography>
        <Card sx={{ flexGrow: 0.2, inlineSize: 500 }}></Card>
        <Typography sx={{ mt: 2, mr: 16 }} variant="h5">
          Posts
        </Typography>
        <Card sx={{ flexGrow: 0.5, inlineSize: 500 }}></Card>
      </Box>
    </Box>
  );
}
