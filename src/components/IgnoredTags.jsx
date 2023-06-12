/* eslint-disable react/prop-types */
import { useState } from "react";

// import VisibilityIcon from "@mui/icons-material/Visibility";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";

export default function IgnoredTags({ tags }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card sx={{ flexGrow: 1, height: "13rem" }}>
      <CardHeader title="Ignored Tags" />
      <CardContent>
        {isEditing ? (
          <>
            <Box sx={{ display: "flex" }}>
              <Autocomplete
                sx={{ flexGrow: 1 }}
                options={Object.keys(tags)}
                getOptionLabel={(option) => tags[option].name}
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
        ) : (
          <></>
        )}
      </CardContent>
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
    </Card>
  );
}
