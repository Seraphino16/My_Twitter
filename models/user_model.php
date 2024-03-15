<?php

include("../config/database.php");

error_reporting(E_ALL); ini_set('display_errors', 1);

class User
{

    private $db;
    public $id_user;
    public $username;

    public function __construct($db, $username)
    {
        $this->db = $db;
        $this->username= $username;
        // $this->id_user = $id;
        // $this->$username = $username
        $this->getUserId();
    }

    private function getUserId ()
    {
        $query = "SELECT users.id
                FROM users
                WHERE users.username = :username";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":username", $this->username);
        $stmt->execute();
        $this->id_user = $stmt->fetchColumn();
    }

    public function fetchCurrentUser ()
    {

        $query = "SELECT users.*, users_preferences.*
                FROM users
                JOIN users_preferences
                ON users.id = users_preferences.user_id
                WHERE users.id = :id";

        $fetchUserStatement = $this->db->prepare($query);

        $fetchUserStatement->bindParam(":id", $this->id_user, PDO::PARAM_INT);

        $fetchUserStatement->execute();

        $userData = $fetchUserStatement->fetch(PDO::FETCH_ASSOC);

        return $userData;
    }

    //count the follows of the current user
    public function getNbFollows ()
    {
        $query = "SELECT COUNT(*)
        FROM users
        JOIN followers
        ON users.id = following_id
        WHERE follower_id = :id";

        $getNbFollows = $this->db->prepare($query);
        $getNbFollows->bindParam("id", $this->id_user);
        $getNbFollows->execute();
        $NbFollows = $getNbFollows->fetchColumn();
        return $NbFollows;
    }

    public function getNbFollowers ()
    {
        $query = "SELECT COUNT(*)
        FROM users
        JOIN followers
        ON users.id = follower_id
        WHERE following_id = :id";

        $getNbFollowers = $this->db->prepare($query);
        $getNbFollowers->bindParam("id", $this->id_user);
        $getNbFollowers->execute();
        $NbFollowers = $getNbFollowers->fetchColumn();
        return $NbFollowers;
    }

    public function getFollowsList ()
    {
        $query = "SELECT username
        FROM users
        JOIN followers
        ON users.id = following_id
        WHERE follower_id = :id_user";

        $getFollowsList = $this->db->prepare($query);
        $getFollowsList->bindParam("id_user", $this->id_user);
        $getFollowsList->execute();
        $followsList = $getFollowsList->fetchAll();
        return $followsList;
    }

    public function  getFollowersList ()
    {
        $query = "SELECT username
        FROM users
        JOIN followers
        ON users.id = follower_id
        WHERE following_id = :id_user";

        $getFollowersList = $this->db->prepare($query);
        $getFollowersList->bindParam("id_user", $this->id_user);
        $getFollowersList->execute();
        $followersList = $getFollowersList->fetchAll();
        return $followersList;
    }

    public function getTweets ()
    {
        $query = "SELECT *
        FROM tweet
        WHERE user_id = :id_user";

        $getTweets = $this->db->prepare($query);
        $getTweets->bindParam("id_user", $this->id_user);
        $getTweets->execute();

        return $getTweets->fetchAll();
    }

    public function updateProfile ($firstname, $bio, $location, $url)
    {
        $query = "UPDATE users
        JOIN users_preferences
            ON users.id = users_preferences.user_id
        SET
            users.firstname = :firstname,
            users_preferences.bio = :bio,
            users_preferences.localisation = :location,
            users_preferences.website = :url
        WHERE users.id = :id_user";

        $updateProfile = $this->db->prepare($query);
        $updateProfile->bindParam(":firstname", $firstname);
        $updateProfile->bindParam(":bio", $bio);
        $updateProfile->bindParam(":location", $location);
        $updateProfile->bindParam(":url", $url);
        $updateProfile->bindParam(":id_user", $this->id_user);

        return $updateProfile->execute();
    }

    public function follow ($usernameToFollow)
    {
        $userToFollow = new User($this->db, $usernameToFollow);


        $query = "SELECT COUNT(*) FROM followers 
                WHERE follower_id = :current_id
                AND following_id = :id_user_to_follow";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":current_id", $this->id_user);
        $stmt->bindParam(":id_user_to_follow", $userToFollow->id_user);
        $stmt->execute();
        $count = $stmt->fetchColumn();

        if($count === 0) {
            $query = "INSERT INTO followers (follower_id, following_id)
                VALUES ((SELECT id from users WHERE id = :current_id),
                        (SELECT id from users WHERE id = :id_user_to_follow))";

            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":current_id", $this->id_user);
            $stmt->bindParam(":id_user_to_follow", $userToFollow->id_user);

            return $stmt->execute();
        } else {
            return "Already followed";
        }

       
    }

    public function unfollow ($usernameToUnfollow)
    {
        $userToUnfollow = new User($this->db, $usernameToUnfollow);

        $query = "DELETE FROM followers
                WHERE follower_id = :current_id
                AND following_id = :id_user_to_unfollow";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":current_id", $this->id_user);
        $stmt->bindParam(":id_user_to_unfollow", $userToUnfollow->id_user);

        return $stmt->execute();
    }
}

