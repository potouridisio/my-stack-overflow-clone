import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";

export default function User() {
  const { pathname } = useLocation();

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={pathname}>
          {[["Settings", "/users/1/preferences"]].map(([title, url]) => (
            <Tab
              component={Link}
              key={url}
              label={title}
              to={url}
              value={url}
            />
          ))}
        </Tabs>
      </Box>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
