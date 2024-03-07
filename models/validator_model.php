<?php

include_once '../config/database.php';

class ValidatorModel {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

  
    public function countEmail($email) {

        $query = 'SELECT COUNT(*) AS email_count
                    FROM users WHERE email = :email';

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $email);

        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['email_count'];
    }
}

$validatorModel = new ValidatorModel($db)

?>