from rest_framework.views import APIView
from rest_framework.response import Response
from json import JSONDecodeError
from database.database import Database
import logging
import json

logger = logging.getLogger(__name__)


class DatasetView(APIView):
    def post(self, request):
        data = json.loads(request.body)

        database = Database(data.get('path', ''))
        return Response(database.to_json(data.get('ext_match', Database.image_extensions())))


class LineView(APIView):
    def post(self, request):
        data = json.loads(request.body)

        database = Database(data.get('path', ''))
        file = database.file(data['file'], data['ext'])
        r = {'content': '', 'exists': file.exists()}
        logger.debug('Requesting {}'.format(file.local_path))
        if file.exists():
            r['content'] = file.get_or_create_content()

        return Response(r)

    def put(self, request):
        data = json.loads(request.body)

        database = Database(data.get('path', ''))
        file = database.file(data['file'], data['ext'])
        file.set_content(data['content'])

        return Response()


