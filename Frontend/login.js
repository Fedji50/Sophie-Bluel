
function validationEmail() {
    //Permet de vérifier si l'email est au format souhaité qd je passe au champ du mot de passe:
    let emailField = document.getElementById("emailAddress");
    let emailTag = document.getElementById("emailAddress").value;
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    emailField.addEventListener("focusout", function () { 
        if(emailRegExp.test(emailTag) || emailTag === "") {
            console.log("L'email est valide");
        } else {
            alert("L'adresse mail n'est pas au bon format.");
        }  
    }); 
};

function errorEmailPassword() {
    let emailTag = document.getElementById("emailAddress").value;
    let passwordTag = document.getElementById("password").value;
    let connectionBtn = document.getElementById("connexion");
    //Affiche un message d'alerte si la combinaison email-password est incorrect au clic sur le bouton de connexion
    connectionBtn.addEventListener("click", function () {
        if (emailTag !== "sophie.bluel@test.tld" || passwordTag !== "S0phie" ) {
            return alert("La combinaison email - mot de passe n'est pas valide.");
        } 
        else {
        document.location.href="index.html";  
    }});    
};

//Sauvegarde des éléments du formulaire login sur l'API:
function saveLoginUser() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        //Récupération des valeurs du formulaire:
        let emailTag = document.getElementById("emailAddress").value;
        let passwordTag = document.getElementById("password").value;
        console.log("Pas de rechargement de la page")
        
        const loginValue = {
            email: emailTag,
            password : passwordTag,
        }
        
        console.log(loginValue);
        //pour récupérer les informations de connexion (email, password, userId, token d'authentification)
        const url = "http://localhost:5678/api/users/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                    },
                body: JSON.stringify(loginValue),
        
            });

            const dataId = await response.json();
            console.log(dataId);
            //Traitement de la reponse en chaîne JSON pr être stockée plus tard
            let userId = (dataId.userId);
            let userName = "userId";
            console.log(userId);
            let token = (dataId.token);
            let keyName = "token";
            console.log(token);
            //Stockage de l'Id et du token dans le localStorage et les cookies
            window.localStorage.setItem("userId", userId);
            window.localStorage.setItem("token", token);
            function setCookie (name, value) {
                document.cookie=`${name}=${value}; samesite=lax; path=/; Max-age=3600`         
            };
            setCookie(userName, userId);
            setCookie(keyName, token);
            
            } 
        catch (error) {
            console.log("Erreur : " + error)
            }
            
            
        }

)};
// Vérification du mail: et du mot de passe:
// validationEmail();
// Sauvergarde des informations de connexion:
saveLoginUser();
//Vérification de la combinaison email - mot de passe:
errorEmailPassword();


