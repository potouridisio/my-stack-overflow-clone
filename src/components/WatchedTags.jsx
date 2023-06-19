/* eslint-disable react/prop-types */
import { useState } from "react";
import { create } from "zustand";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

// eslint-disable-next-line react-refresh/only-export-components
export const useWatchedTagsStore = create((set) => ({
  unwatch: (tagId) =>
    set((state) => ({
      watchedTagIds: state.watchedTagIds.filter((id) => id !== tagId),
    })),
  watch: (tagId) =>
    set((state) => ({
      watchedTagIds: [...state.watchedTagIds, tagId],
    })),
  watchedTagIds: [],
}));

export default function WatchedTags({ tags }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTagId, setPendingTagId] = useState(null);
  const { unwatch, watch, watchedTagIds } = useWatchedTagsStore();
  const isWatching = watchedTagIds.length > 0;

  const handleAdd = () => {
    if (pendingTagId) {
      watch(pendingTagId);
      setPendingTagId(null);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleClickAway = () => {
    setIsEditing(false);
    setPendingTagId(null);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Card sx={{ flexGrow: 1 }}>
        <CardHeader title="Watched Tags" />
        <CardContent sx={{ "&:last-child": { pb: 2 } }}>
          {isWatching ? (
            <Grid container spacing={1}>
              {watchedTagIds.map((tagId) => (
                <Grid key={tagId} xs="auto">
                  <Chip
                    label={tags[tagId].name}
                    onClick={() => {}}
                    onDelete={isEditing ? () => unwatch(tagId) : null}
                  />
                </Grid>
              ))}
            </Grid>
          ) : null}
          {isEditing ? (
            <Autocomplete
              getOptionDisabled={(option) => watchedTagIds.includes(option)}
              getOptionLabel={(option) => tags[option].name}
              onChange={(_event, value) => setPendingTagId(value)}
              options={Object.keys(tags)}
              renderInput={(params) => (
                <TextField {...params} autoFocus variant="outlined" />
              )}
              sx={{ mt: isWatching ? 1.5 : undefined }}
              value={pendingTagId}
            />
          ) : null}
          {!isEditing && !isWatching ? (
            <Typography color="text.secondary" variant="body2">
              Watch tags to curate your list of questions.
            </Typography>
          ) : null}
        </CardContent>
        <CardActions>
          {isEditing ? (
            <Button onClick={handleAdd} size="small">
              Add
            </Button>
          ) : (
            <Button
              onClick={handleEdit}
              size="small"
              startIcon={isWatching ? undefined : <VisibilityIcon />}
            >
              {isWatching ? "Edit" : "Watch a tag"}
            </Button>
          )}
        </CardActions>
      </Card>
    </ClickAwayListener>
  );
}
