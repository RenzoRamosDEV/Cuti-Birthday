// src/components/sections.jsx — section components: Hero, Memories, EresTu, Carta

const HERO_IMGS = {
  lafotoclave:                   "https://www.photo-pick.com/online/linkedLogo?linkId=OquiESXb",
  aquicreoquedespuesllorastesjaja: "https://www.photo-pick.com/online/linkedLogo?linkId=zVlRXf9t",
  mifavorita:                    "https://www.photo-pick.com/online/linkedLogo?linkId=r4A8X19P",
  sonrisaperfecta:               "https://www.photo-pick.com/online/linkedLogo?linkId=liHOuAA7",
};

function useIsMobile(bp=880){
  const [mobile, setMobile] = React.useState(()=>window.innerWidth<=bp);
  React.useEffect(()=>{
    const mq=window.matchMedia(`(max-width:${bp}px)`);
    const fn=e=>setMobile(e.matches);
    mq.addEventListener('change',fn);
    return ()=>mq.removeEventListener('change',fn);
  },[bp]);
  return mobile;
}

// === HERO / Portada ==========================================================
function Hero({ onStart }){
  const mobile = useIsMobile();
  const imgs = HERO_IMGS;
  return (
    <section className="paper grain" style={{
      position:'relative', minHeight:'100vh', padding:'40px 6vw 80px', overflow:'hidden',
    }}>
      {/* Top nav */}
      <header style={{
        display:'flex', justifyContent:'space-between', alignItems:'center', maxWidth:1280, margin:'0 auto',
      }}>
        <div style={{font:'600 14px "Caveat"', color:SCRAP.inkSoft, letterSpacing:'.04em'}}>
          ✿ Joselyn
        </div>
        <nav style={{display:'flex', gap:24, font:'500 14px "Caveat"', color:SCRAP.ink}}>
          <a href="#portada" style={navLink(true)}>portada</a>
          <a href="#recuerdos" style={navLink()}>recuerdos</a>
          <a href="#tu" style={navLink()}>cosas tuyas</a>
          <a href="#carta" style={navLink()}>carta</a>
        </nav>
      </header>

      <div id="portada" style={{
        position:'relative', maxWidth:1280, margin:'0 auto',
        display:'grid', gridTemplateColumns:'minmax(0, 1fr) minmax(0, 540px)',
        gap:40, alignItems:'center', minHeight:'74vh', paddingTop:'4vh',
      }} className="hero-grid">
        <div>
          <div style={{
            font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase',
            color:SCRAP.red, marginBottom:6,
          }}>
            un regalo para mi hermanita
          </div>
          <h1 style={{
            margin:0, font:'italic 300 clamp(58px, 9vw, 120px)/.92 "Fraunces"',
            letterSpacing:'-.02em', color:SCRAP.ink,
          }}>
            19 años<br/>
            <span style={{fontStyle:'normal', fontWeight:200}}>contigo en </span>
            <span style={{
              font:'400 clamp(58px, 9vw, 120px) "Homemade Apple", cursive',
              color:SCRAP.red, lineHeight:1,
            }}>recuerdos</span>
          </h1>
          <p style={{
            maxWidth:420, marginTop:22, font:'400 17px/1.55 "Fraunces"',
            color:SCRAP.inkSoft,
          }}>
            Una página que no llena el feliz cumple de relleno —
            sino con <span className="underline-wavy">algunos momentos</span> que
            de verdad valen, una sección entera sobre lo que te hace tú,
            y una carta al final.
          </p>
          <div style={{marginTop:28, display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
            <button onClick={onStart} style={ctaPrimary()}>
              empezar a recordar →
            </button>
          </div>
        </div>

        {/* Polaroid cluster */}
        {mobile ? (
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr',
            gap:16, justifyItems:'center', padding:'10px 0 30px',
          }}>
            <Polaroid seed="hero-1" src={imgs.lafotoclave} caption="Posiblemente nuestra mejor foto jajaja" w={150} h={150} rot={6} tapeRot={4}/>
            <Polaroid seed="hero-2" src={imgs.aquicreoquedespuesllorastesjaja} caption="Aqui creo que despues lloraste jajaja ✿" w={150} h={150} rot={-4} tapeRot={10}/>
            <Polaroid seed="hero-3" src={imgs.mifavorita} caption="Mi foto favorita" w={150} h={150} rot={-7} tapeRot={-10}/>
            <Polaroid seed="hero-4" src={imgs.sonrisaperfecta} caption="Sonrisa perfectaa... ♡" w={150} h={150} rot={5} tapeRot={2}/>
          </div>
        ) : (
          <div style={{position:'relative', height:540, minWidth:0}}>
            <Polaroid seed="hero-1" src={imgs.lafotoclave} caption="Posiblemente nuestra mejor foto jajaja" w={180} h={180}
              rot={6} tapeRot={4} style={{position:'absolute', top:0, right:240}}/>
            <Polaroid seed="hero-2" src={imgs.aquicreoquedespuesllorastesjaja} caption="Aqui creo que despues lloraste jajaja ✿" w={210} h={250}
              rot={-4} tapeRot={10} style={{position:'absolute', top:60, right:0}}/>
            <Polaroid seed="hero-3" src={imgs.mifavorita} caption="Mi foto favorita" w={170} h={170}
              rot={-7} tapeRot={-10} style={{position:'absolute', top:300, right:280}}/>
            <Polaroid seed="hero-4" src={imgs.sonrisaperfecta} caption="Sonrisa perfectaa... ♡" w={200} h={210}
              rot={5} tapeRot={2} style={{position:'absolute', top:330, right:30}}/>
          </div>
        )}
      </div>


      {/* scroll cue */}
      <div style={{
        position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        font:'400 15px "Caveat"', color:SCRAP.inkSoft, whiteSpace:'nowrap',
      }}>
        scroll para los recuerdos ↓
      </div>
      <div style={{
        position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)',
        font:'400 11px "Fraunces"', color:SCRAP.inkSoft, letterSpacing:'.3em',
      }}></div>

      <style>{`
        @media (max-width: 880px){
          .hero-grid{grid-template-columns: 1fr !important; gap: 16px !important}
        }
      `}</style>
    </section>
  );
}

