<?php
    require_once("../../db/db.php");
    session_start();

        $db = new DB();
        $connection = $db->getConnection();
            $projectData = json_decode(file_get_contents("php://input"), true);
            try{
                if(!isset($projectData) ||
                    !isset($projectData["name"]) || $projectData["name"] == "" ||
                    !isset($projectData["number"]) || $projectData["number"] == "" ||
                    !isset($projectData["description"]) || $projectData["description"] == "" ||
                    !isset($projectData["status"]) || $projectData["status"] == "" ||
                    !isset($projectData["projectId"]) || $projectData["projectId"] == "") {
                        http_response_code(400);
                        echo json_encode(["message" => "One or more empty fields."]);
                    }
                    $sql = "UPDATE projects SET name = :name, number = :number, description = :description, status = :status where id = :project_id";
                    $statement = $connection -> prepare($sql);
                    echo($projectData);
                    var_dump($statement);
                    $statement -> execute(array("name" => $projectData["name"], "number" => $projectData["number"], 
                        "description" => $projectData["description"], "status" => $projectData["status"], "project_id" => $projectData["projectId"]));
                    $statement->fetchAll();
                    http_response_code(200);
                    echo json_encode(["message" => "Project edited."]);
                }
                catch(PDOException $exc) {
                http_response_code(500);
                echo json_encode(["message" => $exc->getMessage()]);
            }
?>