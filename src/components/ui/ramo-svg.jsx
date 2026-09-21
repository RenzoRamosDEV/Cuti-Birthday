// Ramo dibujado en SVG — respaldo para cuando el navegador no puede con WebGL

// Tres amarillos para que el ramo no se vea plano
const TONOS = [
  { petalo:'#e3b34a', borde:'#b98a2c', centro:'#8a5f26' },  // el amarillo de la paleta
  { petalo:'#f7d873', borde:'#d4ab3e', centro:'#a8752a' },  // claro
  { petalo:'#d99a2b', borde:'#ad7519', centro:'#7a4f1c' },  // ámbar
];

// Punto donde convergen todos los tallos (dentro del papel kraft)
const NUDO_X = 200;
const NUDO_Y = 392;

// Las nueve flores: posición de la cabeza, escala, inclinación, tipo y tono
const FLORES = [
  { x:200, y: 84, s:1.05, rot:  0, tipo:'girasol',   tono:2, dur:5.2, delay:0    },
  { x:134, y:112, s:0.95, rot:-12, tipo:'margarita', tono:1, dur:6.1, delay:-1.2 },
  { x:266, y:112, s:0.95, rot: 12, tipo:'margarita', tono:1, dur:5.7, delay:-2.4 },
  { x: 84, y:170, s:0.88, rot:-24, tipo:'girasol',   tono:0, dur:6.6, delay:-0.6 },
  { x:316, y:170, s:0.88, rot: 24, tipo:'girasol',   tono:0, dur:6.3, delay:-3.1 },
  { x:152, y:186, s:0.82, rot: -6, tipo:'margarita', tono:2, dur:5.5, delay:-1.8 },
  { x:248, y:186, s:0.82, rot:  6, tipo:'margarita', tono:2, dur:5.9, delay:-0.3 },
  { x:110, y:244, s:0.76, rot:-16, tipo:'margarita', tono:0, dur:6.8, delay:-2.7 },
  { x:290, y:244, s:0.76, rot: 16, tipo:'margarita', tono:0, dur:6.4, delay:-1.5 },
];

const TRAZO = { stroke:'#3a2a1a', strokeOpacity:.26, strokeWidth:1.1, strokeLinejoin:'round' };

// Tallo: curva desde la cabeza hasta el nudo, abriéndose un poco hacia fuera
const tallo = (x, y) =>
  `M ${x} ${y} C ${x} ${y + 90}, ${NUDO_X + (x - NUDO_X) * 0.3} ${NUDO_Y - 110}, ${NUDO_X} ${NUDO_Y}`;

// Una flor: pétalos alrededor del centro + corazón con textura de semillas
function Cabeza({ tipo, tono }){
  const c = TONOS[tono];

  if(tipo === 'girasol'){
    const petalo = 'M 0 -12 C 5 -21, 6 -35, 0 -43 C -6 -35, -5 -21, 0 -12 Z';
    return (
      <>
        {Array.from({ length:14 }, (_, i) => (
          <path key={i} d={petalo} fill={c.petalo} {...TRAZO} transform={`rotate(${i * (360/14)})`}/>
        ))}
        <circle r="13" fill={c.centro} {...TRAZO}/>
        <circle r="7"  fill="#000" opacity=".12"/>
      </>
    );
  }

  return (
    <>
      {Array.from({ length:9 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-26" rx="8.5" ry="15"
                 fill={c.petalo} {...TRAZO} transform={`rotate(${i * 40})`}/>
      ))}
      <circle r="10.5" fill={c.centro} {...TRAZO}/>
      <circle r="5"    fill="#000" opacity=".1"/>
    </>
  );
}

function RamoSVG(){
  return (
    <svg
      viewBox="0 0 400 486"
      role="img"
      aria-label="Un ramo de nueve flores amarillas — girasoles y margaritas — con los tallos verdes atados con papel kraft y un lazo rojo"
      style={{ width:'min(86vw, 460px)', maxHeight:'62vh', height:'auto', display:'block' }}>

      {/* tallos y flores: cada una se balancea girando sobre el nudo del ramo */}
      {FLORES.map((f, i) => (
        <g key={i} className="flor" style={{ animationDuration:`${f.dur}s`, animationDelay:`${f.delay}s` }}>
          <path d={tallo(f.x, f.y)} fill="none" stroke={SCRAP.green} strokeWidth="3.4" strokeLinecap="round"/>
          <g transform={`translate(${f.x},${f.y}) rotate(${f.rot}) scale(${f.s})`}>
            <Cabeza tipo={f.tipo} tono={f.tono}/>
          </g>
        </g>
      ))}

      {/* dos hojas asomando por encima del papel */}
      <path d="M 150 312 C 120 288, 90 286, 76 302 C 98 326, 132 330, 150 312 Z"
            fill={SCRAP.green} {...TRAZO}/>
      <path d="M 148 313 C 122 306, 98 302, 78 303" fill="none"
            stroke="#3f5836" strokeOpacity=".45" strokeWidth="1.4"/>
      <path d="M 250 312 C 280 288, 310 286, 324 302 C 302 326, 268 330, 250 312 Z"
            fill="#6b8a5b" {...TRAZO}/>
      <path d="M 252 313 C 278 306, 302 302, 322 303" fill="none"
            stroke="#3f5836" strokeOpacity=".45" strokeWidth="1.4"/>

      {/* papel kraft: cono que recoge los tallos y acaba en punta */}
      <path d="M 124 320 C 158 342, 242 342, 276 320 L 200 470 Z" fill="#c9a678" {...TRAZO}/>
      <path d="M 124 320 C 158 342, 192 344, 200 344 L 200 470 Z" fill="#000" opacity=".08"/>
      <path d="M 128 308 C 158 330, 242 330, 272 308 L 276 320 C 242 342, 158 342, 124 320 Z"
            fill="#dcbb8e" {...TRAZO}/>

      {/* lazo atado en el cuello del ramo */}
      <path d="M 200 360 C 176 342, 148 346, 150 364 C 152 380, 182 376, 200 360 Z"
            fill={SCRAP.red} {...TRAZO}/>
      <path d="M 200 360 C 224 342, 252 346, 250 364 C 248 380, 218 376, 200 360 Z"
            fill={SCRAP.red} {...TRAZO}/>
      <path d="M 200 362 C 192 378, 186 392, 178 404 L 192 407 C 198 392, 201 376, 200 362 Z"
            fill="#a93c2e" {...TRAZO}/>
      <path d="M 200 362 C 208 378, 214 392, 222 404 L 208 407 C 202 392, 199 376, 200 362 Z"
            fill="#a93c2e" {...TRAZO}/>
      <circle cx="200" cy="361" r="7.5" fill={SCRAP.red} {...TRAZO}/>

    </svg>
  );
}

Object.assign(window, { RamoSVG });
