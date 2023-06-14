import { useEffect, useState } from "react";
import { Form, useOutletContext, useSubmit } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useColorModeStore } from "../App";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const newUserPreferences = {
    hideLeftNavigation: formData.get("hideLeftNavigation") === "true",
    theme: parseInt(formData.get("theme")),
  };

  await fetch("/api/users/1/preferences", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserPreferences),
  });

  return {};
}

export default function Preferences() {
  const initialUserPreferences = useOutletContext();
  const [userPreferences, setUserPreferences] = useState(
    initialUserPreferences
  );
  const setMode = useColorModeStore((state) => state.setMode);
  const submit = useSubmit();

  useEffect(() => {
    setMode(userPreferences.theme === 0 ? "light" : "dark");

    const formData = new FormData();

    formData.append("theme", parseInt(userPreferences.theme));
    formData.append("hideLeftNavigation", userPreferences.hideLeftNavigation);

    submit(formData, { method: "post" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPreferences]);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value =
      target.type === "checkbox" ? target.checked : parseInt(target.value);

    setUserPreferences((prevUserPreferences) => ({
      ...prevUserPreferences,
      [name]: value,
    }));
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <Toolbar disableGutters sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography component="div" variant="h6">
          Preferences
        </Typography>
      </Toolbar>

      <Toolbar disableGutters>
        <Typography component="div" variant="subtitle1">
          Interface
        </Typography>
      </Toolbar>

      <Card>
        <Form method="post">
          <List disablePadding>
            <ListItem divider>
              <ListItemText
                id="theme-radio-buttons-group-label"
                primary="Theme"
              />
              <RadioGroup
                aria-labelledby="theme-radio-buttons-group-label"
                name="theme"
                onChange={handleChange}
                row
                value={userPreferences.theme}
              >
                {[
                  ["Light", 0],
                  ["Dark", 1],
                ].map(([label, value]) => (
                  <FormControlLabel
                    control={<Radio />}
                    key={value}
                    label={label}
                    value={value}
                  />
                ))}
              </RadioGroup>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Hide left navigation"
                secondary="When you flip this switch, the left navigation will no longer be pinned to the left of the page on Q&A sites."
              />
              <Switch
                checked={userPreferences.hideLeftNavigation}
                edge="end"
                name="hideLeftNavigation"
                onChange={handleChange}
              />
            </ListItem>
          </List>
        </Form>
      </Card>
    </Box>
  );
}
