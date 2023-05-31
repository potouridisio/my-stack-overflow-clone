import { Outlet, useMatches } from "react-router-dom";

import Box from "@mui/material/Box";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

const drawerWidth = 240;

export const handle = {
  advice: () => {
    <Box>
      <Card>
        <CardHeader>Writing a good title</CardHeader>
        <CardContent>
          <BorderColorOutlinedIcon></BorderColorOutlinedIcon>
          <Box>
            <p>Your title should summarize the problem.</p>
            <p>
              You might find that you have a better idea of your title after
              writing out the rest of the question.
            </p>
          </Box>
        </CardContent>
      </Card>
    </Box>;
  },
};

export default function Sidebar() {
  const matches = useMatches();

  console.log({ matches });
  return (
    <>
      <Outlet />

      {/* Sidebar */}
      <Drawer
        anchor="right"
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          flexShrink: 0,
          width: drawerWidth,
        }}
        variant="permanent"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }} />
      </Drawer>
    </>
  );
}
