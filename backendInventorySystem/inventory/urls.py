from django.urls import path
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
    path('products/', ProductCreateView.as_view(), name='add-product'),
    path('products/<int:pk>/quantity/', UpdateProductQuantityView.as_view(), name='update-quantity'),
]