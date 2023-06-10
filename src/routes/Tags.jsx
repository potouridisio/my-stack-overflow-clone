import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Unstable_Grid2";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ request }) {
  const url = new URL(request.url);
  const tab = url.searchParams.get("tab");

  let sortBy = "";

  if (tab === "popular") {
    sortBy = "popularity";
  } else if (tab === "name") {
    sortBy = "name";
  } else if (tab === "new") {
    sortBy = "latest";
  }

  return fetch(`/api/tags${sortBy ? `?sortBy=${sortBy}` : ""}`);
}

export async function action({ request }) {
  const formData = await request.formData();
  const filterValue = formData.get("tagFilter");
  return filterValue;
}

export default function Tags() {
  let tags = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "popular";

  const [inputTagFilter, setInputTagFilter] = useState("");
  if (inputTagFilter) {
    tags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(inputTagFilter.toLowerCase())
    );
  }

  let filterValue = useActionData();
  if (filterValue) {
    tags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" variant="h6">
          Tags
        </Typography>
      </Toolbar>

      <Typography component="h2" sx={{ mb: 2 }}>
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using the right tags makes it easier for others to
        find and answer your question.
      </Typography>

      <Link to={"synonyms"} style={{ textDecoration: "none" }}>
        Show all tag synonyms
      </Link>

      <Toolbar disableGutters sx={{ justifyContent: "space-between", mt: 4 }}>
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
              autoFocus
              disableUnderline={true}
              onChange={(event) => setInputTagFilter(event.target.value)}
              placeholder="Filter by tag name"
              name="tagFilter"
            />
          </Form>
        </Box>

        <ToggleButtonGroup
          color="primary"
          exclusive
          onChange={(_event, value) => value && setSearchParams({ tab: value })}
          size="small"
          value={tab}
        >
          <ToggleButton value="popular">Popular</ToggleButton>
          <ToggleButton value="name">Name</ToggleButton>
          <ToggleButton value="new">New</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>

      <Grid container spacing={2}>
        {tags.map((tag) => (
          <Grid key={tag.id} xs={3}>
            <Card>
              <CardContent>
                <Chip label={tag.name} onClick={() => {}} sx={{ mb: 1.5 }} />
                <Typography color="text.secondary">
                  {tag.description}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Typography variant="body2">
                  {tag.occurrenceCount} question
                  {tag.occurrenceCount === 1 ? "" : "s"}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
