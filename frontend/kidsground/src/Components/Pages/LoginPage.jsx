import '../../static/stylesheets/styles.css'
import '../../static/stylesheets/registration.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as CheckIcon } from '../../static/icons/circle-check-solid.svg'

export const LoginPage = () => {

    const location = useLocation();
    const [switcher, setSwitcher] = useState(true);
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [check0, setCheck0] = useState("#555");
    const [check1, setCheck1] = useState("#555");
    const [check2, setCheck2] = useState("#555");
    const [check3, setCheck3] = useState("#555");
    const [check4, setCheck4] = useState("#555");

        const signUp =(event) => {
        if (switcher) {
            //if clicked while disabled, enable
            switchToSignUp();
            return;
        }
        //if enabled, try register
        const data = {};
        if (isEmailValid(data.email) && isPasswordValid(data.password)) {
            fetch('http://localhost/kidsground/backend/api/users/register-user.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => {
                    let responseJson = response.json();
                    if(response.status === 400) {
                        alert("Невалидни данни.");
                    } else if(response.status === 500) {
                        alert("Възникна грешка, моля опитайте отново.");
                        document.querySelectorAll("input").values = "";
                        //location.reload();
                    } else if(response.status === 409) {
                        document.getElementById("username-exists-error").style.display="block";
                    } else if(response.status === 201) {
                        document.getElementById("registration-success").style.display = "block";
                        document.getElementById('username-exists-error').style.display = "none";
                        document.getElementById('email-exists-error').style.display = "none";
                        switchToSignIn();
                    }
                });
        }
        event.preventDefault();
    };

    const signIn = (event) => {
        if (!switcher) {
            //if clicked while disabled, enable
            switchToSignIn();
            return;
        }
        const data = {};
        const fields = document.querySelectorAll('input');

        fields.forEach(field => {
            data[field.name] = field.value;
        });

        fetch("http://localhost/kidsground/backend/api/users/login.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.status === 404) {
                    document.getElementById("wrong-credentials-msg").style.display = "block";
                    document.getElementById("wrong-credentials-msg").style.backgroundColor = "#eaeaea";
                    document.getElementById("wrong-credentials-msg").style.borderRadius = "15px";
                    document.getElementById("wrong-credentials-msg").style.maxWidth = "50%";
                    document.getElementById("wrong-credentials-msg").style.padding = "15px";
                    //грешен email или парола.
                } else if(response.status === 200) {
                    //location = 'http://localhost/kidsground/frontend/html/homepage.html';
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
        console.log(switcher);
    }

    function switchToSignIn() {
        setSwitcher(true);
        resetInputs();
        console.log(switcher);
    }

    function isEmailValid(email) {
        if (email == null || email === "" || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
            document.getElementById('email-error').innerHTML = "Моля, въведете валиден имейл адрес.";
            document.getElementById('email-error').style.display = "block";
            return false;
        }
        document.getElementById('email-error').style.display = "none";
        return true;
    }

    function isPasswordValid() {
        let valid = true
        document.querySelectorAll(".password-check-field").forEach((element) =>{
            if(check0 !== "green" && check1 !== "green" && check2 !== "green" && check3 !== "green" && check4 !== "green"){
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

        if (len <= 10 && input !== "") {
           setCheck1("green");
        } else {
            setCheck1("#555");
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

    // function logout() {
    //     location = "http://localhost/kidsground/frontend/html/register.html";
    // }

    if(switcher) {
        return(
            <div class="container page">
                <div class="form-box">
                    <h1 id="title">Вход</h1>
                    <form id="registration-form">
                        <div class="input-group">
                            <div class="input-field">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="text" name="email" placeholder="Имейл"/>
                            </div>
                            <div class="error" id="email-error"></div>
    
                            <div class="input-field">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="password" name="password" placeholder="Парола" oninput="checkPassword()"/>
                                <div class="error" id="password-length-error"></div>
                            </div>
                        </div>
    
                        <div class="btn-field">
                            <button type="button" class="disable" id="signUpBtn" onClick={signUp}>Регистрирай ме</button>
                            <button type="button" id="signInBtn" onClick={signIn}>Вход</button>
                        </div>
                        <h4 class="wrong-credentials" id="wrong-credentials-msg">Грешен имейл или парола.</h4>
                        <div class="registration-success" id="registration-success">
                            <h4>Успешна регистрация!</h4>
                            <h4>Моля, влезте в профила си.</h4>
                        </div>
                    </form>
                </div>
            </div>)
    } else {
        return(
            <div class="container page">
                <div class="form-box">
                    <h1 id="title">Регистрация</h1>
                    <form id="registration-form">
                        <div class="input-group">
                            <div class="input-field" id="nameField">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" name="username" placeholder="Потребителско име"/>
                            </div>
    
                            <div class="input-field">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="text" name="email" placeholder="Имейл"/>
                            </div>
                            <div class="error" id="email-error"></div>
    
                            <div class="input-field">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" id="password" name="password" placeholder="Парола" onChange={checkPassword}/>
                                <div class="error" id="password-length-error"></div>
                            </div>
                                
                            <div class="error" id="password-numbers-error"></div>
                            <div class="error" id="password-uppercase-error"></div>
                            <div class="error" id="password-lowercase-error"></div>
                            <div class="password-check">
                                <div id="check0" style={{color: check0}} class="password-check-field">
                                    <CheckIcon style={{fill : check0}} id="checkIcon"/><span> Дължина поне 6 символа.</span>
                                </div>
                                <div id="check1" style={{color: check1}} class="password-check-field">
                                    <CheckIcon style={{fill: check1}} id="checkIcon"/><span> Дължина най-много 10 символа.</span>
                                </div>
                                <div id="check2" style={{color: check2}} class="password-check-field">
                                    <CheckIcon style={{fill: check2}} id="checkIcon"/><span> Съдържа малки букви.</span>
                                </div>
                                <div id="check3" style={{color: check3}} class="password-check-field">
                                    <CheckIcon style={{fill: check3}} id="checkIcon"/><span> Съдържа главни букви.</span>
                                </div>
                                <div id="check4" style={{color: check4}} class="password-check-field">
                                    <CheckIcon style={{fill: check4}} id="checkIcon"/><span> Съдържа цифри.</span>
                                </div>
                            </div>
                            
                        </div>
    
                        <div class="btn-field">
                            <button type="button" id="signUpBtn" onClick={signUp}>Регистрирай ме</button>
                            <button type="button" className="disable" id="signInBtn" onClick={signIn}>Вход</button>
                        </div>
                        <div class="registration-success" id="registration-success">
                            <h4>Успешна регистрация!</h4>
                            <h4>Моля, влезте в профила си.</h4>
                        </div>
                    </form>
                    <div class="error" id="username-exists-error">Потребител с това име или email вече съществува.</div>
                    <div class="error" id="email-exists-error"></div>
                </div>
            </div>)
    }
}

