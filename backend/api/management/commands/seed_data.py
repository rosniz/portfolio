from django.core.management.base import BaseCommand
from api.models import (
    Profile, SkillCategory, Skill, Project,
    Experience, Education, Certification
)


class Command(BaseCommand):
    help = 'Peuple la base de données avec les données initiales du portfolio'

    def handle(self, *args, **kwargs):
        self.stdout.write('Nettoyage des données existantes...')
        Profile.objects.all().delete()
        SkillCategory.objects.all().delete()
        Project.objects.all().delete()
        Experience.objects.all().delete()
        Education.objects.all().delete()
        Certification.objects.all().delete()

        # --- PROFIL ---
        Profile.objects.create(
            name='Rosni Fombeu',
            title='Développeur Fullstack Python/React | Spécialiste des Solutions IA',
            bio=(
                'Développeur fullstack passionné d\'intelligence artificielle avec plus de 4 ans '
                'd\'expérience dans la conception de solutions web intelligentes. Solide expertise '
                'en Python, Django, React, et intégration d\'APIs IA. Créateur de plateformes '
                'innovantes telles que TCF Express et SABI. Expert en Prompt Engineering et '
                'maîtrise avancée des outils IA (ChatGPT, Claude, Gemini). Profil DevOps avec '
                'une capacité de conception et livraison rapide de projets complexes.'
            ),
            location='Bafoussam, Cameroun',
            email='rosnifombeu@visiontechsarl.com',
            phone='+237 674 554 947',
            github='https://github.com/rosniz',
            linkedin='https://linkedin.com/in/rosni-fombeu-111aab408',
            portfolio_url='https://rosnifombeu.netlify.app',
        )
        self.stdout.write(self.style.SUCCESS('[OK] Profil cree'))

        # --- COMPÉTENCES ---
        skills_data = [
            {
                'name': 'Développement Fullstack & Mobile',
                'icon': 'code',
                'order': 1,
                'skills': [
                    ('Python', 95), ('Django', 92), ('React JS', 88),
                    ('React Native (Mobile)', 82), ('JavaScript', 85), ('APIs REST', 90),
                ]
            },
            {
                'name': 'IA & Outils Génératifs',
                'icon': 'brain',
                'order': 2,
                'skills': [
                    ('Prompt Engineering', 98), ('Claude AI (Anthropic)', 97),
                    ('ChatGPT', 96), ('Google Gemini API', 88),
                    ('Génération de code IA', 95), ('NLP & Machine Learning', 80),
                ]
            },
            {
                'name': 'Formation & Pédagogie',
                'icon': 'book',
                'order': 3,
                'skills': [
                    ('Formation TCF Canada/France', 95), ('Formation Outils IA', 92),
                    ('Formation Bureautique', 90), ('Vulgarisation technique', 90),
                    ('Conception de supports', 88),
                ]
            },
            {
                'name': 'Analyse de Données',
                'icon': 'chart',
                'order': 4,
                'skills': [
                    ('Power BI', 80), ('Excel', 85), ('Jupyter', 88),
                    ('SQL', 82), ('Visualisation de données', 80),
                ]
            },
            {
                'name': 'DevOps & Outils',
                'icon': 'server',
                'order': 5,
                'skills': [
                    ('Git/GitHub', 90), ('Netlify / Railway', 85),
                    ('Postman / Swagger', 88), ('Docker', 72), ('WordPress', 78),
                ]
            },
        ]

        for cat_data in skills_data:
            cat = SkillCategory.objects.create(
                name=cat_data['name'],
                icon=cat_data['icon'],
                order=cat_data['order'],
            )
            for skill_name, level in cat_data['skills']:
                Skill.objects.create(category=cat, name=skill_name, level=level)

        self.stdout.write(self.style.SUCCESS('[OK] Competences creees'))

        # --- PROJETS ---
        projects_data = [
            {
                'title': 'TCF Express — Plateforme Web',
                'description': "Plateforme complète de préparation au TCF Canada/France. Simulateur IA d'expression écrite avec correction automatique, feedback intelligent et moteur de recommandations personnalisées.",
                'technologies': ['Python', 'Django', 'React', 'NLP', 'IA', 'Claude AI'],
                'live_url': 'https://tcf-express.com',
                'featured': True, 'start_date': '2024', 'end_date': "Aujourd'hui", 'order': 1,
            },
            {
                'title': 'TCF Express — Application Mobile',
                'description': "Version mobile de TCF Express pour iOS et Android. Préparation au TCF en mobilité avec exercices interactifs, suivi de progression et notifications intelligentes.",
                'technologies': ['React Native', 'Django REST', 'IA', 'NLP'],
                'live_url': '',
                'featured': True, 'start_date': '2024', 'end_date': "Aujourd'hui", 'order': 2,
            },
            {
                'title': 'Sensuela',
                'description': "Site web professionnel conçu et développé pour le client Sensuela. Interface moderne, responsive et optimisée SEO.",
                'technologies': ['React', 'Django', 'Tailwind CSS', 'Claude AI'],
                'live_url': 'https://sensuela.net',
                'featured': False, 'start_date': '2024', 'end_date': "Aujourd'hui", 'order': 3,
            },
            {
                'title': 'CIPCRE',
                'description': "Site web officiel du Centre International de Promotion de la Création (CIPCRE). Portail institutionnel avec gestion de contenu et ressources numériques.",
                'technologies': ['WordPress', 'PHP', 'HTML/CSS', 'JavaScript'],
                'live_url': 'https://cipcre.org',
                'featured': False, 'start_date': '2024', 'end_date': '2025', 'order': 4,
            },
            {
                'title': 'EROLS',
                'description': "Projet en cours de développement. Application web innovante avec intégration IA. Conception et développement fullstack assisté par IA générative.",
                'technologies': ['React', 'Django', 'IA', 'Claude AI'],
                'live_url': 'https://erols.netlify.app',
                'featured': False, 'start_date': '2025', 'end_date': 'En cours', 'order': 5,
            },
            {
                'title': 'SABI — Agriculture Intelligente',
                'description': "Application mobile/web pour diagnostiquer les maladies des plantes via vision par ordinateur. Chatbot assistant IA via Google Gemini API.",
                'technologies': ['Python', 'Vision par ordinateur', 'Google Gemini API', 'React'],
                'live_url': '',
                'featured': False, 'start_date': '2023', 'end_date': "Aujourd'hui", 'order': 6,
            },
        ]

        for p in projects_data:
            Project.objects.create(github_url='', image=None, **p)

        self.stdout.write(self.style.SUCCESS('[OK] Projets crees'))

        # --- EXPÉRIENCES ---
        experiences = [
            {
                'title': 'Formateur TCF & Outils IA',
                'company': 'Formation & Vulgarisation Tech',
                'start_date': '2023',
                'end_date': "Aujourd'hui",
                'description': (
                    '• Formateur certifié au Test de Connaissance du Français (TCF Canada / TCF France)\n'
                    '• Formation professionnelle aux outils IA (Claude, ChatGPT, Gemini) pour particuliers et entreprises\n'
                    '• Nombreux retours satisfaisants et resultats mesurables chez les apprenants\n'
                    '• Conception de supports pedagogiques adaptes a tous niveaux\n'
                    '• Vulgarisation technique pour des publics non-developpeurs'
                ),
                'technologies': ['TCF', 'Claude AI', 'ChatGPT', 'Gemini', 'Pedagogie'],
                'order': 1,
            },
            {
                'title': 'Fondateur & Développeur Principal',
                'company': 'TCF EXPRESS',
                'start_date': '2024',
                'end_date': "Aujourd'hui",
                'description': (
                    '• Creation de la plateforme web tcf-express.com et de l\'application mobile\n'
                    '• Developpement d\'un simulateur IA d\'expression ecrite (correction automatique, feedback intelligent)\n'
                    '• Integration d\'un moteur de recommandations IA base sur les erreurs\n'
                    '• Conception et livraison rapide grace aux outils IA (Claude, ChatGPT)'
                ),
                'technologies': ['Python', 'Django', 'React', 'React Native', 'IA', 'Claude AI'],
                'order': 2,
            },
            {
                'title': 'Concepteur & Développeur',
                'company': 'SABI (Agriculture Intelligente)',
                'start_date': '2023',
                'end_date': "Aujourd'hui",
                'description': (
                    '• Conception d\'une application mobile/web pour diagnostiquer les maladies des plantes\n'
                    '• Utilisation de la vision par ordinateur pour analyser les feuilles malades\n'
                    '• Intégration d\'un chatbot assistant IA via Google Gemini API'
                ),
                'technologies': ['Python', 'Vision par ordinateur', 'Google Gemini API', 'React'],
                'order': 2,
            },
            {
                'title': 'Stagiaire — Suivi Évaluation & Appui Numérique',
                'company': 'CIPCRE',
                'start_date': '2024',
                'end_date': '2025',
                'description': (
                    '• Conception de formulaires de collecte pour le suivi-évaluation des projets terrain\n'
                    '• Analyse et visualisation de données avec Excel et Power BI\n'
                    '• Responsable des services numériques pour tous les projets actifs\n'
                    '• Organisation de 3 sessions de formation bureautique pour le personnel'
                ),
                'technologies': ['Power BI', 'Excel', 'WordPress'],
                'order': 3,
            },
            {
                'title': 'Développeur Web',
                'company': 'PHILJHON TECH',
                'start_date': 'Décembre 2021',
                'end_date': 'Février 2022',
                'description': (
                    '• Conception de sites web statiques et WordPress pour plusieurs communes rurales du Cameroun\n'
                    '• Contribution à un projet pilote de développement numérique local\n'
                    '• Intégration de contenus, optimisation visuelle et responsive design'
                ),
                'technologies': ['WordPress', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
                'order': 4,
            },
        ]

        for exp in experiences:
            Experience.objects.create(**exp)
        self.stdout.write(self.style.SUCCESS('[OK] Experiences creees'))

        # --- FORMATIONS ---
        formations = [
            {
                'degree': 'Licence en Intelligence Artificielle et Big Data',
                'school': 'KEYCE Informatique',
                'start_year': '2023',
                'end_year': '2024',
                'description': 'Formation spécialisée en IA et analyse de données',
                'order': 1,
            },
            {
                'degree': 'BTS en Gestion des Systèmes d\'Information',
                'school': 'ISTEC de Bangangté',
                'start_year': '2020',
                'end_year': '2023',
                'description': 'Formation en gestion des systèmes d\'information',
                'order': 2,
            },
            {
                'degree': 'Baccalauréat Scientifique (Série D)',
                'school': 'Lycée bilingue de Bangangté',
                'start_year': '2020',
                'end_year': '2020',
                'description': 'Formation scientifique',
                'order': 3,
            },
        ]

        for f in formations:
            Education.objects.create(**f)
        self.stdout.write(self.style.SUCCESS('[OK] Formations creees'))

        # --- CERTIFICATIONS ---
        certifications = [
            ('Programmation Python', 'OpenClassroom', 1),
            ('HTML et CSS', 'OpenClassroom', 2),
            ('Analyse des données avec Power BI', 'OpenClassroom', 3),
            ('Python pour l\'IA', 'OpenClassroom', 4),
            ('Requêtes avec SQL', 'OpenClassroom', 5),
            ('Développement Web avec Django', 'OpenClassroom', 6),
            ('Git et GitHub', 'OpenClassroom', 7),
            ('Machine Learning', 'OpenClassroom', 8),
        ]

        for title, issuer, order in certifications:
            Certification.objects.create(title=title, issuer=issuer, order=order)
        self.stdout.write(self.style.SUCCESS('[OK] Certifications creees'))

        self.stdout.write(self.style.SUCCESS('\nBase de donnees peuplee avec succes !'))
