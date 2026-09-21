# Pantalla de elección + página de flores amarillas

**Fecha:** 2026-09-21
**Estado:** aprobado

## Objetivo

Tras superar el login, Joselyn elige entre dos destinos mediante dos post-its:
la página de cumpleaños que ya existe, o una página nueva con un ramo de flores
amarillas — símbolo de amor, alegría y cumplimiento de sueños.

## Flujo

```
Login  →  Elección (2 post-its)  →  Cumpleaños
                                 →  Flores amarillas
```

La página de flores vive dentro de la misma app React, no como archivo HTML
aparte, porque queda detrás del login.

## Arquitectura

| Archivo | Cambio | Responsabilidad |
|---|---|---|
| `src/components/sections/picker.jsx` | nuevo | Pantalla de elección con los dos post-its |
| `src/components/sections/flores.jsx` | nuevo | La página: título, aviso y firma |
| `src/components/ui/maceta-3d.jsx` | nuevo | La maceta en 3D con Three.js |
| `src/components/ui/ramo-svg.jsx` | nuevo | Ramo en SVG, respaldo sin WebGL |
| `src/main.jsx` | editado | Estado `view`: `picker` · `cumple` · `flores` |
| `index.html` | editado | Three.js y los `<script type="text/babel">` nuevos |
| `src/styles/main.css` | editado | Keyframes del balanceo de las flores |

`src/auth.jsx` no se toca: la autenticación y el bloqueo progresivo quedan igual.

### Estado

`main.jsx` mantiene `view`, inicializado a `'picker'` cuando la sesión está
desbloqueada. `Picker` recibe `onPick(view)`; `Flores` y el bloque de cumpleaños
reciben `onBack()` para volver a la elección. No se persiste la elección: al
recargar se vuelve a preguntar.

## Pantalla de elección

Fondo crema `#f3e9d2`, igual que el login. Encabezado corto en `Caveat`:
"¿qué abrimos hoy?".

Dos post-its lado a lado, apilados en móvil usando el hook `useIsMobile` que ya
existe. Cada uno lleva washi tape con el componente `Tape` de `polaroid.jsx`:

- **Cumpleaños** — papel claro, rotación −2°, doodle `heart`, texto
  "19 años contigo" / "recuerdos, vídeo y la carta"
- **Flores** — amarillo, rotación +2°, doodle `flower`, texto
  "Tus flores amarillas" / "amor, alegría y sueños"

Al pasar el ratón se elevan y se enderezan. Son `<button>`, de modo que
funcionan con teclado y lector de pantalla.

## Página de las flores

- Título en `Caveat` grande: **Tus flores amarillas**
- Subtítulo en `Fraunces` cursiva: *como símbolo de amor, alegría y cumplimiento de sueños*
- Debajo, el aviso de manejo: arriba, junto al texto, porque abajo chocaba con el
  botón de volver. En móvil no hay rueda, así que solo menciona el arrastre.
- El resto de la pantalla lo ocupa la maceta en 3D (Three.js r128): girasoles,
  rosas, tulipanes, margaritas, craspedias y mimosas amarillas en una maceta de
  terracota con platito. Se arrastra para girarla y la rueda acerca
- Gira sola despacio y se balancea; ambas cosas se anulan bajo `prefers-reduced-motion`
- El lienzo lleva el mismo crema que la página, así que la costura con el texto no se ve

### Encuadre

La cámara no usa una distancia fija: mide la caja real del modelo con `Box3` y
calcula a qué distancia cabe entera en el contenedor. En pantallas verticales
abre el objetivo a 52° (38° en horizontal) y se aleja, porque si no la maceta
se sale por los lados. Se recalcula al cambiar el tamaño, salvo que el usuario
haya tocado la rueda.

### Si no hay WebGL

`Maceta3D` cae a `RamoSVG`, un ramo dibujado a mano en SVG que vive en
`src/components/ui/ramo-svg.jsx`.

## Volver

Un `← volver` discreto arriba a la izquierda en ambas vistas, que devuelve a la
elección sin cerrar sesión.

## Fuera de alcance

- Persistir la vista elegida entre recargas
- Cambios en la lógica de autenticación
- Modificar las secciones actuales de cumpleaños más allá de añadir el "volver"
