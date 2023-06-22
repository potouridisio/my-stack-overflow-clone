import { useState } from "react";

import { useSubmit } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

//import { create } from "zustand";

//import { useSelectedWatchedTagIds } from "../components/WatchedTags";
import { useSelectedIgnoredTagIds } from "../components/IgnoredTags";
import { indexBy, handleAddTag, handleDeleteTag } from "../lib/utils";
import { useLoaderData } from "react-router-dom";

import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";

export async function loader() {
  const [tags, watchedTags] = await Promise.all([
    fetch("/api/tags").then((res) => res.json()),
    fetch("/api/users/1/watchedTags").then((res) => res.json()),
  ]);

  return {
    tags: indexBy(tags, "id"),
    watchedTags,
  };
}

export default function TagWatching() {
  const { selectedIgnoredTagIds, setSelectedIgnoredTagIds } =
    useSelectedIgnoredTagIds();
  const [pendingIgnoredTag, setPendingIgnoredTag] = useState(null);
  const [pendingWatchedTag, setPendingWatchedTag] = useState(null);
  const [isWatchedEditing, setIsWatchedEditing] = useState(false);
  const [isIgnoredEditing, setIsIgnoredEditing] = useState(false);

  let { tags, watchedTags } = useLoaderData();

  const submit = useSubmit();

  function handleAddWatchedTag() {
    if (
      pendingWatchedTag &&
      !watchedTags.includes(parseInt(pendingWatchedTag))
    ) {
      handleAddTag(pendingWatchedTag, watchedTags, submit, true);
      setPendingWatchedTag(null);
    }
  }

  function handleDeleteWatchedTag(tagId) {
    handleDeleteTag(tagId, watchedTags, submit, true);
  }

  function handleAddIgnoredTag() {
    if (
      pendingIgnoredTag &&
      !selectedIgnoredTagIds.includes(pendingIgnoredTag)
    ) {
      setSelectedIgnoredTagIds([...selectedIgnoredTagIds, pendingIgnoredTag]);
      setPendingIgnoredTag(null);
    }
  }

  function handleDeleteIgnoredTag(tagId) {
    setSelectedIgnoredTagIds(
      selectedIgnoredTagIds.filter((selectedTag) => selectedTag !== tagId)
    );
  }

  return (
    <Box
      component="main"
      sx={{
        p: 3,
        pt: 0,
        flexGrow: 0.75,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Toolbar
        disableGutters
        sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}
      >
        <Typography component="div" variant="h6">
          Tag Watching
        </Typography>
      </Toolbar>

      <Box>
        <Typography sx={{ mb: 1 }} component="div" variant="h6">
          Watched Tags
        </Typography>
        <Card sx={{ border: 1, borderColor: "grey" }}>
          <Toolbar
            sx={{
              display: "flex",
              borderBottom: isWatchedEditing ? 1 : 0,
              p: 2,
              pl: 3,
              alignItems: "center",
            }}
            disableGutters
          >
            <Typography>Stack Overflow Clone</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
            >
              {watchedTags.length === 0 ? (
                <Typography sx={{ mt: 1, mr: 1 }}>
                  There are no watched tags.
                </Typography>
              ) : (
                ""
              )}
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setIsWatchedEditing(true)}
              >
                Add a tag
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setIsWatchedEditing(false)}
              >
                Done
              </Button>
            </Box>
          </Toolbar>

          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {isWatchedEditing && watchedTags.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  options={Object.keys(tags)}
                  getOptionLabel={(option) => tags[option].name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Find a tag by name..."
                      autoFocus
                    />
                  )}
                  value={pendingWatchedTag}
                  onChange={(_event, value) => setPendingWatchedTag(value)}
                />
                <Button
                  sx={{ textTransform: "none", ml: 1 }}
                  variant="contained"
                  onClick={handleAddWatchedTag}
                >
                  Watch tag
                </Button>
              </Box>
            ) : isWatchedEditing && watchedTags.length > 0 ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Autocomplete
                    sx={{ flexGrow: 1 }}
                    options={Object.keys(tags)}
                    getOptionLabel={(option) => tags[option].name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Find a tag by name..."
                        autoFocus
                      />
                    )}
                    value={pendingWatchedTag}
                    onChange={(_event, value) => setPendingWatchedTag(value)}
                  />
                  <Button
                    sx={{ textTransform: "none", ml: 1 }}
                    variant="contained"
                    onClick={handleAddWatchedTag}
                  >
                    Watch tag
                  </Button>
                </Box>
                <Stack
                  direction="column"
                  fullWidth
                  spacing={2}
                  sx={{ mb: 1, mt: 0, p: 2, flexGrow: 1 }}
                >
                  {watchedTags.map((selectedTag) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <ClearIcon
                        fontSize="small"
                        onClick={() => handleDeleteWatchedTag(selectedTag)}
                      />
                      <Chip key={selectedTag} label={tags[selectedTag].name} />
                    </Box>
                  ))}
                </Stack>
              </>
            ) : watchedTags.length > 0 && !isWatchedEditing ? (
              <Stack
                direction="column"
                fullWidth
                spacing={2}
                sx={{ mb: 1, mt: 0, p: 2, flexGrow: 1 }}
              >
                {watchedTags.map((selectedTag) => (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <ClearIcon
                      fontSize="small"
                      onClick={() => handleDeleteWatchedTag(selectedTag)}
                    />
                    <Chip key={selectedTag} label={tags[selectedTag].name} />
                  </Box>
                ))}
              </Stack>
            ) : (
              ""
            )}
          </CardContent>

          <CardActions sx={{ borderTop: 1, display: "flex" }}>
            <Toolbar
              sx={{ display: "flex", p: 2, alignItems: "center", flexGrow: 1 }}
              disableGutters
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                  Stop sending me tag notifications
                </Typography>
                <Typography>
                  We want to keep in touch, but only in ways that you find
                  helpful.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Button sx={{ textTransform: "none" }} variant="outlined">
                  Unsubscribe from all
                </Button>
              </Box>
            </Toolbar>
          </CardActions>
        </Card>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography sx={{ mb: 1 }} component="div" variant="h6">
          Ignored Tags
        </Typography>
        <Card sx={{ border: 1, p: 0 }}>
          <Toolbar
            sx={{
              display: "flex",
              borderBottom: isIgnoredEditing ? 1 : 0,
              p: 1,
              pl: 3,
              alignItems: "center",
            }}
            disableGutters
          >
            <Typography>Stack Overflow Clone</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
            >
              {selectedIgnoredTagIds.length === 0 ? (
                <Typography sx={{ mt: 1, mr: 1 }}>
                  There are no ignored tags.
                </Typography>
              ) : (
                ""
              )}
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setIsIgnoredEditing(true)}
              >
                Add a tag
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => setIsIgnoredEditing(false)}
              >
                Done
              </Button>
            </Box>
          </Toolbar>

          <CardContent>
            {isIgnoredEditing && selectedIgnoredTagIds.length === 0 ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  options={Object.keys(tags)}
                  getOptionLabel={(option) => tags[option].name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Find a tag by name..."
                      autoFocus
                    />
                  )}
                  value={pendingIgnoredTag}
                  onChange={(_event, value) => setPendingIgnoredTag(value)}
                />
                <Button
                  sx={{ textTransform: "none", ml: 1 }}
                  variant="contained"
                  onClick={handleAddIgnoredTag}
                >
                  Ignore tag
                </Button>
              </Box>
            ) : isIgnoredEditing && selectedIgnoredTagIds.length > 0 ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Autocomplete
                    sx={{ flexGrow: 1 }}
                    options={Object.keys(tags)}
                    getOptionLabel={(option) => tags[option].name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Find a tag by name..."
                        autoFocus
                      />
                    )}
                    value={pendingIgnoredTag}
                    onChange={(_event, value) => setPendingIgnoredTag(value)}
                  />
                  <Button
                    sx={{ textTransform: "none", ml: 1 }}
                    variant="contained"
                    onClick={handleAddIgnoredTag}
                  >
                    Ignore tag
                  </Button>
                </Box>
                <Stack
                  direction="column"
                  fullWidth
                  spacing={2}
                  sx={{ mb: 1, flexGrow: 1, mt: 2, p: 2, flexGrow: 1 }}
                >
                  {selectedIgnoredTagIds.map((selectedTag) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <ClearIcon
                        fontSize="small"
                        onClick={() => handleDeleteIgnoredTag(selectedTag)}
                      />
                      <Chip key={selectedTag} label={tags[selectedTag].name} />
                    </Box>
                  ))}
                </Stack>
              </>
            ) : selectedIgnoredTagIds.length > 0 && !isIgnoredEditing ? (
              <Stack
                direction="column"
                fullWidth
                spacing={2}
                sx={{ mb: 1, mt: 0, p: 2, flexGrow: 1 }}
              >
                {selectedIgnoredTagIds.map((selectedTag) => (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <ClearIcon
                      fontSize="small"
                      onClick={() => handleDeleteIgnoredTag(selectedTag)}
                    />
                    <Chip key={selectedTag} label={tags[selectedTag].name} />
                  </Box>
                ))}
              </Stack>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
