import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {api} from "../api/client.ts";
import {useMutation} from "@tanstack/react-query";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordsDisplay, setPasswordsDisplay] = useState(false);
    const navigate = useNavigate();


    const registerMutation = useMutation({
        mutationFn: (user: { email: string; password: string }) =>
            api('/login',
                {
                    method: 'POST',
                    body: JSON.stringify(user),
                }
            ),
        onSuccess: (data: { token: string }) => {
            localStorage.setItem('token', data.token);
            navigate("/");

        },
        onError: (err) => {
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
                <input name={'email'} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete={'on'} required={true}/>
                <input name={'password'} type={passwordsDisplay ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                       placeholder="Password" required={true}/>
                <i className={`pi ${passwordsDisplay ? 'pi-eye-slash' : 'pi-eye'}`} onClick={() => setPasswordsDisplay(v => !v)}></i>

                <button type="submit">Login</button>

            </form>

            <Link to="/register">no account ? Register</Link>
        </div>
    )
}