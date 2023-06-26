import { Helmet } from "react-helmet";
import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";

function validateProfileName(name) {
  if (!name) {
    return "Name is missing.";
  }

  if (name.length < 3) {
    return `Name must be at least 3 characters; you entered ${name.length}.`;
  }
}

function validateProfileTitle(title) {
  if (!title) {
    return "Title is missing.";
  }

  if (title.length < 2) {
    return "Title must be at least 2 characters.";
  }
}

function validateProfileLocation(location) {
  if (!location) {
    return "Location is missing.";
  }
}

export async function action({ params, request }) {
  const formData = await request.formData();

  const userInformation = {
    name: formData.get("name"),
    location: formData.get("location"),
    title: formData.get("title"),
    reputation: formData.get("reputation"),
    about: formData.get("about"),
  };

  const fieldErrors = {
    name: validateProfileName(userInformation.name),
    location: validateProfileLocation(userInformation.location),
    title: validateProfileTitle(userInformation.title),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return {
      fieldErrors,
    };
  }

  await fetch(`/api/users/${params.userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userInformation),
  });

  return {};
}

export default function EditUser() {
  const { user } = useOutletContext();
  const actionData = useActionData();
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    name: user?.name,
    location: user?.location,
    reputation: user?.reputation,
    title: user?.title,
    about: user?.about,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.name === "reputation") {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Helmet>
        <title>{`User - ${userInfo.name} - Edit - Stack Overflow Clone`}</title>
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
            <Stack component={Form} id="edit-user" method="post" spacing={2}>
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                autoFocus
                error={!!actionData?.fieldErrors?.name}
                helperText={
                  actionData?.fieldErrors?.name || "Include your name"
                }
                label="Name"
                name="name"
                value={userInfo.name}
                onChange={handleChange}
              />
              <InputLabel htmlFor="location">Location</InputLabel>
              <TextField
                error={!!actionData?.fieldErrors?.location}
                helperText={
                  actionData?.fieldErrors?.location || "Include your location"
                }
                label="Location"
                name="location"
                value={userInfo.location}
                onChange={handleChange}
              />

              <InputLabel htmlFor="title">Title</InputLabel>
              <TextField
                error={!!actionData?.fieldErrors?.title}
                helperText={
                  actionData?.fieldErrors?.title ||
                  "Be specific with your title"
                }
                placeholder="No title has been set"
                label="title"
                name="title"
                value={userInfo.title}
                onChange={handleChange}
              />

              <InputLabel htmlFor="reputation">Reputation</InputLabel>
              <TextField
                helperText="Your reputation"
                label="reputation"
                name="reputation"
                value={userInfo.reputation}
                onChange={handleChange}
              />

              <InputLabel htmlFor="about">About me</InputLabel>

              <TextField
                helperText="Include all the information that describes you"
                label="About"
                multiline
                name="about"
                rows={8}
              />
            </Stack>
          </CardContent>

          <CardActions>
            <LoadingButton
              form="edit-user"
              loading={navigation.state === "submitting"}
              size="small"
              type="submit"
            >
              Save Profile
            </LoadingButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
