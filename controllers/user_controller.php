<?php


include("../models/user_model.php");
if(isset($_POST["id"])) {
    $id_user = $_POST["id"];
} else {
    echo json_encode("ID utilisateur non trouvé");
    exit;
}

$user = new User($db);

$user->id_user = $id_user;

$response = array();

if(isset($_POST["action"])) {
    $action = $_POST["action"];

    switch($action) {
        case "fetchCurrentUser":
            $userData = $user->fetchCurrentUser();
            
            $response = [
                "status" => "success",
                "data" => $userData
            ];
            break;
        case "getNbFollows":
            $nbFollows = $user->getNbFollows();
        
            $response["nbFollows"] = $nbFollows;
            break;
        case "getNbFollowers":
            $nbFollowers = $user->getNbFollowers();
 
            $response["nbFollowers"] = $nbFollowers;
            break;
        case "getFollowsList":
            $followsList = $user->getFollowsList();
           
            $response["followsList"] = $followsList;
            break;
        case "getFollowersList":
            $followersList = $user->getFollowersList();
        
            $response["followersList"] = $followersList;
            break;
        case "getTweets":
            $tweets = $user->getTweets();
        
            $response["tweets"] = $tweets;
            break;
        default:
            $response['status'] = 'error';
            $response['message'] = 'Action non valide';
            exit;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Action non spécifiée';
    exit;
}


echo json_encode($response);
?>
