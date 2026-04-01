


npm install
npm test          # tests unitaires
npm teste2e  # tests E2E



## Preuve de fonctionnement

*Remplacer ce texte par la capture d'écran de l'application accessible depuis le navigateur avec l'IP publique Azure.*
![Preuve Azure]

## Lancer le projet localement

```bash
# Installer les dépendances
npm install

# Lancer l'application localement (port 3000)
npm start

# Lancer les tests unitaires
npm test

# Lancer les tests E2E
npm run test:e2e



Chaque push sur la branche main doit déclencher automatiquement :

- Tests unitaires ok
- Tests E2E ok


- Build de l’image Docker 
- Push de l’image sur Docker Hub
- Déploiement automatique sur une VM Azure (via SSH)
 

Aucune action manuelle n’est autorisée après le push.