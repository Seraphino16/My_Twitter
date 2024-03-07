<?php

include '../models/validator_model.php';
header('Content-Type: application/json; charset=utf-8');

interface ValidatorInterface {
    public function calculateAge($birthdate);
    public function verifAge($birthdate);
    public function samePassword($password, $confirm_password);
    public function uniqueEmail($email);
    public function verifyPassword($password, $hashedPassword);
}

class Validator implements ValidatorInterface {
    
    private $validatorModel;

    public function __construct($validatorModel) {
        $this->validatorModel = $validatorModel;
    }
    
    // Calcul de l'âge
    public function calculateAge($birthdate) {
        $today = new DateTime();
        $birthDate = new DateTime($birthdate);
        $age = $today->diff($birthDate)->y;

        return $age;
    }

    // Véricifation de l'âge de l'utilisateur
    public function verifAge($birthdate) {
        $age = $this->calculateAge($birthdate);

        if ($age < 13) {

          return false;
        } 
    }

    // Vérifier que le mot de passe soit sécurisé
    public function securePassword($password) {
        $passwordRegex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/';
        
        if (!preg_match($passwordRegex, $password)) {
            
            return false;
        } 
    }

    // Comparaison du mot de passe et sa confirmation
    public function samePassword($password, $confirm_password) {

        if ($password !== $confirm_password) {
           
            return false;
        } 
    }

    // Email unique
    public function uniqueEmail($email) {

        $emailCount = $this->validatorModel->countEmail($email);

        if ($emailCount > 0) {

            return false;
        } 
    }

    public function verifyPassword($password, $hashed_password) {
        
        $result = hash_equals($password, $hashed_password);

        return $result;
    }

}

?>