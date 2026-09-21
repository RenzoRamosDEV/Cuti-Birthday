// Página de las flores amarillas — la maceta en 3D y el texto encima, sin solaparse

function Flores({ onBack }){
  const mobile = useIsMobile(700);

  return (
    <div style={{
      position:'fixed', inset:0, overflow:'hidden',
      display:'flex', flexDirection:'column',
      background:SCRAP.paper, fontFamily:'"Fraunces",Georgia,serif',
    }}>
      {/* banda de texto: reserva su altura para que las flores nunca la pisen */}
      <div style={{ flex:'0 0 auto', padding:'4vh 6vw 0', textAlign:'center' }}>
        <h1 style={{ margin:0, font:'600 clamp(38px,7.5vw,74px)/1 "Caveat"', color:SCRAP.ink }}>
          Tus flores amarillas
        </h1>
        <p style={{
          margin:'6px auto 0', maxWidth:540, textWrap:'balance',
          font:'italic 300 clamp(14px,2.3vw,19px)/1.5 "Fraunces"', color:SCRAP.inkSoft,
        }}>
          como símbolo de amor, alegría y cumplimiento de sueños
        </p>
        {/* el aviso va aquí arriba: abajo chocaba con el botón de volver.
            En móvil no hay rueda, así que solo se menciona el arrastre. */}
        <p style={{
          margin:'10px 0 0', font:'500 15px "Caveat"', color:SCRAP.inkSoft, opacity:.7,
        }}>
          {mobile ? 'arrástrala para girarla' : 'arrástrala para girarla · rueda para acercar'}
        </p>
      </div>

      {/* el lienzo lleva el mismo fondo crema, así que la costura no se ve */}
      <div style={{ position:'relative', flex:'1 1 auto', minHeight:0 }}>
        <Maceta3D/>
      </div>

      <Volver onBack={onBack}/>

      <div style={{
        position:'fixed', right:18, bottom:18, zIndex:80, pointerEvents:'none',
        font:'500 16px "Caveat"', color:SCRAP.inkSoft, opacity:.8, letterSpacing:'.02em',
      }}>
        hecha por Renzo para Joselyn {'<3'}
      </div>
    </div>
  );
}

Object.assign(window, { Flores });
