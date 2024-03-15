<?php

include '../models/explore_model.php';

class ExploreController {
    private $exploreModel;

    public function __construct($exploreModel) {
        $this->exploreModel = $exploreModel;
    }

    public function searchUsers() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $searchResults = [];

            if (isset($_POST['searchTerm'])) {
                $searchTerm = $_POST['searchTerm'];

                $searchResults = $this->exploreModel->searchUsers($searchTerm);
            }

            echo json_encode($searchResults);
        }
    }
    
}


$exploreController = new ExploreController($exploreModel);
$exploreController->searchUsers($_POST)

?>