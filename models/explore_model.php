<?php

include '../config/database.php';

class ExploreModel {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function searchUsers($searchTerm) {
        $query = 'SELECT users.*, users_preferences.*, users.created_at, users.id
                    FROM users
                    LEFT JOIN users_preferences
                    ON users.id = users_preferences.user_id
                    WHERE username LIKE LOWER(:searchTerm)
                                        OR firstname LIKE LOWER(:searchTerm)
                                        OR lastname LIKE LOWER(:searchTerm)';

        
        $searchTerm = $searchTerm . '%';
    
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':searchTerm', $searchTerm);

        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
        
    }

    public function searchHashtags($searchTerm) {
        $query = 'SELECT hashtag.name, COUNT(*) as hashtag_count, MAX(hashtag.created_at) as latest_created_at
                    FROM hashtag
                    LEFT JOIN tweet ON hashtag.tweet_id = tweet.id
                    WHERE name LIKE LOWER(:searchTerm)
                    GROUP BY hashtag.name
                    ORDER BY latest_created_at DESC';

        
        $searchTerm = $searchTerm . '%';
    
        $stmt = $this->db->prepare($query);

        $stmt->bindParam(':searchTerm', $searchTerm);

        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;

    }
}

$exploreModel = new ExploreModel($db);


?>