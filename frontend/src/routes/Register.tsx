import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {api} from "../api/client.ts";
import {useMutation} from "@tanstack/react-query";


export default function Register() {

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordsDisplay1, setPasswordsDisplay1] = useState(false);
    const [passwordsDisplay2, setPasswordsDisplay2] = useState(false);
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
        onError: (err) => {
            alert(err?.message || 'Registration failed');
        },
    });

// on form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate({email, password: password1});
    };

    return (

        <div>

            Log in gurl !
            <Link to="/">today</Link>

            <form className={'flex flex-col gap-4 p-8'} onSubmit={handleSubmit}>
                <input name={'email'} type={'email'} value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete={'on'} required={true}/>

                <input name={'password'} type={passwordsDisplay1 ? 'text' : 'password'} value={password1}
                       onChange={e => setPassword1(e.target.value)} placeholder="Password" required={true}/>
                <i className={`pi ${passwordsDisplay1 ? 'pi-eye-slash' : 'pi-eye'}`} onClick={() => setPasswordsDisplay1(v => !v)}></i>

                <input name={'confirm'} type={passwordsDisplay2 ? 'text' : 'password'} value={password2}
                       onChange={e => setPassword2(e.target.value)} placeholder="Confirm password" required={true}/>
                <i className={`pi ${passwordsDisplay2 ? 'pi-eye-slash' : 'pi-eye'}`} onClick={() => setPasswordsDisplay2(v => !v)}></i>

                <button type="submit">Register</button>


            </form>

            <Link to="/login">an account ? Login</Link>

        </div>
    )
}