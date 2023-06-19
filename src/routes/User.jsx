import { Outlet, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";

export default function User() {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={0}>
          <Tab label="Settings" />
        </Tabs>
      </Box>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
