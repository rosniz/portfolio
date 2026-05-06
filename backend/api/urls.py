from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('skills/', views.SkillListView.as_view(), name='skills'),
    path('projects/', views.ProjectListView.as_view(), name='projects'),
    path('experiences/', views.ExperienceListView.as_view(), name='experiences'),
    path('education/', views.EducationListView.as_view(), name='education'),
    path('certifications/', views.CertificationListView.as_view(), name='certifications'),
    path('contact/', views.ContactView.as_view(), name='contact'),
]
