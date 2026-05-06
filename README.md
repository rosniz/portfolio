# Portfolio Rosni Fombeu

Stack : Django REST Framework + React + Tailwind CSS

## Structure

```
PORTFOLIO/
├── backend/     → Django REST API
└── frontend/    → React + Tailwind
```

## Démarrage rapide

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data     # Peuple la BDD avec vos données
python manage.py createsuperuser
python manage.py runserver
```

API disponible sur : http://localhost:8000/api/  
Admin disponible sur : http://localhost:8000/admin/

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Site disponible sur : http://localhost:5173

## Endpoints API

| Endpoint | Description |
|----------|-------------|
| GET /api/profile/ | Profil principal |
| GET /api/skills/ | Catégories + compétences |
| GET /api/projects/ | Projets |
| GET /api/experiences/ | Expériences professionnelles |
| GET /api/education/ | Formations |
| GET /api/certifications/ | Certifications |
| POST /api/contact/ | Formulaire de contact |
