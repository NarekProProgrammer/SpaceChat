import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { getRem, getSnackbar, setLog, setRem, setSnackbar, setUser } from "../userReducer";
import {useDispatch, useSelector} from "react-redux";
import MySnackbar from "./mySnackbar.jsx";

const theme = createTheme();

export default function SignIn(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const rememberMe = useSelector(getRem);
  const snackbar = useSelector(getSnackbar);

  const handleSubmit = (event) => {
    event.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch(setUser(user));
    dispatch(setLog(true));
    if(rememberMe) {
      localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    }
    props.setA(a => a + 1);
    dispatch(setSnackbar({
      show: true,
      message: "Signed in successfully!",
      type: "success",
    }));
  })
  .catch((error) => {
    const errorCode = error.code;
    switch(errorCode) {
      case "auth/wrong-password":
        dispatch(setSnackbar({
      show: true,
      message: "Your password is incorrect. Please try again!",
      type: "error",
    }));
        break;
      case "auth/user-not-found":
        dispatch(setSnackbar({
      show: true,
      message: "Your email is invalid. Please try again!",
      type: "error",
    }));
        break;
      default:
    }
  });
  };
  React.useEffect(() => {
    document.body.style.backgroundColor = "#2fb5be";
  }, []);
  return (
    <div>
      <Typography variant="h1" style={{color: "white", textAlign: "center"}} >Chatify</Typography>
      <ThemeProvider theme={theme} >
      <Container component="main" maxWidth="xs" style={{width: "25%", backgroundColor: "white", borderRadius: "20px", paddingBottom: "40px", paddingLeft: "40px", paddingRight: "40px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox onChange={e => dispatch(setRem(e.target.checked))} value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                borderRadius: "20px",
                backgroundColor: "#2fb5be"
              }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              href="./signup"
              style={{
                borderRadius: "20px",
                color: "grey",
                borderColor: "grey",
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    {snackbar.show ? <MySnackbar message={snackbar.message} type={snackbar.type}/> : null}
    </div>
  );
}
