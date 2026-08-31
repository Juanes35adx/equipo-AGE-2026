# Backend Technology Decisions

## Overview

El backend del sistema AGE será responsable de la lógica de negocio, autenticación, manejo de datos y comunicación con servicios externos. Como podemos ver en los diagramas UML, el sistema incluye módulos como autenticación, mapa, mentorías, eventos, notificaciones y gestión académica.

---

## Options Considered

### 1. Node.js + Express

**Description:**  
Entorno de ejecución basado en JavaScript con framework minimalista para APIs REST.

**Pros:**
- Desarrollo rápido
- Gran ecosistema (npm)
- Uso del mismo lenguaje que el frontend
- Ideal para arquitecturas basadas en servicios
- Alto rendimiento en aplicaciones concurrentes

**Contras:**
- Menos estructurado
- Requiere buenas prácticas para escalar correctamente

---

### 2. Spring Boot

**Description:**  
Framework backend en Java para aplicaciones empresariales.

**Pros:**
- Alta escalabilidad
- Seguridad robusta
- Arquitectura bien definida

**Contras:**
- Mayor complejidad
- Tiempo de desarrollo más largo

---

### 3. Django

**Description:**  
Framework backend en Python con funcionalidades integradas.

**Pros:**
- Desarrollo rápido
- Seguridad integrada
- ORM potente

**Contras:**
- Menor flexibilidad para APIs modernas
- No ideal para arquitecturas desacopladas

---

## Final Decision

Se selecciona **Node.js con Express y PostgreSQL** como stack backend.

---

## Selected Stack

- **Node.js** → Entorno de ejecución
- **Express.js** → Framework para API REST
- **PostgreSQL** → Base de datos relacional
- **Prisma / Sequelize** → ORM para manejo de base de datos
- **JWT (JSON Web Tokens)** → Autenticación
- **bcrypt** → Encriptación de contraseñas
- **dotenv** → Manejo de variables de entorno

---

## Architecture

Se utilizará una arquitectura basada en capas:

- **Routes** → Definición de endpoints
- **Controllers** → Manejo de solicitudes
- **Services** → Lógica de negocio
- **Repositories/Models** → Acceso a datos

Esto permite mantener el código organizado, escalable y fácil de mantener.

---

## Justification

Node.js con Express permite desarrollar rápidamente una API REST eficiente, ideal para un MVP.

Además:
- PostgreSQL es una base de datos robusta y confiable, ideal para manejar relaciones complejas como las mostradas en el modelo relacional (usuarios, eventos, mentorías, etc.)
- Permite manejar múltiples módulos del sistema:
  - Autenticación y roles
  - Gestión de eventos
  - Sistema de mentorías y chat
  - Notificaciones
- La arquitectura por capas mejora la mantenibilidad del sistema
- Facilita la escalabilidad futura hacia microservicios

Este stack permite construir un backend sólido, seguro y preparado para crecer.