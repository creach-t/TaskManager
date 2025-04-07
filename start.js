const { exec } = require('child_process');
const os = require('os');

// Détecter si on est sur Git Bash (vérifie si MINGW est dans la variable d'environnement)
const isGitBash = process.env.TERM === 'xterm' && os.platform() === 'win32' || 
                  process.env.MSYSTEM || 
                  (process.env.PATH && process.env.PATH.includes('Git\\mingw'));

// Choisir la commande Python appropriée selon l'environnement
const pythonCommand = isGitBash ? 'py' : 'python3';

// Commandes avec la commande Python appropriée
const djangoCommand = `${pythonCommand} manage.py runserver`;
const reactCommand = 'npm start';

console.log(`Environnement détecté: ${isGitBash ? 'Git Bash' : 'Autre terminal'}`);
console.log(`Utilisation de la commande Python: ${pythonCommand}`);

// Démarrer le serveur Django
const djangoProcess = exec(djangoCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erreur lors du démarrage du serveur Django : ${error.message}`);
        return;
    }
});

djangoProcess.stdout.on('data', (data) => {
    console.log(`Django: ${data}`);
});

djangoProcess.stderr.on('data', (data) => {
    console.error(`Django erreur: ${data}`);
});

// Attendre un peu avant de démarrer React pour laisser Django s'initialiser
setTimeout(() => {
    // Démarrer le serveur React
    const reactProcess = exec(reactCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors du démarrage du serveur React : ${error.message}`);
            return;
        }
    });

    reactProcess.stdout.on('data', (data) => {
        console.log(`React: ${data}`);
    });

    reactProcess.stderr.on('data', (data) => {
        console.error(`React erreur: ${data}`);
    });

    console.log('Vérification en cours de l\'application et des serveurs...');
    console.log(`*********************`);
    console.log(`L'application va se lancer sur la page http://localhost:3000/`);
    console.log(`*********************`);
    console.log(`Veuillez patienter la page s'ouvrira automatiquement`);
}, 2000);