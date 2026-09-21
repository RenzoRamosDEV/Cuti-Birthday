// Pantalla de elección — dos post-its para escoger destino después del login

// Margarita en miniatura — el doodle 'flower' a este tamaño se lee como una cruz
function MiniFlor({ size = 30 }){
  return (
    <svg width={size} height={size} viewBox="-20 -20 40 40" aria-hidden="true">
      {Array.from({ length:8 }, (_, i) => (
        <ellipse key={i} cx="0" cy="-11" rx="4" ry="7.5"
                 fill="#e3b34a" stroke="#b98a2c" strokeWidth=".8"
                 transform={`rotate(${i * 45})`}/>
      ))}
      <circle r="5" fill="#8a5f26"/>
    </svg>
  );
}

// Un post-it pulsable: papel de color, washi tape y un doodle arriba
function PostIt({ bg, rot, tapeColor, tapeRot, doodle, doodleColor, eyebrow, title, subtitle, onClick }){
  const [lift, setLift] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setLift(true)}
      onMouseLeave={() => setLift(false)}
      onFocus={() => setLift(true)}
      onBlur={() => setLift(false)}
      style={{
        position:'relative', width:250, minHeight:250, padding:'34px 24px 28px',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6,
        background:bg, border:0, borderRadius:2, cursor:'pointer', textAlign:'center',
        transform:`rotate(${lift ? 0 : rot}deg) translateY(${lift ? -10 : 0}px)`,
        boxShadow: lift
          ? '0 18px 38px rgba(60,40,20,.26), 0 2px 4px rgba(60,40,20,.12)'
          : '0 6px 18px rgba(60,40,20,.18), 0 1px 2px rgba(60,40,20,.1)',
        transition:'transform .22s ease, box-shadow .22s ease',
      }}>
      <Tape left="50%" top="-9px" w={86} rot={tapeRot} color={tapeColor}/>

      <div style={{ marginBottom:4, lineHeight:0 }}>
        {doodle === 'flor' ? <MiniFlor/> : <Doodle type={doodle} size={30} color={doodleColor}/>}
      </div>

      <div style={{ font:'500 12px "Caveat"', letterSpacing:'.28em', textTransform:'uppercase', color:SCRAP.red }}>
        {eyebrow}
      </div>
      <div style={{ font:'600 30px/1.05 "Caveat"', color:SCRAP.ink }}>
        {title}
      </div>
      <div style={{ font:'italic 400 14px/1.45 "Fraunces"', color:SCRAP.inkSoft, maxWidth:180 }}>
        {subtitle}
      </div>
    </button>
  );
}

function Picker({ onPick }){
  const mobile = useIsMobile(700);

  return (
    <div className="paper grain" style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:mobile ? 44 : 56,
      padding:'56px 6vw', background:SCRAP.paper,
    }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase', color:SCRAP.red, marginBottom:6 }}>
          hola Joselyn
        </div>
        <h1 style={{ margin:0, font:'italic 300 clamp(38px,7vw,60px) "Fraunces"', color:SCRAP.ink }}>
          ¿qué abrimos hoy?
        </h1>
      </div>

      <div style={{
        display:'flex', flexDirection: mobile ? 'column' : 'row',
        gap: mobile ? 40 : 56, alignItems:'center',
      }}>
        <PostIt
          bg={SCRAP.paperLight} rot={-2} tapeColor="rgba(197,74,58,.45)" tapeRot={-4}
          doodle="heart" doodleColor={SCRAP.red}
          eyebrow="tu cumpleaños"
          title={<>19 años<br/>contigo</>}
          subtitle="recuerdos, vídeo y la carta"
          onClick={() => onPick('cumple')}
        />
        <PostIt
          bg="#f7de8c" rot={2} tapeColor="rgba(93,122,79,.42)" tapeRot={5}
          doodle="flor"
          eyebrow="para ti"
          title={<>Tus flores<br/>amarillas</>}
          subtitle="amor, alegría y sueños"
          onClick={() => onPick('flores')}
        />
      </div>
    </div>
  );
}

// Vuelta a la pantalla de elección — fija abajo a la izquierda para no chocar
// con la cabecera del hero ni perderse al hacer scroll
function Volver({ onBack }){
  const [hover, setHover] = React.useState(false);

  return (
    <button
      onClick={onBack}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position:'fixed', left:20, bottom:20, zIndex:80,
        background: hover ? SCRAP.ink : SCRAP.paperLight,
        color: hover ? SCRAP.paper : SCRAP.inkSoft,
        border:`1.5px solid ${SCRAP.inkSoft}44`, borderRadius:2,
        padding:'8px 14px', cursor:'pointer',
        font:'500 17px "Caveat"', letterSpacing:'.04em',
        boxShadow:'0 4px 12px rgba(60,40,20,.14)',
        transition:'background .2s, color .2s',
      }}>
      ← volver
    </button>
  );
}

Object.assign(window, { Picker, Volver });
