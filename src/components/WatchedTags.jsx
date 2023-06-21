/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import { useSubmit } from "react-router-dom";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import LoadingButton from "@mui/lab/LoadingButton";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { grey } from "@mui/material/colors";

export default function WatchedTags({ tags, watchedTags }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTag, setPendingTag] = useState(null);
  const submit = useSubmit();
  const inputRef = useRef(null);

  function handleAddTag() {
    if (pendingTag) {
      const formData = new FormData();
      const newWatchedTags = [...watchedTags, pendingTag];
      formData.append("watchedTags", newWatchedTags.join(","));
      submit(formData, { action: "/save-watched-tags", method: "post" });
      setPendingTag(null);
    }
  }

  function handleDeleteTag(tagId) {
    const formData = new FormData();
    const newWatchedTags = watchedTags.filter(
      (selectedTag) => selectedTag !== tagId
    );
    formData.append("watchedTags", newWatchedTags.join(","));
    submit(formData, { action: "/save-watched-tags", method: "post" });
  }

  return (
    <ClickAwayListener onClickAway={() => setIsEditing(false)}>
      <Card sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "#f8f9f9" : grey[900],
            borderBottom: 1,
            borderColor: (theme) =>
              theme.palette.mode === "light" ? "grey.300" : grey[900],
            borderBottom: 1,
          }}
        >
          <CardHeader title="Watched Tags" />
          {!isEditing && watchedTags.length > 0 ? (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => setIsEditing(true)}
            >
              edit
            </Button>
          ) : (
            ""
          )}
        </Box>

        <CardContent>
          {watchedTags.length > 0 ? (
            <Stack
              direction="row"
              fullWidth
              spacing={1}
              sx={{ mb: 1.5, flexGrow: 1 }}
            >
              {watchedTags.map((selectedTag) => (
                <Chip
                  key={selectedTag}
                  label={tags[selectedTag].name}
                  onDelete={isEditing ? () => handleDeleteTag(selectedTag) : ""}
                />
              ))}
            </Stack>
          ) : (
            ""
          )}

          {isEditing ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Autocomplete
                ref={inputRef}
                sx={{ flexGrow: 1 }}
                options={Object.keys(tags)}
                getOptionLabel={(option) => tags[option].name}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" autoFocus />
                )}
                value={pendingTag}
                onChange={(_event, value) => setPendingTag(value)}
              />
              <LoadingButton variant="contained" onClick={handleAddTag}>
                Add
              </LoadingButton>
            </Box>
          ) : watchedTags.length === 0 ? (
            <>
              <Typography color="text.secondary" variant="body2">
                Watch tags to curate your list of questions.
              </Typography>
            </>
          ) : (
            ""
          )}
        </CardContent>

        {!isEditing && watchedTags.length === 0 ? (
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ textTransform: "none", mb: 1 }}
              variant="contained"
              onClick={() => setIsEditing(true)}
              size="medium"
              startIcon={<VisibilityIcon />}
            >
              Watch a tag
            </Button>
          </CardActions>
        ) : (
          ""
        )}
      </Card>
    </ClickAwayListener>
  );
}
