import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

import { indexBy } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const [tagsResponse, users] = await Promise.all([
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { tags: indexBy(tagsResponse.tags, "id"), users };
}

export default function Users() {
  const { tags, users } = useLoaderData();

  return (
    <>
      <Helmet>
        <title>Users - Stack Overflow Clone</title>
      </Helmet>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Toolbar disableGutters>
          <Typography component="div" variant="h6">
            Users
          </Typography>
        </Toolbar>

        <Toolbar disableGutters>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            name="query"
            placeholder="Filter by user"
          />
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
    </>
  );
}
