# MALTEM PROJECT
## Make sure docker is installed first
## For frontend, navigate to Frontend\maltemfe and run following commands in order:
### docker build -t maltemfe:latest .
### docker run -d -p 4200:80 maltemfe
## For frontend I use angular router instead of tanstack router for react.  I use ngrx instead of tanstack query as state management as in angular tanstack query is still experimental and not ready for production code
## For backend, navigate to Backend\MaltemBe and run following commands in order:
### docker build -t maltembe:latest .
### docker run -p 32772:8080 -p 32773:8081 -t -d maltembe
## Finally open browser to navigate to http://localhost:4200/cafes or http://localhost:4200/employees