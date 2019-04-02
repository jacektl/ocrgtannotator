from rest_framework.views import APIView
from rest_framework.response import Response
import rest_framework.status as status
from server.settings import PRIVATE_MEDIA_ROOT
from database.database import Database
import logging
import json
import os

logger = logging.getLogger(__name__)


class VirtualKeyboardView(APIView):
    def get(self, request, filename):
        path = os.path.join(PRIVATE_MEDIA_ROOT, 'virtual_keyboards', filename)
        if not os.path.exists(path):
            return Response(status=status.HTTP_404_NOT_FOUND)

        with open(path, 'r') as f:
            return Response(json.load(f))

    def put(self, request, filename):
        path = os.path.join(PRIVATE_MEDIA_ROOT, 'virtual_keyboards', filename)

        with open(path, 'w') as f:
            json.dump(json.loads(request.body), f, indent=2)

        return Response()


class ListVirtualKeyboardView(APIView):
    def get(self, request):
        path = os.path.join(PRIVATE_MEDIA_ROOT, 'virtual_keyboards')
        if not os.path.exists(path):
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({'virtualKeyboards': [f for f in os.listdir(path) if f.endswith('.json')]})
