<?php

include("../config/database.php");

error_reporting(E_ALL); ini_set('display_errors', 1);

class User
{

    private $db;
    public $id_user;

    public function __construct($db)
    {
        $this->db = $db;
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
}

