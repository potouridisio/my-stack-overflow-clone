import { useEffect, useRef, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { create } from "zustand";
import { CardActions } from "@mui/material";

export const useSelectedIgnoredTagIds = create((set) => ({
  selectedIgnoredTagIds: [],
  setSelectedIgnoredTagIds: (selectedIgnoredTagIds) =>
    set({ selectedIgnoredTagIds }),
}));

export const useSelectedRadioButton = create((set) => ({
  selectedRadioButton: "",
  setSelectedRadioButton: (selectedRadioButton) => set({ selectedRadioButton }),
}));

export default function IgnoredTags({ tags }) {
  const [isIgnoredTag, setIsIgnoredTag] = useState(false);
  const { selectedIgnoredTagIds, setSelectedIgnoredTagIds } =
    useSelectedIgnoredTagIds();
  const { selectedRadioButton, setSelectedRadioButton } =
    useSelectedRadioButton();
  const [pendingTag, setPendingTag] = useState(null);

  function handleAddTag() {
    if (pendingTag && !selectedIgnoredTagIds.includes(pendingTag)) {
      setSelectedIgnoredTagIds([...selectedIgnoredTagIds, pendingTag]);
      setPendingTag(null);
    }
  }

  function handleDeleteTag(tagId) {
    setSelectedIgnoredTagIds(
      selectedIgnoredTagIds.filter((selectedTag) => selectedTag !== tagId)
    );
  }

  return (
    <ClickAwayListener onClickAway={() => setIsIgnoredTag(false)}>
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
          <CardHeader title="Ignored Tags" />
          {!isIgnoredTag && selectedIgnoredTagIds.length > 0 ? (
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => setIsIgnoredTag(true)}
            >
              edit
            </Button>
          ) : (
            ""
          )}
        </Box>
        <CardContent>
          {selectedIgnoredTagIds.length > 0 ? (
            <Stack
              direction="row"
              fullWidth
              spacing={1}
              sx={{ mb: 1.5, flexGrow: 1 }}
            >
              {selectedIgnoredTagIds.map((selectedTag) => (
                <Chip
                  key={selectedTag}
                  label={tags[selectedTag].name}
                  onDelete={
                    isIgnoredTag ? () => handleDeleteTag(selectedTag) : ""
                  }
                />
              ))}
            </Stack>
          ) : (
            ""
          )}

          {isIgnoredTag ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  options={Object.keys(tags)}
                  renderInput={(params) => <TextField {...params} autoFocus />}
                  getOptionLabel={(option) => tags[option].name}
                  onChange={(_event, value) => setPendingTag(value)}
                  value={pendingTag}
                />

                <Button variant="contained" onClick={handleAddTag}>
                  Add
                </Button>
              </Box>

              <RadioGroup
                sx={{ mt: 2 }}
                name="Ignored Tags Choices"
                defaultValue="Gray out questions in your ignored tags"
              >
                <FormControlLabel
                  value="Hide questions in your ignored tags"
                  label={
                    <Typography sx={{ fontSize: 12 }}>
                      Hide questions in your ignored tags
                    </Typography>
                  }
                  control={<Radio />}
                  onChange={(e) => setSelectedRadioButton(e.target.value)}
                />
                <FormControlLabel
                  value="Gray out questions in your ignored tags"
                  label={
                    <Typography sx={{ fontSize: 12 }}>
                      Gray out questions in your ignored tags
                    </Typography>
                  }
                  control={<Radio />}
                  onChange={(e) => setSelectedRadioButton(e.target.value)}
                />
              </RadioGroup>
            </>
          ) : (
            ""
          )}
        </CardContent>

        {!isIgnoredTag && selectedIgnoredTagIds.length === 0 ? (
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ textTransform: "none", mb: 1 }}
              variant="contained"
              onClick={() => setIsIgnoredTag(true)}
            >
              Add an ignored tag
            </Button>
          </CardActions>
        ) : (
          ""
        )}
      </Card>
    </ClickAwayListener>
  );
}
