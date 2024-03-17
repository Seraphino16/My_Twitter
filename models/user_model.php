<?php

include("../config/database.php");


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

        $query = "SELECT users.*, users_preferences.*, users.created_at
                FROM users
                LEFT JOIN users_preferences
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
        $query = "SELECT username, firstname, bio
        FROM users
        JOIN followers
        ON users.id = following_id
        JOIN users_preferences
        ON users.id = users_preferences.user_id
        WHERE follower_id = :id_user";

        $getFollowsList = $this->db->prepare($query);
        $getFollowsList->bindParam("id_user", $this->id_user);
        $getFollowsList->execute();
        $followsList = $getFollowsList->fetchAll();
        return $followsList;
    }

    public function  getFollowersList ()
    {
        $query = "SELECT username, firstname, bio
        FROM users
        JOIN followers
        ON users.id = follower_id
        JOIN users_preferences
        ON users.id = users_preferences.user_id
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

    public function updateProfile($firstname, $bio, $location, $url)
    {
        
        $queryCheckPreferences = "SELECT COUNT(*) AS count FROM users_preferences 
                                    WHERE user_id = :id_user";

        $checkPreferencesStatement = $this->db->prepare($queryCheckPreferences);
        $checkPreferencesStatement->bindParam(":id_user", $this->id_user);
        $checkPreferencesStatement->execute();
        $count = $checkPreferencesStatement->fetch(PDO::FETCH_ASSOC)['count'];
    
        if ($count > 0) {
            
            $queryUpdatePreferences = "UPDATE users_preferences 
                                        SET bio = :bio, localisation = :location, 
                                            website = :url WHERE user_id = :id_user";
            $updatePreferencesStatement = $this->db->prepare($queryUpdatePreferences);
        } else {
           
            $queryInsertPreferences = "INSERT INTO users_preferences (user_id, bio, localisation, website) 
                                        VALUES (:id_user, :bio, :location, :url)";
            $insertPreferencesStatement = $this->db->prepare($queryInsertPreferences);
        }
    
      
        $queryUpdateUser = "UPDATE users SET firstname = :firstname WHERE id = :id_user";
        $updateUserStatement = $this->db->prepare($queryUpdateUser);
    
     
        $updateUserStatement->bindParam(":firstname", $firstname);
        $updateUserStatement->bindParam(":id_user", $this->id_user);
    
        if ($count > 0) {
            $updatePreferencesStatement->bindParam(":bio", $bio);
            $updatePreferencesStatement->bindParam(":location", $location);
            $updatePreferencesStatement->bindParam(":url", $url);
            $updatePreferencesStatement->bindParam(":id_user", $this->id_user);
            $updatePreferencesStatement->execute();
        } else {
            $insertPreferencesStatement->bindParam(":bio", $bio);
            $insertPreferencesStatement->bindParam(":location", $location);
            $insertPreferencesStatement->bindParam(":url", $url);
            $insertPreferencesStatement->bindParam(":id_user", $this->id_user);
            $insertPreferencesStatement->execute();
        }
    
        $updateUserStatement->execute();
    
        return true;
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

        public function getOneUserTweets ()
        {
            $query = "SELECT tweet.*, users.*
                    FROM tweet
                    JOIN users
                    ON tweet.user_id = users.id
                    WHERE tweet.user_id = :id";

            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":id", $this->id_user);
            $stmt->execute();
            
            return $stmt->fetchAll();
        }


       // Récupération des tweet de l'utilisateur et de ses followings
       public function getTweetsByUserAndFollowings($id_user) {
          
            $query = "SELECT tweet.id, tweet.user_id, tweet.isDeleted, tweet.message, tweet.created_at,
                                users.firstname, users.username
                        FROM tweet
                        JOIN users ON tweet.user_id = users.id
                        WHERE tweet.user_id = :user_id 
                            OR tweet.user_id IN (SELECT following_id 
                        FROM followers WHERE follower_id = :user_id)
                        ORDER BY tweet.created_at DESC";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(':user_id', $id_user);
            $stmt->execute();
            $tweets = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            return $tweets;
        
    }
}

