# Joselyn Pages

Página privada hecha con cariño para celebrar los 19 años de Joselyn. Incluye recuerdos en formato polaroid, una carta de su hermano y confeti al abrirla.

Desplegada en GitHub Pages: `https://renzoramosdev.github.io/Cuti-Birthday/`

---

## Stack

- **React 18** vía CDN (sin bundler ni paso de build)
- **Babel Standalone** para JSX en el navegador
- CSS personalizado con estética de scrapbook / cuaderno 

## Estructura

```
index.html                  # Punto de entrada — carga scripts en orden
src/
  theme.js                  # Paleta de colores y utilidades (SCRAP, Tape, Confetti)
  hooks.js                  # Hooks reutilizables (useFadeIn, etc.)
  auth.jsx                  # Login con PBKDF2-SHA256 y bloqueo por intentos
  main.jsx                  # Raíz de la app (App + estado global)
  styles/main.css
  data/images.json           # Metadatos de las fotos
  components/
    ui/
      polaroid.jsx           # Componente Polaroid con pie de foto
      doodles.jsx            # Decoraciones SVG tipo doodle
    sections/
      hero.jsx               # Sección inicial con grid de polaroids
      memories.jsx           # Galería de recuerdos
      traits.jsx             # Rasgos / cosas que la definen
      carta.jsx              # Carta desplegable
      footer.jsx             # Pie de página
```

## Seguridad

La página es de acceso privado. El login usa **PBKDF2-SHA256 con 200 000 iteraciones** derivado en el navegador (`crypto.subtle`). Solo el hash derivado está en el código; la clave original nunca se almacena. Incluye:

- Bloqueo temporal progresivo (5 min tras 5 intentos, 1 hora tras 10)
- Mínimo 600 ms por intento para evitar timing attacks
- Sesión en `sessionStorage` (se pierde al cerrar la pestaña)
