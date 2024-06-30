const { exec } = require('child_process');

const commandMakeMigration = 'python3 manage.py makemigration';
const commandMigrate = 'python3 manage.py migrate';
const commandeNpmI = 'npm i'

exec(commandMakeMigration);
exec(commandMigrate);
exec(commandeNpmI);