import { useSelector } from "react-redux";
import { getUser } from "../userReducer";

export default function Home() {
    const email = useSelector(getUser).email;
    return (<div>You are logged in by {email} mail</div>);
}