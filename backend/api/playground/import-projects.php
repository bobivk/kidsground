<?php 
//session_start();
require_once("../../db/db.php");
 
$filename = $_FILES["files"]["tmp_name"][0];

if(isset($_FILES['files']) && !empty($filename)) {
        if($_FILES["files"]["size"] > 0) {
            $file = fopen($filename, "r");
            $db = new DB();
            $connection = $db->getConnection();
	        while (($projectData = fgetcsv($file, 10000, ",")) !== FALSE) {
                $sql = "INSERT INTO projects (name, number, description, status) VALUES (:name, :number, :description, :status)";
                $statement = $connection -> prepare($sql);
                $statement -> execute(array("number" => $projectData[0], "name" => $projectData[1], "description" => $projectData[2], "status" => $projectData[3]));
		        $result = $statement->fetchAll();
                if(!isset($result)) {
		            echo "<script type=\"text/javascript\">
			                alert(\"Invalid File:Please Upload CSV File.\");
			                window.reload()\"
			            </script>";
		        }
	        }
	        fclose($file);
	}
}
?>