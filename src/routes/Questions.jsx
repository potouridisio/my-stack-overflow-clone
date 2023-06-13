import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import {
  Form,
  Link as RouterLink,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router-dom";
import { create } from "zustand";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
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
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CustomFilters from "../components/CustomFilters";
import WatchedTags, {
  useSelectedWatchedTagIds,
} from "../components/WatchedTags";
import { convertToRelativeDate, indexBy } from "../lib/utils";
import IgnoredTags, {
  useSelectedIgnoredTagIds,
} from "../components/IgnoredTags";

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

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterStore = create((set) => ({
  expanded: false,
  toggle: () => set((state) => ({ expanded: !state.expanded })),
}));

// eslint-disable-next-line react-refresh/only-export-components
export const handle = {
  sidebar: (data) => (
    <List>
      <ListItem>
        <CustomFilters filters={data.filters} />
      </ListItem>

      <ListItem>
        <WatchedTags tags={data.tags} />
      </ListItem>

      <ListItem>
        <IgnoredTags tags={data.tags} />
      </ListItem>
    </List>
  ),
};

function validateFilterName(name) {
  if (!name) {
    return "Title is missing.";
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const newFilter = Object.fromEntries(formData);

  const fieldErrors = {
    name: validateFilterName(newFilter.name),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    };
  }

  const filter = await fetch("/api/users/1/filters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFilter),
  }).then((res) => res.json());
  //.then(window.location.reload());

  if (filter.error) {
    return {
      fieldErrors: {
        name: filter.error,
      },
    };
  }

  return redirect(
    `/?sort=${filter.sortId}&filters=${filter.filters}&tagWith=${filter.tagModeId}&uqlId=${filter.id}`
  );
}

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
  const actionData = useActionData();
  const { expanded, toggle } = useFilterStore();
  const { selectedWatchedTagIds, setSelectedWatchedTagIds } =
    useSelectedWatchedTagIds();
  const { selectedIgnoredTagIds, setSelectedIgnoredTagIds } =
    useSelectedIgnoredTagIds();
  const { questions, tags, users } = useLoaderData();
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const isSearch = Boolean(q);
  const [filterIds, setFilterIds] = useState([]);
  const [sortId, setSortId] = useState("");
  const [tagModeId, setTagModeId] = useState("");
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const urlFilters = searchParams.get("filters");
  const urlSort = searchParams.get("sort");
  const urlTagWith = searchParams.get("tagWith");

  useEffect(() => {
    if (urlFilters) {
      setFilterIds(urlFilters);
    }
    if (urlSort) {
      setSortId(urlSort);
    }
    if (urlTagWith) {
      setTagModeId(urlTagWith);
    }
  }, [urlFilters, urlSort, urlTagWith]);

  useEffect(() => {
    if (inputRef.current && open) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleToggleFilterId = (filterId) => {
    if (filterIds.includes(filterId)) {
      setFilterIds(filterIds.filter((id) => id !== filterId));
    } else {
      setFilterIds([...filterIds, filterId]);
    }
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Toolbar disableGutters>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            {isSearch ? "Search Results" : "All Questions"}
          </Typography>

          <Button
            component={RouterLink}
            to="/questions/ask"
            variant="contained"
          >
            Ask Question
          </Button>
        </Toolbar>

        <Toolbar disableGutters>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="subtitle1">
            {questions.length} {isSearch ? "result" : "question"}
            {questions.length === 1 ? "" : "s"}
          </Typography>

          <ButtonGroup variant="outlined" sx={{ mr: 4 }}>
            <Button sx={{ textTransform: "none" }}>Newest</Button>
            <Button sx={{ textTransform: "none" }}>Active</Button>
            <Button sx={{ textTransform: "none" }}>Bountied</Button>
            <Button sx={{ textTransform: "none" }}>Unanswered</Button>
            <Button sx={{ textTransform: "none" }}>
              More
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>

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
            <Form id="filter-form" method="post">
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
                              onChange={() => handleToggleFilterId(value)}
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
                    <RadioGroup defaultValue="Newest" name="sortId">
                      {[
                        ["Newest", "Newest"],
                        ["Recent activity", "RecentActivity"],
                        ["Highest score", "MostVotes"],
                        ["Most frequent", "MostFrequent"],
                        ["Bounty ending soon", "BountyEndingSoon"],
                      ].map(([label, value]) => (
                        <FormControlLabel
                          control={<Radio />}
                          checked={sortId.includes(value)}
                          key={value}
                          label={label}
                          value={value}
                          onChange={() => setSortId(value)}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tagged with</FormLabel>
                    <RadioGroup defaultValue="Specified" name="tagModeId">
                      {[
                        ["My watched tags", "Watched"],
                        ["The following tags:", "Specified"],
                      ].map(([label, value]) => (
                        <FormControlLabel
                          control={<Radio />}
                          checked={tagModeId.includes(value)}
                          key={value}
                          label={label}
                          value={value}
                          onChange={() => setTagModeId(value)}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </CardContent>

              <CardActions>
                <Button form="filter-form" size="small" type="submit">
                  Apply filter
                </Button>

                <Button onClick={handleClickOpen} size="small">
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
                      error={!!actionData?.fieldErrors?.name}
                      fullWidth
                      helperText={actionData?.fieldErrors?.name}
                      inputRef={inputRef}
                      label="Filter title"
                      margin="dense"
                      name="name"
                      placeholder="Give your custom filter a title"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton
                      loading={navigation.state === "submitting"}
                      type="submit"
                      form="filter-form"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose;
                        toggle();
                      }}
                    >
                      Save filter
                    </LoadingButton>
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
            <Card
              key={question.id}
              sx={{
                bgcolor: question.tagIds.some((tagId) =>
                  selectedWatchedTagIds.includes(tagId.toString())
                )
                  ? "#fdf7e2"
                  : "",
              }}
            >
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
                      onMouseEnter={handlePopoverOpen}
                      icon={
                        selectedWatchedTagIds.includes(tagId.toString()) ? (
                          <VisibilityIcon />
                        ) : (
                          ""
                        )
                      }
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

      <Popover
        disablePortal
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Card
          sx={{
            fontSize: 14,
            p: 1,
            width: "50ch",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <CardHeader title="15.7k watchers 21.9k questions"></CardHeader>
            <RssFeedIcon />
          </Box>

          <CardContent>
            <Typography>
              {anchorEl
                ? tags[
                    Object.values(tags).find(
                      (tag) => tag.name === anchorEl.textContent
                    ).id
                  ].description
                : ""}
            </Typography>
            <RouterLink>View Tag</RouterLink>
          </CardContent>

          <CardActions
            sx={{
              fontSize: 22,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              sx={{ textTransform: "none" }}
              variant="outlined"
              size="medium"
              startIcon={<VisibilityIcon />}
              onClick={() =>
                setSelectedWatchedTagIds([
                  ...selectedWatchedTagIds,
                  Object.values(tags).find(
                    (tag) => tag.name === anchorEl.textContent
                  ).id,
                ])
              }
            >
              Watch a tag
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              size="medium"
              variant="outlined"
              startIcon={<DoDisturbIcon />}
              onClick={() =>
                setSelectedIgnoredTagIds([
                  ...selectedIgnoredTagIds,
                  Object.values(tags).find(
                    (tag) => tag.name === anchorEl.textContent
                  ).id,
                ])
              }
            >
              Ignored tag
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </>
  );
}
