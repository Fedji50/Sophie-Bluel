function validationEmail() {
    //Permet de vérifier si l'email est au format souhaité qd je passe au champ du mot de passe:
    let passwordInput = document.querySelector("#password");
    passwordInput.addEventListener("focus", () => {
        const emailTag = emailInput.value;
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    if(emailRegExp.test(emailTag)) {
        console.log("L'email est valide");
    } else {
        alert("L'adresse mail n'est pas au bon format.");
    }  
    }) 
};

function errorEmailPassword(emailTag,passwordTag) {
    //Affiche un message d'alerte si la combinaison email-password est incorrect
    if (emailTag !== "sophie.bluel@test.tld" || passwordTag !== "S0phie" ) {
        return alert("La combinaison email - mot de passe n'est pas valide.");
    } /*else {
        document.location.href="index.html";
    }*/
};

//Sauvegarde des éléments du formulaire login sur l'API:
function saveLoginUser() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        //Récupération des valeurs du formulaire:
        const emailTag = document.getElementById("emailAddress").value;
        const passwordTag = document.getElementById("password").value;
        console.log("Pas de rechargement de la page")
        console.log(emailTag);
        console.log(passwordTag);

        const loginValue = {
            email: emailTag,
            password : passwordTag,
        }
        //Vérification du mail et du mot de passe
        validationEmail(emailTag);
        errorEmailPassword(emailTag,passwordTag);

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
            let dataIdJSON = JSON.stringify(dataId);
            console.log(dataIdJSON);
            //Stockage de l'Id et du token dans le localStorage et les cookies
            window.localStorage.setItem("key",dataIdJSON);
            document.cookie="user-Sophie; secure; samesite=lax";          
            } 
        catch (error) {
            console.log("Erreur : " + error)
            }          
        }   
)};
saveLoginUser();
