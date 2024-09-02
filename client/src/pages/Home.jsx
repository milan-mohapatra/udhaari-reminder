import { Box, Button, Container, Paper, TextField } from "@mui/material";
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserValue } from "../hooks/useUser.jsx";
import { jwtDecode } from "jwt-decode";
import { ADMIN, serverURL } from "../utils/constant.mjs";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { state, dispatch } = useUserValue();

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${serverURL}/borrowers/email`,
        {
          borrowerName: name,
          borrowerEmail: email,
          borrowingAmount: amount,
          yourMessage: message,
        },
        { headers: { Authorization: state.token } }
      );

      alert("email sent successfully");

      setAmount(0);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchAllUser = async (token) => {
    try {
      const users = await axios.get(`${serverURL}/admin/users`, {
        headers: { Authorization: token },
      });

      dispatch({ type: "getAllUsersAdmin", payload: users.data });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    
    if (token) {
      dispatch({ type: "login", payload: token });

      const tokenPayload = jwtDecode(token);
      dispatch({ type: "assignRole", payload: tokenPayload.role });

      if (tokenPayload.role === ADMIN) {
        fetchAllUser(token);
      }
    } else {
      navigate("/auth");
    }
  }, [navigate, dispatch]);

  return (
    <Container
      component={"main"}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Navbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Paper
          elevation={4}
          component={"form"}
          onSubmit={submitForm}
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Borrower Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Borrower Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Borrowing Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Any Message (optional)"
            multiline
            maxRows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="contained">
            submit
          </Button>
        </Paper>
      </Box>

      {state.isAuthenticated ? (
        <Button
          variant="contained"
          sx={{ position: "absolute", marginX: "45%", marginY: "60%" }}
          onClick={logout}
        >
          logout
        </Button>
      ) : null}
    </Container>
  );
};

export default Home;
