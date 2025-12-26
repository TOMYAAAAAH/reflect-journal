import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {api} from "../api/client.ts";
import {useMutation} from "@tanstack/react-query";


export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            api('/register',
                {
                    method: 'POST',
                    body: JSON.stringify(user),
                }
            ),
        onSuccess: (data: { token: string }) => {
            localStorage.setItem('token', data.token);
            navigate("/");

        },
        onError: (err: any) => {
            alert(err?.message || 'Registration failed');
        },
    });

// on form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate({email, password});
    };

    return (

        <div>

            Log in gurl !
            <Link to="/">today</Link>

            <form className={'flex flex-col gap-4 p-8'} onSubmit={handleSubmit}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name"/>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                       placeholder="Password"/>
                <button type="submit">Register</button>

            </form>

            <Link to="/login">an account ? Login</Link>

        </div>
    )
}