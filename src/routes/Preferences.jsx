import { create } from "zustand";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react-refresh/only-export-components
export const usePreferencesStore = create((set) => ({
  colorMode: "light",
  hideLeftNavigation: false,
  setColorMode: (colorMode) => set({ colorMode }),
  toggleLeftNavigation: () =>
    set((state) => ({ hideLeftNavigation: !state.hideLeftNavigation })),
}));

export default function Preferences() {
  const { colorMode, hideLeftNavigation, setColorMode, toggleLeftNavigation } =
    usePreferencesStore();

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
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Theme</FormLabel>
            <RadioGroup
              name="theme"
              onChange={(_event, value) => setColorMode(value)}
              value={colorMode}
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
          </FormControl>

          <List>
            <ListItem>
              <ListItemText
                primary="Hide left navigation"
                secondary="When you flip this switch, the left navigation will no longer be pinned to the left of the page on Q&A sites."
              />
              <Switch
                edge="end"
                onChange={toggleLeftNavigation}
                value={hideLeftNavigation}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
