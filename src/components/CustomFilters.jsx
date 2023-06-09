/* eslint-disable react/prop-types */
import { Link, useSearchParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useFilterStore } from "../routes/Questions";

export default function CustomFilters({ filters }) {
  const toggle = useFilterStore((state) => state.toggle);
  const [searchParams] = useSearchParams();
  const uqlId = searchParams.get("uqlId");

  return (
    <Card sx={{ flexGrow: 1 }}>
      <CardHeader title="Custom Filters" />
      {filters.length > 0 ? (
        <List>
          {filters.map((filter) => {
            const isSelected = uqlId == filter.id;

            return (
              <ListItem
                disablePadding
                key={filter.id}
                secondaryAction={
                  isSelected ? (
                    <>
                      <IconButton aria-label="delete" edge="end">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
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
