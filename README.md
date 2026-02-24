# 🌱 HabitFlow API

HabitFlow es una API RESTful desarrollada con Node.js, Express y MongoDB para la gestión de hábitos diarios.

## 🚀 Tecnologías

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv

## 📁 Arquitectura

Proyecto estructurado bajo arquitectura modular:

| Carpeta/Archivo | Descripción |
|-----------------|-------------|
| `config/`       | Conexión a base de datos |
| `models/`       | Esquemas Mongoose |
| `routes/`       | Endpoints |
| `app.js`        | Configuración principal del servidor |

## 📡 Endpoints

| Método | Endpoint           | Descripción              |
|--------|--------------------|--------------------------|
| GET    | `/api/habits`      | Obtener todos los hábitos |
| GET    | `/api/habits/:id`  | Obtener hábito por ID    |
| POST   | `/api/habits`      | Crear hábito             |
| PUT    | `/api/habits/:id`  | Actualizar hábito        |
| DELETE | `/api/habits/:id`  | Eliminar hábito          |

## 🔧 Instalación

```bash
git clone <tu-repo>
cd habitflow
npm install
```

Crear archivo `.env`:

```
MONGO_URI=tu_string_de_mongodb
PORT=3000
```

Ejecutar:

```bash
npm run dev
```

Servidor disponible en: [http://localhost:3000](http://localhost:3000)
