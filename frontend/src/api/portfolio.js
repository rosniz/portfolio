import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

export const api = {
  getProfile: () => axios.get(`${API_BASE}/profile/`),
  getSkills: () => axios.get(`${API_BASE}/skills/`),
  getProjects: () => axios.get(`${API_BASE}/projects/`),
  getExperiences: () => axios.get(`${API_BASE}/experiences/`),
  getEducation: () => axios.get(`${API_BASE}/education/`),
  getCertifications: () => axios.get(`${API_BASE}/certifications/`),
  sendContact: (data) => axios.post(`${API_BASE}/contact/`, data),
}

// Données statiques de fallback (utilisées si le backend est hors ligne)
export const STATIC_DATA = {
  profile: {
    name: 'Rosni Fombeu',
    title: 'Développeur Fullstack Python/React | Spécialiste des Solutions IA',
    bio: "Développeur fullstack passionné d'intelligence artificielle avec plus de 4 ans d'expérience dans la conception de solutions web intelligentes. Solide expertise en Python, Django, React, et intégration d'APIs IA. Créateur de plateformes innovantes telles que TCF Express et SABI. Expert en Prompt Engineering et maîtrise avancée des outils IA (ChatGPT, Claude, Gemini).",
    location: 'Bafoussam, Cameroun',
    email: 'rosnifombeu@visiontechsarl.com',
    phone: '+237 674 554 947',
    github: 'https://github.com/rosniz',
    linkedin: 'https://linkedin.com/in/rosni-fombeu-111aab408',
    youtube: 'https://www.youtube.com/@RosniFombeuDevFullstack',
    portfolio_url: 'https://rosnifombeu.netlify.app',
    photo_url: null,
    cv_url: '',
  },

  skills: [
    {
      id: 1, name: 'Développement Fullstack & Mobile', icon: 'code', order: 1,
      skills: [
        { id: 1, name: 'Python', level: 95 },
        { id: 2, name: 'Django', level: 92 },
        { id: 3, name: 'React JS', level: 88 },
        { id: 4, name: 'React Native (Mobile)', level: 82 },
        { id: 5, name: 'JavaScript', level: 85 },
        { id: 6, name: 'APIs REST', level: 90 },
      ]
    },
    {
      id: 2, name: 'IA & Outils Génératifs', icon: 'brain', order: 2,
      skills: [
        { id: 7, name: 'Prompt Engineering', level: 98 },
        { id: 8, name: 'Claude AI (Anthropic)', level: 97 },
        { id: 9, name: 'ChatGPT', level: 96 },
        { id: 10, name: 'Google Gemini API', level: 88 },
        { id: 11, name: 'Génération de code IA', level: 95 },
        { id: 12, name: 'NLP & Machine Learning', level: 80 },
      ]
    },
    {
      id: 3, name: 'Formation & Pédagogie', icon: 'book', order: 3,
      skills: [
        { id: 13, name: 'Formation TCF (Canada/France)', level: 95 },
        { id: 14, name: 'Formation Outils IA', level: 92 },
        { id: 15, name: 'Formation Bureautique', level: 90 },
        { id: 16, name: 'Vulgarisation technique', level: 90 },
        { id: 17, name: 'Conception de supports', level: 88 },
      ]
    },
    {
      id: 4, name: 'Analyse de Données', icon: 'chart', order: 4,
      skills: [
        { id: 18, name: 'Power BI', level: 80 },
        { id: 19, name: 'SQL', level: 82 },
        { id: 20, name: 'Jupyter', level: 88 },
        { id: 21, name: 'Excel', level: 85 },
      ]
    },
    {
      id: 5, name: 'DevOps & Outils', icon: 'server', order: 5,
      skills: [
        { id: 22, name: 'Git/GitHub', level: 90 },
        { id: 23, name: 'Déploiement (Netlify/Railway)', level: 85 },
        { id: 24, name: 'Postman / Swagger', level: 88 },
        { id: 25, name: 'Docker', level: 72 },
      ]
    },
  ],

  projects: [
    {
      id: 1,
      title: 'TCF Express — Plateforme Web',
      description: "Plateforme complète de préparation au TCF Canada/France. Simulateur IA d'expression écrite avec correction automatique, feedback intelligent et moteur de recommandations personnalisées. Générée et déployée avec l'aide de Claude AI.",
      technologies: ['Python', 'Django', 'React', 'NLP', 'IA', 'Claude AI'],
      github_url: '',
      live_url: 'https://tcf-express.com',
      image_url: null,
      featured: true,
      start_date: '2024',
      end_date: "Aujourd'hui",
    },
    {
      id: 2,
      title: 'TCF Express — Application Mobile',
      description: "Version mobile de TCF Express pour iOS et Android. Préparation au TCF en mobilité avec exercices interactifs, suivi de progression et notifications intelligentes.",
      technologies: ['React Native', 'Django REST', 'IA', 'NLP'],
      github_url: '',
      live_url: '',
      image_url: null,
      featured: true,
      start_date: '2024',
      end_date: "Aujourd'hui",
    },
    {
      id: 3,
      title: 'Sensuela',
      description: "Site web professionnel conçu et développé pour le client Sensuela. Interface moderne, responsive et optimisée SEO. Développement rapide assisté par IA.",
      technologies: ['React', 'Django', 'Tailwind CSS', 'Claude AI'],
      github_url: '',
      live_url: 'https://sensuela.net',
      image_url: null,
      featured: false,
      start_date: '2024',
      end_date: "Aujourd'hui",
    },
    {
      id: 4,
      title: 'CIPCRE',
      description: "Site web officiel du Centre International de Promotion de la Création (CIPCRE). Portail institutionnel avec gestion de contenu, actualités et ressources numériques.",
      technologies: ['WordPress', 'PHP', 'HTML/CSS', 'JavaScript'],
      github_url: '',
      live_url: 'https://cipcre.org',
      image_url: null,
      featured: false,
      start_date: '2024',
      end_date: '2025',
    },
    {
      id: 5,
      title: 'EROLS',
      description: "Projet en cours de développement. Application web innovante avec intégration IA. Conception et développement fullstack assisté par IA générative.",
      technologies: ['React', 'Django', 'IA', 'Claude AI'],
      github_url: '',
      live_url: 'https://erols.netlify.app',
      image_url: null,
      featured: false,
      start_date: '2025',
      end_date: 'En cours',
    },
    {
      id: 6,
      title: 'SABI — Agriculture Intelligente',
      description: "Application mobile/web pour diagnostiquer les maladies des plantes par vision par ordinateur. Analyse des feuilles malades, chatbot assistant IA via Google Gemini API pour guider les agriculteurs.",
      technologies: ['Python', 'Vision par ordinateur', 'Google Gemini API', 'React'],
      github_url: '',
      live_url: '',
      image_url: null,
      featured: false,
      start_date: '2023',
      end_date: "Aujourd'hui",
    },
  ],

  experiences: [
    {
      id: 1,
      title: 'Fondateur & Développeur Principal',
      company: 'TCF EXPRESS',
      start_date: '2024',
      end_date: "Aujourd'hui",
      description: "• Création de la plateforme web tcf-express.com et de l'application mobile\n• Développement d'un simulateur IA d'expression écrite (correction automatique, feedback intelligent)\n• Intégration d'un moteur de recommandations IA basé sur les erreurs\n• Conception et livraison rapide grâce aux outils IA (Claude, ChatGPT)",
      technologies: ['Python', 'Django', 'React', 'React Native', 'IA', 'Claude AI'],
    },
    {
      id: 0,
      title: 'Formateur TCF & Outils IA',
      company: 'Formation & Vulgarisation Tech',
      start_date: '2023',
      end_date: "Aujourd'hui",
      description: "• Formateur certifié au Test de Connaissance du Français (TCF Canada / TCF France)\n• Formation professionnelle aux outils IA (Claude, ChatGPT, Gemini) pour particuliers et entreprises\n• Nombreux retours satisfaisants et résultats mesurables chez les apprenants\n• Conception de supports pédagogiques adaptés à tous niveaux\n• Vulgarisation technique pour des publics non-développeurs",
      technologies: ['TCF', 'Claude AI', 'ChatGPT', 'Gemini', 'Pédagogie'],
    },
    {
      id: 2,
      title: 'Concepteur & Développeur',
      company: 'SABI (Agriculture Intelligente)',
      start_date: '2023',
      end_date: "Aujourd'hui",
      description: "• Conception d'une application mobile/web pour diagnostiquer les maladies des plantes\n• Utilisation de la vision par ordinateur pour analyser les feuilles malades\n• Intégration d'un chatbot assistant IA via Google Gemini API",
      technologies: ['Python', 'Vision par ordinateur', 'Google Gemini API', 'React'],
    },
    {
      id: 3,
      title: 'Stagiaire — Suivi Évaluation & Appui Numérique',
      company: 'CIPCRE',
      start_date: '2024',
      end_date: '2025',
      description: "• Conception de formulaires de collecte pour le suivi-évaluation des projets terrain\n• Analyse et visualisation de données avec Excel et Power BI\n• Responsable des services numériques pour tous les projets actifs\n• Organisation de 3 sessions de formation bureautique pour le personnel",
      technologies: ['Power BI', 'Excel', 'WordPress'],
    },
    {
      id: 4,
      title: 'Développeur Web',
      company: 'PHILJHON TECH',
      start_date: 'Déc 2021',
      end_date: 'Fév 2022',
      description: "• Conception de sites web statiques et WordPress pour des communes rurales du Cameroun\n• Contribution à un projet pilote de développement numérique local\n• Intégration de contenus, optimisation visuelle et responsive design",
      technologies: ['WordPress', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
    },
  ],

  education: [
    {
      id: 1,
      degree: 'Licence en Intelligence Artificielle et Big Data',
      school: 'KEYCE Informatique',
      start_year: '2023',
      end_year: '2024',
      description: 'Formation spécialisée en IA et analyse de données',
    },
    {
      id: 2,
      degree: "BTS en Gestion des Systèmes d'Information",
      school: 'ISTEC de Bangangté',
      start_year: '2020',
      end_year: '2023',
      description: "Formation en gestion des systèmes d'information",
    },
    {
      id: 3,
      degree: 'Baccalauréat Scientifique (Série D)',
      school: 'Lycée bilingue de Bangangté',
      start_year: '2020',
      end_year: '2020',
      description: 'Formation scientifique',
    },
  ],

  certifications: [
    { id: 1, title: 'Programmation Python', issuer: 'OpenClassroom' },
    { id: 2, title: 'HTML et CSS', issuer: 'OpenClassroom' },
    { id: 3, title: 'Analyse des données avec Power BI', issuer: 'OpenClassroom' },
    { id: 4, title: "Python pour l'IA", issuer: 'OpenClassroom' },
    { id: 5, title: 'Requêtes avec SQL', issuer: 'OpenClassroom' },
    { id: 6, title: 'Développement Web avec Django', issuer: 'OpenClassroom' },
    { id: 7, title: 'Git et GitHub', issuer: 'OpenClassroom' },
    { id: 8, title: 'Machine Learning', issuer: 'OpenClassroom' },
  ],
}
