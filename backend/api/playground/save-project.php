<?php
    require_once("../../db/db.php");
    session_start();

        $db = new DB();
        $connection = $db->getConnection();
            $projectData = json_decode(file_get_contents("php://input"), true); 
            try {
                if(!isset($projectData["name"]) || $projectData["name"] == "" ||
                    !isset($projectData["number"]) || $projectData["number"] <= 0 ||
                    !isset($projectData["description"]) || $projectData["description"] == "" ||
                    !isset($projectData["projectId"]) || $projectData["projectId"] == "" ||
                    !isset($projectData["status"]) || $projectData["status"] == "") {
                        http_response_code(400);
                        echo json_encode(["message" => "One or more empty fields."]);
                }
                $sql = "INSERT INTO projects (name, number, description, status) VALUES (:name, :number, :description, :status)";
                $statement = $connection -> prepare($sql);
                $statement -> execute(array("name" => $projectData["name"], "number" => $projectData["number"], "description" => $projectData["description"], "status" => $projectData["status"]));
                http_response_code(201);
                echo json_encode(["message" => "Project added."]);
            } catch(PDOException $exc) {
                http_response_code(500);
                echo json_encode(["message" => $exc->getMessage()]);
            }

?>