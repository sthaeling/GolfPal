# Golfpal
## Introduction
t.b.d.

## Technology stack
Following technologies are used:
* Python 3
* Django 
* React JS

## Local Development
### Setup
#### Backend

Install python3
````
brew install python3
````

Install virtual env
````
pip3 install virtualenv
````

Set environment to python3
````
virtualenv venv -p python3`
````

Activate local dev environent
````
source venv/bin/activate
````

Install django
````
pip3 install djangorestframework django-cors-headers
````

#### Frontend
Install node modules
````
npm install
````

### Start local server

#### Backend (Django) Server 

From project root move into golfpal folder
````
cd golfpal
````

Start server
````
python manage.py runserver
````

Backend server is now available at http://127.0.0.1:8000/

#### Frontend (React) Server

From project root move into frontend folder
````
cd frontend
````

Start npm server
````
npm start
````

Backend server is now available at http://127.0.0.1:3000/
