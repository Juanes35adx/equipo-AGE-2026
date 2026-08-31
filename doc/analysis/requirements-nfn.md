# Requisitos No Funcionales 📋

A continuación, se presentan los requisitos no funcionales iniciales considerados para el proyecto.

## NF-01. Disponibilidad (1) 🕒
**Prioridad:** P(0)

**Descripción:** El sistema deberá estar disponible al menos el 95% del tiempo durante el periodo académico, especialmente en horarios de clase (6:00 a.m. – 10:00 p.m.), para garantizar que los estudiantes puedan consultarlo cuando lo necesiten.

**Criterios de aceptación:**
- El sistema mantiene una disponibilidad mínima del **95% durante el periodo académico**.
- En caso de una caída del sistema, el servicio debe restablecerse en un **tiempo máximo de 10 minutos**.
- Los usuarios pueden acceder al sistema sin interrupciones durante los horarios de clase establecidos.


## NF-02. Tiempo de respuesta (3) ⚡
**Prioridad:** P(1)

**Descripción:** La plataforma deberá cargar el mapa principal en un tiempo máximo de 3 segundos bajo condiciones normales de conexión a internet.

**Criterios de aceptación:**
- El mapa principal se carga en **menos de 3 segundos** en la mayoría de los intentos de acceso.
- Las interacciones del usuario (clics o búsquedas) reciben respuesta en **menos de 2 segundos**.
- El sistema mantiene tiempos de respuesta estables durante el uso normal de la plataforma.


## NF-03. Usabilidad (1) 🧩
**Prioridad:** P(0)

**Descripción:** La interfaz del sistema deberá ser intuitiva y fácil de usar, permitiendo que un estudiante de primer semestre pueda aprender a utilizarla sin necesidad de capacitación previa.

**Criterios de aceptación:**
- Un usuario nuevo puede utilizar las funciones principales sin recibir instrucciones externas.
- Las funciones principales del sistema pueden encontrarse en **máximo 3 clics**.
- La navegación por el sistema resulta clara y comprensible para usuarios nuevos.


## NF-04. Compatibilidad (3) 🧭
**Prioridad:** P(2)

**Descripción:** El sistema deberá ser accesible desde los navegadores más utilizados (Google Chrome, Microsoft Edge y Mozilla Firefox) y adaptarse correctamente a dispositivos móviles y computadores.

**Criterios de aceptación:**
- El sistema funciona correctamente en **Google Chrome, Microsoft Edge y Mozilla Firefox**.
- La interfaz se adapta correctamente a pantallas de **dispositivos móviles y computadores**.
- Las funciones principales del sistema pueden utilizarse sin errores en los navegadores soportados.


## NF-05. Mantenibilidad (1) 🛠️
**Prioridad:** P(1)

**Descripción:** El sistema debe estar desarrollado de forma modular, permitiendo realizar actualizaciones y correcciones sin afectar el funcionamiento general.

**Criterios de aceptación:**
- El código del sistema se encuentra organizado en **módulos o componentes independientes**.
- Las actualizaciones o correcciones pueden realizarse sin afectar otras partes del sistema.
- Existe documentación básica que describe la estructura del proyecto.


## NF-06. Confiabilidad (2) ✅
**Prioridad:** P(2)

**Descripción:** El sistema debe garantizar que la información mostrada (mapas, horarios, respuestas del chatbot) sea consistente y no presente errores críticos.

**Criterios de aceptación:**
- La información mostrada en el sistema es **consistente y correcta** durante su uso.
- El sistema no presenta **errores críticos que impidan su funcionamiento**.
- En caso de error, el sistema muestra **mensajes claros al usuario**.


## NF-07. Seguridad (3) 🔒
**Prioridad:** P(0)

**Descripción:** El sistema deberá proteger la información de los usuarios mediante mecanismos de autenticación y control de acceso, evitando el acceso no autorizado a datos personales y a funcionalidades internas de la plataforma.

**Criterios de aceptación:**
- Solo los usuarios autenticados pueden acceder a funciones restringidas del sistema.
- Los datos personales no pueden ser consultados por usuarios no autorizados.
- El sistema cuenta con mecanismos de autenticación para validar el acceso de los usuarios.


## NF-08. Escalabilidad (1) 📈
**Prioridad:** P(3)

**Descripción:** La plataforma deberá ser capaz de soportar un aumento progresivo en el número de usuarios concurrentes, especialmente durante el inicio del semestre, sin degradar significativamente su rendimiento.

**Criterios de aceptación:**
- El sistema puede soportar múltiples usuarios conectados al mismo tiempo sin fallar.
- El rendimiento del sistema no se degrada significativamente cuando aumenta el número de usuarios.
- El sistema permite ampliar los recursos del servidor en caso de aumento de demanda.


## NF-09. Accesibilidad (3) ♿
**Prioridad:** P(1)

**Descripción:** El sistema deberá cumplir principios básicos de accesibilidad web, como contraste adecuado, textos legibles y compatibilidad con lectores de pantalla, para garantizar su uso por estudiantes con diferentes capacidades.

**Criterios de aceptación:**
- El contraste de colores permite leer el contenido sin dificultad.
- Los textos son legibles en dispositivos móviles y computadores.
- El sistema puede ser utilizado con herramientas de asistencia como lectores de pantalla.


## NF-10. Portabilidad (3) 📦
**Prioridad:** P(0)

**Descripción:** La aplicación deberá poder desplegarse en distintos entornos de servidor o infraestructura en la nube sin requerir cambios significativos en el código fuente.

**Criterios de aceptación:**
- El sistema puede desplegarse en diferentes entornos de servidor o infraestructura en la nube.
- El despliegue no requiere modificaciones importantes en el código fuente.
- La configuración del sistema puede ajustarse mediante archivos de configuración o variables de entorno.