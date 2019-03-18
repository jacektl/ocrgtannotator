from rest_framework.views import APIView
from rest_framework.response import Response
from json import JSONDecodeError
from database.database import Database
import logging
import json

logger = logging.getLogger(__name__)


class DatasetView(APIView):
    def post(self, request, label, format=None):
        data = json.loads(request.body)

        database = Database(data.get('path', ''))
        return Response(database.to_json(data.get('ext_match', Database.image_extensions())))

