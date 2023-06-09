import { useSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import {
  Form,
  Link,
  Outlet,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { create } from "zustand";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
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

// eslint-disable-next-line react-refresh/only-export-components
export function loader() {
  return fetch("/api/users/1/lists");
}

function validateListName(name) {
  if (!name) {
    return "List name cannot be empty.";
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();

  const newList = Object.fromEntries(formData);

  const fieldErrors = {
    name: validateListName(newList.name),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    };
  }

  const list = await fetch("/api/users/1/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newList),
  }).then((res) => res.json());

  if (list.error) {
    return {
      fieldErrors: {
        name: list.error,
      },
    };
  }

  return list;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNewListDialogStore = create((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

const drawerWidth = 240;

export default function Saves() {
  const actionData = useActionData();
  const lists = useLoaderData();
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const isReloading =
    navigation.state === "loading" &&
    navigation.formData != null &&
    navigation.formAction === navigation.location.pathname;
  const { open, setOpen } = useNewListDialogStore();
  const inputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // When the dialog is opened
    if (inputRef.current && open) {
      // Clear the input
      inputRef.current.value = "";
      // Focus on the input
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    // Close the dialog when there are no field errors and the lists are reloading
    if (!actionData?.fieldErrors && isReloading) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData, isReloading]);

  useEffect(() => {
    if (actionData?.fieldErrors?.name) {
      enqueueSnackbar(actionData.fieldErrors.name, {
        variant: "error",
      });
    }

    if (actionData?.message) {
      enqueueSnackbar(actionData.message, {
        variant: "success",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

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
                        <Form id="new-list" method="post">
                          <TextField
                            fullWidth
                            inputRef={inputRef}
                            margin="dense"
                            name="name"
                            placeholder="Enter list name"
                          />
                        </Form>
                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <LoadingButton
                          form="new-list"
                          loading={navigation.state === "submitting"}
                          type="submit"
                        >
                          Save
                        </LoadingButton>
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

              {lists.map((list) => (
                <ListItem disablePadding key={list.id}>
                  <ListItemButton>
                    <ListItemText primary={list.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Outlet />
      </Box>
    </>
  );
}
