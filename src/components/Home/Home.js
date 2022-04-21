import React, { useState } from "react"
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { logIn, register } from "../../services/firebase";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import './Home.css'

export function Home({ isSignUp }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await register(email, password);
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await logIn(email, password);
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }


    // нажатие кнопки - подтверждение намерения залогиниться или зарегаться
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            handleSignUp();
        } else {
            handleSignIn();
        }
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <h1>This is Home</h1>
            {loading ? <CircularProgress /> :
                <>
                    Для доступа к чатам необходимо зарегистрироваться/авторизоваться. Вводить можно несуществующий email.
                    <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Input type="text" value={email} onChange={handleChangeEmail} />
                        </div>
                        <div>
                            <Input type="password" value={password} currentPassword={password} onChange={handleChangePassword} />
                        </div>
                        <div>
                            <Button className='button__mt20' type="submit" value="Подтвердить" />
                        </div>

                        {error && <h4>{error}</h4>}
                    </form>
                    <Link to={`${isSignUp ? "/" : "/signup"}`} className="link" onClick={() => setError('')}>
                        {isSignUp ? "SignIn" : "SignUp"}
                    </Link>
                </>
            }
        </>
    )
}