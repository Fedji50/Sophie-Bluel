// Récupération des constantes pour le formulaire :
const form = document.querySelector("form");

//Sauvegarde des éléments du formulaire login sur l'API:
function saveLoginUser(event) {
    // Empêcher la validation du formulaire, le basculement vers l'API :
    event.preventDefault();
    
    //Récupération des valeurs du formulaire:
    let emailTag = document.getElementById("emailAddress").value;
    let passwordTag = document.getElementById("password").value;
    const loginValue = {
        email: emailTag,
        password : passwordTag,
    };

    if (emailTag === "sophie.bluel@test.tld" && passwordTag === "S0phie" ) {

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
            return response.json();
        })
        .then (dataId => {
            
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
            // Redirection vers la page principale :
            document.location.href="index.html"
            }) 
        .catch (error =>
            console.error("Erreur : ", error))
    } else {
    //Affiche un message d'alerte si la combinaison email-password est incorrect au clic sur le bouton de connexion
    return alert("La combinaison email - mot de passe n'est pas valide."); 
    };
};      

// Sauvergarde des informations de connexion:
form.addEventListener("submit", saveLoginUser);





