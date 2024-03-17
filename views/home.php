<?php
include '../controller/UserController.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home | Tweet Academie</title>
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
                            <img src="../publics/img/logo_onglet.png" alt="logo" height="50px" width="50px" />
                        </div>
                    </div>

                    <a href="home.php">
                        <div class="grid-sidebar bg-active">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-house-fill"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a class="wrapper-left-active" href="home.php"><strong>Accueil</strong></a>
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
                    <a href="profile.php">
                        <div class="grid-sidebar">
                            <div class="icon-sidebar-align">
                                <i class="bi bi-person-fill"></i>
                            </div>
                            <div class="wrapper-left-elements mt-1">
                                <a  href="profil.php"><strong>Profile</strong></a>
                            </div>
                        </div>
                    </a>
                    <a href="message.php">
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
                            <div id="userData">
                                <p class="name" id="fullname"><strong>Fullname</strong></p>
                                <p class="username" id="username">@Pseudo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="grid-posts">
                <div class="border-right">
                    <div class="grid-toolbar-center">
                        <div class="center-input-search">
                            <div class="input-group-login" id="whathappen">
                                <div class="container">
                                    <div class="part-1">
                                        <div class="header">
                                            <div class="home">
                                                <h2>Accueil</h2>
                                            </div>
                                        </div>

                                        <div class="text">
                                            <form class="" action="" method="post" enctype="multipart/form-data">
                                                <div class="inner">
                                                    <img src="../publics/img/profile.png" alt="profile photo">
                                                    <label>
                                                        <textarea class="text-whathappen" name="status" rows="8" cols="80" placeholder="Quoi de neuf ?"></textarea>
                                                    </label>
                                                </div>

                                                <div id="user-suggestions" class="suggestions">
                                                    <ul></ul>
                                                </div>

                                                <div class="bottom">
                                                    <div class="bottom-container">
                                                        <label for="tweet_img" class="ml-3 mb-2 uni">
                                                            <i class="bi bi-image-fill"></i>
                                                        </label>
                                                        <input class="tweet_img" id="tweet_img" type="file" name="tweet_img">
                                                    </div>
                                                    <div class="hash-box">
                                                        <ul style="margin-bottom: 0;"></ul>
                                                    </div>
                                                    <div class="hash-box-items">
                                                        <span class="bioCount" id="count">140</span>
                                                        <input id="tweet-input" type="submit" name="tweet" value="Tweet" class="submit">
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div class="part-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-fixed" id="box-fixed">
                        <div class="box-tweet">
                            <div class="tweet-container">
                                
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
        </div>



    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="../publics/scripts/colorMode.js"></script>
    <script src="../publics/scripts/tweet.js"></script>
    <script src="../publics/scripts/home.js"></script>
    <script src="../publics/scripts/logout.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    </body>
</html>