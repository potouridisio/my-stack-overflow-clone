import { Helmet } from "react-helmet";
import { useLoaderData, useSearchParams } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export function Tagsloader({ request, setLoading }) {
  // const [loading, setLoading] = useState(true);

  const url = new URL(request.url);
  const tab = url.searchParams.get("tab");
  const page = url.searchParams.get("page") || 1;

  let sortBy = "";

  if (tab === "popular") {
    sortBy = "popularity";
  } else if (tab === "name") {
    sortBy = "name";
  } else if (tab === "new") {
    sortBy = "latest";
  }

  setLoading(true);

  return fetch(
    `/api/tags?page=${page}${sortBy ? `&sortBy=${sortBy}` : ""}`
  ).then((response) => {
    setLoading(false);
    return response;
  });
}

export default function Tags() {
  const [loading, setLoading] = useState(false);
  const tagsResponse = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "popular";

  const handleChangeTab = (_event, value) => {
    if (value) {
      setLoading(true);
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.set("tab", value);

      setSearchParams(newSearchParams);
    }
  };

  const handleChangePage = (_event, page) => {
    setLoading(true);

    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("page", page);

    setSearchParams(newSearchParams);
  };

  return (
    <>
      <Helmet>
        <title>Tags - Stack Overflow Clone</title>
      </Helmet>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Toolbar disableGutters>
          <Typography component="div" variant="h6">
            Tags
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
            placeholder="Filter by tag name"
          />
          <Box sx={{ flexGrow: 1 }} />
          <ToggleButtonGroup
            color="primary"
            exclusive
            onChange={handleChangeTab}
            size="small"
            value={tab}
          >
            <ToggleButton value="popular">Popular</ToggleButton>
            <ToggleButton value="name">Name</ToggleButton>
            <ToggleButton value="new">New</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {tagsResponse.tags.map((tag) => (
              <Grid key={tag.id} xs={3}>
                <Card>
                  <CardContent>
                    <Chip
                      label={tag.name}
                      onClick={() => {}}
                      sx={{ mb: 1.5 }}
                    />
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
        )}

        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Pagination
            count={tagsResponse.totalPages}
            onChange={handleChangePage}
            page={tagsResponse.currentPage}
            shape="rounded"
            variant="outlined"
          />
        </Toolbar>
      </Box>
    </>
  );
}
