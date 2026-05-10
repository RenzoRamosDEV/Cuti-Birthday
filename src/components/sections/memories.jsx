// Sección capítulo I — recuerdos con foto polaroid + texto

const MEMORIES_IMGS = {
  mem1: "https://www.photo-pick.com/online/linkedLogo?linkId=thYHa99f",
  mem2: "https://www.photo-pick.com/online/linkedLogo?linkId=cokbUwNZ",
  mem3: "https://www.photo-pick.com/online/linkedLogo?linkId=MBNiWlDW",
  mem4: "https://www.photo-pick.com/online/linkedLogo?linkId=qjlVD2wd",
};

const MEMORIES = [
  {
    seed:'mem1', caption:'¡Qué miedo!',
    title:'Un sustito para nada actuado :)',
    body:'Recuerdo este día porque nos bombardearon a fotos. Ese día hubo cámara por todos lados jajaja.',
    rot:-3, tapeRot:-6, tapeColor:'rgba(197,74,58,.4)',
  },
  {
    seed:'mem2', caption:'Sus respectivas orejitas de conejito con la mano xD',
    title:'Obviamente imponiendo mis gustos musicales.',
    body:'Pensar que después le cogiste miedo a Michael Jackson xDDDD.',
    rot:2, tapeRot:6, tapeColor:'rgba(74,106,138,.45)',
  },
  {
    seed:'mem3', caption:'¡Huachitooo!',
    title:'De camino a Huacho',
    body:'Cada vez que íbamos a Huacho en coche, con música de los 80 y 90. Alta influencia nos metieron; al final a los dos nos quedó ese gusto jajajaja.',
    rot:-2, tapeRot:4, tapeColor:'rgba(227,179,74,.45)',
  },
  {
    seed:'mem4', caption:'Pura tecnología de punta',
    title:'Aquí no estoy yo xD',
    body:'No salgo en la foto, pero esta imagen es una joya. Tu ordenador era una locura jajajajaj.',
    rot:3, tapeRot:-4, tapeColor:'rgba(93,122,79,.45)',
  },
];

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

function MemoryCard({ m, idx }){
  const flip = idx % 2 === 1;
  return (
    <article className="fadein" style={{
      display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',
      gap:60, alignItems:'center', padding:'60px 0',
      direction: flip ? 'rtl' : 'ltr',
    }}>
      <div style={{ direction:'ltr', display:'grid', placeItems:'center' }}>
        <Polaroid seed={m.seed} src={MEMORIES_IMGS[m.seed]} caption={m.caption}
          w={300} h={320} rot={m.rot} tapeRot={m.tapeRot} tapeColor={m.tapeColor}/>
      </div>
      <div style={{ direction:'ltr', position:'relative', maxWidth:440 }}>
        <div style={{
          position:'absolute', left:-24, top:8,
          font:'400 80px "Fraunces"', color:SCRAP.red+'20', lineHeight:1, fontStyle:'italic',
        }}>{String(idx+1).padStart(2,'0')}</div>
        <h3 style={{
          margin:0, font:'italic 400 clamp(28px,3.5vw,42px)/1.05 "Fraunces"',
          color:SCRAP.ink, letterSpacing:'-.01em', position:'relative',
        }}>{m.title}</h3>
        <p style={{
          marginTop:16, font:'400 17px/1.6 "Fraunces"', color:SCRAP.inkSoft, position:'relative',
        }}>{m.body}</p>
        <Doodle type={['heart','star','flower','sparkle'][idx%4]} size={26} color={SCRAP.red}
          style={{ position:'absolute', right:-10, top:-20, transform:`rotate(${idx*7}deg)`, opacity:.7 }}/>
      </div>
    </article>
  );
}

function Memories(){
  return (
    <section id="recuerdos" style={{ position:'relative', padding:'90px 6vw', background:SCRAP.paperDeep }}>
      <div className="grain" style={{ position:'absolute', inset:0, pointerEvents:'none' }}/>
      <div style={{ position:'relative', maxWidth:1100, margin:'0 auto' }}>
        <SectionHeader
          eyebrow="capítulo I" number="momentos"
          title={<>Algunos recuerdos <em>que está bien recordar.</em></>}
          subtitle="Mejor pocos con peso, que muchos rellenando huecos. Aquí están los míos contigo."
        />
        <div className="memories-list">
          {MEMORIES.map((m, i) => <MemoryCard key={m.seed} m={m} idx={i}/>)}
        </div>
      </div>
      <style>{`
        @media (max-width:880px){
          .memories-list article{ grid-template-columns:1fr !important; gap:24px !important; padding:40px 0 !important; direction:ltr !important }
          .memories-list article > div:first-child{ order:0 }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Memories });
