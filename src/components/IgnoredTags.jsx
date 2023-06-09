import { useEffect, useRef, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { create } from "zustand";

const useSelectedIgnoredTags = create((set) => ({
  selectedIgnoredTags: [],
  setSelectedIgnoredTags: (selectedIgnoredTags) => set({ selectedIgnoredTags }),
}));

const useSelectedRadioButton = create((set) => ({
  selectedRadioButton: "",
  setSelectedRadioButton: (selectedRadioButton) => set({ selectedRadioButton }),
}));

export default function IgnoredTags({ tags }) {
  const [isIgnoredTag, setIsIgnoredTag] = useState(false);
  const { selectedIgnoredTags, setSelectedIgnoredTags } =
    useSelectedIgnoredTags();
  const { selectedRadioButton, setSelectedRadioButton } =
    useSelectedRadioButton();
  const ignoredTagsRef = useRef(null);

  /*useEffect(() => {
    function handleClickOutsideCard(event) {
      if (
        ignoredTagsRef.current &&
        event.target.contains(ignoredTagsRef.current)
      ) {
        setIsIgnoredTag(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutsideCard);

    return () =>
      window.removeEventListener("mousedown", handleClickOutsideCard);
  });*/

  return (
    <ClickAwayListener onClickAway={() => setIsIgnoredTag(false)}>
      <Card sx={{ flexGrow: 1 }} ref={ignoredTagsRef}>
        <CardHeader title="Ignored Tags" />
        <CardContent>
          {isIgnoredTag ? (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Autocomplete
                  sx={{ flexGrow: 1 }}
                  multiple
                  options={Object.keys(tags)}
                  renderInput={(params) => <TextField {...params} />}
                  getOptionLabel={(option) => tags[option].name}
                  onChange={(_event, value) => setSelectedIgnoredTags(value)}
                />

                <Button variant="contained">Add</Button>
              </Box>

              <RadioGroup
                sx={{ mt: 2 }}
                name="Ignored Tags Choices"
                value={selectedRadioButton}
                onChange={(e) => setSelectedRadioButton(e.target.value)}
              >
                <FormControlLabel
                  value="Hide questions in your ignored tags"
                  label={
                    <Typography sx={{ fontSize: 12 }}>
                      Hide questions in your ignored tags
                    </Typography>
                  }
                  control={<Radio />}
                />
                <FormControlLabel
                  value="Gray out questions in your ignored tags"
                  label={
                    <Typography sx={{ fontSize: 12 }}>
                      Gray out questions in your ignored tags
                    </Typography>
                  }
                  control={<Radio />}
                />
              </RadioGroup>
            </>
          ) : (
            <Button
              sx={{ textTransform: "none" }}
              variant="outlined"
              onClick={() => setIsIgnoredTag(true)}
            >
              Add an ignored tag
            </Button>
          )}
        </CardContent>
      </Card>
    </ClickAwayListener>
  );
}
