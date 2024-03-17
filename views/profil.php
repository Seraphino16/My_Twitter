<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile | Tweet Academie</title>
        <link rel="shortcut icon" type="image/png" href="../publics/img/logo_onglet.png">
    <link rel="stylesheet" href="../publics/css/style.css">
    <link href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    </head>

    <body class="theme-clair">
        <div id="all">
            <div class="wrapper-left">
                <div class="sidebar-left">
                    <div class="grid-sidebar">
                        <div class="icon-sidebar-align">
                            <img src="../publics/img/logo.png" alt="logo" height="50px" width="50px" />
                        </div>
                    </div>

                    <a href="home.php">
                        <div class="grid-sidebar">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-house-fill"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a href="home.php"><strong>Accueil</strong></a>
                            </div>
                        </div>
                    </a>
                    <a href="explore.php">
                        <div class="grid-sidebar">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-hash"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a href="explore.php"><strong>Explorer</strong></a>
                            </div>
                        </div>
                    </a>
                    <a href="profil.php">
                        <div class="grid-sidebar bg-active">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a class="wrapper-left-active" href="profil.php"><strong>Profile</strong></a>
                            </div>
                        </div>
                    </a>
                    <a href="">
                        <div class="grid-sidebar ">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-envelope-fill"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a href=""><strong>Messages</strong></a>
                            </div>
                        </div>
                    </a>
                    <a href="../controller/userController.php">
                        <div class="grid-sidebar">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-box-arrow-right"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a id="logout"><strong>Se déconnecter</strong></a>
                            </div>
                        </div>
                    </a>

                    <div class="theme">
                        <li class="nav-item align-items-center d-flex">
                            <i class="bi bi-sun-fill"></i>
                            <div class="ms-2 form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="themingSwitcher" />
                            </div>
                            <i class="bi bi-moon-fill"></i>
                        </li>
                    </div>
                    
                    <button class="button-twittear">
                        <strong>Tweeter</strong>
                    </button>

                    <div class="box-user">
                        <div class="grid-user">
                            <div><img src="../publics/img/profile.png" alt="user" class="img-user"/></div>
                            <div>
                                <p class="name" id="sessionFullname"><strong>Name</strong></p>
                                <p class="username" id="sessionPseudo">@Pseudo</p>
                            </div>
                            <div class="mt-arrow">
                                <!--
                                <i class="bi bi-caret-down-fill"></i>
                                -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid-posts">
                <div class="border-right">
                    <div class="grid-toolbar-center">
                        <div class="center-input-search">
                            <!-- Barre de recherche -->
                        </div>
                    </div>

                    <div class="box-fixed" id="box-fixed"></div>

                    <!-- Box Home Feed -->
                    <div class="box-home feed">
                        <div class="container">
                            <div class="row position-fixed box-name">
                                <div class="col-xs-2">
                                    <a href="javascript: history.go(-1);"> <i style="font-size:20px;" class="fas fa-arrow-left arrow-style"></i> </a>
                                </div>
                                <div class="col-xs-10">
                                    <span class="home-name fullname">Name</span>
                                    <p class="home-tweets-num">NB Tweets</p>
                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-md-12">
                                    <img class="w-100 home-img-cover" src="../publics/img/cover.png" alt="">
                                </div>
                            </div>
                            <div class="row justify-content-between">
                                <img class="home-img-user" src="../publics/img/profile.png" alt="">
                                <button id="unfollow-btn" type="button" class="edit-btn">Unfollow</button>
                                <button id="follow-btn" type="button" class="edit-btn">Follow</button>
                                <button id="edit-profile-btn" type="button" class="edit-btn" data-bs-toggle="modal" data-bs-target="#update-profile-modal">
                                    Edit Profile
                                  </button>
                                  
                            </div>
                            <div class="home-title">
                                <h4 class="fullname">Name</h4>
                                <p class="user-handle pseudo">@Pseudo
                                    <span class="ml-1 follows-you">Follows You</span>
                                </p>
                                <p class="bio"></p>
                            </div>
                            <div class="row home-loc-link ml-2">
                                <div class="col-md-4">
                                    <li class="">
                                        <i class="bi bi-geo-alt-fill"></i>
                                    </li>
                                </div>
                                <div class="col-md-6">
                                    <li>
                                        <i class="fas fa-link"></i>
                                        <a href="" target="_blank" class="website-url"></a>
                                    </li>
                                </div>
                            </div>
                            <div class="row home-loc-link ml-2">
                                <div class="col-md-6">
                                    <li class="">
                                        <i class="bi bi-calendar-event"></i>
                                    </li>
                                </div>
                            </div>
                            <div class="row home-follow ml-2 mt-1">
                                <div class="col-md-3">
                                    <div class="count-following-i" data-follow = "" data-bs-toggle="modal" data-bs-target="#following-modal">
                                        <span class="home-follow-count count-following">0</span> Following</div>
                                </div>
                                <div class="col-md-3">
                                    <div class="count-followers-i" data-follow = "" data-bs-toggle="modal" data-bs-target="#followers-modal" >
                                        <span class="home-follow-count count-followers">0</span> Followers</div>
                                </div>
                            </div>
                            <div class="popupUsers"></div>
                            <ul class="nav nav-tabs justify-content-center mt-4" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="" role="tab" aria-controls="home" aria-selected="true">Tweets</a>
                                </li>
                             
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"></div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"></div>
                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"></div>
                            </div>
                        </div>
                    </div>
                    <div class="box-fixed" id="box-fixed">
                        <div class="box-tweet">
                            <div class="tweet-container">
                                <!-- tweets -->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wrapper-right">
                    <div style="width: 90%;" class="container">
                        <div class="input-group py-2 m-auto pr-5 position-relative">
                            <i class="bi bi-search"></i>
                            <input type="text" class="form-control search-input"  placeholder="Rechercher">
                            <div class="search-result">
                            </div>
                        </div>
                    </div>

                    <div class="box-share">
                        <p class="txt-share"><strong>Qui suivre ?</strong></p>
                    </div>
                </div>
            </div>

            <!-- Modal for profile update -->
        <div class="modal fade" id="update-profile-modal" tabindex="-1" aria-labelledby="update-profile-label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="update-profile-label">Edit your profile</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="nameForm" aria-describedby="name" placeholder="Name">
                          <label for="nameForm">Name</label>
                        </div>
                        <div class="form-floating mb-3">
                          <textarea class="form-control" id="bioForm" placeholder="Bio" style="height: 100px"></textarea>
                          <label for="bioForm" class="form-label">Bio</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="locationForm" aria-describedby="location" placeholder="Location">
                            <label for="locationForm">Location</label>
                          </div>
                          <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="urlForm" aria-describedby="url" placeholder="url">
                            <label for="urlForm">Website</label>
                          </div>
                      </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="saveUpdateBtn">Save</button>
                </div>
              </div>
            </div>
        </div>


        <!-- Modal following-->
        <div class="modal fade" id="following-modal" tabindex="-1" aria-labelledby="following-modal-label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="following-modal-label">Follow: </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>

         <!-- Modal followers-->
         <div class="modal fade" id="followers-modal" tabindex="-1" aria-labelledby="followers-modal-label" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="followers-modal-label">Followed by: </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        </div>        

        <script src="../publics/scripts/colorMode.js"></script>
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="../publics/scripts/profil.js"></script>
        <script src="../publics/scripts/logout.js"></script>
        <!-- <script src="../publics/scripts/profileTweets.js"></script> -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    </body>
</html>