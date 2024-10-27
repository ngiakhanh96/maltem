# MALTEM PROJECT
## Make sure docker is installed first
## For frontend, navigate to Frontend\maltemfe and run following commands in order:
### docker build -t maltemfe:latest .
### docker run -d -p 4200:80 maltemfe
## For backend, navigate to Backend\MaltemBe and run following commands in order:
### docker build -t maltembe:latest .
### docker run -p 32772:8080 -p 32773:8081 -t -d maltembe