import { useState } from "react";
import {
  Form,
  useNavigation,
  useOutletContext,
  useSubmit,
} from "react-router-dom";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
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

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const newUserPreferences = {
    theme: formData.get("theme") === "light" ? 0 : 1,
    hideLeftNavigation: formData.get("hideLeftNavigation") === "on",
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
  const navigation = useNavigation();
  const isReloading =
    navigation.state === "loading" &&
    navigation.formData != null &&
    navigation.formAction === navigation.location.pathname;
  const userPreferences = useOutletContext();
  const [theme, setTheme] = useState(
    userPreferences.theme === 0 ? "light" : "dark"
  );
  const [hideLeftNavigation, setHideLeftNavigation] = useState(
    userPreferences.hideLeftNavigation
  );
  const submit = useSubmit();

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar
          disableGutters
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
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
          <Form method="post" onChange={(event) => submit(event.currentTarget)}>
            <List disablePadding>
              <ListItem divider>
                <ListItemText
                  id="theme-radio-buttons-group-label"
                  primary="Theme"
                />
                <RadioGroup
                  aria-labelledby="theme-radio-buttons-group-label"
                  name="theme"
                  onChange={(event) => setTheme(event.target.value)}
                  row
                  value={theme}
                >
                  {[
                    ["Light", "light"],
                    ["Dark", "dark"],
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
                  checked={hideLeftNavigation}
                  edge="end"
                  name="hideLeftNavigation"
                  onChange={(event) =>
                    setHideLeftNavigation(event.target.checked)
                  }
                />
              </ListItem>
            </List>
          </Form>
        </Card>
      </Box>

      <Backdrop
        open={navigation.state === "submitting" || isReloading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
