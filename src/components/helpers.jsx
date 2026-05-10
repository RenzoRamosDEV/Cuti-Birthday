// src/components/helpers.jsx — Photo placeholder, Polaroid, Tape, Confetti, Modal

const SCRAP = {
  paper: '#f3e9d2',
  paperDeep: '#e9dcb8',
  paperLight: '#fdfbf3',
  ink: '#3a2a1a',
  inkSoft: '#6b5239',
  red: '#c54a3a',
  blue: '#4a6a8a',
  green: '#5d7a4f',
  yellow: '#e3b34a',
};

// --- photo placeholder (deterministic gradient w/ caption) ---
const PALETTES = [
  ['#e8b89c','#c97456','#3a1f12'],['#f4d6c1','#e8a384','#5a2c1a'],
  ['#c9d6c1','#7a9472','#2c3d28'],['#b8c5d6','#7588a8','#1f2a3d'],
  ['#e4cfa5','#c4a96c','#4a3a1c'],['#dcb9c9','#b07a8e','#3d1f2c'],
  ['#d4c5e0','#9c87b8','#2e2240'],['#f0d5b8','#d49968','#4a2e1a'],
  ['#c5dcd6','#7ea69c','#1f3a32'],['#e8c5a8','#b8806a','#3a1f15'],
];
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=(h*16777619)>>>0;}return h;}
function Photo({seed='x', caption, style, children}){
  const [a,b,c]=PALETTES[hashStr(seed)%PALETTES.length];
  const ang=(hashStr(seed+'a')%60)-30+135;
  const x1=(hashStr(seed+'1')%60)+10, y1=(hashStr(seed+'2')%60)+10;
  const x2=(hashStr(seed+'3')%60)+20, y2=(hashStr(seed+'4')%60)+20;
  return (
    <div style={{position:'relative',overflow:'hidden',
      background:`linear-gradient(${ang}deg, ${a} 0%, ${b} 60%, ${c} 100%)`,
      ...style}}>
      <div style={{position:'absolute',inset:0,background:
        `radial-gradient(circle at ${x1}% ${y1}%, rgba(255,255,255,.35), transparent 40%),`+
        `radial-gradient(circle at ${x2}% ${y2}%, ${c}55, transparent 50%),`+
        `radial-gradient(circle at 50% 110%, rgba(0,0,0,.25), transparent 60%)`}}/>
      <div style={{position:'absolute',inset:0,opacity:.18,mixBlendMode:'overlay',
        backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2' seed='${hashStr(seed)%99}'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.1 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`}}/>
      {caption && (<div style={{position:'absolute',left:8,bottom:6,
        font:'500 9px Inter,system-ui',color:'rgba(255,255,255,.92)',
        letterSpacing:'.08em',textTransform:'uppercase',
        textShadow:'0 1px 4px rgba(0,0,0,.4)'}}>{caption}</div>)}
      {children}
    </div>
  );
}

// --- washi tape ---
function Tape({left='50%', top='-9px', w=70, rot=-6, color='rgba(220,200,140,.6)'}){
  return (<div style={{
    position:'absolute', left, top, width:w, height:18,
    transform:`translateX(-50%) rotate(${rot}deg)`,
    background:color, boxShadow:'0 2px 4px rgba(0,0,0,.08)',
    clipPath:'polygon(0 30%, 4% 60%, 8% 30%, 12% 70%, 16% 30%, 20% 70%, 24% 30%, 28% 70%, 32% 30%, 36% 70%, 40% 30%, 44% 70%, 48% 30%, 52% 70%, 56% 30%, 60% 70%, 64% 30%, 68% 70%, 72% 30%, 76% 70%, 80% 30%, 84% 70%, 88% 30%, 92% 70%, 96% 30%, 100% 60%, 100% 100%, 0 100%)',
  }}/>);
}

// --- polaroid card ---
function Polaroid({seed, caption, w=200, h=220, rot=-3, tapeRot=-6, tapeColor, style, children}){
  return (
    <div style={{
      position:'relative', width:w, padding:'10px 10px 38px',
      background:SCRAP.paperLight, transform:`rotate(${rot}deg)`,
      boxShadow:'0 6px 18px rgba(60,40,20,.18), 0 1px 2px rgba(60,40,20,.1)',
      ...style,
    }}>
      <Tape rot={tapeRot} color={tapeColor}/>
      <Photo seed={seed} style={{ width:'100%', height:h }}/>
      {caption && (<div style={{
        marginTop:8, font:'500 17px "Caveat",cursive', color:SCRAP.ink, textAlign:'center',
        lineHeight:1.1
      }}>{caption}</div>)}
      {children}
    </div>
  );
}

// --- doodle arrow ---
function DoodleArrow({w=120, h=60, style, color=SCRAP.ink}){
  return (
    <svg width={w} height={h} viewBox="0 0 120 60" style={style} fill="none">
      <path d="M5 40 C 30 5, 80 5, 110 25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
      <path d="M101 18 L110 25 L103 33" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// --- doodle heart / star scribbles ---
function Doodle({type='heart', size=20, color=SCRAP.red, style}){
  const paths={
    heart:'M12 21s-7-4.5-9.5-9C.5 8 3 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 3.5 0 6 4 4 8-2.5 4.5-9.5 9-9.5 9z',
    star:'M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.8 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z',
    flower:'M12 4c1 0 2 1 2 3s-1 3-2 3-2-1-2-3 1-3 2-3zM4 12c0-1 1-2 3-2s3 1 3 2-1 2-3 2-3-1-3-2zM20 12c0 1-1 2-3 2s-3-1-3-2 1-2 3-2 3 1 3 2zM12 14c1 0 2 1 2 3s-1 3-2 3-2-1-2-3 1-3 2-3zM12 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z',
    sparkle:'M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z',
  };
  return (<svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d={paths[type]} fill={color}/>
  </svg>);
}

// --- confetti renderer ---
function Confetti({active, count=140, onDone}){
  const [pieces] = React.useState(()=>{
    const cols=['#c54a3a','#e3b34a','#5d7a4f','#4a6a8a','#fdfbf3','#3a2a1a','#dcb9c9'];
    return Array.from({length:count},(_,i)=>({
      id:i,
      x:Math.random()*100,
      delay:Math.random()*1.5,
      dur:2.5+Math.random()*2.5,
      size:6+Math.random()*8,
      color:cols[i%cols.length],
      rot:Math.random()*360,
      shape:i%4,
    }));
  });
  React.useEffect(()=>{
    if(!active||!onDone) return;
    const t=setTimeout(onDone, 6000);
    return ()=>clearTimeout(t);
  },[active]);
  if(!active) return null;
  return (
    <div aria-hidden="true" style={{
      position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden', zIndex:90,
    }}>
      {pieces.map(p=>(
        <span key={p.id} style={{
          position:'absolute', top:0, left:`${p.x}%`,
          width:p.size, height: p.shape===1 ? p.size*0.4 : p.size,
          background:p.color,
          borderRadius: p.shape===2 ? '50%' : p.shape===3 ? 0 : 2,
          transform:`rotate(${p.rot}deg)`,
          animation:`drop ${p.dur}s linear ${p.delay}s forwards`,
          boxShadow:'0 1px 2px rgba(0,0,0,.1)',
        }}/>
      ))}
    </div>
  );
}

// --- IntersectionObserver hook to fade-in sections ---
function useFadeIn(){
  React.useEffect(()=>{
    const els=document.querySelectorAll('.fadein');
    const io=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
    },{threshold:.12});
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);
}

// --- modal for hidden surprise ---
function HiddenModal({open, onClose}){
  if(!open) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, background:'rgba(20,12,4,.6)', zIndex:100,
      display:'grid', placeItems:'center', padding:20,
      animation:'fadeMask .25s ease',
    }}>
      <style>{`@keyframes fadeMask{from{opacity:0}to{opacity:1}}@keyframes pop{from{transform:rotate(-2deg) scale(.85);opacity:0}to{transform:rotate(-2deg) scale(1);opacity:1}}`}</style>
      <div onClick={e=>e.stopPropagation()} style={{
        position:'relative', maxWidth:440, width:'100%',
        background:SCRAP.paperLight, padding:'20px 20px 28px',
        boxShadow:'0 30px 80px rgba(0,0,0,.4), 0 4px 12px rgba(0,0,0,.2)',
        transform:'rotate(-2deg)', animation:'pop .3s cubic-bezier(.2,1.5,.4,1)',
      }}>
        <Tape left="50%" top="-10px" w={90} rot={-3} color="rgba(197,74,58,.45)"/>
        <Photo seed="secret-photo" caption="EVIDENCIA" style={{width:'100%', height:240}}>
          {/* censored bar to add humor */}
          <div style={{
            position:'absolute', left:'15%', right:'15%', top:'42%', height:30,
            background:'#1a1a1a', transform:'rotate(-3deg)',
            display:'grid', placeItems:'center',
            font:'700 11px Inter', letterSpacing:'.3em', color:'#fff'
          }}>CENSURADO</div>
        </Photo>
        <div style={{
          marginTop:14, font:'500 26px "Caveat"', color:SCRAP.red,
          textAlign:'center', lineHeight:1.1, transform:'rotate(1deg)',
        }}>te dije que no pulsaras 😏</div>
        <p style={{
          margin:'10px 6px 0', font:'400 14px/1.5 "Fraunces"', color:SCRAP.inkSoft,
          textAlign:'center',
        }}>
          Esta foto la guardo desde 2019. La agencia de inteligencia me ofreció
          mucho dinero por ella. <em>Felicidades, hermana.</em>
        </p>
        <button onClick={onClose} style={{
          marginTop:16, display:'block', marginInline:'auto',
          background:SCRAP.ink, color:SCRAP.paperLight, border:0, padding:'10px 20px',
          font:'500 14px "Caveat"', letterSpacing:'.04em', cursor:'pointer',
          borderRadius:2, boxShadow:'2px 2px 0 '+SCRAP.red,
        }}>vale, vale, ya cierro</button>
      </div>
    </div>
  );
}

Object.assign(window, { SCRAP, Photo, Tape, Polaroid, DoodleArrow, Doodle, Confetti, useFadeIn, HiddenModal, hashStr });
