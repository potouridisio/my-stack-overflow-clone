/* eslint-disable react/prop-types */
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";

import { useFilterStore } from "../routes/Questions";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function CustomFilters({ filters }) {
  const toggle = useFilterStore((state) => state.toggle);
  const [searchParams] = useSearchParams();
  const uqlId = searchParams.get("uqlId");

  const [customFilters, setCustomFilters] = useState(filters);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const navigate = useNavigate();

  const modalStyle = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  function handleDeleteCustomFilter(filterId) {
    const newCustomFilters = customFilters.filter(
      (filter) => filter.id !== filterId
    );
    setCustomFilters(newCustomFilters);

    fetch(`/users/1/filters/${filterId}`, {
      method: "DELETE",
    });
  }

  return (
    <Card sx={{ flexGrow: 1 }}>
      <CardHeader
        title="Custom Filters"
        sx={{ bgcolor: "#f8f9f9", borderBottom: 1, borderColor: "grey.300" }}
      />

      {customFilters.length > 0 ? (
        <List>
          {customFilters.map((filter) => {
            const isSelected = uqlId == filter.id;
            return (
              <ListItem
                disablePadding
                key={filter.id}
                onClick={() =>
                  navigate(
                    decodeURIComponent(
                      `/?sort=${filter.sortId}&filters=${filter.filterIdsCc}&tagWith=${filter.tagModeId}&uqlId=${filter.id}`
                    )
                  )
                }
                secondaryAction={
                  isSelected ? (
                    <>
                      <IconButton
                        aria-label="delete"
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmDeletion(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>

                      <IconButton
                        aria-label="edit"
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle();
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      <Modal open={confirmDeletion} hideBackdrop>
                        <Box sx={modalStyle}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Are you sure you want to delete "{filter.name}"?
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              mt: 4,
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                handleDeleteCustomFilter(filter.id);
                                setConfirmDeletion(false);
                              }}
                            >
                              OK
                            </Button>
                            <Button
                              variant="outlined"
                              sx={{ ml: 2 }}
                              onClick={() => setConfirmDeletion(false)}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    </>
                  ) : null
                }
              >
                <ListItemButton
                  component={Link}
                  selected={isSelected}
                  to={`?uqlId=${filter.id}`}
                >
                  <ListItemText primary={filter.name} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : null}
      <Divider />
      <List>
        <ListItemButton onClick={toggle}>
          <ListItemText primary="Create a custom filter" />
        </ListItemButton>
      </List>
    </Card>
  );
}
