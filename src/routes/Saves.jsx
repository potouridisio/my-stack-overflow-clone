import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

const drawerWidth = 240;

export default function Saves() {
  const { pathname } = useLocation();
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (inputRef.current && open) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Saves for John Doe - Stack Overflow Clone</title>
      </Helmet>

      <Box sx={{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer
          PaperProps={{ sx: { position: "relative" } }}
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
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  selected={pathname === "/users/1/saves"}
                  to="/users/1/saves"
                >
                  <ListItemText primary="All saves" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      aria-label="add"
                      edge="end"
                      onClick={handleClickOpen}
                    >
                      <AddIcon />
                    </IconButton>

                    <Dialog
                      fullWidth
                      keepMounted
                      maxWidth="xs"
                      onClose={handleClose}
                      open={open}
                    >
                      <DialogTitle>
                        New list
                        <IconButton
                          aria-label="close"
                          onClick={handleClose}
                          sx={{
                            color: (theme) => theme.palette.grey[500],
                            position: "absolute",
                            right: 8,
                            top: 8,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </DialogTitle>

                      <DialogContent>
                        <TextField
                          fullWidth
                          inputRef={inputRef}
                          margin="dense"
                          name="name"
                          placeholder="Enter list name"
                        />
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Save</Button>
                      </DialogActions>
                    </Dialog>
                  </>
                }
              >
                <ListItemText
                  secondary="My lists"
                  secondaryTypographyProps={{ fontWeight: "fontWeightMedium" }}
                />
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="My first list" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Outlet />
      </Box>
    </>
  );
}
