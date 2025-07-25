from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Product
from .serializers import ProductSerializer
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination


class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_409_CONFLICT)

        User.objects.create_user(username=username, password=password)
        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        print(f"Login attempt for user: {username}")
        print(f"Password provided: {password}")

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        print(f"User {username} authenticated successfully. Access token generated.--------",  refresh)
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
            
        }, status=200)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 50


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("-id")
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    def list(self, request, *args, **kwargs):
        """
        Override GET to return flat list instead of paginated response.
        """
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.save()
        return Response({
            "product_id": product.id,
            "message": "Product created successfully",
            "status_code": 201,
        }, status=status.HTTP_201_CREATED)


class UpdateProductQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        quantity = request.data.get("quantity")

        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            return Response({"error": "Invalid or missing quantity"}, status=status.HTTP_400_BAD_REQUEST)

        product.quantity = quantity
        product.save()

        return Response({
            "id": product.id,
            "name": product.name,
            "quantity": product.quantity,
            "message": "Quantity updated successfully"
        }, status=status.HTTP_200_OK)
