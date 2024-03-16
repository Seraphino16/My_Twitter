<?php
include '../config/config.php';

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

    public static function searchUsersByUsername($query) {
        global $db;

        try {
            $query = "%$query%";
            $sql = "SELECT id, firstname, lastname, username FROM users WHERE username LIKE :query";
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':query', $query, PDO::PARAM_STR);
            $stmt->execute();

            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $results;
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

    public static function createHashtag($tweet_id, $tag){
        global $db;

        try {
            $query = "INSERT INTO hashtag (tweet_id, name) VALUES (:tweet_id, :name)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':tweet_id', $tweet_id);
            $stmt->bindParam(':name', $tag);
            $stmt->execute();
            return $db->lastInsertId();
        } catch (PDOException $e) {
            return false;
        }
    }

}