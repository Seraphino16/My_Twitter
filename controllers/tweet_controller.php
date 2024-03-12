<?php
session_start();
require_once('../models/tweet_model.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['tweet']) && $_POST['tweet'] === 'true' && isset($_POST['status'])) {
        $message = $_POST['status'];
        $userId = $_POST['id'];

        $tweetId = tweetModel::createTweet($userId, $message);

        if ($tweetId !== false) {
            $date = tweetModel::getCreatedAtByID($tweetId); // Ajout : Récupérer la date de création

            if ($date !== false) {
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
}