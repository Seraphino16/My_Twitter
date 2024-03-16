<?php

include '../models/explore_model.php';

class ExploreController {
    private $exploreModel;

    public function __construct($exploreModel) {
        $this->exploreModel = $exploreModel;
    }

    public function search() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_POST['searchTerm'])) {
                $searchTerm = $_POST['searchTerm'];

                if (strpos($searchTerm, '#') === 0) {
                    $searchResults = $this->exploreModel->searchHashtags($searchTerm);
                } else {
                    $searchResults = $this->exploreModel->searchUsers($searchTerm);
                }

                echo json_encode($searchResults);
            } elseif (isset($_POST['hashtag'])) {
                $hashtag = $_POST['hashtag'];
                $tweets = $this->exploreModel->selectTweetsWithHashtag($hashtag);
                echo json_encode($tweets);
            }
        }
    }
}


$exploreController = new ExploreController($exploreModel);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $exploreController->search();
}

?>