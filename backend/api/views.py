from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.authentication import BasicAuthentication
from rest_framework.permissions import AllowAny
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
import logging

logger = logging.getLogger(__name__)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'profile':        reverse('profile', request=request),
        'skills':         reverse('skills', request=request),
        'projects':       reverse('projects', request=request),
        'experiences':    reverse('experiences', request=request),
        'education':      reverse('education', request=request),
        'certifications': reverse('certifications', request=request),
        'contact':        reverse('contact', request=request),
    })
from .models import (
    Profile, SkillCategory, Project,
    Experience, Education, Certification, ContactMessage
)
from .serializers import (
    ProfileSerializer, SkillCategorySerializer, ProjectSerializer,
    ExperienceSerializer, EducationSerializer, CertificationSerializer,
    ContactMessageSerializer
)


class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        return Profile.objects.first()


class SkillListView(generics.ListAPIView):
    queryset = SkillCategory.objects.prefetch_related('skills').all()
    serializer_class = SkillCategorySerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


def _build_notification_html(data):
    return f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }}
    .card {{ background: #fff; border-radius: 12px; padding: 32px; max-width: 560px;
              margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }}
    .badge {{ display: inline-block; background: #eff6ff; color: #2563eb;
               border: 1px solid #bfdbfe; border-radius: 6px; padding: 4px 12px;
               font-size: 12px; font-weight: 600; margin-bottom: 24px; }}
    h2 {{ color: #0f172a; margin: 0 0 6px; font-size: 20px; }}
    .sub {{ color: #64748b; font-size: 14px; margin-bottom: 24px; }}
    .field {{ margin-bottom: 16px; }}
    .label {{ font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;
               letter-spacing: 0.06em; margin-bottom: 4px; }}
    .value {{ color: #1e293b; font-size: 15px; }}
    .message-box {{ background: #f8fafc; border-left: 3px solid #2563eb; border-radius: 0 8px 8px 0;
                     padding: 16px; margin-top: 20px; color: #334155; line-height: 1.7; }}
    .footer {{ text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8; }}
    .reply-btn {{ display: inline-block; background: linear-gradient(135deg,#2563eb,#1d4ed8);
                   color: #fff !important; text-decoration: none; padding: 12px 28px;
                   border-radius: 10px; font-weight: 600; margin-top: 20px; font-size: 14px; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">📬 Nouveau message — Portfolio</div>
    <h2>{data['subject']}</h2>
    <p class="sub">Reçu depuis votre formulaire de contact</p>

    <div class="field">
      <div class="label">Expéditeur</div>
      <div class="value"><strong>{data['name']}</strong></div>
    </div>
    <div class="field">
      <div class="label">Email</div>
      <div class="value"><a href="mailto:{data['email']}" style="color:#2563eb">{data['email']}</a></div>
    </div>
    <div class="field">
      <div class="label">Sujet</div>
      <div class="value">{data['subject']}</div>
    </div>

    <div class="label" style="margin-top:8px">Message</div>
    <div class="message-box">{data['message'].replace(chr(10), '<br>')}</div>

    <div style="text-align:center">
      <a href="mailto:{data['email']}?subject=Re: {data['subject']}" class="reply-btn">
        Répondre à {data['name']}
      </a>
    </div>

    <div class="footer">rosnifombeu.portfolio — visiontechsarl.com</div>
  </div>
</body>
</html>
"""

def _build_confirmation_html(name):
    return f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 20px; }}
    .card {{ background: #fff; border-radius: 12px; padding: 32px; max-width: 520px;
              margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.08); text-align: center; }}
    .icon {{ font-size: 48px; margin-bottom: 16px; }}
    h2 {{ color: #0f172a; margin: 0 0 10px; }}
    p {{ color: #64748b; line-height: 1.7; font-size: 15px; }}
    .sig {{ margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0;
             font-size: 13px; color: #94a3b8; }}
    strong {{ color: #2563eb; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">✅</div>
    <h2>Message bien reçu, {name} !</h2>
    <p>Merci de m'avoir contacté. J'ai bien reçu votre message et je vous répondrai
       dans les <strong>24 heures</strong>.</p>
    <p>En attendant, n'hésitez pas à consulter mes projets sur
       <a href="https://tcf-express.com" style="color:#2563eb">tcf-express.com</a>.</p>
    <div class="sig">
      <strong>Rosni Fombeu</strong><br>
      Développeur Fullstack Python/React · Spécialiste IA<br>
      rosnifombeu@visiontechsarl.com
    </div>
  </div>
</body>
</html>
"""


class ContactView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        instance = serializer.save()
        data = serializer.validated_data

        # 1. Notification email → Rosni
        try:
            notif = EmailMultiAlternatives(
                subject=f"[Portfolio] {data['subject']}",
                body=f"De: {data['name']} <{data['email']}>\n\n{data['message']}",
                from_email=settings.EMAIL_HOST_USER,
                to=[settings.CONTACT_RECIPIENT],
                reply_to=[data['email']],
            )
            notif.attach_alternative(_build_notification_html(data), "text/html")
            notif.send()
        except Exception as e:
            logger.error(f"Notification email failed: {e}")

        # 2. Confirmation email → sender
        try:
            confirm = EmailMultiAlternatives(
                subject="Message reçu — Rosni Fombeu Portfolio",
                body=f"Bonjour {data['name']}, votre message a bien été reçu.",
                from_email=settings.EMAIL_HOST_USER,
                to=[data['email']],
            )
            confirm.attach_alternative(_build_confirmation_html(data['name']), "text/html")
            confirm.send()
        except Exception as e:
            logger.error(f"Confirmation email failed: {e}")

        return Response(
            {'message': 'Message envoyé avec succès !'},
            status=status.HTTP_201_CREATED
        )
