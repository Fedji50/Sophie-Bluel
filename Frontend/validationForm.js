// Fonction pour afficher un message d'erreur si l'un des champs n'est pas correctement rempli
// à la soumission du formulaire : 
function errorMessageForm () {
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const input = document.getElementById("image");
    const preview = document.getElementById("preview");
    let files = input.files;


    // console.log("input.value",input.value);
    // console.log("preview.src",preview.src);
    // console.log("title.value",title.value);
    // console.log("category.value",category.value);

    // if (input.value === "" || !preview.src || preview.src === "" || title.value === "" || category.value === "") {
    // // if (files.length === 0 || title.value === "" || category.value === "") {
    //     alert("L'un des champs du formulaire n'est pas rempli correctement.");
    //     return false;
    // }

    // if (input.value === 0) {
    //     alert("Veuillez sélectionner une image.");
    //     return false;
    // }
    
    // if (!preview.src || preview.src === "") {
    //     alert("L'aperçu de l'image est vide.");
    //     return false;
    // }
    
    // if (title.value === "") {
    //     alert("Veuillez entrer un titre.");
    //     return false;
    // }
    
    // if (category.value === "") {
    //     alert("Veuillez sélectionner une catégorie.");
    //     return false;
    // }

    if (files.length > 0 && preview.src !== "" && title.value.trim !== "" && category.value !== "") {
        console.log("le formulaire peut être soumis.")
        return true;
    } else {
        alert("L'un des champs du formulaire n'est pas rempli correctement.");
        return false;
    }
};
