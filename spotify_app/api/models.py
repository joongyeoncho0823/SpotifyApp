from django.db import models
import string
import random
# Create your models here.


def generate_unique_entry_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(entry_code=code).count() == 0:
            break

    return code


class Room(models.Model):
    entry_code = models.CharField(
        max_length=8, default=generate_unique_entry_code, unique=True)
    # keep track of who host is
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_date = models.DateTimeField(auto_now_add=True)
