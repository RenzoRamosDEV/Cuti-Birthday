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
function Hero({ onStart, onSecret }){
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
            sino con <span className="underline-wavy">siete momentos</span> que
            de verdad valen, una sección entera sobre lo que te hace tú,
            y una carta al final.
          </p>
          <div style={{marginTop:28, display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
            <button onClick={onStart} style={ctaPrimary()}>
              empezar a recordar →
            </button>
            <span style={{font:'400 14px "Caveat"', color:SCRAP.inkSoft}}>
              (10 min de lectura)
            </span>
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
            <DoodleArrow w={140} h={70} color={SCRAP.ink}
              style={{position:'absolute', top:240, left:30, transform:'rotate(-8deg)'}}/>
            <div style={{
              position:'absolute', top:235, left:60,
              font:'400 17px "Caveat"', color:SCRAP.ink, transform:'rotate(-6deg)',
              maxWidth:140,
            }}>
              esto eres tú no me lo niegues
            </div>
          </div>
        )}
      </div>


      {/* scroll cue */}
      <div style={{
        position:'absolute', bottom:32, right:'5vw', display:'flex', alignItems:'center', gap:10,
        font:'400 15px "Caveat"', color:SCRAP.inkSoft,
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
const MEMORIES = [
  { seed:'mem1', date:'agosto 2018', title:'la noche que rompimos el espejo',
    caption:'pero qué hicimos',
    body:'Y mamá nos buscó toda la tarde por toda la casa. Tú decías "no fui yo" mirando al techo. Eso lo hago yo ahora cuando me preguntan algo. Te lo robé.',
    rot:-3, tapeRot:-6, tapeColor:'rgba(197,74,58,.4)' },
  { seed:'mem2', date:'verano 2019', title:'el viaje en el coche viejo',
    caption:'la radio rota',
    body:'Cantaste durante seis horas seguidas con la radio rota, y en algún momento entre Albacete y Murcia decidimos que íbamos a ser mejores amigas para siempre. Cumplido.',
    rot:2, tapeRot:6, tapeColor:'rgba(74,106,138,.45)' },
  { seed:'mem3', date:'invierno 2020', title:'el día del confinamiento',
    caption:'cuarentena',
    body:'Hicimos un mural de pósits en la cocina con los nombres de todos los sitios a los que iríamos cuando esto acabara. Solo fuimos a tres. Pero los tres contigo.',
    rot:-2, tapeRot:4, tapeColor:'rgba(227,179,74,.45)' },
  { seed:'mem4', date:'tu graduación · junio 2022', title:'cuando lloraste con la birrete puesto',
    caption:'orgullosa',
    body:'Yo lloré más. Mamá lloró más todavía. Papá fingió que no, pero papá nunca finge tan mal. Esa foto la tengo de fondo de pantalla desde entonces.',
    rot:3, tapeRot:-4, tapeColor:'rgba(93,122,79,.45)' },
  { seed:'mem5', date:'una madrugada de 2023', title:'el karaoke en la cocina',
    caption:'a las 3am',
    body:'Cantamos como si nadie nos pudiera oír. Los vecinos sí podían. La señora del 4ºB todavía no me saluda. Mereció totalmente la pena.',
    rot:-4, tapeRot:8, tapeColor:'rgba(220,185,201,.55)' },
  { seed:'mem6', date:'tu primer trabajo · 2024', title:'el día que firmaste el contrato',
    caption:'oficial',
    body:'Volviste a casa caminando porque el bus tardaba mucho y querías contármelo en persona. Llegaste sin aliento. "Lo conseguí". Sí, lo conseguiste.',
    rot:2, tapeRot:-6, tapeColor:'rgba(197,74,58,.4)' },
  { seed:'mem7', date:'hace dos meses', title:'la noche que me dijiste',
    caption:'gracias por estar',
    body:'No hace falta que te diga lo que dijiste. Tú sabes. Yo sé. Por eso esta página existe.',
    rot:-2, tapeRot:5, tapeColor:'rgba(74,106,138,.5)' },
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
        <Polaroid seed={m.seed} caption={m.caption} w={300} h={320}
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
          title={<>siete recuerdos <em>que de verdad valen.</em></>}
          subtitle="Mejor pocos con peso, que muchos rellenando huecos. Aquí están los míos contigo, en orden."
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
  { e:'ruido al masticar manzanas', d:'que cualquiera diría que es una falta. para mí es una banda sonora.', c:SCRAP.red },
  { e:'tu lista de spotify "para llorar"', d:'tiene 137 canciones. la conozco entera. no te he dicho que la conozco entera.', c:SCRAP.blue },
  { e:'cómo dices "no" sin decir "no"', d:'la cara, la pausa, los tres parpadeos. legendario.', c:SCRAP.green },
  { e:'tu obsesión con la fruta perfecta', d:'has rechazado plátanos por su curvatura. te admiro y me preocupas.', c:SCRAP.yellow },
  { e:'que llores con los anuncios', d:'el de la lotería de 2019 te dejó dos días mal. nunca me reiré (mucho).', c:SCRAP.red },
  { e:'cómo recuerdas todos los cumpleaños', d:'menos el tuyo, que siempre se te olvida hasta que llega.', c:SCRAP.blue },
  { e:'tu manía de oler los libros nuevos', d:'antes de leerlos. después de leerlos. y a veces durante.', c:SCRAP.green },
  { e:'que siempre digas "una cosa rápida"', d:'y luego sean cuarenta minutos. los mejores cuarenta minutos.', c:SCRAP.red },
];

function Traits(){
  return (
    <section id="tu" className="paper grain" style={{
      position:'relative', padding:'90px 6vw',
    }}>
      <div style={{position:'relative', maxWidth:1100, margin:'0 auto'}}>
        <SectionHeader
          eyebrow="capítulo II" number="cosas que te hacen tú"
          title={<>esto eres <span className="underline-wavy">tú.</span></>}
          subtitle="Lo importante no son las cosas grandes. Son estas. Las que solo nota la gente que te quiere mucho."
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
          <Polaroid seed="trait-bonus" caption="tú · cualquier martes" w={220} h={240}
            rot={-3} tapeRot={6}/>
          <div style={{maxWidth:340}}>
            <div style={{font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase', color:SCRAP.red}}>
              Y por encima de todo:
            </div>
            <p style={{
              marginTop:10, font:'italic 300 32px/1.15 "Fraunces"', color:SCRAP.ink, letterSpacing:'-.01em',
            }}>
              eres la persona que mejor me conoce. y yo, la persona que mejor te conoce.
              eso es <span style={{color:SCRAP.red, fontFamily:'"Homemade Apple", cursive', fontStyle:'normal', fontSize:'.9em'}}>raro</span> y <span style={{color:SCRAP.red, fontFamily:'"Homemade Apple", cursive', fontStyle:'normal', fontSize:'.9em'}}>bonito</span>.
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
            }}>10 de mayo, 2026 — el día de tus 19</div>

            <div style={{font:'400 22px/1.65 "Caveat"', color:SCRAP.ink}}>
              <p style={{margin:'0 0 14px'}}>
                Querida Joselyn,
              </p>
              <p style={{margin:'0 0 14px'}}>
                Llevo dos semanas pensando qué escribirte aquí. Borré tres versiones.
                Esta también la voy a borrar pero ya no me da tiempo, así que se queda.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Tienes diecinueve. Eso ya no es ser pequeña. Y aun así sigues siendo
                la primera persona a la que le cuento todo. Eso no va a cambiar.
                <span style={{color:SCRAP.red, fontFamily:'"Homemade Apple", cursive', fontSize:'.9em'}}> nunca.</span>
              </p>
              <p style={{margin:'0 0 14px'}}>
                Gracias por reírte de mis chistes malos. Por escuchar mis dramas
                inventados. Por enseñarme a defenderme cuando yo te enseñaba a sumar.
                Hicimos un buen trato.
              </p>
              <p style={{margin:'0 0 14px'}}>
                Y si algún día se te olvida lo que vales, vuelve a esta página.
                Aquí está todo escrito.
              </p>
              <p style={{margin:'24px 0 0', font:'400 26px "Homemade Apple", cursive', color:SCRAP.red}}>
                te quiero más que nada.
              </p>
              <p style={{margin:'4px 0 0', font:'500 18px "Caveat"', color:SCRAP.inkSoft}}>
                — yo. tu hermana. la pesada. la de siempre.
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
        hecho con calma · 10 de mayo de 2026 · 19 años
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
