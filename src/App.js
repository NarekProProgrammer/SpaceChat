import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Asd from "./Components/Asd";
import { getLog, setLog, setUser } from "./userReducer";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      dispatch(setUser(JSON.parse(localStorage.getItem("userData"))));
      dispatch(setLog(!!JSON.parse(localStorage.getItem("isLoggedIn"))));
    }
  }, []);
  const [a, setA] = React.useState(1);
  let isLoggedIn = useSelector(getLog);
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" index element={<Home />} />
          <Route path="/asd" element={<Asd />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<SignIn setA={setA} />} />
          <Route path="/signup" element={<SignUp setA={setA} />} />
          <Route path="*" element={<Navigate replace to="/signin" />} />
        </>
      )}
    </Routes>
  );
}
