<?php
include '../config/database.php';


class userModel {
    public $id;
    public $genre;
    public $email;
    public $birthdate;
    public $isActive;
    public $username;
    public $firstname;
    public $lastname;
    public $password_hash;
    public $isDeleted;
    public $created_at;
    public $updated_at;

    function __construct($id, $genre, $email, $birthdate, $isActive, $username, $firstname, $lastname, $password_hash, $isDeleted, $created_at, $updated_at)
    {
        $this->id = $id;
        $this->genre = $genre;
        $this->email = $email;
        $this->birthdate = $birthdate;
        $this->isActive = $isActive;
        $this->username = $username;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->password_hash = $password_hash;
        $this->isDeleted = $isDeleted;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public static function getUserDataByID($id) {
        global $db;

        try {
            $query = "SELECT firstname, lastname, username FROM users WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);

            return $userData;
        } catch (PDOException $e) {
            return null;
        }
    }

    public static function searchUsers($searchText){
        global $db;

        $searchText = '%' . $searchText . '%';

        try {
            $query = "SELECT firstname, lastname, username FROM users WHERE firstname LIKE :searchText OR lastname LIKE :searchText OR username LIKE :searchText";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':searchText', $searchText);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $result;
        } catch (PDOException $e) {
            return null;
        }

    }
}

class tweetModel {
    public $id;
    public $user_id;
    public $isDeleted;
    public $message;
    public $media;
    public $created_at;
    public $updated_at;

    function __construct($id, $user_id, $isDeleted, $message, $media, $created_at, $updated_at)
    {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->isDeleted = $isDeleted;
        $this->message = $message;
        $this->media = $media;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }
    public static function createTweet($userId, $message) {
        global $db;

        try {
            $query = "INSERT INTO tweet (user_id, message) VALUES (:user_id, :message)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':user_id', $userId);
            $stmt->bindParam(':message', $message);
            $stmt->execute();
            return $db->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }
    }

    public static function getCreatedAtByID($id){
        global $db;

        try {
            $query = "SELECT created_at FROM tweet WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $date = $stmt->fetch(PDO::FETCH_ASSOC)['created_at'];
            return $date;
        } catch (PDOException $e) {
            return false;
        }
    }

}