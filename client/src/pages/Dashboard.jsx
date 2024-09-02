import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar.jsx";
import { stringAvatar } from "../utils/avatar.jsx";
import { useUserValue } from "../hooks/useUser.jsx";
import axios from "axios";
import { serverURL } from "../utils/constant.mjs";

const Dashboard = () => {
  const { state, dispatch } = useUserValue();

  const deleteUser = async (_id) => {
    try {
      await axios.delete(`${serverURL}/admin/users/${_id}`, {
        headers: { Authorization: state.token },
      });
      dispatch({ type: "deleteAUserAdmin", payload: _id });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Container
      component={"main"}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          height: "100%",
          flexWrap: "wrap",
          padding: "3rem",
        }}
      >
        {state.users.map((user) => (
          <Paper
            elevation={2}
            key={user._id}
            sx={{
              padding: "1rem",
              margin: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 1
            }}
          >
            <Avatar {...stringAvatar(user.name)} />
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="caption">{user.email}</Typography>
            <Button
              variant={"contained"}
              size="small"
              onClick={() => deleteUser(user._id)}
            >
              delete
            </Button>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;