"""
URL configuration for backendInventorySystem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.conf import settings
from django.conf.urls.static import static
from inventory.views import *

schema_view = get_schema_view(
    openapi.Info(
        title="Inventory API",
        default_version='v1',
        description="API documentation for Inventory Management System",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin', admin.site.urls),

    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),

    path('products', ProductListCreateView.as_view(), name='add-product'),
    path('products/<int:pk>/quantity', UpdateProductQuantityView.as_view(), name='update-quantity'),

    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
