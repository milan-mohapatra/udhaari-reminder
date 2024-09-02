import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useUserValue } from "../hooks/useUser.jsx";
import { ADMIN } from "../utils/constant.mjs";

const Navbar = () => {
  const { state } = useUserValue();

  return (
    <AppBar component={"nav"} position="sticky" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h6">HOME</Typography>
        </Link>
        {state.role === ADMIN ? (
          <Link
            to={"/admin"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography variant="h6">DASHBOARD</Typography>
          </Link>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
