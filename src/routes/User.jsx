import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);

    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export default function User() {
  const routeMatch = useRouteMatch(["/users/1/saves", "/users/1/*"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={currentTab}>
          <Tab
            component={Link}
            label="Saves"
            to="saves"
            value="/users/1/saves"
          />
          <Tab
            component={Link}
            label="Settings"
            to="preferences"
            value="/users/1/*"
          />
        </Tabs>
      </Box>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
