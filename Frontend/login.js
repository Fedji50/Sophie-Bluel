function validationEmail() {
    //Permet de vérifier si l'email est au format souhaité qd je passe au champ du mot de passe:
    let emailField = document.getElementById("emailAddress");
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+[.]+[a-z0-9._-]+");

    emailField.addEventListener("focusout", function () { 
        let emailTag = document.getElementById("emailAddress").value;
        if(emailRegExp.test(emailTag)) {
            console.log("L'email est valide");
        } else {
            alert("L'adresse mail n'est pas au bon format.");
        }  
    }); 
};

function fieldCheck () {
    let forgotBtn = document.getElementById("forgot");
    forgotBtn.addEventListener("click", function () {
        let emailTag = document.getElementById("emailAddress").value;
        let passwordTag = document.getElementById("password").value;
    console.log(`email :${emailTag}, password : ${passwordTag}`)
    })
};

// Récupération des constantes pour le formulaire :
const form = document.querySelector("form");

//Sauvegarde des éléments du formulaire login sur l'API:
function saveLoginUser(event) {

    event.preventDefault();
    // console.log("Début de la fonction SaveLoginUser")
    
    //Récupération des valeurs du formulaire:
    let emailTag = document.getElementById("emailAddress").value;
    let passwordTag = document.getElementById("password").value;
    const loginValue = {
        email: emailTag,
        password : passwordTag,
    }

    // console.log("valeurs récupérées :", emailTag, passwordTag);

    if (emailTag === "sophie.bluel@test.tld" && passwordTag === "S0phie" ) {
        // console.log(loginValue);
        console.log(JSON.stringify(loginValue));
        
        fetch ("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginValue), 
        })
        .then (response => {
            console.log("Réponse du serveur :", response);
            return response.json()
            // if (!response.ok) {
            //     throw new Error(`Erreur HTTP! Statut : ${response.status}`);
            // }
        })
        .then (dataId => {
            console.log(dataId);
            
            //Traitement de la reponse en chaîne JSON pr être stockée plus tard
            let userId = (dataId.userId);
            let userName = "userId";
            let token = (dataId.token);
            let keyName = "token";
            //Stockage de l'Id et du token dans le localStorage et les cookies
            window.localStorage.setItem("userId", userId);
            window.localStorage.setItem("token", token);
            function setCookie (name, value) {
                document.cookie=`${name}=${value}; samesite=lax; path=/; Max-age=3600`         
            };
            setCookie(userName, userId);
            setCookie(keyName, token);
            //Vérification de la combinaison email - mot de passe:
            // errorEmailPassword();
            document.location.href="index.html"
            }) 
        .catch (error =>
            console.error("Erreur : ", error))
    } else {
    //Affiche un message d'alerte si la combinaison email-password est incorrect au clic sur le bouton de connexion
    return alert("La combinaison email - mot de passe n'est pas valide."); 
    };
    // console.log("Fin de la fonction saveLoginUser");
};      

// Vérification du mail: et du mot de passe:
validationEmail();
fieldCheck();
// Sauvergarde des informations de connexion:
form.addEventListener("submit", saveLoginUser);





