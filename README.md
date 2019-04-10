# ocrgtannotator

The ocrgtannotator is a customizable server/client application to annotate lines of text images with GT text.
It also supports typography.

## Requirements

* Node/npm
* python>=3.6
* virtualenv

### Ubuntu 18.04 packages
```bash
sudo apt install nodejs npm python3-pip virtualenv libsm6 libxrender1 libfontconfig1
```

## Setup

Clone the repository

### Prepare the webapp
```bash
cd webapp
npm install -g @angular/cli
npm install
ng build
```

### Prepare the server
```bash
cd server
virtualenv -p python3 venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic
python manage.py createsuperuser
```

## Start the server
```
cd server
source venv/bin/activate
python manager.py runserver
```
Navigate to [http://127.0.0.1:8000/]

## Update
```
git pull origin master
cd webapp && ng build && cd ..
cd server && python manage.py collectstatic --noinput
```

## File deployment
Add your files in a arbitrary directory structure under `server/storage`.
Each line image must be a single `.png` or `.jpg` file and the basename may not contain additional dots.
The GT are labeled `basename + ".gt.txt"`.
