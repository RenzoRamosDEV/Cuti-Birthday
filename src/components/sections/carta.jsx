// Sección capítulo III — carta de cumpleaños

function Carta({ onOpen, opened }){
  return (
    <section id="carta" style={{
      position:'relative', padding:'100px 6vw', background:SCRAP.ink, color:SCRAP.paper, overflow:'hidden',
    }}>
      <div style={{
        position:'absolute', inset:0, opacity:.18, mixBlendMode:'screen',
        backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='1.2' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
      }}/>

      <div style={{ position:'relative', maxWidth:760, margin:'0 auto', textAlign:'center' }}>
        <div style={{ font:'500 12px "Caveat"', letterSpacing:'.32em', textTransform:'uppercase', color:SCRAP.yellow, marginBottom:14 }}>
          capítulo III · la carta
        </div>
        <h2 style={{ margin:0, font:'italic 300 clamp(48px,7vw,88px)/.95 "Fraunces"', letterSpacing:'-.02em' }}>
          una carta<br/>
          <span style={{ font:'400 clamp(48px,7vw,88px) "Homemade Apple",cursive', color:SCRAP.yellow, lineHeight:1 }}>
            para ti, Joselyn.
          </span>
        </h2>

        {!opened && (
          <button onClick={onOpen} className="fadein" style={{
            marginTop:48, background:SCRAP.paperLight, color:SCRAP.ink, border:0, padding:'18px 32px',
            font:'500 18px "Caveat"', letterSpacing:'.04em', cursor:'pointer',
            borderRadius:2, transform:'rotate(-1.5deg)',
            boxShadow:'4px 4px 0 '+SCRAP.red+', 0 12px 40px rgba(0,0,0,.4)',
            transition:'transform .15s',
          }}>
            ✉ Leer cartita
          </button>
        )}

        {opened && (
          <div className="letter-paper" style={{
            position:'relative', marginTop:48, padding:'40px clamp(24px,5vw,56px) 60px',
            background:SCRAP.paperLight, color:SCRAP.ink, textAlign:'left',
            boxShadow:'0 30px 80px rgba(0,0,0,.5), 0 4px 12px rgba(0,0,0,.2)',
            transform:'rotate(-.6deg)',
            backgroundImage:`repeating-linear-gradient(180deg, transparent 0, transparent 31px, rgba(74,106,138,.2) 31px, rgba(74,106,138,.2) 32px)`,
            animation:'letterIn .8s cubic-bezier(.2,.9,.3,1)',
          }}>
            <style>{`@keyframes letterIn{from{opacity:0;transform:rotate(-.6deg) translateY(20px) scale(.96)}to{opacity:1;transform:rotate(-.6deg) translateY(0) scale(1)}}`}</style>
            <Tape left="50%" top="-12px" w={120} rot={-3} color="rgba(227,179,74,.6)"/>
            <div style={{ position:'absolute', left:'10%', top:24, bottom:24, width:1.5, background:SCRAP.red+'66' }}/>
            <div style={{ font:'500 14px "Caveat"', color:SCRAP.inkSoft, marginBottom:18 }}>25 de mayo de 2026</div>

            <div style={{ font:'400 22px/1.65 "Caveat"', color:SCRAP.ink }}>
              <p style={{margin:'0 0 14px'}}>Josy, Josy</p>
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
              <p style={{ margin:'24px 0 0', font:'400 26px "Homemade Apple",cursive', color:SCRAP.red }}>
                Te quiero más que nada.
              </p>
              <p style={{ margin:'4px 0 0', font:'500 18px "Caveat"', color:SCRAP.inkSoft }}>
                — Renzo "El Bibi", tu hermano, el más pesado jaja.
              </p>
            </div>

            <Doodle type="heart" size={42} color={SCRAP.red}
              style={{ position:'absolute', right:30, bottom:30, opacity:.85, transform:'rotate(12deg)' }}/>
          </div>
        )}
      </div>
    </section>
  );
}

Object.assign(window, { Carta });
