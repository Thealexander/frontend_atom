## Frontend - Angular App (Atom)

Este proyecto representa el frontend de una aplicación para gestión de tareas y autenticación de usuarios, desarrollado con Angular 17 y consumiendo una API construida en Node.js bajo arquitectura DDD (Domain-Driven Design).

##  Tecnologías principales

- [Angular](https://angular.io/) 17+
- [RxJS](https://rxjs.dev/)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Bootstrap](https://getbootstrap.com/) o [Angular Material](https://material.angular.io/) (si aplica)
- Comunicación con backend vía HTTP usando [HttpClient](https://angular.io/guide/http)

##  Instalación
En la terminal
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/atom-frontend.git
cd atom-frontend

# Instalar dependencias
npm install

## Entorno de desarrollo
src/environments/environment.ts
ejecutar: ng serve

## Estructura de entorno
src/
├── app/
│   ├── components/       
|          ├── footer
|          ├── nav-bar
│   ├── auth/            # Componentes y lógica de login/register
│   ├── tasks/           # Módulo de tareas
│   ├── interfaces/           
│   └── app-routing.module.ts
├── assets/
├── environments/
└── index.html


## Documentación de la API
https://documenter.getpostman.com/view/19671366/2sB2x8DqxJ

## Backend 
github.com/Thealexander/backend_atom

## Testing Server
https://api-nuxoiaxfea-uc.a.run.app --->api
https://atombackend-52e86.web.app/task  --->webservice
