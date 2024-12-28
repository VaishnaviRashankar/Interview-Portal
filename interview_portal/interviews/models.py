from django.db import models

# models.py
class Participant(models.Model):
   name = models.CharField(max_length=255)
   email = models.EmailField(unique=True, null=False, blank=False)
   def __str__(self):
        return self.name


class Interview(models.Model):
    title = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    participants = models.ManyToManyField(Participant)

    def __str__(self):
        return self.title

