import { Outlet, useOutletContext } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import PageLinks from "../components/PageLinks";

const drawerWidth = 240;

export default function LeftSidebar({ variant = "permanent" }) {
  const userPreferences = useOutletContext();

  return (
    <>
      {/* Sidebar */}
      {userPreferences.hideLeftNavigation ? null : (
        <Drawer
          sx={{
            [`& .MuiDrawer-paper`]: {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            flexShrink: 0,
            width: drawerWidth,
          }}
          variant={variant}
        >
          <Toolbar />
          <PageLinks />
        </Drawer>
      )}

      {/* Main */}
      <Outlet context={userPreferences} />
    </>
  );
}
