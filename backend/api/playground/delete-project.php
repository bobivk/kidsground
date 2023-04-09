<?php
    require_once("../../db/db.php");
    session_start();

        $db = new DB();
        $connection = $db->getConnection();
            $project_id = $_GET["projectId"];
            try {
                $sql = "DELETE FROM projects WHERE id = :id";
                $statement = $connection -> prepare($sql);
                $statement -> execute(["id" => $project_id]);
                http_response_code(204);
                echo json_encode(["message" => "Проектът е изтрит успешно."]);
                //delete requirements for this project first
            } catch(PDOException $exc) {
                http_response_code(500);
                echo json_encode(["message" => $exc->getMessage()]);
            }
?>