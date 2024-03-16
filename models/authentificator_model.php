<?php

include_once '../config/database.php';

class AuthModel {

    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function registerUser($lastname, $firstname, $birthdate, 
                                 $genre, $email, $username,
                                  $hashed_password) {
        
        $query = 'INSERT INTO users (lastname, firstname, birthdate,
                                     genre, email, username, password_hash)
                    VALUES (:lastname, :firstname, :birthdate, :genre,
                             :email, :username, :hash_password)';

        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':lastname', $lastname);
        $stmt->bindParam(':firstname', $firstname);
        $stmt->bindParam(':birthdate', $birthdate);
        $stmt->bindParam(':genre', $genre);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':hash_password', $hashed_password);

        $result = $stmt->execute();

        return $result;
    }

    public function createUserPreferences ($id)
    {
        $query = 'INSERT INTO users_preferences (user_id)
                    VALUES (:id)';

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }

    public function loginUser($email) {

        $query = 'SELECT * FROM users WHERE email = :email';

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user;
    }

}

$authModel = new AuthModel($db);

?>