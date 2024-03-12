<?php

include 'authentificator_controller.php';
include 'validator_controller.php';
include 'hashing_controller.php';
header('Content-Type: application/json; charset=utf-8');



class FormHandler {
    
    private $authentificator;

    public function __construct($authentificator) {
        $this->authentificator = $authentificator;
    }

    // Méthode d'identification du formulaire soumis
    public function selectForm($formData) {
        if (isset($formData['form_type']) && $formData['form_type'] === 'register') {
            $this->authentificator->register($formData);
            
        } elseif (isset($formData['form_type']) && $formData['form_type'] === 'login') {
            $this->authentificator->login($formData);
       
        } elseif (isset($formData['form_type']) && $formData['form_type'] === 'logout') {
                $this->authentificator->logout($formData);
        } else {

            $response = [
                'status' => 'error',
                'message' => 'Formulaire non trouvé'
            ];
            echo json_encode($response);
        }
    }
}

$hashing = new Hashing();
$validator = new Validator($validatorModel);
$authentificator = new Authentificator($validator, $hashing, $authModel);
$formHandler = new FormHandler($authentificator);
$formHandler->selectForm($_POST);

?>