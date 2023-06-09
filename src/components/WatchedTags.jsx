/* eslint-disable react/prop-types */
import { useState } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function WatchedTags({ tags }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setIsEditing(false)}>
      <Card sx={{ flexGrow: 1 }}>
        <CardHeader title="Watched Tags" />
        <CardContent>
          {isEditing ? (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                options={Object.keys(tags)}
                getOptionLabel={(option) => tags[option].name}
                renderInput={(params) => (
                  <TextField {...params} autoFocus variant="outlined" />
                )}
              />

              <Button variant="contained">Add</Button>
            </Box>
          ) : (
            <>
              <Typography color="text.secondary" variant="body2">
                Watch tags to curate your list of questions.
              </Typography>
            </>
          )}
        </CardContent>
        <CardActions>
          {isEditing ? (
            <Button size="small">Add</Button>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              size="small"
              startIcon={<VisibilityIcon />}
            >
              Watch a tag
            </Button>
          )}
        </CardActions>
      </Card>
    </ClickAwayListener>
  );
}
