# Task Manager Application

Une application de gestion de tâches simple développée avec React et Axios pour interagir avec une API REST sous Django.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine (A lancer dans l'ordre) :

- Python 3.x
- `pip` (le gestionnaire de paquets pour Python)
  
```bash
   sudo apt install python3 python3-pip
```

- Django
- `djangorestframwork`

```bash
   pip3 install django djangorestframework
```

- NodeJS
- `npm` (le gestionnaire de paquets pour NodeJs)

```bash
   sudo apt install nodejs npm
```

## Installation

Cloner le depot sur votre machine

```bash
git clone lenomdurepoGithub
```

Se deplacer sur le dossier

```bash
cd TaskManager
```

installer les modules Nodes

```bash
  npm i
```

### Au besoin

Migrations de modele en DB

```bash
   python3 manage.py makemigrations

```

```bash
   python3 manage.py migrate
```

Créer un super user pour django

```bash
   python3 manage.py createsuperuser
```

## Lancement

Lancer les deux serveurs

```bash
   node start.js
```

### API REST DJANGO

Pour acceder à l'api, Ouvrez votre navigateur et accédez à `http://localhost:8000`.

## Serveur REACT

Pour acceder à l'application, Ouvrez votre navigateur et accédez à `http://localhost:3000`.

(Si vous avez un probleme n'hesitez pas a m'envoyer un mail)

CTRL+C dans le terminal pour quitter
