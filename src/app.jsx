// scrap-app.jsx — orchestrates page state, mounts the React tree

// PBKDF2-SHA256, 200k iterations, salt: joselyn-pages-2026
// The password itself is never stored — only its derived key
const PWD_HASH   = '682ad732b21c34dbeaa36716d9ce57f401aabdef8ded75bb9cbeebbae967cb0d';
const SALT       = 'joselyn-pages-2026';
const ITERATIONS = 200000;
const SESSION_KEY = 'jpp_v2';
const LOCK_KEY    = 'jpp_lock';
const MAX_ATTEMPTS = 5;

// --- PBKDF2 via Web Crypto (available on all modern browsers + GitHub Pages HTTPS) ---
async function deriveKey(password){
  const enc = new TextEncoder();
  const keyMat = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name:'PBKDF2', salt:enc.encode(SALT), iterations:ITERATIONS, hash:'SHA-256' },
    keyMat, 256
  );
  return Array.from(new Uint8Array(bits)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

// --- Session: store derived key hash, not just a flag ---
async function checkSession(){
  const stored = sessionStorage.getItem(SESSION_KEY);
  if(!stored || stored.length !== 64) return false;
  return stored === PWD_HASH;
}

// --- Lockout logic (persists across page reloads via localStorage) ---
function getLockState(){
  try { return JSON.parse(localStorage.getItem(LOCK_KEY)) || {attempts:0, until:0}; }
  catch{ return {attempts:0, until:0}; }
}
function setLockState(s){ localStorage.setItem(LOCK_KEY, JSON.stringify(s)); }
function lockDuration(attempts){
  if(attempts >= 10) return 60 * 60 * 1000;   // 1 hora
  if(attempts >= 5)  return  5 * 60 * 1000;   // 5 minutos
  return 0;
}
function isLocked(){
  const {until} = getLockState();
  return Date.now() < until;
}
function remainingTime(){
  const {until} = getLockState();
  const ms = until - Date.now();
  if(ms <= 0) return '';
  const m = Math.floor(ms/60000), s = Math.floor((ms%60000)/1000);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function Login({ onUnlock }){
  const [val, setVal]       = React.useState('');
  const [err, setErr]       = React.useState('');
  const [busy, setBusy]     = React.useState(false);
  const [locked, setLocked] = React.useState(isLocked);
  const [timer, setTimer]   = React.useState('');

  // countdown tick
  React.useEffect(()=>{
    if(!locked) return;
    const id = setInterval(()=>{
      if(!isLocked()){ setLocked(false); clearInterval(id); }
      else setTimer(remainingTime());
    }, 1000);
    setTimer(remainingTime());
    return ()=>clearInterval(id);
  },[locked]);

  const submit = async (e) => {
    e.preventDefault();
    if(!val.trim() || busy || locked) return;

    setBusy(true);
    const start = Date.now();

    try {
      const hash = await deriveKey(val);
      // always wait at least 600ms regardless of result (anti-timing)
      await new Promise(r => setTimeout(r, Math.max(0, 600 - (Date.now() - start))));

      if(hash === PWD_HASH){
        // correct — clear lockout, save session
        setLockState({attempts:0, until:0});
        sessionStorage.setItem(SESSION_KEY, hash);
        onUnlock();
      } else {
        const state = getLockState();
        const attempts = state.attempts + 1;
        const duration = lockDuration(attempts);
        setLockState({ attempts, until: duration ? Date.now() + duration : state.until });
        const remaining = MAX_ATTEMPTS - (attempts % MAX_ATTEMPTS);
        if(isLocked()){
          setLocked(true);
          setErr('');
        } else {
          setErr(`clave incorrecta — ${remaining} intento${remaining!==1?'s':''} antes del bloqueo`);
          setVal('');
          setTimeout(()=>setErr(''), 2500);
        }
      }
    } finally {
      setBusy(false);
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
          la clave es la que te pasé con esta paginita :)
        </p>

        {locked ? (
          <div style={{padding:'20px 0'}}>
            <div style={{font:'500 18px "Caveat"', color:SCRAP.red, marginBottom:8}}>
              demasiados intentos fallidos
            </div>
            <div style={{font:'400 14px "Fraunces"', color:SCRAP.inkSoft, marginBottom:12}}>
              vuelve a intentarlo en
            </div>
            <div style={{font:'700 32px "Caveat"', color:SCRAP.ink}}>{timer}</div>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input
              type="password"
              value={val}
              onChange={e=>setVal(e.target.value)}
              placeholder="••••••••"
              autoFocus
              disabled={busy}
              style={{
                width:'100%', boxSizing:'border-box',
                padding:'12px 14px', border:`1.5px solid ${err ? SCRAP.red : SCRAP.inkSoft+'66'}`,
                borderRadius:2, font:'500 18px "Caveat"', color:SCRAP.ink,
                background: err ? '#fff0ee' : SCRAP.paperLight,
                outline:'none', textAlign:'center',
                transition:'border-color .2s, background .2s',
                opacity: busy ? .6 : 1,
              }}
            />
            {err && (
              <div style={{marginTop:8, font:'400 13px "Caveat"', color:SCRAP.red, lineHeight:1.3}}>
                {err}
              </div>
            )}
            <button type="submit" disabled={busy} style={{
              marginTop:16, width:'100%', background: busy ? SCRAP.inkSoft : SCRAP.ink,
              color:SCRAP.paper, border:0, padding:'13px',
              font:'500 16px "Caveat"', letterSpacing:'.06em',
              cursor: busy ? 'not-allowed' : 'pointer', borderRadius:2,
              boxShadow:`2px 2px 0 ${SCRAP.red}`,
              transition:'background .2s',
            }}>
              {busy ? 'verificando...' : 'entrar →'}
            </button>
          </form>
        )}
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
    checkSession().then(ok=>{
      setUnlocked(ok);
      setChecking(false);
    });
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
