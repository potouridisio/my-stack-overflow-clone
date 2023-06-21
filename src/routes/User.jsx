import { Outlet, useOutletContext, useLoaderData } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export async function loader({ params }) {
  const user = await fetch(`/api/users/${params.userId}`).then((res) =>
    res.json()
  );

  return user;
}

export default function User() {
  const user = useLoaderData();

  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Card>
        <CardContent>
          <Typography variant="h4">{user.name}</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <LocationOnIcon sx={{ mt: 0.4 }} />
            <Typography variant="h5">{user.location}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={0}>
          <Tab label="Settings" />
        </Tabs>
      </Box>

      <Outlet context={useOutletContext()} />
    </Box>
  );
}
