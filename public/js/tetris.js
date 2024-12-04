// Taille du jeu
const COLONNES = 10;
const LIGNES = 20;
const TAILLE_BLOC = 30;

// Créer le tableau de jeu
let jeu = Array.from({ length: LIGNES }, () => Array(COLONNES).fill(0));

let canvas = document.getElementById('tetrisCanvas');
let ctx = canvas.getContext('2d');

// Définir la couleur des blocs
const couleurs = [
    '#00F0F0', // Cyan (I)
    '#F0F000', // Jaune (O)
    '#F000F0', // Violet (T)
    '#00F000', // Vert (S)
    '#F00000', // Rouge (Z)
    '#0000F0', // Bleu (J)
    '#F08000'  // Orange (L)
];

// Définir les formes
const formes = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[0, 1, 1], [1, 1, 0]], // S
    [[1, 1, 0], [0, 1, 1]], // Z
    [[1, 0, 0], [1, 1, 1]], // J
    [[0, 0, 1], [1, 1, 1]]  // L
];

// La pièce actuelle
let piece = {
    forme: formes[Math.floor(Math.random() * formes.length)],
    x: 3,
    y: 0,
    couleur: couleurs[Math.floor(Math.random() * couleurs.length)]
};

// Dessiner une pièce sur le canevas
function dessinerPiece(piece) {
    ctx.fillStyle = piece.couleur;
    piece.forme.forEach((ligne, y) => {
        ligne.forEach((cellule, x) => {
            if (cellule) {
                ctx.fillRect((piece.x + x) * TAILLE_BLOC, (piece.y + y) * TAILLE_BLOC, TAILLE_BLOC, TAILLE_BLOC);
            }
        });
    });
}

// Dessiner le tableau de jeu
function dessinerTableau() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    jeu.forEach((ligne, y) => {
        ligne.forEach((cellule, x) => {
            if (cellule) {
                ctx.fillStyle = cellule;
                ctx.fillRect(x * TAILLE_BLOC, y * TAILLE_BLOC, TAILLE_BLOC, TAILLE_BLOC);
            }
        });
    });
}

// Vérifier les collisions avec le tableau
function verifierCollision() {
    for (let y = 0; y < piece.forme.length; y++) {
        for (let x = 0; x < piece.forme[y].length; x++) {
            if (piece.forme[y][x] && (
                piece.y + y >= LIGNES || 
                piece.x + x < 0 || 
                piece.x + x >= COLONNES || 
                jeu[piece.y + y][piece.x + x])) {
                return true;
            }
        }
    }
    return false;
}

// Ajouter la pièce au tableau de jeu
function ajouterPiece() {
    piece.forme.forEach((ligne, y) => {
        ligne.forEach((cellule, x) => {
            if (cellule) {
                jeu[piece.y + y][piece.x + x] = piece.couleur;
            }
        });
    });
}

// Faire descendre la pièce
function deplacerPiece() {
    piece.y++;
    if (verifierCollision()) {
        piece.y--;
        ajouterPiece();
        piece = {
            forme: formes[Math.floor(Math.random() * formes.length)],
            x: 3,
            y: 0,
            couleur: couleurs[Math.floor(Math.random() * couleurs.length)]
        };
    }
}

// Fonction principale du jeu
function jeuPrincipal() {
    deplacerPiece();
    dessinerTableau();
    dessinerPiece(piece);
}

// Mise à jour du jeu toutes les 500 ms
setInterval(jeuPrincipal, 500);
