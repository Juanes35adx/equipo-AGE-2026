# Frontend Technology Decisions

## Overview

El frontend del sistema AGE tiene como objetivo proporcionar una interfaz interactiva, responsiva y eficiente para los usuarios (estudiantes, profesores y administradores). Basado en los diagramas UML, el sistema incluye funcionalidades como autenticación, mapa interactivo, mentorías, eventos y notificaciones.

---

## Options Considered

### 1. React

**Description:**  
Librería de JavaScript basada en componentes para la construcción de interfaces dinámicas.

**Pros:**
- Reutilización de componentes
- Gran comunidad y soporte
- Ecosistema robusto (React Router, Axios, Zustand, etc.)
- Excelente rendimiento con Virtual DOM
- Alta flexibilidad para estructurar el proyecto

**Contras:**
- No incluye herramientas integradas (requiere configuración)
- Puede volverse desorganizado sin una buena arquitectura

---

### 2. Angular

**Description:**  
Framework completo para aplicaciones web mantenido por Google.

**Pros:**
- Arquitectura estructurada
- Incluye herramientas integradas (routing, formularios)
- Ideal para aplicaciones grandes

**Contras:**
- Curva de aprendizaje alta
- Más pesado
- Menor flexibilidad

---

### 3. Vue.js

**Description:**  
Framework progresivo enfocado en facilidad de uso.

**Pros:**
- Fácil de aprender
- Ligero
- Buena documentación

**Contras:**
- Comunidad más pequeña que React
- Menor adopción en proyectos empresariales

---

## Final Decision

Se selecciona **React con Vite** como stack principal para el frontend.

---

## Selected Stack

- **React** → Librería principal
- **Vite** → Bundler rápido para desarrollo moderno
- **React Router** → Manejo de rutas (/login, /map, etc.)
- **Axios** → Consumo de API REST
- **Tailwind CSS** → Estilos rápidos y responsivos
- **Zustand / Context API** → Manejo de estado global

---

## Justification

React con Vite permite un desarrollo rápido, modular y escalable, ideal para un MVP.

Además:
- Vite mejora significativamente la velocidad de desarrollo (hot reload rápido)
- La arquitectura basada en componentes se alinea con los diagramas UML
- Facilita la construcción de módulos como:
  - Mapa interactivo
  - Sistema de mentorías
  - Gestión de eventos
- Permite integración sencilla con el backend mediante APIs REST
- Tailwind CSS facilita la creación de interfaces modernas y responsivas

Este stack permite construir una aplicación eficiente, mantenible y escalable.