// Récupération de l'image que l'on veut prévisualiser et de celle que l'on upload:
function previewfile () {
    // let input = event.target;
    let input = document.getElementById("image");
    let preview = document.getElementById("preview");
    let addFileBtn = document.querySelector(".file-upload");
    let file = input.files;
    let icon = document.querySelector(".fa-image");
    let note = document.querySelector(".note");
    
    // console.log(input.files);

    if (file.length > 0) {
        
        let fileReader = new FileReader();

        fileReader.onload = function (event) {
            preview.setAttribute("src", event.target.result);
        };

        fileReader.readAsDataURL(file[0]);
        // Si le tableau file contient au moins 1 élément,
        //  on cache le contenu de <div class="picture"> :
        addFileBtn.style.visibility = "hidden";
        input.style.display = "none";
        icon.style.visibility = "hidden";
        note.style.visibility = "hidden";  
    };
    
};