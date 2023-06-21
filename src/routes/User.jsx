import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";

export default function User() {
  const { pathname } = useLocation();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (pathname.includes("saves")) {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [pathname]);

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value}>
          <Tab component={Link} label="Saves" to="saves" />
          <Tab component={Link} label="Settings" to="preferences" />
        </Tabs>
      </Box>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
