<?php
    require_once("../../db/db.php");

    // $projectData = json_decode(file_get_contents("php://input"), true); 
    $userInput = json_decode(file_get_contents("php://input"), true);
    if(isset($userInput) && isset($userInput["email"]) && isset($userInput["password"])) {
        try {
            $user = login($userInput);
            if(!isset($user)) {
                http_response_code(404);
                echo json_encode(["message" => "No user found with the credentials."]);
            } else {
                session_start(); //създава session cookie
                $_SESSION["user"] = $user; //запазваме данните за потребителя в сесията, за да не трябва да се логва отново при следващи извиквания
                setcookie('email', $userInput['email'], time() + 6000, '/');
                setcookie('password', $userInput['password'], time() + 6000, '/');
                http_response_code(200);
                echo json_encode(["message" => "Login success.", "username" => $user["username"]]);
            }
        } catch (Error $ex) {
            http_response_code(500);
            echo json_encode(["message" => $ex->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid data"]);
    }

    function login($userInput) {
        try {
            $db = new DB();
            $connection = $db->getConnection();
            $sql = "SELECT * FROM users WHERE email = :email";
            $statement = $connection -> prepare($sql);
            $statement -> execute(array("email" => $userInput["email"]));
            if($statement -> rowCount() === 1) {
                $userFromDb = $statement->fetchAll(PDO::FETCH_ASSOC)[0]; //fetch_assoc връща данните само като асоциативен списък, без него връща и асоциативен, и индексиран
                $passwordFromDb = $userFromDb["password"];
                $inputPassword = $userInput["password"];
                var_dump(["input"=>$inputPassword]);
                $isPasswordValid = password_verify($inputPassword, $passwordFromDb);
                var_dump(["valid"=>$isPasswordValid]);
                if($isPasswordValid){
                    return $userFromDb;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch(PDOException $exc) {
            http_response_code(500);
            echo ["message" => $exc->getMessage()];
        }
    }
?>