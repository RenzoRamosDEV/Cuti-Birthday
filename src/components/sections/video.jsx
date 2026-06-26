// Sección capítulo III — un videito para ti

const VIDEO_SRC = "src/assets/Insta_Video_Josy.mp4";

function VideoSection(){
  return (
    <section id="video" className="paper grain" style={{ position:'relative', padding:'90px 6vw' }}>
      <div style={{ position:'relative', maxWidth:900, margin:'0 auto' }}>
        <SectionHeader
          eyebrow="capítulo III" number="pon play"
          title="un videito"
          subtitle="Dale play y míralo — puedes ponerlo en pantalla completa si quieres."
        />

        <div className="fadein" style={{
          position:'relative', maxWidth:780, margin:'0 auto',
          padding:'16px 16px 22px', background:SCRAP.paperLight,
          transform:'rotate(-1.2deg)', boxShadow:'0 6px 22px rgba(60,40,20,.18)',
        }}>
          <Tape left="50%" top="-12px" w={70} rot={-3} color={SCRAP.red+'66'}/>
          <video
            controls
            playsInline
            preload="metadata"
            style={{ display:'block', width:'100%', height:'auto', background:'#000', borderRadius:2 }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
          <div style={{ marginTop:12, textAlign:'center', font:'400 18px "Caveat"', color:SCRAP.inkSoft }}>
            para ti 🌸
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { VideoSection });
