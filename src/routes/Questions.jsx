import {
  Link as RouterLink,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { create } from "zustand";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { convertToRelativeDate, indexBy } from "../lib/utils";

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

// eslint-disable-next-line react-refresh/only-export-components
export const handle = {
  // eslint-disable-next-line no-unused-vars
  sidebar: (_data) => (
    <List>
      <ListItem>
        <Card sx={{ flexGrow: 1 }}>
          <CardHeader
            title="Custom Filters"
            titleTypographyProps={{ variant: "subtitle1" }}
          />
          <List>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton aria-label="delete" edge="end">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              <ListItemButton selected>
                <ListItemText primary="No answers" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Newest" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItemButton>
              <ListItemText primary="Create a custom filter" />
            </ListItemButton>
          </List>
        </Card>
      </ListItem>
    </List>
  ),
};

const useFilterStore = create((set) => ({
  expanded: false,
  toggle: () => set((state) => ({ expanded: !state.expanded })),
}));

export default function Questions() {
  const { expanded, toggle } = useFilterStore();
  const { questions, tags, users } = useLoaderData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const isSearch = Boolean(q);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {isSearch ? "Search Results" : "All Questions"}
        </Typography>

        <Button component={RouterLink} to="/questions/ask" variant="contained">
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
            color="primary"
            onChange={toggle}
            selected={expanded}
            size="small"
            value="filter"
          >
            <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
            Filter
          </ToggleButton>
        ) : null}
      </Toolbar>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Filter by</FormLabel>
                <FormGroup>
                  {[
                    ["No answers", "NoAnswers"],
                    ["No accepted answer", "NoAcceptedAnswer"],
                    ["Has bounty", "Bounty"],
                  ].map(([label, value]) => (
                    <FormControlLabel
                      control={<Checkbox name="filterId" value={value} />}
                      key={value}
                      label={label}
                    />
                  ))}
                </FormGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">Sorted by</FormLabel>
                <RadioGroup>
                  {[
                    ["Newest", "Newest"],
                    ["Recent activity", "RecentActivity"],
                    ["Highest score", "MostVotes"],
                    ["Most frequent", "MostFrequent"],
                    ["Bounty ending soon", "BountyEndingSoon"],
                  ].map(([label, value]) => (
                    <FormControlLabel
                      control={<Radio name="sortId" value={value} />}
                      key={value}
                      label={label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset">
                <FormLabel component="legend">Tagged with</FormLabel>
                <RadioGroup>
                  {[
                    ["My watched tags", "Watched"],
                    ["The following tags:", "Specified"],
                  ].map(([label, value]) => (
                    <FormControlLabel
                      control={<Radio name="tagModeId" value={value} />}
                      key={value}
                      label={label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </CardContent>

          <CardActions>
            <Button
              form="filter-form"
              size="small"
              variant="contained"
              type="submit"
            >
              Apply filter
            </Button>
            <Button size="small" variant="outlined">
              Save custom filter
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={toggle} size="small">
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Collapse>

      <Stack spacing={2}>
        {/* Question */}
        {questions.map((question) => (
          <Card key={question.id}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", mb: 1.5 }}
              >
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  {question.voteCount} vote
                  {question.voteCount === 1 ? "" : "s"}
                </Typography>
                {question.answerCount > 0 ? (
                  <Chip
                    color="success"
                    label={`${question.answerCount} answer${
                      question.answerCount === 1 ? "" : "s"
                    }`}
                    variant="outlined"
                  />
                ) : (
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {question.answerCount} answer
                    {question.answerCount === 1 ? "" : "s"}
                  </Typography>
                )}
              </Stack>

              <Link
                component={RouterLink}
                sx={{ display: "block", mb: 1.5 }}
                to={`/questions/${question.id}`}
                variant="h5"
              >
                {question.title}
              </Link>

              <Stack direction="row" spacing={1}>
                {question.tagIds.map((tagId) => (
                  <Chip
                    key={tagId}
                    label={tags[tagId].name}
                    onClick={() => {}}
                  />
                ))}
              </Stack>
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Typography variant="body2">
                <Link href="#" onClick={(event) => event.preventDefault()}>
                  {users[question.userId].name}
                </Link>{" "}
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
