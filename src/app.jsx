// scrap-app.jsx — orchestrates page state, mounts the React tree

function App(){
  const [letterOpened, setLetterOpened] = React.useState(false);
  const [confettiOn, setConfettiOn] = React.useState(false);

  useFadeIn();

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
