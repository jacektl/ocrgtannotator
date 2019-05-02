# ocrGTannotator

The *ocrGTannotator* is a customizable server/client application to annotate lines of text images with ground-truth (GT) text.
Furthermore it allows to create GT for recognizing typographic patters.

## Requirements
* Node/npm
* python>=3.6
* virtualenv (or comparable Anaconda environment)

### Ubuntu 18.04 packages
```bash
sudo apt install nodejs npm python3-pip virtualenv libsm6 libxrender1 libfontconfig1
```

### Windows
Download and install [nodejs](https://nodejs.org) (LTS recommended) and [python](https://www.python.org/downloads/) (add phyton to path and install pip).

### Anaconda users
Alternatively, Anaconda users will find instructions for use of the supplied `ocrgtannotator.yml` file to create the appropriate Python environment.
The created environment will include Python as well as handle appropriate path entries upon environment activation.

### All Users
Whether using a `virtualenv` or `conda env`, all users need to install `nodejs`. This installation typically includes the needed `npm` package manager and build tools.

## Setup
Clone the repository

### Prepare the webapp
```bash
cd webapp
npm install -g @angular/cli
npm install
ng build
```

### Additional steps for Windows users
Since Windows does not, by default, support symlinks you need to manually create the symlink during initial installation or use an `xcopy` command during installation and _before_ whenever you run the `manage.py collectstatic` command or _after_ the `ng build` command. 

To create a *symlink under Windows*, use the `mklink` command at a command prompt assuming you are still in the ocrgtannotator/webapp directory:
```
del .\..\server\webapp\static\webapp
mklink /D .\..\server\webapp\static\webapp\  ..\..\..\webapp\dist\webapp
```

Note that unless you are running the Creators Update or later, you may need to open a command prompt window in administrators mode to issue the mklink command.

Alternatively, you will need to copy the webapp directory to the server during initial installation and after any time you call `ng build` (or run `collectstatic`):
```
cd webapp
del .\..\server\webapp\static\webapp
xcopy .\dist\webapp  ..\server\webapp\static\webapp\ /s /e /y
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

If you plan to use an Anaconda environment on any platform, simply ignore the `virtualenv`, `activate`, and `pip install` commands above and use the 'yml' file to create the default `ocrgtannotator` conda environment. Once created, activate it while in the `ocrgtannotator/server` directory:
```
conda env create -f environment.yml
conda activate ocrgtannotator
```

Once the environment is created and activated you may proceed with running the `manage.py` commands as above.

## Start the server
Again note, if using Anaconda simply activate the `ocrgtannotator` environment rather than the `venv` environment before issuing the `runserver` command:
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

If you are a Windows user and _not_ using a symlink as described above, do not forget to copy the webapp to `server/webapp/static` before calling `collectstatic`.

## File deployment
Add your files in a arbitrary directory structure under `server/storage/data`.
Each line image must be a single `.png` or `.jpg` file and the basename may not contain additional dots.
The GT are labeled `basename + ".gt.txt"`.
(Also see Modifying the GT data)

# Modifying the ocrgtannotator

Unfortunately, currently, there exist no config files yet. Thus you must change the code directly if you want to adapt anything.

## Modifying the GT data
Change [this](https://github.com/ChWick/ocrgtannotator/blob/cdc6868c72b6767d0787fe593a31ab51bdf0683b/server/database/database.py#L13) line to modify the line image extensions (e.g. only `.dew.png` or `.bin.bmp`). These image are listed as available lines

## Modifying the gt extension, typography characters, typography separators
Change [here](https://github.com/ChWick/ocrgtannotator/blob/master/webapp/src/app/editor/line-editor/editor-card/editor-card.component.html)

## Modifying the typography types
Change [here](https://github.com/ChWick/ocrgtannotator/blob/cdc6868c72b6767d0787fe593a31ab51bdf0683b/webapp/src/app/editor/line-editor/single-line-editors/typography-view/typography-view.component.ts#L33)
The first argument of a `TypographyType` denotes the typography character in the gt, the second argument provedes css style classes to use for this type.

