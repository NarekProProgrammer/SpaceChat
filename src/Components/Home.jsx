import { useSelector } from "react-redux";
import { getSnackbar, getUser } from "../userReducer";
import MySnackbar from "./mySnackbar.jsx";

export default function Home() {
    const email = useSelector(getUser).email;
    const snackbar = useSelector(getSnackbar);

    return (<div>
        <p>You are logged in by {email} mail</p>
        {snackbar.show ? <MySnackbar message={snackbar.message} type={snackbar.type}/> : null}  
    </div>);
}