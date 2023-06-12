/* eslint-disable react/prop-types */
import { Link, useSearchParams } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
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
              <ListItem disablePadding key={filter.id}>
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
      <CardActions>
        <Button onClick={toggle} size="small">
          Create a custom filter
        </Button>
      </CardActions>
    </Card>
  );
}
