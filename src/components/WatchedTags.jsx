/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function WatchedTags({ tags }) {
  const [isEditing, setIsEditing] = useState(false);

  const [pendingTag, setPendingTag] = useState(null);

  const [selectedTags, setSelectedTags] = useState([]);

  const inputRef = useRef(null);

  function handleAddTag() {
    if (pendingTag && !selectedTags.includes(pendingTag)) {
      setSelectedTags([...selectedTags, pendingTag]);
      setPendingTag(null);
    }
  }

  function handleDeleteTag(tagId) {
    setSelectedTags(
      selectedTags.filter((selectedTag) => selectedTag !== tagId)
    );
  }

  return (
    <ClickAwayListener onClickAway={() => setIsEditing(false)}>
      <Card sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#f8f9f9",
            borderBottom: 1,
            borderColor: "grey.300",
          }}
        >
          <CardHeader title="Watched Tags" />
          {!isEditing && selectedTags.length > 0 ? (
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
          {selectedTags.length > 0 ? (
            <Stack
              direction="row"
              fullWidth
              spacing={1}
              sx={{ mb: 1.5, flexGrow: 1 }}
            >
              {selectedTags.map((selectedTag) => (
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
              <Button variant="contained" onClick={handleAddTag}>
                Add
              </Button>
            </Box>
          ) : selectedTags.length === 0 ? (
            <>
              <Typography color="text.secondary" variant="body2">
                Watch tags to curate your list of questions.
              </Typography>
            </>
          ) : (
            ""
          )}
        </CardContent>

        {!isEditing && selectedTags.length === 0 ? (
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ textTransform: "none" }}
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
