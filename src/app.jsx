// scrap-app.jsx — orchestrates page state, mounts the React tree

function App(){
  const [secretOpen, setSecretOpen] = React.useState(false);
  const [letterOpened, setLetterOpened] = React.useState(false);
  const [confettiOn, setConfettiOn] = React.useState(false);

  useFadeIn();

  const handleStart = () => {
    document.getElementById('recuerdos')?.scrollIntoView({behavior:'smooth', block:'start'});
  };
  const handleSecret = () => setSecretOpen(true);
  const handleOpenLetter = () => {
    setLetterOpened(true);
    setConfettiOn(true);
    // confetti runs ~6s and auto-clears
  };

  return (
    <>
      <Hero onStart={handleStart} onSecret={handleSecret}/>
      <Memories/>
      <Traits/>
      <Carta opened={letterOpened} onOpen={handleOpenLetter}/>
      <Footer/>

      {/* floating "no pulses esto" pill — sticks around after hero scrolls */}
      <button onClick={handleSecret} aria-label="no pulses esto" style={{
        position:'fixed', bottom:20, right:20, zIndex:50,
        padding:'10px 14px', border:`1.5px dashed ${SCRAP.red}`, borderRadius:20,
        font:'500 13px "Caveat"', color:SCRAP.red,
        background:'rgba(253,251,243,.92)', cursor:'pointer',
        transform:'rotate(-2deg)',
        boxShadow:'0 6px 18px rgba(60,40,20,.15)',
        backdropFilter:'blur(4px)',
      }}>
        ⚠ no pulses esto
      </button>

      <HiddenModal open={secretOpen} onClose={()=>setSecretOpen(false)}/>
      <Confetti active={confettiOn} onDone={()=>setConfettiOn(false)}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
