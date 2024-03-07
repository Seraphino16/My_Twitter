<?php

interface HashingInterface {
    public function hashPassword($password);
}

class Hashing implements HashingInterface {
    
     // Ajout du salt et hachage du mot de passe
     public function hashPassword($password) {

        $salt = 'vive le projet tweet_academy';
        $password_concact_salt = $password . $salt;
        $hashed_password = hash('ripemd160', $password_concact_salt);

        return $hashed_password;
    }
}



?>