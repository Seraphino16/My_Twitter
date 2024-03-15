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
        $query = 'SELECT *
                    FROM hashtag
                    WHERE name LIKE LOWER(:searchTerm)
                    ORDER BY created_at DESC';

        
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