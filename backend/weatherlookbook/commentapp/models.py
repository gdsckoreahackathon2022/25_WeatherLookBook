from django.db import models
from boardapp.models import Board
from accountapp.models import User

# Create your models here.
class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, max_length=100)
    text = models.TextField()
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.text