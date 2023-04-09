<?php
    class DB {
        private $connection;

        function __construct() {
            $this->connection = new PDO('mysql:host=localhost:3306;dbname=kidsground', 'root', '');
        }

        public function getConnection() {
            return $this->connection;
        }
    }

?>