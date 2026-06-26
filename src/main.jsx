// Raíz de la aplicación — monta el árbol React y gestiona estado global

function App(){
  const [unlocked,     setUnlocked]     = React.useState(false);
  const [checking,     setChecking]     = React.useState(true);
  const [letterOpened, setLetterOpened] = React.useState(false);
  const [confettiOn,   setConfettiOn]   = React.useState(false);

  React.useEffect(() => {
    checkSession().then(ok => {
      setUnlocked(ok);
      setChecking(false);
    });
  }, []);

  useFadeIn(unlocked);

  if(checking)  return null;
  if(!unlocked) return <Login onUnlock={() => setUnlocked(true)}/>;

  const handleStart = () => {
    document.getElementById('recuerdos')?.scrollIntoView({ behavior:'smooth', block:'start' });
  };
  const handleOpenLetter = () => {
    setLetterOpened(true);
    setConfettiOn(true);
  };

  return (
    <>
      <Hero    onStart={handleStart}/>
      <Memories/>
      <Traits/>
      <VideoSection/>
      <Carta   opened={letterOpened} onOpen={handleOpenLetter}/>
      <Footer/>
      <Confetti active={confettiOn} onDone={() => setConfettiOn(false)}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
