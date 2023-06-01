import { useState } from "react";
import { Link, useLoaderData, useSearchParams } from "react-router-dom";

import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { convertToRelativeDate, indexBy, truncateText } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  const [questions, tags, users] = await Promise.all([
    fetch(`/api/questions${searchTerm ? `?q=${searchTerm}` : ""}`).then((res) =>
      res.json()
    ),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
  ]);

  return {
    questions,
    tags: indexBy(tags, "id"),
    users: indexBy(users, "id"),
  };
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Questions() {
  const { questions, tags, users } = useLoaderData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const isSearch = Boolean(q);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {isSearch ? "Search Results" : "All Questions"}
        </Typography>

        <Button component={Link} to="/questions/ask" variant="contained">
          Ask Question
        </Button>
      </Toolbar>

      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="subtitle1">
          {questions.length} {isSearch ? "result" : "question"}
          {questions.length === 1 ? "" : "s"}
        </Typography>

        {!isSearch ? (
          <ToggleButton
            onClick={() => setShowFilters((prev) => !prev)}
            size="small"
            value="filter"
          >
            <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
            Filter
          </ToggleButton>
        ) : null}
      </Toolbar>
      <Collapse in={showFilters}>
        <Card variant="outlined" sx={{ mb: "1rem", bgcolor: "#f2f2f2" }}>
          <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box>
              <FormLabel
                component="legend"
                sx={{ color: "black", fontWeight: 500 }}
              >
                Filter by
              </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={gilad}
                      // onChange={handleChange}
                      name="No answers"
                    />
                  }
                  label="No answers"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={jason}
                      // onChange={handleChange}
                      name="No accepted answer"
                    />
                  }
                  label="No accepted answer"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      // checked={antoine}
                      // onChange={handleChange}
                      name="Has bounty"
                    />
                  }
                  label="Has bounty"
                />
              </FormGroup>
            </Box>
            <Box>
              <FormControl>
                <FormLabel
                  id="radio-buttons-sorted-by"
                  sx={{ color: "black", fontWeight: 500 }}
                >
                  Sorted by
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-sorted-by"
                  defaultValue="newest"
                  name="sortedBy"
                >
                  <FormControlLabel
                    value="newest"
                    control={<Radio size="small" />}
                    label="Newest"
                  />
                  <FormControlLabel
                    value="recent activity"
                    control={<Radio size="small" />}
                    label="Recent activity"
                  />
                  <FormControlLabel
                    value="highest score"
                    control={<Radio size="small" />}
                    label="Highest score"
                  />
                  <FormControlLabel
                    value="most frequent"
                    control={<Radio size="small" />}
                    label="Most frequent"
                  />
                  <FormControlLabel
                    value="bounty ending soon"
                    control={<Radio size="small" />}
                    label="Bounty ending soon"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel
                  id="radio-buttons-tagged-with"
                  sx={{ color: "black", fontWeight: 500 }}
                >
                  Tagged with
                </FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-tagged-with"
                  defaultValue="followinTags"
                  name="sortedBy"
                >
                  <FormControlLabel
                    value="watchedTags"
                    control={<Radio size="small" />}
                    label="My watched tags"
                  />
                  <FormControlLabel
                    value="followinTags"
                    control={<Radio size="small" />}
                    label="The following tags:"
                  />
                </RadioGroup>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="e.g. javascript or python"
                />
              </FormControl>
            </Box>
          </CardContent>
          <CardActions sx={{ borderTop: "1px solid #e3e3e3", padding: "1rem" }}>
            <Button
              size="small"
              variant="contained"
              sx={{
                bgcolor: "dodgerblue",
                textTransform: "none",
                fontWeight: 400,
                fontSize: "0.7rem",
                padding: "0.4rem",
              }}
            >
              Apply filter
            </Button>
            <Box sx={{ flexGrow: 1 }}></Box>

            <Button
              onClick={() => setShowFilters(false)}
              size="small"
              variant="text"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Collapse>
      <Stack spacing={2}>
        {/* Question */}
        {questions.map((question) => (
          <Card key={question.id}>
            <CardActionArea component={Link} to={`/questions/${question.id}`}>
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                  sx={{ fontSize: 14 }}
                >
                  {question.voteCount} vote
                  {question.voteCount === 1 ? "" : "s"}
                  {bull}
                  {question.answerCount} answer
                  {question.answerCount === 1 ? "" : "s"}
                </Typography>

                <Typography component="div" variant="h5">
                  {question.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  {truncateText(question.body, 200)}
                </Typography>

                <Stack direction="row" spacing={1}>
                  {question.tagIds.map((tagId) => (
                    <Chip
                      key={tagId}
                      label={tags[tagId].name}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </CardActionArea>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Typography variant="body2">
                {users[question.userId].name}{" "}
                {users[question.userId].reputation} asked{" "}
                {convertToRelativeDate(question.createdAt)}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
