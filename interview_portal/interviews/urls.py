# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ParticipantViewSet, InterviewViewSet, RegisterView, LoginView

# router = DefaultRouter()
# router.register('participants', ParticipantViewSet)
# router.register('interviews', InterviewViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
#      path('register/', RegisterView.as_view(), name='register'),  # Custom endpoint
#     path('login/', LoginView.as_view(), name='login'),  
# ]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, ParticipantViewSet, InterviewViewSet

router = DefaultRouter()
router.register(r'participants', ParticipantViewSet ,  basename='participant')
router.register(r'interviews', InterviewViewSet ,  basename='interview')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Registration route
    path('login/', LoginView.as_view(), name='login'),  # Login route
    path('', include(router.urls)),  # The rest of the API routes
]