# Backend seguro con Express.js, JWT y cookies

## Requisitos cubiertos
- Servidor en Express.js.
- Ruta `POST /login` con validación de 2 usuarios ficticios.
- JWT firmado con expiración.
- Envío del token en cookie `httpOnly`.
- Ruta privada `GET /privado` protegida por middleware.
- Cierre de sesión con `POST /logout` eliminando la cookie.
- Documentación técnica en Word.
- Evidencias de pruebas y control de versiones.

## Usuarios ficticios de prueba
- `admin` / `Admin1234!`
- `analista` / `Analista123!`

## Variables de entorno
Copia `.env.example` como `.env` y ajusta el secreto JWT si lo deseas.

## Ejecución
```bash
npm install
npm start
```

## Rutas principales
- `GET /health`
- `POST /login`
- `GET /privado`
- `POST /logout`
