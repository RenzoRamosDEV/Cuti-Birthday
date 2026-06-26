// Encabezado de sección compartido (eyebrow · número, título y subtítulo)

function SectionHeader({ eyebrow, number, title, subtitle, color = SCRAP.red }){
  return (
    <div style={{ textAlign:'center', maxWidth:720, margin:'0 auto 50px', padding:'0 20px' }}>
      <div style={{ display:'inline-flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <span style={{ width:28, height:1, background:SCRAP.inkSoft, opacity:.4 }}/>
        <span style={{ font:'500 12px "Caveat"', letterSpacing:'.32em', textTransform:'uppercase', color }}>
          {eyebrow} · {number}
        </span>
        <span style={{ width:28, height:1, background:SCRAP.inkSoft, opacity:.4 }}/>
      </div>
      <h2 style={{ margin:0, font:'italic 300 clamp(40px,6vw,72px)/1 "Fraunces"', letterSpacing:'-.02em', color:SCRAP.ink }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ marginTop:14, font:'400 16px/1.5 "Fraunces"', color:SCRAP.inkSoft }}>{subtitle}</p>
      )}
    </div>
  );
}

Object.assign(window, { SectionHeader });
