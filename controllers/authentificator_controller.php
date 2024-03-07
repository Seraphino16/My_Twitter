<?php

require '../models/authentificator_model.php';
header('Content-Type: application/json; charset=utf-8');

interface AuthentificatorInterface {
    public function register($formData);

}

class Authentificator implements AuthentificatorInterface {
    
    private $validator;
    private $hashing;
    private $authModel;

    public function __construct($validator, $hashing, $authModel) {

        $this->validator = $validator;
        $this->hashing = $hashing;
        $this->authModel = $authModel;
    }

    //Méthode pour l'inscription
    public function register($formData) {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $firstname = $formData['firstname'];
            $lastname = $formData['lastname'];
            $birthdate = $formData['birthdate'];
            $genre = $formData['genre'];
            $email = $formData['email'];
            $user_name = $formData['pseudo'];
            $password = $formData['password'];
            $confirm_password = $formData['confirm_password'];


            $ageValid = $this->validator->verifAge($birthdate);
            $passwordSecure = $this->validator->securePassword($password);
            $passwordMatch = $this->validator->samePassword($password, $confirm_password);
            $uniqueEmail = $this->validator->uniqueEmail($email);

            if ($ageValid === false) {
                $response = [
                    'status' => 'error',
                    'message' => 'Vous devez avoir au moins 13 ans pour vous inscrire.'
                ];

                echo json_encode($response);
    
            } elseif ($passwordSecure === false) {
                $response = [
                    'status' => 'error',
                    'message' => 'Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.'
                ];

                echo json_encode($response);
    
            } elseif ($passwordMatch === false) {
                $response = [
                    'status' => 'error',
                    'message' => 'Le mot de passe et sa confirmation doivent être identiques.'
                ];

                echo json_encode($response);
    
            } elseif ($uniqueEmail === false) {
    
                $response = [
                    'status' => 'error',
                    'message' => 'L\'adresse e-mail est déjà associée à un compte. Veuillez en saisir une autre.'
                ];

                echo json_encode($response);
    
            } else {
                $hashed_password = $this->hashing->hashPassword($password);
                $register = $this->authModel->registerUser($lastname, $firstname, $birthdate, 
                                                            $genre, $email, $user_name,
                                                            $hashed_password);
                if ($register) {
    
                    $response = [
                        'status' => 'success',
                        'message' => 'Inscription réussie !'
                    ];

                    echo json_encode($response);
    
                } else {
    
                    $response = [
                        'status' => 'error',
                        'message' => 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.'
                    ];

                    echo json_encode($response);
                }
            }
    
        } 

    }

        public function login($formData) {

            $email = $formData['email'];
            $password = $formData['password'];

            $user = $this->authModel->loginUser($email);

            if ($user) {


            if ($user['isActive'] === 1 && $user['isDeleted'] === 0) {

                $hashed_password = $user['password_hash'];
                $password_input = $this->hashing->hashPassword($password);
                $passwordVerify = $this->validator->verifyPassword($password_input, $hashed_password);

                if ($passwordVerify === true) {
                    
                    session_start();
    
                    $_SESSION['user_id'] = $user['id'];
    
                    $response = [
                        'status' => 'success',
                        'message' => $user
                    ];
                    
                    echo json_encode($response);

                } else {
    
                    $response = [
                        'status' => 'error',
                        'message' => 'Mot de passe ou email incorrect'
                    ];

                    echo json_encode($response);
                }
            } else {

                $reponse = [
                    'status' => 'error',
                    'message' => 'Votre compte à été désactivé, veuillez en créer un autre'
                ];

                echo json_encode($response);
            
            }

        } else {

            $reponse = [
                'status' => 'error',
                'message' => 'Aucun utilisateur trouvé veuillez créer un compte'
            ];

            echo json_encode($response);
        }
 
    }
}


?>