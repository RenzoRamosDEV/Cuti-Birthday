// Pie de página

function Footer(){
  return (
    <footer style={{
      padding:'40px 6vw 60px', textAlign:'center', background:SCRAP.paperDeep,
      borderTop:`1px dashed ${SCRAP.inkSoft}66`,
    }}>
      <div style={{ font:'500 24px "Caveat"', color:SCRAP.inkSoft, marginBottom:8 }}>
        Una hecha por un Bibi jajaja, para mi motivo personificado de vivir.
      </div>
      <div style={{ font:'400 24px "Caveat"', color:SCRAP.inkSoft+'aa' }}>
        ✿ ✿ ✿
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
