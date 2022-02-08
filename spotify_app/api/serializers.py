from rest_framework import serializers
from .models import Room

# Take the model from the python format and translate it into JSON format (dictionary format)


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'entry_code', 'host', 'guest_can_pause',
                  'votes_to_skip', 'created_date')


# POST Request
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')
