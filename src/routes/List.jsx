import { useEffect, useRef, useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// eslint-disable-next-line react-refresh/only-export-components
export function loader({ params }) {
  return fetch(`/api/users/1/lists/${params.listId}`);
}

export default function List() {
  const list = useLoaderData();
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // When the dialog is opened
    if (inputRef.current && open) {
      // Focus on the input
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
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar disableGutters>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
          {list.name}
        </Typography>

        <Button
          onClick={handleClickOpen}
          startIcon={<EditIcon />}
          variant="outlined"
        >
          Edit list
        </Button>

        <Dialog
          fullWidth
          keepMounted
          maxWidth="xs"
          onClose={handleClose}
          open={open}
        >
          <DialogTitle>
            Edit list
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
            <Form id="edit-list" method="post">
              <TextField
                defaultValue={list.name}
                fullWidth
                inputRef={inputRef}
                key={list.name}
                margin="dense"
                name="name"
              />
            </Form>
          </DialogContent>

          <DialogActions>
            <Button>Delete list</Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleClose}>Cancel</Button>
            <Button form="edit-list" type="submit">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>

      <Toolbar disableGutters>
        <Typography component="div" variant="subtitle1">
          0 saved items
        </Typography>
      </Toolbar>
    </Box>
  );
}
