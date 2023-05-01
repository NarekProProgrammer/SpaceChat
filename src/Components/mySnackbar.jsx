import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function MySnackbar(props) {
  function handleClose() {
    change(false);
  }
  const [opened, change] = React.useState(true);

    return (
      <Snackbar open={opened} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.type} sx={{ width: "100%" }}>
          {props.message}
        </Alert>
      </Snackbar>
    );
}