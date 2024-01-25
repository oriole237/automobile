const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();
const sectionFiches = document.querySelector(".fiches");
displayAll(pieces);

function displayAll(pieces){
    for(let piece of pieces){
        
        const pieceElement = document.createElement("article");
        const imageElement = document.createElement("img");
        const nomElement = document.createElement("h5");
        const categorieElement = document.createElement("p");
        const prixElement = document.createElement("p");
        const descriptionElement = document.createElement("p");
        const disponibilityElement = document.createElement("p");
    
        nomElement.innerHTML = `<b> ${piece.nom} </b>`;
        imageElement.src =  piece.image;
        categorieElement.innerText = piece.categorie ?? "Aucune categorie";
        prixElement.innerText = `Prix : ${piece.prix} fcfa`;
        descriptionElement.innerText = piece.description.length < 50 ? 
                    piece.description : `${piece.description.substring(0, 20)}...`;
        disponibilityElement.innerHTML = piece.disponibility ? "<b>En stock</b>" :
                                "<b>Rupture de stock</b>";
        disponibilityElement.classList.add("disponibility");
    
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(disponibilityElement);
    
        sectionFiches.appendChild(pieceElement);
    }
}

const filtresElement = document.querySelector('.filtres');
const trierBtn = document.createElement("button");
const filtrerPieceBtn = document.createElement("button");
const descriptionBtn = document.createElement("button");
const descOrder = document.createElement("button");


trierBtn.innerText = "Trier par prix croissants";
filtrerPieceBtn.innerText = "Filtrer les pièces non abordables";
descriptionBtn.innerText = "Filtrer par description";
descOrder.innerText = "Afficher par ordre décroissant";

filtresElement.appendChild(trierBtn);
filtresElement.appendChild(filtrerPieceBtn);
filtresElement.appendChild(descriptionBtn);
filtresElement.appendChild(descOrder);

trierBtn.addEventListener("click", function(){
    let piecesOrdo = Array.from(pieces);
    piecesOrdo.sort(function(a, b){
        return a.prix - b.prix;
    });
    sectionFiches.innerHTML = "";
    displayAll(piecesOrdo);
});

filtrerPieceBtn.addEventListener("click", function(){
    let piecesFilter = pieces.filter(function(a, i){
        return a.prix <= 35;
    });
    sectionFiches.innerHTML = "";
    displayAll(piecesFilter);
});

descriptionBtn.addEventListener("click", function(){
    let piecesDesc = pieces.filter(function(piece, index){
        return piece.description != "";
    });
    sectionFiches.innerHTML = "";
    displayAll(piecesDesc);
});

descOrder.addEventListener("click", function(){
    let piecesDesc = Array.from(pieces);
    piecesDesc.sort(function(a, b){
        return b.localeCompare(a);
    });
    sectionFiches.innerHTML = "";
    displayAll(piecesDesc);
});

