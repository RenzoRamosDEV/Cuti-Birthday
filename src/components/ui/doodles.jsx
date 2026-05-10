// Elementos decorativos: flechas dibujadas, iconos y confeti

function DoodleArrow({ w=120, h=60, style, color=SCRAP.ink }){
  return (
    <svg width={w} height={h} viewBox="0 0 120 60" style={style} fill="none">
      <path d="M5 40 C 30 5, 80 5, 110 25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
      <path d="M101 18 L110 25 L103 33"   stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function Doodle({ type='heart', size=20, color=SCRAP.red, style }){
  const paths = {
    heart:   'M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 4 4 8-2.5 4.5-9.5 9-9.5 9z',
    star:    'M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.8 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z',
    flower:  'M12 4c1 0 2 1 2 3s-1 3-2 3-2-1-2-3 1-3 2-3zM4 12c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2zM20 12c0 1-1 2-3 2s-3-1-3-2 1-2 3-2 3 1 3 2zM12 14c1 0 2 1 2 3s-1 3-2 3-2-1-2-3 1-3 2-3zM12 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z',
    sparkle: 'M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <path d={paths[type]} fill={color}/>
    </svg>
  );
}

function Confetti({ active, count=140, onDone }){
  const [pieces] = React.useState(() => {
    const cols = ['#c54a3a','#e3b34a','#5d7a4f','#4a6a8a','#fdfbf3','#3a2a1a','#dcb9c9'];
    return Array.from({ length:count }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      delay: Math.random() * 1.5,
      dur:   2.5 + Math.random() * 2.5,
      size:  6   + Math.random() * 8,
      color: cols[i % cols.length],
      rot:   Math.random() * 360,
      shape: i % 4,
    }));
  });

  React.useEffect(() => {
    if(!active || !onDone) return;
    const t = setTimeout(onDone, 6000);
    return () => clearTimeout(t);
  }, [active]);

  if(!active) return null;
  return (
    <div aria-hidden="true" style={{
      position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:90,
    }}>
      {pieces.map(p => (
        <span key={p.id} style={{
          position:'absolute', top:0, left:`${p.x}%`,
          width:p.size, height: p.shape === 1 ? p.size * 0.4 : p.size,
          background:p.color,
          borderRadius: p.shape === 2 ? '50%' : p.shape === 3 ? 0 : 2,
          transform:`rotate(${p.rot}deg)`,
          animation:`drop ${p.dur}s linear ${p.delay}s forwards`,
          boxShadow:'0 1px 2px rgba(0,0,0,.1)',
        }}/>
      ))}
    </div>
  );
}

Object.assign(window, { DoodleArrow, Doodle, Confetti });
