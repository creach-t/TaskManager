# Task Manager Application

Une application de gestion de tâches simple développée avec React et Axios pour interagir avec une API REST Django.

## Fonctionnalités

- Créer, afficher, modifier et supprimer des tâches
- Interface utilisateur intuitive construite avec React
- API RESTful construite avec Django REST Framework
- Compatibilité cross-platform (Linux, Windows, macOS)

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

### Pour tous les systèmes :

- Python 3.x
- Node.js et npm

### Installation des dépendances

#### Sur Linux/macOS :

```bash
# Installation de Python et pip
sudo apt install python3 python3-pip    # Ubuntu/Debian
# ou
brew install python3                   # macOS avec Homebrew

# Installation des packages Python
pip3 install django djangorestframework django-cors-headers

# Installation de Node.js et npm
sudo apt install nodejs npm            # Ubuntu/Debian
# ou
brew install node                      # macOS avec Homebrew
```

#### Sur Windows :

```bash
# Installation de Python et pip (via PowerShell ou CMD)
# Téléchargez Python depuis python.org et installez-le

# Installation des packages Python
pip install django djangorestframework django-cors-headers

# Si vous utilisez Git Bash
py -m pip install django djangorestframework django-cors-headers

# Installation de Node.js et npm
# Téléchargez depuis nodejs.org et installez-le
```

## Installation

1. Clonez le dépôt sur votre machine :

```bash
git clone https://github.com/creach-t/TaskManager.git
cd TaskManager
```

2. Installez les modules Node :

```bash
npm install
```

3. Effectuez les migrations de la base de données :

```bash
# Sur Linux/macOS
python3 manage.py makemigrations
python3 manage.py migrate

# Sur Windows avec Git Bash
py manage.py makemigrations
py manage.py migrate

# Sur Windows avec CMD/PowerShell
python manage.py makemigrations
python manage.py migrate
```

4. Créez un superutilisateur pour l'administration Django :

```bash
# Sur Linux/macOS
python3 manage.py createsuperuser

# Sur Windows avec Git Bash
winpty py manage.py createsuperuser

# Sur Windows avec CMD/PowerShell
python manage.py createsuperuser
```

## Lancement de l'application

Utilisez le script de démarrage qui lance automatiquement les deux serveurs :

```bash
node start.js
```

Le script détectera automatiquement si vous utilisez Git Bash sur Windows et adaptera les commandes en conséquence.

### Accès à l'application

- **API REST Django** : http://localhost:8000
  - Interface d'administration : http://localhost:8000/admin/
  - API des tâches : http://localhost:8000/api/tasks/

- **Application React** : http://localhost:3000

## Résolution des problèmes courants

### Module manquant django-cors-headers

Si vous obtenez l'erreur `ModuleNotFoundError: No module named 'corsheaders'`, installez le package manquant :

```bash
pip install django-cors-headers
# ou sur Windows avec Git Bash
py -m pip install django-cors-headers
```

### Problèmes d'interface TTY sur Git Bash

Si vous rencontrez des problèmes lors de la création d'un superutilisateur sur Git Bash, utilisez `winpty` :

```bash
winpty py manage.py createsuperuser
```

## Développement

- Le code frontend React se trouve dans le dossier `/frontend`
- Le code backend Django se trouve dans le dossier `/taskmanager` et `/tasks`

## Arrêt des serveurs

Pour arrêter les serveurs, appuyez sur `CTRL+C` dans le terminal où ils s'exécutent.

## Contact

Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à ouvrir une issue sur GitHub ou à me contacter directement.
