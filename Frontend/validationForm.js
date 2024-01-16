// Fonction pour afficher un message d'erreur si l'un des champs n'est pas correctement rempli
// à la soumission du formulaire : 
function errorMessageForm () {
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const input = document.getElementById("image");
    let files = input.files;

    if (files.length === 0 || title.value === "" || category.value === "") {
        alert("L'un des champs du formulaire n'est pas rempli correctement.");
        return false;
    }
};