const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");
const nameField = document.getElementById("nameField");
const title = document.getElementById("title");

function disablePasswordChecks() {
    document.querySelectorAll(".password-check-field").forEach((element) =>{
        element.style.display = "none";
    });
}

function enablePasswordChecks() {
    document.querySelectorAll(".password-check-field").forEach((element) =>{
        element.style.display = "block";
    });
}

signUpBtn.addEventListener('click', (event) => {
    if (signUpBtn.classList.contains("disable")) {
        //if clicked while disabled, enable
        switchToSignUp();
        return;
    }
    //if enabled, try register
    const data = {};
    const fields = document.querySelectorAll('input');
    fields.forEach(field => {
        data[field.name] = field.value;
    });

    if (isEmailValid(data.email) && isPasswordValid(data.password)) {
        fetch('http://localhost/FunctionalRequirements/backend/api/users/register-user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                let responseJson = response.json();
                if(response.status == 400) {
                    alert("Невалидни данни.");
                } else if(response.status == 500) {
                    alert("Възникна грешка, моля опитайте отново.");
                    document.querySelectorAll("input").values = "";
                    location.reload();
                } else if(response.status == 409) {
                    document.getElementById("username-exists-error").style.display="block";
                } else if(response.status == 201) {
                    document.getElementById("registration-success").style.display = "block";
                    document.getElementById('username-exists-error').style.display = "none";
                    document.getElementById('email-exists-error').style.display = "none";
                    switchToSignIn();
                }
            });
    }
    event.preventDefault();
});

signInBtn.addEventListener('click', (event) => {
    if (signInBtn.classList.contains("disable")) {
        //if clicked while disabled, enable
        switchToSignIn();
        return;
    }
    const data = {};
    const fields = document.querySelectorAll('input');

    fields.forEach(field => {
        data[field.name] = field.value;
    });

    fetch("http://localhost/FunctionalRequirements/backend/api/users/login.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status == 404) {
                document.getElementById("wrong-credentials-msg").style.display = "block";
                document.getElementById("wrong-credentials-msg").style.backgroundColor = "#eaeaea";
                document.getElementById("wrong-credentials-msg").style.borderRadius = "15px";
                document.getElementById("wrong-credentials-msg").style.maxWidth = "50%";
                document.getElementById("wrong-credentials-msg").style.padding = "15px";
                //грешен email или парола.
            } else if(response.status == 200) {
                location = 'http://localhost/FunctionalRequirements/frontend/html/homepage.html';
            }
        });
    event.preventDefault();
});

function switchToSignUp() {
    nameField.style.maxHeight = "60px";
    title.innerHTML = "Регистрация";
    signUpBtn.classList.remove("disable");
    signInBtn.classList.add("disable");
    document.getElementById("wrong-credentials-msg").style.display = "none";
    enablePasswordChecks();
}

function switchToSignIn() {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Вход";
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove("disable");
    document.getElementById("email-error").style.display = "none";
    document.getElementById("username-exists-error").style.display = "none";
    disablePasswordChecks();
}

function isEmailValid(email) {
    if (email == null || email == "" || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/.test(email)) {
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
        if(element.style.color != "green"){
            valid = false;
        }
    });
    return valid;
}

function checkPassword() {
    var input = document.getElementById("password").value;

    input = input.trim(); //removes all whitespaces
    document.getElementById("password").value = input;

    var len = input.length;
    if (len >= 6) {
        document.getElementById("check0").style.color = "green";
    } else {
        document.getElementById("check0").style.color = "#555";
    }

    if (len <= 10 && input != "") {
        document.getElementById("check1").style.color = "green";
    } else {
        document.getElementById("check1").style.color = "#555";
    }

    if (input.match(/[0-9]/i)) {
        document.getElementById("check4").style.color = "green";
    } else {
        document.getElementById("check4").style.color = "#555";
    }

    if (input.match(/[A-Z]/)) {
        document.getElementById("check3").style.color = "green";
    } else {
        document.getElementById("check3").style.color = "#555";
    }

    if (input.match(/[a-z]/)) {
        document.getElementById("check2").style.color = "green";
    } else {
        document.getElementById("check2").style.color = "#555";
    }

}

function logout() {
    location = "http://localhost/FunctionalRequirements/frontend/html/register.html";
}