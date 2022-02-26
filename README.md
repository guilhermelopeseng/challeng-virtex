# Desafio Virtex

## Etapas do Desafio

### Etapa 1 - Banco de Dados

- O Banco Utilizado foi o MySql

* O banco de dados está localizado na pasta data
* O comando a seguir para subir o banco de dados deve ser executado dentro da pasta:
```console
$ docker-compose up --build
```
### Etapa 2 - A Aplicação foi desenvolvida em Golang

* O projeto de backend está localizado na pasta backend
* O comando a seguir para subir o backend deve ser executado dentro da pasta:
```console
$ docker-compose up --build
```

### Etapa 3 - A Aplicação foi desenvolvida em ReactJS

* O projeto de frontend está localizado na pasta frontend
* O comando a seguir para subir o frontend deve ser executado dentro da pasta:
```console
$ docker-compose up --build
```

### Aplicação
* Depois de subir os containers acessar
* [localhost](http://localhost:3000)

### Observações
- As portas default utilizadas são:
  - Database: 3306
  - Backend: 8000
  - Frontend: 3000

- Caso precise modificar as portas deve ser configurado no projeto para evitar problemas
