from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=100)
    sku = models.CharField(max_length=100, unique=True)
    image_url = models.URLField(blank=True, null=True)
    description = models.TextField()
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.type} - {self.sku}"
