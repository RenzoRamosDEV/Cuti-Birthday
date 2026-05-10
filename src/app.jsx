// scrap-app.jsx — orchestrates page state, mounts the React tree

const SESSION_KEY = 'jpp_token';

function simpleHash(str){
  let h = 5381;
  for(let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return (h >>> 0).toString(36);
}

function checkSession(){
  const stored = sessionStorage.getItem(SESSION_KEY);
  if(!stored) return false;
  return stored === simpleHash(window.APP_PASSWORD || '');
}

function Login({ onUnlock }){
  const [val, setVal] = React.useState('');
  const [err, setErr] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if(val === (window.APP_PASSWORD || '')){
      sessionStorage.setItem(SESSION_KEY, simpleHash(val));
      onUnlock();
    } else {
      setErr(true);
      setVal('');
      setTimeout(() => setErr(false), 1200);
    }
  };

  return (
    <div style={{
      minHeight:'100vh', display:'grid', placeItems:'center',
      background:SCRAP.paper, fontFamily:'"Caveat", cursive',
    }}>
      <div style={{
        textAlign:'center', padding:'48px 32px',
        background:SCRAP.paperLight,
        boxShadow:'0 8px 32px rgba(60,40,20,.12)',
        transform:'rotate(-1deg)', maxWidth:340, width:'100%',
        position:'relative',
      }}>
        <Tape left="50%" top="-10px" w={80} rot={-3} color="rgba(197,74,58,.45)"/>
        <div style={{font:'500 13px "Caveat"', letterSpacing:'.3em', textTransform:'uppercase', color:SCRAP.red, marginBottom:8}}>
          acceso privado
        </div>
        <h1 style={{margin:'0 0 6px', font:'italic 300 36px "Fraunces"', color:SCRAP.ink}}>
          para Joselyn
        </h1>
        <p style={{margin:'0 0 24px', font:'400 15px "Fraunces"', color:SCRAP.inkSoft}}>
          la clave es la que te pase con esta paginita :)
        </p>
        <form onSubmit={submit}>
          <input
            type="password"
            value={val}
            onChange={e=>setVal(e.target.value)}
            placeholder="••••••••"
            autoFocus
            style={{
              width:'100%', boxSizing:'border-box',
              padding:'12px 14px', border:`1.5px solid ${err ? SCRAP.red : SCRAP.inkSoft+'66'}`,
              borderRadius:2, font:'500 18px "Caveat"', color:SCRAP.ink,
              background: err ? '#fff0ee' : SCRAP.paperLight,
              outline:'none', textAlign:'center',
              transition:'border-color .2s, background .2s',
            }}
          />
          {err && (
            <div style={{marginTop:8, font:'400 14px "Caveat"', color:SCRAP.red}}>
              clave incorrecta, inténtalo de nuevo
            </div>
          )}
          <button type="submit" style={{
            marginTop:16, width:'100%', background:SCRAP.ink, color:SCRAP.paper,
            border:0, padding:'13px', font:'500 16px "Caveat"', letterSpacing:'.06em',
            cursor:'pointer', borderRadius:2,
            boxShadow:`2px 2px 0 ${SCRAP.red}`,
          }}>
            entrar →
          </button>
        </form>
      </div>
    </div>
  );
}

function App(){
  const [unlocked, setUnlocked] = React.useState(false);
  const [checking, setChecking] = React.useState(true);
  const [letterOpened, setLetterOpened] = React.useState(false);
  const [confettiOn, setConfettiOn] = React.useState(false);

  React.useEffect(()=>{
    setUnlocked(checkSession());
    setChecking(false);
  },[]);

  useFadeIn();

  if(checking) return null;
  if(!unlocked) return <Login onUnlock={()=>setUnlocked(true)}/>;

  const handleStart = () => {
    document.getElementById('recuerdos')?.scrollIntoView({behavior:'smooth', block:'start'});
  };
  const handleOpenLetter = () => {
    setLetterOpened(true);
    setConfettiOn(true);
  };

  return (
    <>
      <Hero onStart={handleStart}/>
      <Memories/>
      <Traits/>
      <Carta opened={letterOpened} onOpen={handleOpenLetter}/>
      <Footer/>
      <Confetti active={confettiOn} onDone={()=>setConfettiOn(false)}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
