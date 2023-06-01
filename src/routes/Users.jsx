import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";

import { indexBy } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const [tags, users] = await Promise.all([
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return { tags: indexBy(tags, "id"), users };
}

export async function action({ request }) {
  const formData = await request.formData();
  const filterValue = formData.get("userFilter");
  return filterValue;
}

export default function Users() {
  let { tags, users } = useLoaderData();

  const [inputUserFilter, setInputUserFilter] = useState("");
  if (inputUserFilter) {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(inputUserFilter.toLowerCase())
    );
  }

  let filterValue = useActionData();
  if (filterValue) {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Users
        </Typography>
      </Toolbar>

      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: 1,
            borderColor: "grey.500",
            borderRadius: "5%",
            p: 0.3,
            pr: 8,
          }}
        >
          <SearchIcon sx={{ mt: 0.5 }} />
          <Form method="post">
            <Input
              disableUnderline={true}
              onChange={(event) => setInputUserFilter(event.target.value)}
              placeholder="Filter by user"
              name="userFilter"
            />
          </Form>
        </Box>

        <ToggleButtonGroup color="primary" exclusive size="small">
          <ToggleButton value="reputation">Reputation</ToggleButton>
          <ToggleButton value="new users">New users</ToggleButton>
          <ToggleButton value="voters">Voters</ToggleButton>
          <ToggleButton value="editors">Editors</ToggleButton>
          <ToggleButton value="moderators">Moderators</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>

      <Grid container spacing={2}>
        {users.map((user) => (
          <Grid key={user.id} xs={3}>
            <Card>
              <CardContent>
                <Typography component="div" variant="h5">
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
