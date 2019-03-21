from django.urls import path, re_path
from django.views.static import serve
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from restapi.api.dataset import DatasetView, LineView
from restapi.api.virtualkeyboard import VirtualKeyboardView, ListVirtualKeyboardView
from server.settings import PRIVATE_MEDIA_ROOT, PRIVATE_MEDIA_URL, BASE_DIR

import logging
import os

logger = logging.getLogger(__name__)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def protected_serve(request, path, document_root=None, show_indexes=False):
    return serve(request._request, path, document_root, show_indexes)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_content(request):
    print(os.path.join(PRIVATE_MEDIA_ROOT, request.GET['path']))
    return protected_serve(request._request, os.path.join(PRIVATE_MEDIA_ROOT, 'data', request.GET['path']), "/", False)

urlpatterns = \
    [
        # jwt
        path('token-auth/', obtain_jwt_token),
        path('token-refresh/', refresh_jwt_token),
        path('token-verify/', verify_jwt_token),

        # data
        re_path(r'^data/$', DatasetView.as_view()),
        re_path(r'^line/$', LineView.as_view()),

        re_path(r'^content/$', get_content),

        # virtual keyboard
        path('virtual-keyboard/', ListVirtualKeyboardView.as_view()),
        re_path(r'^virtual-keyboard/(?P<filename>[\w\.]+)/$', VirtualKeyboardView.as_view()),

    ] \
