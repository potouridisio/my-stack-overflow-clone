import { useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { indexBy } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const [tags, users] = await Promise.all([
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { tags: indexBy(tags, "id"), users };
}

export default function Users() {
  const { tags, users } = useLoaderData();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Users
        </Typography>
      </Toolbar>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid key={user.id} xs={3}>
            <Card>
              <CardContent>
                <Typography
                  component={Link}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  variant="h5"
                >
                  {user.name}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  {user.location}
                </Typography>

                <Typography sx={{ mb: 1.5 }} variant="body2">
                  {user.reputation}
                </Typography>

                <Stack direction="row" divider={<>,&nbsp;</>}>
                  {user.tagIds.map((tagId) => (
                    <Link
                      href="#"
                      key={tagId}
                      onClick={(event) => event.preventDefault()}
                    >
                      {tags[tagId].name}
                    </Link>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
