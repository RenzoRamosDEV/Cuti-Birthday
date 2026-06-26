// Sección portada — hero con nav, título y cluster de polaroids

const HERO_IMGS = {
  lafotoclave:                    "https://www.photo-pick.com/online/linkedLogo?linkId=OquiESXb",
  aquicreoquedespuesllorastesjaja:"https://www.photo-pick.com/online/linkedLogo?linkId=zVlRXf9t",
  mifavorita:                     "https://www.photo-pick.com/online/linkedLogo?linkId=r4A8X19P",
  sonrisaperfecta:                "https://www.photo-pick.com/online/linkedLogo?linkId=liHOuAA7",
};

const navLink = (active = false) => ({
  textDecoration:'none', color: active ? SCRAP.ink : SCRAP.inkSoft,
  borderBottom: active ? `1.5px solid ${SCRAP.red}` : '1.5px solid transparent',
  paddingBottom:2, transition:'border-color .2s, color .2s',
});

const ctaPrimary = () => ({
  background:SCRAP.ink, color:SCRAP.paper, border:0, padding:'13px 24px',
  font:'500 14px "Caveat"', letterSpacing:'.06em', cursor:'pointer',
  borderRadius:2, transform:'rotate(-1deg)',
  boxShadow:'2px 2px 0 '+SCRAP.red, transition:'transform .15s, box-shadow .15s',
});

function Hero({ onStart }){
  const mobile = useIsMobile();

  return (
    <section className="paper grain" style={{
      position:'relative', minHeight:'100vh', padding:'40px 6vw 80px', overflow:'hidden',
    }}>
      <header style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        maxWidth:1280, margin:'0 auto',
      }}>
        <div className="hero-logo" style={{ font:'600 28px "Caveat"', color:SCRAP.inkSoft, letterSpacing:'.04em' }}>
          ✿ Joselyn
        </div>
        <nav className="hero-nav" style={{ display:'flex', gap:24, font:'500 28px "Caveat"', color:SCRAP.ink }}>
          <a href="#portada"   style={navLink(true)}>portada</a>
          <a href="#recuerdos" style={navLink()}>recuerdos</a>
          <a href="#tu"        style={navLink()}>cosas tuyas</a>
          <a href="#video"     style={navLink()}>video</a>
          <a href="#carta"     style={navLink()}>carta</a>
        </nav>
      </header>

      <div id="portada" className="hero-grid" style={{
        position:'relative', maxWidth:1280, margin:'0 auto',
        display:'grid', gridTemplateColumns:'minmax(0,1fr) minmax(0,480px)',
        gap:40, alignItems:'center', minHeight:'74vh', paddingTop:'4vh',
      }}>
        <div>
          <div style={{ font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase', color:SCRAP.red, marginBottom:6 }}>
            un regalo para mi hermanita
          </div>
          <h1 style={{ margin:0, font:'italic 300 clamp(58px,9vw,120px)/.92 "Fraunces"', letterSpacing:'-.02em', color:SCRAP.ink }}>
            19 años<br/>
            <span style={{ fontStyle:'normal', fontWeight:200 }}>contigo en </span>
            <span style={{ font:'400 clamp(58px,9vw,120px) "Homemade Apple",cursive', color:SCRAP.red, lineHeight:1 }}>recuerdos</span>
          </h1>
          <p style={{ maxWidth:420, marginTop:22, font:'400 17px/1.55 "Fraunces"', color:SCRAP.inkSoft }}>
            Una página que no llena el feliz cumple de relleno —
            sino con <span className="underline-wavy">algunos momentos</span> que
            de verdad valen, una sección entera sobre lo que te hace tú,
            y una carta al final.
          </p>
          <div style={{ marginTop:28, display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
            <button onClick={onStart} style={ctaPrimary()}>empezar a recordar →</button>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:mobile?16:24, justifyItems:'center', padding:'10px 0 30px' }}>
          <Polaroid seed="hero-1" src={HERO_IMGS.lafotoclave}                     caption="Posiblemente nuestra mejor foto jajaja"  w={mobile?150:200} h={mobile?150:200} rot={6}  tapeRot={4}/>
          <Polaroid seed="hero-2" src={HERO_IMGS.aquicreoquedespuesllorastesjaja} caption="Aqui creo que despues lloraste jajaja ✿" w={mobile?150:200} h={mobile?150:200} rot={-4} tapeRot={10}/>
          <Polaroid seed="hero-3" src={HERO_IMGS.mifavorita}                      caption="Mi foto favorita"                        w={mobile?150:200} h={mobile?150:200} rot={-7} tapeRot={-10}/>
          <Polaroid seed="hero-4" src={HERO_IMGS.sonrisaperfecta}                 caption="Sonrisa perfectaa... ♡"                  w={mobile?150:200} h={mobile?150:200} rot={5}  tapeRot={2}/>
        </div>
      </div>

      <div style={{
        position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        font:'400 15px "Caveat"', color:SCRAP.inkSoft, whiteSpace:'nowrap',
      }}>
        scroll para los recuerdos ↓
      </div>

      <style>{`
        @media (max-width:880px){
          .hero-grid{ grid-template-columns: 1fr !important; gap: 16px !important }
          .hero-nav { display: none !important }
          .hero-logo{ font-size: 22px !important }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { Hero });
