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

- Axios (gestionnaire de requete NodeJs)

```bash
  npm install axios
```

## Lancement

### API REST DJANGO

```bash
   cd taskmanager
   python3 manage.py makemigrations
   python3 manage.py migrate
   python3 manage.py runserver
```

Si vous devez creer un super User :

```bash
   python3 manage.py createsuperuser
```

Pour acceder à l'api, Ouvrez votre navigateur et accédez à `http://localhost:8000`.

## Serveur REACT

```bash
   npm i
   npm start
```

Pour acceder à l'api, Ouvrez votre navigateur et accédez à `http://localhost:3000`.
