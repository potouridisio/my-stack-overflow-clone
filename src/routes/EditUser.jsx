import { useRef, useEffect, useState } from "react";

import {
  Form,
  useNavigation,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import { Helmet } from "react-helmet";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

async function loader({ params }) {
  const user = await fetch(`/api/users/${params.userId}`).then((res) =>
    res.json()
  );

  return user;
}

function validateUserName(name) {
  if (!name) {
    return "• Name is missing!";
  } else if (name.length < 3) {
    return "• Display name must be at least 3 characters.";
  }
}

export async function action({ params, request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const location = formData.get("location");

  const errors = {
    name: validateUserName(name),
  };

  if (Object.values(errors).some(Boolean)) {
    return errors;
  }

  await fetch(`/api/users/${params.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      location: location,
    }),
  });

  return {};
}

export default function EditUser() {
  const user = useLoaderData();
  const navigation = useNavigation();
  const errors = useActionData();
  const inputRef = useRef(null);
  const [userName, setUserName] = useState(user?.name);
  const [userLocation, setUserLocation] = useState(user?.location);

  function handleChange(event) {
    event.target.name === "name"
      ? setUserName(event.target.value)
      : setUserLocation(event.target.value);
  }

  useEffect(() => {
    errors?.name && inputRef.current.focus();
  }, [errors]);

  return (
    <>
      <Helmet>
        <title>User - {user?.name} - Edit - Stack Overflow Clone</title>
      </Helmet>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar disableGutters>
          <Typography component="div" variant="h6">
            Edit your profile
          </Typography>
        </Toolbar>

        <Card>
          <CardHeader title="Public information" />

          <CardContent>
            <Stack component={Form} spacing={2} method="put" id="edit-user">
              <TextField
                autoFocus
                label="Name"
                name="name"
                error={errors?.name && true}
                ref={inputRef}
                onChange={handleChange}
                value={userName}
              />

              <TextField
                label="Location"
                name="location"
                onChange={handleChange}
                value={userLocation}
              />
            </Stack>

            {errors?.name ? (
              <Box>
                <Typography color="error" sx={{ mt: 2 }} variant="body2">
                  Oops! There was a problem updating your profile:
                </Typography>
                <Typography color="error" sx={{ mt: 2 }} variant="body2">
                  {" "}
                  {errors.name}
                </Typography>
              </Box>
            ) : null}
          </CardContent>

          <CardActions>
            <LoadingButton
              form="edit-user"
              loading={navigation.state === "submitting"}
              size="small"
              type="submit"
            >
              Save profile
            </LoadingButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
