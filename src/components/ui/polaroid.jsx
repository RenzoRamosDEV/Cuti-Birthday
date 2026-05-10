// Componentes visuales de foto estilo polaroid: Photo, Tape, Polaroid

const PHOTO_PALETTES = [
  ['#e8b89c','#c97456','#3a1f12'], ['#f4d6c1','#e8a384','#5a2c1a'],
  ['#c9d6c1','#7a9472','#2c3d28'], ['#b8c5d6','#7588a8','#1f2a3d'],
  ['#e4cfa5','#c4a96c','#4a3a1c'], ['#dcb9c9','#b07a8e','#3d1f2c'],
  ['#d4c5e0','#9c87b8','#2e2240'], ['#f0d5b8','#d49968','#4a2e1a'],
  ['#c5dcd6','#7ea69c','#1f3a32'], ['#e8c5a8','#b8806a','#3a1f15'],
];

// Muestra una imagen real si se pasa src; si no, genera un placeholder con gradiente determinista
function Photo({ seed = 'x', src, caption, style, children }){
  if(src){
    return (
      <div style={{ position:'relative', overflow:'hidden', ...style }}>
        <img src={src} alt={caption || seed}
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
        {children}
      </div>
    );
  }
  const [a, b, c] = PHOTO_PALETTES[hashStr(seed) % PHOTO_PALETTES.length];
  const ang = (hashStr(seed+'a') % 60) - 30 + 135;
  const x1  = (hashStr(seed+'1') % 60) + 10, y1 = (hashStr(seed+'2') % 60) + 10;
  const x2  = (hashStr(seed+'3') % 60) + 20, y2 = (hashStr(seed+'4') % 60) + 20;
  return (
    <div style={{
      position:'relative', overflow:'hidden',
      background:`linear-gradient(${ang}deg, ${a} 0%, ${b} 60%, ${c} 100%)`,
      ...style,
    }}>
      <div style={{ position:'absolute', inset:0, background:
        `radial-gradient(circle at ${x1}% ${y1}%, rgba(255,255,255,.35), transparent 40%),`+
        `radial-gradient(circle at ${x2}% ${y2}%, ${c}55, transparent 50%),`+
        `radial-gradient(circle at 50% 110%, rgba(0,0,0,.25), transparent 60%)`}}/>
      <div style={{ position:'absolute', inset:0, opacity:.18, mixBlendMode:'overlay',
        backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2' seed='${hashStr(seed)%99}'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`}}/>
      {caption && (
        <div style={{ position:'absolute', left:8, bottom:6,
          font:'500 9px Inter,system-ui', color:'rgba(255,255,255,.92)',
          letterSpacing:'.08em', textTransform:'uppercase',
          textShadow:'0 1px 4px rgba(0,0,0,.4)' }}>{caption}</div>
      )}
      {children}
    </div>
  );
}

// Tira de cinta washi decorativa
function Tape({ left='50%', top='-9px', w=70, rot=-6, color='rgba(220,200,140,.6)' }){
  return (
    <div style={{
      position:'absolute', left, top, width:w, height:18,
      transform:`translateX(-50%) rotate(${rot}deg)`,
      background:color, boxShadow:'0 2px 4px rgba(0,0,0,.08)',
      clipPath:'polygon(0 30%,4% 60%,8% 30%,12% 70%,16% 30%,20% 70%,24% 30%,28% 70%,32% 30%,36% 70%,40% 30%,44% 70%,48% 30%,52% 70%,56% 30%,60% 70%,64% 30%,68% 70%,72% 30%,76% 70%,80% 30%,84% 70%,88% 30%,92% 70%,96% 30%,100% 60%,100% 100%,0 100%)',
    }}/>
  );
}

// Tarjeta polaroid con cinta y foto
function Polaroid({ seed, src, caption, w=200, h=220, rot=-3, tapeRot=-6, tapeColor, style, children }){
  return (
    <div style={{
      position:'relative', width:w, padding:'10px 10px 38px',
      background:SCRAP.paperLight, transform:`rotate(${rot}deg)`,
      boxShadow:'0 6px 18px rgba(60,40,20,.18), 0 1px 2px rgba(60,40,20,.1)',
      ...style,
    }}>
      <Tape rot={tapeRot} color={tapeColor}/>
      <Photo seed={seed} src={src} style={{ width:'100%', height:h }}/>
      {caption && (
        <div style={{ marginTop:8, font:'500 17px "Caveat",cursive', color:SCRAP.ink,
          textAlign:'center', lineHeight:1.1 }}>{caption}</div>
      )}
      {children}
    </div>
  );
}

Object.assign(window, { Photo, Tape, Polaroid });
