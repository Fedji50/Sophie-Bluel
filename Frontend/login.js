
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

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
                },
            body: JSON.stringify(loginValue),
        })
    });
}
saveLoginUser();
