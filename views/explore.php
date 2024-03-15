<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore | Tweet Academie</title>
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

                <a href="homeView.php">
                    <div class="grid-sidebar">
                        <div class="icon-sidebar-align">
                            <i class="bi bi-house-fill"></i>
                        </div>
                        <div class="wrapper-left-elements mt-1">
                            <a href="home.php"><strong>Accueil</strong></a>
                        </div>
                    </div>
                </a>
                <a href="">
                    <div class="grid-sidebar bg-active">
                        <div class="icon-sidebar-align">
                            <i class="bi bi-hash"></i>
                        </div>
                        <div class="wrapper-left-elements mt-1">
                            <a class="wrapper-left-active" href="explore.php"><strong>Explorer</strong></a>
                        </div>
                    </div>
                </a>
                <a href="">
                    <div class="grid-sidebar">
                        <div class="icon-sidebar-align">
                            <i class="bi bi-person-fill"></i>
                        </div>
                        <div class="wrapper-left-elements mt-1">
                            <a  href="profil.php"><strong>Profile</strong></a>
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
                <button class="button-twittear">
                    <strong>Tweeter</strong>
                </button>

                <div class="box-user">
                    <div class="grid-user">
                        <div><img src="../publics/img/profile.png" alt="user" class="img-user"/></div>
                        <div>
                            <p class="name"><strong>Name</strong></p>
                            <p class="username">@Pseudo</p>
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
                        <div style="width: 100%;" class="container">
                            <div class="input-group py-2 m-auto pr-5 position-relative search-explore">
                                <i class="bi bi-search" id="searchButton"></i>
                                <input type="text" class="form-control search-input" id="searchInput"  placeholder="Rechercher">
                                <div class="search-result">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-fixed" id="box-fixed">
                <div class="box-search-explore" id="box-search-explore">

                    <div class="tab-content" id="myTabContent">
                        <div id="resultsContent"></div>
                    </div>
                </div>
            </div>
            </div>


            <div class="wrapper-right">
                <div class="box-share">
                    <p class="txt-share"><strong>Qui suivre ?</strong></p>
                </div>


            </div>
        </div>
    </div>



        <script src="../publics/scripts/colorMode.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="../publics/scripts/explore.js"></script>
        <script src="../publics/scripts/logout.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
    </body>
</html>