const navLink = (active=false) => ({
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

// === SECTION HEADER (reusable) ==============================================
function SectionHeader({ eyebrow, number, title, subtitle, color=SCRAP.red }){
  return (
    <div style={{textAlign:'center', maxWidth:720, margin:'0 auto 50px', padding:'0 20px'}}>
      <div style={{
        display:'inline-flex', alignItems:'center', gap:10, marginBottom:14,
      }}>
        <span style={{width:28, height:1, background:SCRAP.inkSoft, opacity:.4}}/>
        <span style={{font:'500 12px "Caveat"', letterSpacing:'.32em', textTransform:'uppercase', color}}>
          {eyebrow} · {number}
        </span>
        <span style={{width:28, height:1, background:SCRAP.inkSoft, opacity:.4}}/>
      </div>
      <h2 style={{
        margin:0, font:'italic 300 clamp(40px, 6vw, 72px)/1 "Fraunces"',
        letterSpacing:'-.02em', color:SCRAP.ink,
      }}>{title}</h2>
      {subtitle && (<p style={{
        marginTop:14, font:'400 16px/1.5 "Fraunces"', color:SCRAP.inkSoft,
      }}>{subtitle}</p>)}
    </div>
  );
}

// === MEMORIES ===============================================================
const CAP1_IMGS = {
  mem1: "https://www.photo-pick.com/online/linkedLogo?linkId=thYHa99f",
  mem2: "https://www.photo-pick.com/online/linkedLogo?linkId=cokbUwNZ",
  mem3: "https://www.photo-pick.com/online/linkedLogo?linkId=MBNiWlDW",
  mem4: "https://www.photo-pick.com/online/linkedLogo?linkId=qjlVD2wd",
};

const MEMORIES = [
  {
    seed: 'mem1',
    date: '',
    title: 'Un sustito para nada actuado :)',
    caption: '¡Qué miedo!',
    body: 'Recuerdo este día porque nos bombardearon a fotos. Ese día hubo cámara por todos lados jajaja.',
    rot: -3,
    tapeRot: -6,
    tapeColor: 'rgba(197,74,58,.4)'
  },
  {
    seed: 'mem2',
    date: '',
    title: 'Obviamente imponiendo mis gustos musicales.',
    caption: 'Sus respectivas orejitas de conejito con la mano xD',
    body: 'Pensar que después le cogiste miedo a Michael Jackson xDDDD.',
    rot: 2,
    tapeRot: 6,
    tapeColor: 'rgba(74,106,138,.45)'
  },
  {
    seed: 'mem3',
    date: '',
    title: 'De camino a Huacho',
    caption: '¡Huachitooo!',
    body: 'Cada vez que íbamos a Huacho en coche, con música de los 80 y 90. Alta influencia nos metieron; al final a los dos nos quedó ese gusto jajajaja.',
    rot: -2,
    tapeRot: 4,
    tapeColor: 'rgba(227,179,74,.45)'
  },
  {
    seed: 'mem4',
    date: '',
    title: 'Aquí no estoy yo xD',
    caption: 'Pura tecnología de punta',
    body: 'No salgo en la foto, pero esta imagen es una joya. Tu ordenador era una locura jajajajaj.',
    rot: 3,
    tapeRot: -4,
    tapeColor: 'rgba(93,122,79,.45)'
  },
];

function MemoryCard({ m, idx }){
  const flip = idx % 2 === 1;
  return (
    <article className="fadein" style={{
      display:'grid', gridTemplateColumns:'minmax(0, 1fr) minmax(0, 1fr)',
      gap:60, alignItems:'center', padding:'60px 0',
      direction: flip ? 'rtl' : 'ltr',
    }}>
      <div style={{direction:'ltr', display:'grid', placeItems:'center'}}>
        <Polaroid seed={m.seed} src={CAP1_IMGS[m.seed]} caption={m.caption} w={300} h={320}
          rot={m.rot} tapeRot={m.tapeRot} tapeColor={m.tapeColor}/>
      </div>
      <div style={{direction:'ltr', position:'relative', maxWidth:440}}>
        <div style={{
          position:'absolute', left:-24, top:8, font:'400 80px "Fraunces"',
          color:SCRAP.red+'20', lineHeight:1, fontStyle:'italic',
        }}>{String(idx+1).padStart(2,'0')}</div>
        <div style={{
          font:'500 12px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase',
          color:SCRAP.red, marginBottom:8, position:'relative',
        }}>{m.date}</div>
        <h3 style={{
          margin:0, font:'italic 400 clamp(28px, 3.5vw, 42px)/1.05 "Fraunces"',
          color:SCRAP.ink, letterSpacing:'-.01em', position:'relative',
        }}>{m.title}</h3>
        <p style={{
          marginTop:16, font:'400 17px/1.6 "Fraunces"', color:SCRAP.inkSoft,
          position:'relative',
        }}>{m.body}</p>
        <Doodle type={['heart','star','flower','sparkle'][idx%4]} size={26}
          color={SCRAP.red} style={{
            position:'absolute', right:-10, top:-20, transform:`rotate(${idx*7}deg)`,
            opacity:.7,
          }}/>
      </div>
    </article>
  );
}

function Memories(){
  return (
    <section id="recuerdos" style={{
      position:'relative', padding:'90px 6vw', background:SCRAP.paperDeep,
    }}>
      <div className="grain" style={{position:'absolute', inset:0, pointerEvents:'none'}}/>
      <div style={{position:'relative', maxWidth:1100, margin:'0 auto'}}>
        <SectionHeader
          eyebrow="capítulo I" number="07 momentos"
          title={<>Algunos recuerdos <em>que está bien recordar.</em></>}            
          subtitle="Mejor pocos con peso, que muchos rellenando huecos. Aquí están los míos contigo."
        />
        <div className="memories-list">
          {MEMORIES.map((m,i)=>(<MemoryCard key={m.seed} m={m} idx={i}/>))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px){
          .memories-list article{grid-template-columns: 1fr !important; gap: 24px !important; padding: 40px 0 !important; direction: ltr !important}
          .memories-list article > div:first-child{order:0}
        }
      `}</style>
    </section>
  );
}

// === COSAS QUE TE HACEN TÚ ==================================================
const TRAITS = [
  {
    e: 'La vanidad',
    d: 'Lo de mirarte al espejo constantemente debería ser ilegal jajaja.',
    c: SCRAP.red
  },
  {
    e: 'Lo de poner alarma y no despertar',
    d: 'Esto me parece delito federal. Lo de poner la alarma y ni siquiera apagarla es muy loco.',
    c: SCRAP.blue
  },
  {
    e: 'Tu lado chef',
    d: 'Posiblemente una de las épocas más locas. Hubo riesgo de intoxicación y yo de catador oficial de la comida jajaja.',
    c: SCRAP.green
  },
  {
    e: 'Sonrisa perfecta',
    d: 'Tu sonrisa ilumina cualquier lugar, pero se te ha subido un poco a la cabeza jajaja.',
    c: SCRAP.yellow
  },
  {
    e: 'Luchadora en general',
    d: 'Creo que, después de tanto ñete que nos hemos metido, te has vuelto algo sanguinaria.',
    c: SCRAP.red
  },
  {
    e: 'Mosca e inteligente',
    d: 'Siempre atenta y perspicaz. Me sorprende la capacidad de aprender que tienes: o sueltas puro floro o sabes demasiado jajaj.',
    c: SCRAP.blue
  }
];

function Traits(){
  return (
    <section id="tu" className="paper grain" style={{
      position:'relative', padding:'90px 6vw',
    }}>
      <div style={{position:'relative', maxWidth:1100, margin:'0 auto'}}>
        <SectionHeader
          eyebrow="capítulo II" number="cosas que te hacen tú"
          title={<>cosas tuyas</>}
          subtitle="Algunas pocas cosas que hacen que seas tú."
        />
        <div className="traits-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',
          gap:'20px 30px', marginTop:30,
        }}>
          {TRAITS.map((t,i)=>(
            <div key={i} className="fadein" style={{
              position:'relative', padding:'18px 18px 22px',
              background:SCRAP.paperLight, transform:`rotate(${[-1,1.2,-.6,.8,-1.4,.6,-.8,1.0][i]}deg)`,
              boxShadow:'0 3px 10px rgba(60,40,20,.1)',
              borderLeft:`3px solid ${t.c}`,
            }}>
              <Tape left="20px" top="-10px" w={50} rot={i%2?6:-8} color={t.c+'66'}/>
              <div style={{
                font:'400 11px "Caveat"', letterSpacing:'.25em', textTransform:'uppercase',
                color:SCRAP.inkSoft, marginBottom:4,
              }}>nº {String(i+1).padStart(2,'0')}</div>
              <h4 style={{
                margin:0, font:'500 22px/1.15 "Caveat"', color:SCRAP.ink,
              }}>{t.e}</h4>
              <p style={{
                margin:'8px 0 0', font:'400 14px/1.5 "Fraunces"', color:SCRAP.inkSoft,
              }}>{t.d}</p>
            </div>
          ))}
        </div>

        {/* Polaroid + scribble at the bottom */}
        <div className="fadein" style={{
          marginTop:60, display:'flex', alignItems:'center', justifyContent:'center', gap:40, flexWrap:'wrap',
        }}>
          <Polaroid seed="trait-bonus" src="https://www.photo-pick.com/online/linkedLogo?linkId=v0KVmerR" caption="Jajaja esta foto me gusta mucho pero esta mas borrosa que nuestro futuro xD" w={220} h={240}
            rot={-3} tapeRot={6}/>
          <div style={{maxWidth:340}}>
            <div style={{font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase', color:SCRAP.red}}>
              Y por encima de todo:
            </div>
            <p style={{
              marginTop:10, font:'italic 300 32px/1.15 "Fraunces"', color:SCRAP.ink, letterSpacing:'-.01em',
            }}>
              eres la persona que mejor me conoce. y yo, la persona que mejor te conoce.
              eso es <span style={{color:SCRAP.red, fontFamily:'"Homemade Apple", cursive', fontStyle:'normal', fontSize:'.9em'}}>bonito</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// === CARTA ==================================================================
function Carta({ onOpen, opened }){
  return (
    <section id="carta" style={{
      position:'relative', padding:'100px 6vw', background:SCRAP.ink, color:SCRAP.paper,
      overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0, opacity:.18, mixBlendMode:'screen',
        backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      }}/>
      <div style={{position:'relative', maxWidth:760, margin:'0 auto', textAlign:'center'}}>
        <div style={{
          font:'500 12px "Caveat"', letterSpacing:'.32em', textTransform:'uppercase',
          color:SCRAP.yellow, marginBottom:14,
        }}>capítulo III · la carta</div>
        <h2 style={{
          margin:0, font:'italic 300 clamp(48px, 7vw, 88px)/.95 "Fraunces"',
          letterSpacing:'-.02em',
        }}>
          una carta<br/>
          <span style={{
            font:'400 clamp(48px, 7vw, 88px) "Homemade Apple", cursive',
            color:SCRAP.yellow, lineHeight:1,
          }}>para ti, Joselyn.</span>
        </h2>

        {!opened && (
          <button onClick={onOpen} className="fadein" style={{
            marginTop:48,
            background:SCRAP.paperLight, color:SCRAP.ink, border:0,
            padding:'18px 32px',
            font:'500 18px "Caveat"', letterSpacing:'.04em', cursor:'pointer',
            borderRadius:2, transform:'rotate(-1.5deg)',
            boxShadow:'4px 4px 0 '+SCRAP.red+', 0 12px 40px rgba(0,0,0,.4)',
            transition:'transform .15s',
          }}>
            ✉ abrir la carta · y soltar el confeti
          </button>
        )}

        {opened && (
          <div className="letter-paper" style={{
            position:'relative', marginTop:48, padding:'40px clamp(24px, 5vw, 56px) 60px',
            background:SCRAP.paperLight, color:SCRAP.ink, textAlign:'left',
            boxShadow:'0 30px 80px rgba(0,0,0,.5), 0 4px 12px rgba(0,0,0,.2)',
            transform:'rotate(-.6deg)',
            backgroundImage:`repeating-linear-gradient(180deg, transparent 0, transparent 31px, rgba(74,106,138,.2) 31px, rgba(74,106,138,.2) 32px)`,
            animation:'letterIn .8s cubic-bezier(.2,.9,.3,1)',
          }}>
            <style>{`@keyframes letterIn{from{opacity:0;transform:rotate(-.6deg) translateY(20px) scale(.96)}to{opacity:1;transform:rotate(-.6deg) translateY(0) scale(1)}}`}</style>
            <Tape left="50%" top="-12px" w={120} rot={-3} color="rgba(227,179,74,.6)"/>
            {/* red margin line */}
            <div style={{
              position:'absolute', left:'10%', top:24, bottom:24, width:1.5,
              background:SCRAP.red+'66',
            }}/>
            <div style={{
              font:'500 14px "Caveat"', color:SCRAP.inkSoft, marginBottom:18,
            }}>25 de mayo de 2026</div>

            <div style={{font:'400 22px/1.65 "Caveat"', color:SCRAP.ink}}>
              <p style={{margin:'0 0 14px'}}>
                Josy, Josy
              </p>
              <p style={{margin:'0 0 14px'}}>
                Este texto seguro está mal escrito jajaj, este no quise pasarlo por ChatGPT para que veas mi love xD, me ha costado escribirlo jajaja.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Ya tienes 19 añitos, toda una mujer, fuerte y valiente a pesar de todo lo que hemos tenido que pasar. Me sorprende lo mucho que has crecido y me hace feliz verte progresar.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Más que felicitarte, te quiero agradecer por haber estado en mi vida, desde las peleas de niños sin ningún motivo relevante, desde que nos lanzábamos el Pocoyó de cama a cama, de nuestros intentos de asesinato, hasta cuando íbamos a comprar unas papas ondas picantes jajaja.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Te agradezco el hecho de que existas. Aunque no lo creas, si yo sigo adelante es por ti, para que veas que todo se puede hacer a pesar de que las cosas se pongan mal. Y por si la cagas, pueda mantenerte xDDDD.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Quiero que pases un bonito cumpleaños, a pesar de que no esté ahí presencialmente. Que sepas que siempre estaré para ti.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Ya en un futuro no muy lejano, y cuando me lo pueda permitir, prometo que tus cumpleaños siempre los pasaré contigo : ).
              </p>
              <p style={{margin:'0 0 14px'}}>
                Bueno, te digo eso nomás porque se me da fatal expresarme jajaja.
              </p>
              <p style={{margin:'24px 0 0', font:'400 26px "Homemade Apple", cursive', color:SCRAP.red}}>
                Te quiero más que nada.
              </p>
              <p style={{margin:'4px 0 0', font:'500 18px "Caveat"', color:SCRAP.inkSoft}}>
                — Renzo "El Bibi", tu hermano, el más pesado jaja.
              </p>
            </div>

            {/* lipstick kiss / heart stamp */}
            <Doodle type="heart" size={42} color={SCRAP.red}
              style={{position:'absolute', right:30, bottom:30, opacity:.85, transform:'rotate(12deg)'}}/>
          </div>
        )}
      </div>
    </section>
  );
}

// === FOOTER =================================================================
function Footer(){
  return (
    <footer style={{
      padding:'40px 6vw 60px', textAlign:'center', background:SCRAP.paperDeep,
      borderTop:`1px dashed ${SCRAP.inkSoft}66`,
    }}>
      <div style={{
        font:'500 14px "Caveat"', color:SCRAP.inkSoft, marginBottom:8,
      }}>
        Una hecha por un Bibi jajaja, para mi motivo personificado de vivir.
      </div>
      <div style={{
        font:'400 13px "Caveat"', color:SCRAP.inkSoft+'aa',
      }}>
        ✿ ✿ ✿
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, Memories, Traits, Carta, Footer });
