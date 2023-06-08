import { useRef, useState } from "react";
import Draggable from "react-draggable";
import {
  Form,
  Link as RouterLink,
  useLoaderData,
  useSearchParams,
  redirect,
} from "react-router-dom";
import { create } from "zustand";

import CloseIcon from "@mui/icons-material/Close";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { convertToRelativeDate, indexBy } from "../lib/utils";

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ request }) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  const [questions, tags, users, filters] = await Promise.all([
    fetch(`/api/questions${searchTerm ? `?q=${searchTerm}` : ""}`).then((res) =>
      res.json()
    ),
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users").then((res) => res.json()),
    fetch("/api/users/1/filters").then((res) => res.json()),
  ]);

  return {
    questions,
    tags: indexBy(tags, "id"),
    users: indexBy(users, "id"),
    filters,
  };
}

const useFilterStore = create((set) => ({
  expanded: false,
  toggle: () => set((state) => ({ expanded: !state.expanded })),
}));

export async function action({ request }) {
  const filterData = await request.formData();

  const filter = {
    filterBy: filterData.get("filterIds"),
    sortBy: filterData.get("sortId"),
    taggedWith: filterData.get("tagModeId"),
    name: filterData.get("name"),
  };

  fetch("/api/users/1/filters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filter),
  });

  return redirect(
    `/?filters=${filter.filterBy}&sort=${filter.sortBy}&tagMode=${filter.taggedWith}`
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const handle = {
  sidebar: (data) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toggle = useFilterStore((state) => state.toggle);

    return (
      <List>
        <ListItem>
          {/* TODO: extract to function */}
          <Card sx={{ flexGrow: 1 }}>
            <CardHeader title="Custom Filters" />

            {data.filters.length > 0 ? (
              <List>
                {data.filters.map((filter) => (
                  <ListItem disablePadding key={filter.id}>
                    <ListItemButton>
                      <ListItemText primary={filter.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : null}
            <Divider />
            <List>
              <ListItemButton onClick={toggle}>
                <ListItemText primary="Create a custom filter" />
              </ListItemButton>
            </List>
          </Card>
        </ListItem>
      </List>
    );
  },
};

function PaperComponent(props) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      cancel={'[class*="MuiDialogContent-root"]'}
      handle="#draggable-dialog-title"
      nodeRef={nodeRef}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function Questions() {
  const { expanded, toggle } = useFilterStore();
  const { questions, tags, users } = useLoaderData();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const isSearch = Boolean(q);
  const [filterIds, setFilterIds] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          <Form method="post" action="/">
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
                        control={
                          <Checkbox
                            checked={filterIds.includes(value)}
                            name="filterId"
                            onChange={() => {
                              if (filterIds.includes(value)) {
                                setFilterIds(
                                  filterIds.filter((id) => id !== value)
                                );
                              } else {
                                setFilterIds([...filterIds, value]);
                              }
                            }}
                            value={value}
                          />
                        }
                        key={value}
                        label={label}
                      />
                    ))}
                  </FormGroup>
                </FormControl>

                <input name="filterIds" type="hidden" value={filterIds} />

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

              <Button onClick={handleClickOpen} size="small" variant="outlined">
                Save custom filter
              </Button>
              <Dialog
                disablePortal
                keepMounted
                fullWidth
                maxWidth="sm"
                onClose={handleClose}
                open={open}
                PaperComponent={PaperComponent}
              >
                <DialogTitle
                  id="draggable-dialog-title"
                  style={{ cursor: "move" }}
                >
                  Create a custom filter
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      color: (theme) => theme.palette.grey[500],
                      position: "absolute",
                      right: 8,
                      top: 8,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>

                <DialogContent>
                  <TextField
                    fullWidth
                    label="Filter title"
                    margin="dense"
                    name="name"
                    placeholder="Give your custom filter a title"
                  />
                </DialogContent>
                <DialogActions
                  sx={{ justifyContent: "flex-start", p: 3, pt: 0 }}
                >
                  <Button type="submit" variant="contained">
                    Save filter
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
              </Dialog>

              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={toggle} size="small">
                Cancel
              </Button>
            </CardActions>
          </Form>
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
