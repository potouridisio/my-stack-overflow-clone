/* eslint-disable react/prop-types */
import { useState } from "react";
import { create } from "zustand";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export const useIgnoredTagIds = create((set) => ({
  ignoredTagIds: [],
  setIgnoredTagIds: (ignoredTagIds) => set({ ignoredTagIds }),
}));

export const useSelectedTagId = create((set) => ({
  selectedTagId: null,
  setSelectedTagId: (selectedTagId) => set({ selectedTagId }),
}));

export default function IgnoredTags({ tags }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTagId, setPendingTagId] = useState(null);
  const { ignoredTagIds, setIgnoredTagIds } = useIgnoredTagIds();
  const { setSelectedTagId } = useSelectedTagId();
  const isIgnoring = ignoredTagIds.length > 0;

  function handleChange(_event, value) {
    setPendingTagId(value);
  }

  function handleAdd() {
    if (pendingTagId) {
      setIgnoredTagIds([...ignoredTagIds, pendingTagId]);
      setPendingTagId(null);
    }
  }

  return (
    <ClickAwayListener onClickAway={() => setIsEditing(false)}>
      <Card sx={{ flexGrow: 1, height: "14rem", position: "relative" }}>
        <CardHeader
          sx={{ display: "flex" }}
          title="Ignored Tags"
          action={
            isIgnoring && (
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                }}
                onClick={() => setIsEditing(true)}
              >
                edit
              </Button>
            )
          }
        />

        <CardContent>
          <>
            <>
              {isIgnoring ? (
                <Stack direction="row" spacing={1} mb={1.5}>
                  {ignoredTagIds.map((ignoredTagId) => (
                    <Chip
                      key={ignoredTagId}
                      label={tags[ignoredTagId].name}
                      onDelete={
                        isEditing
                          ? () =>
                              setIgnoredTagIds(
                                ignoredTagIds.filter(
                                  (tagId) => tagId !== ignoredTagId
                                )
                              )
                          : null
                      }
                      onClick={() => {
                        setSelectedTagId(ignoredTagId);
                      }}
                    />
                  ))}
                </Stack>
              ) : null}
            </>
            {isEditing ? (
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Autocomplete
                    onChange={handleChange}
                    sx={{ flexGrow: 1 }}
                    options={Object.keys(tags).filter(
                      (tagId) => !ignoredTagIds.includes(tagId)
                    )}
                    getOptionLabel={(option) => tags[option].name}
                    value={pendingTagId}
                    renderInput={(params) => (
                      <TextField {...params} autoFocus variant="outlined" />
                    )}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      bgcolor: "dodgerBlue",
                      color: "white",
                    }}
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </Box>

                <>
                  {" "}
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="gray out"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="hide out"
                        control={<Radio />}
                        label="Hide questions in your ignored tags"
                      />
                      <FormControlLabel
                        value="gray out"
                        control={<Radio />}
                        label="Gray out questions in your ignored tags"
                      />
                    </RadioGroup>
                  </FormControl>
                </>
              </Box>
            ) : null}
          </>

          <>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!isEditing && !isIgnoring && (
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none", bgcolor: "#c5e0e0" }}
                  onClick={() => setIsEditing(true)}
                >
                  {" "}
                  Add an ignored tag
                </Button>
              )}
            </CardActions>
          </>
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
}
