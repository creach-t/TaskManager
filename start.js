const { exec } = require('child_process');

// Commande pour démarrer le serveur Django
const djangoCommand = 'python3 manage.py runserver';

// Commande pour démarrer le serveur React
const reactCommand = 'npm start';

// Démarrer le serveur Django
exec(djangoCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors du démarrage du serveur Django : ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Erreur lors du démarrage du serveur Django : ${stderr}`);
        return;
    }
});

// Démarrer le serveur React
exec(reactCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors du démarrage du serveur React : ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Erreur lors du démarrage du serveur React : ${stderr}`);
        return;
    }
});

console.log('Vérification en cours de l\'application et des serveurs...');
console.log(`*********************`);
console.log(`L'application va se lancer sur la page http://localhost:3000/`);
console.log(`*********************`);
console.log(`Veuillez patienter la page s'ouvrira automatiquement`);