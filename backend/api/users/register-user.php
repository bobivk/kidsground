<?php
require_once("../../db/db.php");
function validateUserData($user_data) {
        if (!isset($userData["username"]) 
            || !isset($userData["username"])
            || !isset($userData["password"])) {
                return [
                    "isValid" => false,
                    "message" => "Невалидни данни"
                ];
        }

        $emailRegex = "/^[a-z_]+@[a-z]+.[a-z]+$/";
        $isEmailValid = preg_match($emailRegex, $userData["email"]);
        if(!$isEmailValid) {
            return [
                "isValid" => false,
                "message" => "Невалиден email"
            ];
        }
        return [
            "isValid" => true
        ];
    }

    function getUserRoleId (PDO $connection) {
        $sql = "SELECT id FROM roles WHERE title='USER'";
        $statement = $connection->query($sql);

        $rows = $statement -> fetchAll();
        return $rows[0]["id"];
    }

    $userData = json_decode(file_get_contents("php://input"), true);

    if (isset($userData)) {

        $valid = validateUserData($userData);
        if ($valid["isValid"]) {
            http_response_code(400);
            exit([
                "message" => $valid["message"]
            ]);
        }

        try {
            $db = new DB();
            $connection = $db->getConnection();
            //check user exists
            $sql = "SELECT username, email FROM users WHERE username=:username OR email=:email";
            $statement = $connection -> prepare($sql);
            $statement -> execute(["username" => $userData["username"], "email" => $userData["email"]]);
            $exists = false;
            while ($user = $statement->fetch(PDO::FETCH_ASSOC)) {
                if($user["email"] == $userData["email"]) {
                    $exists = true;
                    http_response_code(409); //conflict - already exists
                    echo json_encode(array("exists" => true, "sameUsername"=> false, "sameEmail"=> true));
                } else if($user["username"] == $userData["username"]) {
                    $exists = true;
                    http_response_code(409); //conflict - already exists
                    echo json_encode(array("exists" => true, "sameUsername"=> true, "sameEmail"=> false));
                }
            }
            if (!$exists) {
                $userRoleId = 2;//getUserRoleId($connection);
                $passwordHash = password_hash($userData["password"], PASSWORD_DEFAULT);
                $insertSql = "INSERT INTO users (username, email, role_id, password) VALUES (:username, :email, :role_id, :password)";
                $insertStatement = $connection->prepare($insertSql);
                $insertStatement -> execute(array("username" => $userData["username"], "email" => $userData["email"], "role_id" => $userRoleId, "password" => $passwordHash));
                http_response_code(201); //201 created
                echo json_encode([
                    "message" => "Registration successful."
                ]);
            }
        } catch (PDOException $ex) {
            http_response_code(402);
            echo json_encode(["message" => $ex->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            "message" => "Invalid data."
        ]);
    }
    echo json_encode($userData);


    
?>