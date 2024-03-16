<?php
session_start();
require_once('../config/database.php');
require_once('../models/tweet_model.php');



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer l'ID de l'utilisateur connecté depuis la session
    $userId = $_POST['id'];

    // Vérifier si les données du formulaire sont correctes
    if (isset($_POST['tweet']) && $_POST['tweet'] === 'true' && isset($_POST['status'])) {
        $message = $_POST['status'];

        // Analyser le texte pour détecter les hashtags
        preg_match_all('/#\w{1,20}\b/', $message, $matches);
        $hashtags = $matches[0];

        // Créer le tweet et obtenir son ID
        $tweetId = tweetModel::createTweet($userId, $message);

        // Si la création du tweet a réussi
        if ($tweetId !== false) {
            // Enregistrer les hashtags dans la base de données
            foreach ($hashtags as $tag) {
                tweetModel::createHashtag($tweetId, $tag);
            }

            // Obtenir la date de création du tweet
            $date = tweetModel::getCreatedAtByID($tweetId);

            if ($date !== false) {
                // Obtenir les informations sur l'utilisateur
                $userData = userModel::getUserDataByID($userId);

                if ($userData !== null) {
                    $fullname = $userData['firstname'] . ' ' . $userData['lastname'];
                    $username = $userData['username'];

                    echo json_encode([
                        'success' => true,
                        'fullname' => $fullname,
                        'username' => $username,
                        'message' => $message,
                        'date' => $date
                    ]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'User data could not be retrieved.']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to get tweet creation date.']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Tweet could not be created.']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid request.']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['query'])) {

    $query = $_GET['query'];

    $userSuggestions = userModel::searchUsersByUsername($query);

    $formattedSuggestions = [];
    foreach ($userSuggestions as $user) {
        $formattedSuggestions[] = [
            'id' => $user['id'],
            'fullname' => $user['firstname'] . ' ' . $user['lastname'],
            'username' => $user['username']
        ];
    }

    echo json_encode(['users' => $formattedSuggestions]);
} else {
    echo json_encode(['error' => 'Invalid request.']);
}