import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { serverURL } from "../utils/constant.mjs";
import { useUserValue } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const saveTokenInLocalDrive = (token) => {
  localStorage.setItem("authToken", token);
};

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);

  const { dispatch } = useUserValue();

  const navigate = useNavigate();

  const toggleAuth = () => {
    setToggle((prev) => !prev);
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${serverURL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;

      saveTokenInLocalDrive(token);
      dispatch({ type: "login", payload: token });
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const signup = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${serverURL}/auth/signup`, {
        name,
        email,
        password,
      });
      const token = response.data.token;
      saveTokenInLocalDrive(token);
      dispatch({ type: "signup", payload: token });
      navigate("/");
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {toggle ? (
          <>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="contained" onClick={signup}>
              signup
            </Button>

            <Typography
              variant="caption"
              component={"div"}
              onClick={toggleAuth}
              sx={{ cursor: "pointer" }}
            >
              Already have an account?
            </Typography>
          </>
        ) : (
          <>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="contained" onClick={login}>
              login
            </Button>

            <Typography
              variant="caption"
              component={"div"}
              sx={{ cursor: "pointer" }}
              onClick={toggleAuth}
            >
              New to Udhaari Reminder?
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Auth;
