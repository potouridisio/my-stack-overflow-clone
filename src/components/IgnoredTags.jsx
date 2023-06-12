/* eslint-disable react/prop-types */
import { useState } from "react";
import { create } from "zustand";

// import VisibilityIcon from "@mui/icons-material/Visibility";
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
// import ClickAwayListener from "@mui/base/ClickAwayListener";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";

export const useSelectedTagIds = create((set) => ({
  selectedTagIds: [],
  setSelectedTagIds: (selectedTagIds) => set({ selectedTagIds }),
}));

export default function IgnoredTags({ tags }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pendingTagId, setPendingTagId] = useState(null);
  const { selectedTagIds, setSelectedTagIds } = useSelectedTagIds();
  // const [open, setOpen] = useState(true);

  function handleChange(_event, value) {
    setPendingTagId(value);
  }

  function handleAdd() {
    if (pendingTagId) {
      setSelectedTagIds([...selectedTagIds, pendingTagId]);
      setPendingTagId(null);
    }
  }

  return (
    <Card sx={{ flexGrow: 1, height: "14rem" }}>
      <CardHeader title="Ignored Tags">
        {/*
          <Button variant="text" sx={{ textTransform: "none" }}>
            edit
          </Button>
        )} */}
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <>
            <>
              {selectedTagIds.length > 0 ? (
                <Stack direction="row" spacing={1} mb={1.5}>
                  {selectedTagIds.map((selectedTagId) => (
                    <Chip
                      key={selectedTagId}
                      label={tags[selectedTagId].name}
                      onDelete={() =>
                        setSelectedTagIds(
                          selectedTagIds.filter(
                            (tagId) => tagId !== selectedTagId
                          )
                        )
                      }
                    />
                  ))}
                </Stack>
              ) : null}
            </>

            {/* <ClickAwayListener onClickAway={() => setOpen(false)}>
              {open && ( */}
            <>
              <Box sx={{ display: "flex" }}>
                <Autocomplete
                  onChange={handleChange}
                  sx={{ flexGrow: 1 }}
                  options={Object.keys(tags).filter(
                    (tagId) => !selectedTagIds.includes(tagId)
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
            </>
            {/* )}
            </ClickAwayListener> */}
          </>
        ) : (
          <>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!isEditing && (
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
        )}
      </CardContent>
    </Card>
  );
}
