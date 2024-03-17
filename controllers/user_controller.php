<?php


include("../models/user_model.php");
if(isset($_POST["id"])) {
    $id_user = $_POST["id"];
} else {
    echo json_encode("ID utilisateur non trouvé");
    exit;
}

if(isset($_POST["username"])) {
    $username = $_POST["username"];
} else {
    echo json_encode("Username not found");
    echo json_encode($_POST);
    exit;
}

$user = new User($db, $username);

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
            case "updateProfile":
                $firstname = $_POST['firstname'];
                $bio = $_POST['bio'];
                $location = $_POST['location'];
                $url = $_POST["url"];
    
                $data = $user->updateProfile($firstname, $bio, $location, $url);
                $response["data"] = $data;
                break;
        case "follow":
            $userToFollow = $_POST["userToFollow"];

            $isFollow = $user->follow($userToFollow);
            $response["isFollow"] = $isFollow;
            break;

        case "unfollow":
            $userToUnfollow = $_POST["userToUnfollow"];

            $isUnfollow = $user->unfollow($userToUnfollow);
            $response["isUnfollow"] = $isUnfollow;
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

$response["USERNAME"] = $user->username;
$response["ID"] = $user->id_user;

echo json_encode($response);
?>