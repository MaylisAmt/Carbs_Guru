Carbs Guru

Description

Cette application de nutrition permet aux utilisateurs de créer, modifier et supprimer leurs programmes alimentaires. Elle inclut également des fonctionnalités de calcul pour suivre les apports nutritionnels quotidiens selon le type de jour (entraînement ou repos). L’application est conteneurisée avec Docker pour faciliter le déploiement et l'exécution sur divers environnements.

Prérequis

Avant de commencer, assurez-vous d’avoir les éléments suivants installés :

Docker (version 20.10 ou supérieure)
Docker Compose (si vous utilisez docker-compose.yml, version 1.29 ou supérieure)
Git (pour cloner le dépôt)


Installation et Configuration

1. Cloner le projet
bash
Copier le code
git clone <URL_DU_DEPOT>
cd <NOM_DU_REPERTOIRE>

2. Configuration des variables d'environnement
Avant de lancer l'application, créez un fichier .env à partir de l'exemple fourni :

bash
Copier le code
cp .env.example .env
Variables d'environnement requises
APP_PORT : Le port sur lequel l'application sera accessible (ex : 8000)
DATABASE_URL : URL de connexion à la base de données
API_KEY : Clé API pour des services tiers (si nécessaire)
Configurez chaque variable en fonction de votre environnement cible dans le fichier .env.

Instructions de Déploiement

1. Construire et Lancer les Conteneurs
Pour démarrer l'application, exécutez la commande suivante (avec Docker Compose) :

bash
Copier le code
docker-compose up -d --build
Cette commande :

Construit l’image Docker de l’application
Démarre les conteneurs en arrière-plan (-d)

2. Vérification du Déploiement
Une fois les conteneurs lancés, accédez à l'application dans votre navigateur à l'adresse suivante : http://localhost:8000 (ou le port configuré dans APP_PORT).
Pour vérifier que tout fonctionne correctement, consultez les logs Docker :
bash
Copier le code
docker logs <nom_du_conteneur>
Tests de Fonctionnement
Une fois l'application déployée, vous pouvez effectuer quelques vérifications de base :

Connexion à l'application : accédez à l'URL de l’application et vérifiez que l'interface s'affiche correctement.
Tests des fonctionnalités de base : testez l'ajout, la modification et la suppression de programmes alimentaires.
Calcul des apports : vérifiez que la fonctionnalité de calcul des apports fonctionne correctement et affiche des résultats.
Débogage et Résolution des Problèmes
Voici quelques commandes utiles pour le débogage :

Voir les logs des conteneurs :

bash
Copier le code
docker logs <nom_du_conteneur>
Redémarrer un conteneur :

bash
Copier le code
docker restart <nom_du_conteneur>
Arrêter et supprimer tous les conteneurs :

bash
Copier le code
docker-compose down
Si vous rencontrez des problèmes spécifiques, consultez la documentation de Docker ou vérifiez les erreurs dans les logs.

Rollback (Retour Arrière)
En cas de déploiement incorrect, vous pouvez revenir à une version précédente de l'image :

Supprimez les conteneurs actuels :

bash
Copier le code
docker-compose down
Revenez à une version antérieure : Si vous utilisez le contrôle de version (ex. git), revenez à une version antérieure du code, puis relancez le déploiement.

Redéployez en suivant les étapes de déploiement précédentes.

Mises à Jour
Pour mettre à jour l’application :

Pull des dernières modifications :

bash
Copier le code
git pull origin main
Reconstruire et redémarrer :

bash
Copier le code
docker-compose up -d --build
Cela garantit que l'application est mise à jour avec les dernières modifications.
