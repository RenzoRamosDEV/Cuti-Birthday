// Sección capítulo II — cosas que hacen que seas tú

const TRAITS = [
  { e:'La vanidad',                    d:'Lo de mirarte al espejo constantemente debería ser ilegal jajaja.',                                                                                    c:SCRAP.red   },
  { e:'Lo de poner alarma y no despertar', d:'Esto me parece delito federal. Lo de poner la alarma y ni siquiera apagarla es muy loco.',                                                        c:SCRAP.blue  },
  { e:'Tu lado chef',                  d:'Posiblemente una de las épocas más locas. Hubo riesgo de intoxicación y yo de catador oficial de la comida jajaja.',                                  c:SCRAP.green },
  { e:'Sonrisa perfecta',              d:'Tu sonrisa ilumina cualquier lugar, pero se te ha subido un poco a la cabeza jajaja.',                                                                c:SCRAP.yellow},
  { e:'Luchadora en general',          d:'Creo que, después de tanto ñete que nos hemos metido, te has vuelto algo sanguinaria.',                                                               c:SCRAP.red   },
  { e:'Mosca e inteligente',           d:'Siempre atenta y perspicaz. Me sorprende la capacidad de aprender que tienes: o sueltas puro floro o sabes demasiado jajaj.',                       c:SCRAP.blue  },
];

const TRAITS_IMG = "https://www.photo-pick.com/online/linkedLogo?linkId=v0KVmerR";

function Traits(){
  return (
    <section id="tu" className="paper grain" style={{ position:'relative', padding:'90px 6vw' }}>
      <div style={{ position:'relative', maxWidth:1100, margin:'0 auto' }}>
        <SectionHeader
          eyebrow="capítulo II" number="cosas que te hacen tú"
          title="cosas tuyas"
          subtitle="Algunas pocas cosas que hacen que seas tú."
        />

        <div className="traits-grid" style={{
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',
          gap:'20px 30px', marginTop:30,
        }}>
          {TRAITS.map((t, i) => (
            <div key={i} className="fadein" style={{
              position:'relative', padding:'18px 18px 22px',
              background:SCRAP.paperLight, transform:`rotate(${[-1,1.2,-.6,.8,-1.4,.6,-.8,1.0][i]}deg)`,
              boxShadow:'0 3px 10px rgba(60,40,20,.1)',
              borderLeft:`3px solid ${t.c}`,
            }}>
              <Tape left="20px" top="-10px" w={50} rot={i%2?6:-8} color={t.c+'66'}/>
              <div style={{ font:'400 11px "Caveat"', letterSpacing:'.25em', textTransform:'uppercase', color:SCRAP.inkSoft, marginBottom:4 }}>
                nº {String(i+1).padStart(2,'0')}
              </div>
              <h4 style={{ margin:0, font:'500 22px/1.15 "Caveat"', color:SCRAP.ink }}>{t.e}</h4>
              <p style={{ margin:'8px 0 0', font:'400 14px/1.5 "Fraunces"', color:SCRAP.inkSoft }}>{t.d}</p>
            </div>
          ))}
        </div>

        <div className="fadein" style={{
          marginTop:60, display:'flex', alignItems:'center', justifyContent:'center', gap:40, flexWrap:'wrap',
        }}>
          <Polaroid seed="trait-bonus" src={TRAITS_IMG}
            caption="Jajaja esta foto me gusta mucho pero esta mas borrosa que nuestro futuro xD"
            w={220} h={240} rot={-3} tapeRot={6}/>
          <div style={{ maxWidth:340 }}>
            <div style={{ font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase', color:SCRAP.red }}>
              Y por encima de todo:
            </div>
            <p style={{ marginTop:10, font:'italic 300 32px/1.15 "Fraunces"', color:SCRAP.ink, letterSpacing:'-.01em' }}>
              eres la persona que mejor me conoce. y yo, la persona que mejor te conoce.
              eso es <span style={{ color:SCRAP.red, fontFamily:'"Homemade Apple",cursive', fontStyle:'normal', fontSize:'.9em' }}>bonito</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Traits });
