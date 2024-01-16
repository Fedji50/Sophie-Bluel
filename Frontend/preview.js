// Récupération de l'image que l'on veut prévisualiser et de celle que l'on upload:
function previewfile () {
    let addPhotoBtn = document.getElementById("addPhoto");
    let input = document.getElementById("image");
    let preview = document.getElementById("preview");
    let addFileBtn = document.querySelector(".file-upload");
    let file = input.files;
    let icon = document.querySelector(".fa-image");
    let note = document.querySelector(".note");
    let returnBtn = document.querySelector(".fa-arrow-left");
    let closeBtn = document.getElementById("close");

    console.log(input.files);

    if (file.length > 0) {
        
        let fileReader = new FileReader();

        fileReader.onload = function (event) {
            preview.setAttribute("src", event.target.result);
        };

        fileReader.readAsDataURL(file[0]);
        // Si le tableau file contient au moins 1 élément,
        //  on cache le contenu de <div class="picture"> :
        addFileBtn.style.visibility = "hidden";
        input.style.visibility = "hidden";
        icon.style.visibility = "hidden";
        note.style.visibility = "hidden";  
    };
    // Si on revient sur la page de suppression de projet ou si on ferme la fenêtre,
    // on fait réappaître le contenu de <div class="picture"> pr ajouter une photo :
    returnBtn.addEventListener("click", function () {
        file.length = 0;
        preview.removeAttribute("src");
        addFileBtn.style.visibility = "visible";
        input.style.visibility = "visible";
        icon.style.visibility = "visible";
        note.style.visibility = "visible";
    });
    closeBtn.addEventListener("click", function () {
        file.length = 0;
        preview.removeAttribute("src");
        addFileBtn.style.visibility = "visible";
        input.style.visibility = "visible";
        icon.style.visibility = "visible";
        note.style.visibility = "visible";
    });
};