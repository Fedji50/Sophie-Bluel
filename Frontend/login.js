function goToMainPage() {
    //Bascule vers la page index.html quand l'utilisateur est logé
    let connexionBtn = document.getElementById("connexion");
    connexionBtn.addEventListener("click", (event) => {
        document.location.href="index.html"
    })         
}

function validerEmail() {
    //Permet de vérifier si l'email est au format souhaité:
    const emailTag = document.getElementById("emailAddress").value;
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+");
    if(emailRegExp.test(emailTag)) {
        return true;
    } else {
        alert("L'adresse mail n'est pas au bon format.");
        return false;
    }  
};

function errorEmailPassword(emailTag,passwordTag) {
    //Affiche un message d'alerte si la combinaison email-password est incorrect
    if (emailTag !== "sophie.bluel@test.tld" || passwordTag !== "S0phie" ) {
        return alert("La combinaison email - mot de passe n'est pas valide.");
    }
};


//Sauvegarde des éléments du formulaire login sur l'API:
function saveLoginUser() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
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
        validerEmail(emailTag);
        errorEmailPassword(emailTag,passwordTag);
        //pour récupérer les informations de connexion (email, password, userId, token d'authentification)
        let url = "http://localhost:5678/api/users/login"
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify(loginValue),
        })
        .then((reponse) =>reponse.json())
        .then((data) => {
            console.log(data);
            window.localStorage.setItem(data);
        })
        .catch(error => console.log("Erreur : " + error));


        }

    
)};
saveLoginUser();
