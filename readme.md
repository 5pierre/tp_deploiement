# Projet de Déploiement Continu (CI/CD)

Ce projet configure une pipeline d'intégration et de déploiement continus pour une application Node.js. 

## Fonctionnement du Pipeline

Le processus est entièrement automatisé. Chaque push sur la branche `main` déclenche les actions suivantes via GitHub Actions :

- Exécution des tests unitaires
- Exécution des tests E2E
- Build de l'image Docker de l'application
- Push de l'image sur Docker Hub
- Déploiement automatique sur une VM Azure (via connexion SSH)

Aucune action manuelle n'est autorisée ou requise après le push.

## Lancer le projet localement

Pour exécuter et tester l'application sur votre machine :

```bash
# Installer les dépendances
npm install

# Lancer l'application localement (port 3000)
npm start

# Lancer les tests unitaires
npm test

# Lancer les tests E2E
npm run test:e2e