import { useState } from "react";

import { Form } from "react-router-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export default function DeleteUser() {
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <Box component="main" sx={{ p: 3, pt: 2, flexGrow: 0.75 }}>
      <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography component="div" variant="h6">
          Delete Profile
        </Typography>
      </Toolbar>
      <Toolbar disableGutters>
        <Typography sx={{ fontSize: 16 }}>
          Before confirming that you would like your profile deleted, we'd like
          to take a moment to explain the implications of deletion:
        </Typography>
      </Toolbar>
      <List sx={{ listStyleType: "disc", pl: 6 }}>
        <ListItem sx={{ display: "list-item" }}>
          Deletion is irreversible, and you will have no way to regain any of
          your original content, should this deletion be carried out and you
          change your mind later on.
        </ListItem>
        <ListItem sx={{ display: "list-item" }}>
          Your questions and answers will remain on the site, but will be
          disassociated and anonymized (the author will be listed as
          "userJohnDoe") and will not indicate your authorship even if you later
          return to the site.
        </ListItem>
      </List>

      <Typography sx={{ mt: 4, mb: 4 }}>
        Confirming deletion will only delete your profile on Stack Overflow - it
        will not affect any of your other profiles on the Stack Exchange
        network. If you want to delete multiple profiles, you'll need to visit
        each site separately and request deletion of those individual profiles.
      </Typography>

      <Form
        method="post"
        style={{ display: "flex", flexDirection: "column", gap: 32 }}
      >
        <FormControlLabel
          sx={{ flexGrow: 1 }}
          control={
            <Checkbox
              sx={{ p: 0, mr: 2 }}
              checked={checked}
              onChange={handleChange}
            />
          }
          label="I have read the information stated above and understand the implications of having my 
                            profile deleted. I wish to proceed with the deletion of my profile."
        ></FormControlLabel>
        <Button
          sx={{ opacity: !checked ? 0.5 : 1, border: 1, inlineSize: 200, p: 1 }}
          type={checked ? "submit" : "button"}
          variant="contained"
        >
          Delete Profile
        </Button>
      </Form>
    </Box>
  );
}
