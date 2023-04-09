<?php
    require_once("../../db/db.php");
    session_start();
        $db = new DB();
        $connection = $db->getConnection();
        $project_id = $_GET["projectId"];
        if (isset($project_id)) {
            $sql = "SELECT * FROM projects where id = :id";
            try {
                $statement = $connection -> prepare($sql);
                $statement -> execute(array("id" => $project_id));
                $project = $statement->fetchAll(PDO::FETCH_ASSOC)[0];
                http_response_code(200);
                echo json_encode($project);
            } catch(PDOException $exc) {
                http_response_code(500);
                echo json_encode(["message" => $exc->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "id е празно"]);
        }

?>