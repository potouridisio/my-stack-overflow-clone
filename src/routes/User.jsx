import { Link, Outlet, useOutletContext } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Toolbar from "@mui/material/Toolbar";
import PersonIcon from "@mui/icons-material/Person";

import Typography from "@mui/material/Typography";

import CakeIcon from "@mui/icons-material/Cake";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import InsertCommentIcon from "@mui/icons-material/InsertComment";

const tabClass = {
  borderRadius: "40%",
  mr: 2,
  padding: 1,
  textTransform: "none",
};

export default function User() {
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, mt: 2, ml: 2 }}>
        <Toolbar />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex" }}>
            <PersonIcon sx={{ fontSize: 140 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: 23 }}>John Doe</Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <CakeIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontSize: 14, mr: 2 }}>
                  Member for 1 year
                </Typography>
                <WatchLaterIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontSize: 14, mr: 2 }}>
                  Last seen this week
                </Typography>
                <Button
                  sx={{
                    p: 0,
                    color: "black",
                    fontWeight: 400,
                    textTransform: "none",
                  }}
                  title="Click to view daily visit calendar"
                >
                  <CalendarMonthIcon
                    sx={{ fontSize: 20, color: "black", mr: 2 }}
                  />
                  Visited 23 days, 20 consecutive
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexGrow: 1,
                mr: 2,
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <Button sx={{ border: 1, color: "black" }}>
                <EditIcon sx={{ fontSize: 20, mr: 1 }} />
                <Link to={"users/1/edit"} style={{ textDecoration: "none" }}>
                  Edit profile
                </Link>
              </Button>
              <Button sx={{ border: 1, color: "black" }}>
                <InsertCommentIcon
                  sx={{ fontSize: 20, color: "blue", mr: 1 }}
                />
                <Link
                  to={"https://stackexchange.com/"}
                  style={{ textDecoration: "none" }}
                >
                  Network profile
                </Link>
              </Button>
            </Box>
          </Box>

          <Tabs>
            <Link to={"users/1/John-Doe"}>
              <Tab label="Profile" value="profile" sx={tabClass} />
            </Link>
            <Link to={"users/1/John-Doe"}>
              <Tab label="Activity" value="activity" sx={tabClass} />
            </Link>
            <Link to={"users/1/saves/all"}>
              <Tab label="Saves" value="saves" sx={tabClass} />
            </Link>
            <Link to={"users/1"}>
              <Tab label="Settings" value="settings" sx={tabClass} />
            </Link>
          </Tabs>
        </Box>

        <Outlet context={useOutletContext()} />
      </Box>
    </>
  );
}
