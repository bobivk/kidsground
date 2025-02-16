import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/registration.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ReactComponent as CheckIcon } from '../../static/icons/circle-check-solid.svg'
import Cookies from "js-cookie"


export const LoginPage = () => {

    const navigate = useNavigate();
    const [switcher, setSwitcher] = useState(true);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [check0, setCheck0] = useState("#555");
    const [check1, setCheck1] = useState("#555");
    const [check2, setCheck2] = useState("#555");
    const [check3, setCheck3] = useState("#555");
    const [check4, setCheck4] = useState("#555");
    const [forgotPasswordMode, setForgotPasswordMode] = useState(false);

    const signUp = async (event) => {
        if (switcher) {
            //if clicked while disabled, enable
            switchToSignUp();
            return;
        }
        //if enabled, try register
        const data = { username, email, password };
        if (isEmailValid(data.email) && isPasswordValid(data.password)) {
            await fetch('https://kidsground.bg:8009/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.status === 400) {
                        alert("Невалидни данни.");
                    } else if (response.status === 500) {
                        alert("Възникна грешка, моля опитайте отново.");
                        resetInputs();
                        //location.reload();
                    } else if (response.status === 409) {
                        document.getElementById("username-exists-error").style.display = "block";
                    } else if (response.status === 200) {
                        document.getElementById("registration-success").style.display = "block";
                        document.getElementById('username-exists-error').style.display = "none";
                        document.getElementById('email-exists-error').style.display = "none";
                        switchToSignIn();
                    }
                });
        }
        event.preventDefault();
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Kidsground - Login"
    }, [])

    const signIn = async (event) => {
        if (!switcher) {
            //if clicked while disabled, enable
            switchToSignIn();
            return;
        }
        const data = { username, email, password };
        const fields = document.querySelectorAll('input');

        fields.forEach(field => {
            data[field.name] = field.value;
        });

        await fetch("https://kidsground.bg:8009/v1/users/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 404) {
                    alert("Грешно потребителско име или парола")
                } else if (response.status === 200) {
                    return response.json()
                }
            }).then((data) => {
                if (data) {
                    Cookies.set("username", username, { expires: 3, secure: true })
                    Cookies.set("user", data.token, { expires: 3, secure: true })
                    Cookies.set("role", data.role, { expires: 3, secure: true })
                    navigate("/");
                    // window.location.reload()
                }
            });
        event.preventDefault();
    };

    function resetInputs() {
        setEmail("");
        setPassword("");
        setUsername("");
        setCheck0("#555");
        setCheck1("#555");
        setCheck2("#555");
        setCheck3("#555");
        setCheck4("#555");
    }

    function switchToSignUp() {
        setSwitcher(false);
        resetInputs();
        document.title = "Kidsground - Register"
    }

    function switchToSignIn() {
        setSwitcher(true);
        resetInputs();
        document.title = "Kidsground - Login"
    }

    function isEmailValid(email) {

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email == null || email === "" || !regex.test(email)) {
            document.getElementById('email-error').innerHTML = "Моля, въведете валиден имейл адрес.";
            document.getElementById('email-error').style.display = "block";
            return false;
        }
        document.getElementById('email-error').style.display = "none";
        return true;
    }

    function isPasswordValid() {
        let valid = true
        document.querySelectorAll(".password-check-field").forEach((element) => {
            if (check0 !== "green" && check1 !== "green" && check2 !== "green" && check3 !== "green" && check4 !== "green") {
                valid = false;
            }
        });
        return valid;
    }

    function checkPassword(event) {
        const len = event.target.value.length;
        const input = event.target.value
        if (len >= 6) {
            setCheck0("green");
        } else {
            setCheck0("#555");
        }

        if (input.match(/[a-z]/)) {
            setCheck2("green");
        } else {
            setCheck2("#555");
        }

        if (input.match(/[A-Z]/)) {
            setCheck3("green");
        } else {
            setCheck3("#555");
        }

        if (input.match(/[0-9]/i)) {
            setCheck4("green");
        } else {
            setCheck4("#555");
        }
        setPassword(input);
    }

    const resetPassword = async (event) => {
        event.preventDefault();

        if (isEmailValid(email)) {
            await fetch('https://your-backend-url/v1/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
                .then(response => {
                    if (response.status === 200) {
                        alert("Линк за възстановяване на паролата е изпратен на вашия имейл.");
                        setForgotPasswordMode(false);
                    } else {
                        alert("Възникна грешка, моля опитайте отново.");
                    }
                });
        }
    };

    const changeEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeLoginCredential = (event) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(event.target.value)) {
            setEmail(event.target.value);
        } else {
            setUsername(event.target.value);
        }
    }

    const changeUsername = (event) => {
        setUsername(event.target.value);
    }
    return (
        <div className="register-container page">
            <section className="form-box">
                <h1 id="title">
                    {forgotPasswordMode ? "Забравена парола" : switcher ? "Вход" : "Регистрация"}
                </h1>
                <form id="registration-form">
                    <div className="input-group">
                        {forgotPasswordMode ? (
                            <>
                                <div className="input-field">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Въведете имейл"
                                        autoComplete="email"
                                        onChange={changeEmail}
                                    />
                                </div>
                                <div className="btn-field">
                                    <button type="button" onClick={() => setForgotPasswordMode(false)}>
                                        Назад
                                    </button>
                                    <button type="button" onClick={resetPassword}>
                                        Забравена Парола
                                    </button>
                                </div>
                            </>
                        ) : switcher ? (
                            <>
                                <div className="input-field">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="text"
                                        name="usernameOrEmail"
                                        placeholder="Потребителско име или имейл"
                                        autoComplete="username"
                                        onChange={changeLoginCredential}
                                    />
                                </div>
                                <div className="input-field">
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        placeholder="Парола"
                                        value={password}
                                        onChange={checkPassword}
                                    />
                                    <div className="error" id="password-length-error"></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="input-field" id="nameField">
                                    <i className="fa-solid fa-user"></i>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Потребителско име"
                                        autoComplete="username"
                                        onChange={changeUsername}
                                    />
                                </div>
                                <div className="input-field">
                                    <i className="fa-solid fa-envelope"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Имейл"
                                        autoComplete="email"
                                        onChange={changeEmail}
                                    />
                                </div>
                                <div className="input-field">
                                    <i className="fa-solid fa-lock"></i>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        autoComplete="new-password"
                                        placeholder="Парола"
                                        value={password}
                                        onChange={checkPassword}
                                    />
                                    <div className="error" id="password-length-error"></div>
                                </div>
                                {/* Password Strength Checks */}
                                <div className="password-check">
                                    <div id="check0" style={{ color: check0 }} className="password-check-field">
                                        <CheckIcon style={{ fill: check0 }} id="checkIcon" /><span> Дължина поне 6 символа.</span>
                                    </div>
                                    <div id="check2" style={{ color: check2 }} className="password-check-field">
                                        <CheckIcon style={{ fill: check2 }} id="checkIcon" /><span> Съдържа малки букви.</span>
                                    </div>
                                    <div id="check3" style={{ color: check3 }} className="password-check-field">
                                        <CheckIcon style={{ fill: check3 }} id="checkIcon" /><span> Съдържа главни букви.</span>
                                    </div>
                                    <div id="check4" style={{ color: check4 }} className="password-check-field">
                                        <CheckIcon style={{ fill: check4 }} id="checkIcon" /><span> Съдържа цифри.</span>
                                    </div>
                                </div>
                            </>
                        )}
                        {!forgotPasswordMode && (
                            <p id="forgot-pass" onClick={() => {
                                setForgotPasswordMode(true)
                                document.title = "Kidsground - Forgot Password"
                            }}>Забравена парола?</p>
                        )}
                    </div>
                    {!forgotPasswordMode && (
                        <div className="btn-field">
                            {switcher ? (
                                <>
                                    <button type="button" className="disable" id="signUpBtn" onClick={switchToSignUp}>Регистрирай ме</button>
                                    <button type="button" id="signInBtn" onClick={signIn}>Вход</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" id="signUpBtn" onClick={signUp}>Регистрирай ме</button>
                                    <button type="button" className="disable" id="signInBtn" onClick={switchToSignIn}>Вход</button>
                                </>
                            )}
                        </div>
                    )}
                </form>
            </section>
        </div>

    )
}

