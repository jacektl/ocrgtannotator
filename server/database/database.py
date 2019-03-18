from server.settings import PRIVATE_MEDIA_ROOT, PRIVATE_MEDIA_URL, BASE_DIR
import os
from typing import List

import logging

logger = logging.getLogger(__name__)


class Database:
    @staticmethod
    def image_extensions():
        return [".png", ".jpg", ".bmp"]

    @staticmethod
    def list_available():
        return [Database(name) for name in os.listdir(PRIVATE_MEDIA_ROOT)]

    def __init__(self, path):
        self.breadcrumb = path.split('/')

    def local_path(self, sub=''):
        return os.path.join(PRIVATE_MEDIA_ROOT, *self.breadcrumb, sub)

    def remote_path(self):
        return os.path.join(PRIVATE_MEDIA_URL, *self.breadcrumb)

    def to_json(self, ext_match: List[str]):
        return {
            'label': "/".join(self.breadcrumb),
            'path': self.remote_path(),
            'children': self.list_child_dirs(),
            'files': self.list_files(ext_match),
        }

    def list_child_dirs(self):
        return sorted([d for d in os.listdir(self.local_path()) if os.path.isdir(self.local_path(d))])

    def list_files(self, ext_match: List[str]):
        return sorted([f for f in os.listdir(self.local_path()) if os.path.isfile(self.local_path(f)) and any([f.endswith(ext) for ext in ext_match])])

    def file(self, name: str, ext: str):
        return DatasetFile(self, name, ext)


class DatasetFile:
    def __init__(self, dataset: Database, name: str, ext: str):
        self.dataset = dataset
        self.name = name
        self.ext = ext
        self.local_path = self.dataset.local_path(self.name + self.ext)
        logger.debug("Access file {}".format(self.local_path))

    def remove(self):
        os.remove(self.local_path)

    def exists(self):
        return os.path.exists(self.local_path)

    def get_or_create_content(self):
        with open(self.local_path, 'r') as f:
            return f.read()

    def set_content(self, s: str):
        with open(self.local_path, 'w') as f:
            f.write(s)

