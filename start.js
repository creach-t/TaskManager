const { exec } = require('child_process');

// Commande pour démarrer le serveur Django
const djangoCommand = 'python3 manage.py runserver';

// Commande pour démarrer le serveur React
const reactCommand = 'npm start';

// Démarrer le serveur Django
exec(djangoCommand);

// Démarrer le serveur React
exec(reactCommand);
