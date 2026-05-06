from django.db import models


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    photo = models.ImageField(upload_to='profile/', blank=True, null=True)
    cv = models.FileField(upload_to='cv/', blank=True, null=True)

    class Meta:
        verbose_name = 'Profil'

    def __str__(self):
        return self.name


class SkillCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Catégorie de compétence'
        verbose_name_plural = 'Catégories de compétences'

    def __str__(self):
        return self.name


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=100)
    level = models.PositiveIntegerField(default=80, help_text='Niveau en % (0-100)')

    class Meta:
        ordering = ['-level']
        verbose_name = 'Compétence'

    def __str__(self):
        return f'{self.name} ({self.category.name})'


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.JSONField(default=list)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    featured = models.BooleanField(default=False)
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, default="Aujourd'hui")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-featured']
        verbose_name = 'Projet'

    def __str__(self):
        return self.title


class Experience(models.Model):
    title = models.CharField(max_length=200, verbose_name='Poste')
    company = models.CharField(max_length=200, verbose_name='Entreprise')
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, default="Aujourd'hui")
    description = models.TextField()
    technologies = models.JSONField(default=list)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Expérience'
        verbose_name_plural = 'Expériences'

    def __str__(self):
        return f'{self.title} — {self.company}'


class Education(models.Model):
    degree = models.CharField(max_length=200, verbose_name='Diplôme')
    school = models.CharField(max_length=200, verbose_name='École')
    start_year = models.CharField(max_length=10)
    end_year = models.CharField(max_length=10)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Formation'

    def __str__(self):
        return f'{self.degree} — {self.school}'


class Certification(models.Model):
    title = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200, verbose_name='Organisme')
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name = 'Certification'

    def __str__(self):
        return f'{self.title} — {self.issuer}'


class ContactMessage(models.Model):
    name = models.CharField(max_length=100, verbose_name='Nom')
    email = models.EmailField()
    subject = models.CharField(max_length=200, verbose_name='Sujet')
    message = models.TextField(verbose_name='Message')
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False, verbose_name='Lu')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Message de contact'
        verbose_name_plural = 'Messages de contact'

    def __str__(self):
        return f'{self.name} — {self.subject}'
