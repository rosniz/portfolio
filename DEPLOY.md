# Déploiement du Portfolio

## Architecture
- Frontend (React) → Netlify (gratuit)
- Backend (Django) → Railway (gratuit)
- Base de données → SQLite incluse dans Railway

---

## 1. Backend sur Railway

1. Créer un compte sur railway.app
2. New Project → Deploy from GitHub repo
3. Sélectionner le dossier `backend/`
4. Ajouter les variables d'environnement dans Railway :

```
SECRET_KEY=une-cle-secrete-longue-et-aleatoire
DEBUG=False
ALLOWED_HOSTS=votre-app.railway.app
CORS_ALLOWED_ORIGINS=https://votre-portfolio.netlify.app
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=rosnifombeu@visiontechsarl.com
EMAIL_HOST_PASSWORD=HMiGNyTHeJfn
CONTACT_RECIPIENT=rosnifombeu@visiontechsarl.com
```

5. Ajouter un fichier `Procfile` dans backend/ :
```
web: gunicorn portfolio_project.wsgi --log-file -
```

6. Ajouter `gunicorn` dans requirements.txt

---

## 2. Frontend sur Netlify

1. Build local : `npm run build` dans frontend/
2. Glisser le dossier `dist/` sur netlify.com/drop
   OU connecter le repo GitHub

3. Mettre à jour l'URL de l'API dans frontend/.env.production :
```
VITE_API_URL=https://votre-app.railway.app
```

---

## 3. Mettre à jour les CORS

Dans Railway, mettre CORS_ALLOWED_ORIGINS avec l'URL Netlify finale.
