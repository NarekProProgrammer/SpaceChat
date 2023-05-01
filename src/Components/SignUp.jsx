import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { app, db, storage } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getRem, getSnackbar, setImgLink, setLog, setRem, setSnackbar, setUser } from "../userReducer";
import { useDispatch, useSelector } from "react-redux";
import { MuiFileInput } from 'mui-file-input'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import MySnackbar from "./mySnackbar.jsx";

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [nickname, setNickname] = React.useState("");
  const dispatch = useDispatch();
  const rememberMe = useSelector(getRem);
  const snackbar = useSelector(getSnackbar);

  const changeFile = newFile => {
    if(newFile && newFile.type.includes("image")) {
      setFile(newFile);
    }
  }

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (err) => console.log(err),
      () => { getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    dispatch(setImgLink(url));
        });
      }
    );
  }

 async function setUserData(id) {
        await setDoc(doc(db, "Users", id), {
          email,
          password,
          nickname,
        });
      }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setUserData(user.uid);
    dispatch(setUser(user));
    dispatch(setLog(true));
    if(rememberMe) {
      localStorage.setItem("userData", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    }
    dispatch(setSnackbar({
      show: true,
      message: "Signed up successfully!",
      type: "success",
    }));
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode === "auth/email-already-in-use") {
      dispatch(setSnackbar({
      show: true,
      message: "Email already in use!",
      type: "error",
    }));
    }
  });
  };
  React.useEffect(() => {
    document.body.style.backgroundColor = "#2fb5be";
  }, []);
  return (
    <div>
      <Typography variant="h1" style={{color: "white", textAlign: "center"}} >Chatify</Typography>
    <ThemeProvider theme={theme}>
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
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiFileInput value={file} onChange={changeFile} accept="image/*"/>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox onChange={e => dispatch(setRem(e.target.checked))} value="remember" color="primary" />
                  }
                  label="Remember me"
                />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              href="./signin"
              style={{
                borderRadius: "20px",
                color: "grey",
                borderColor: "grey",
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    {snackbar.show ? <MySnackbar message={snackbar.message} type={snackbar.type}/> : null}  
    </div>
  );
}
