import {Link} from "react-router-dom";

export default function Profile() {

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <>
            <Link to="/">Home</Link>
            <h1>Profile</h1>
            <p>My name is Tom</p>

            <button onClick={logout}>Disconnect</button>
        </>
    )
}