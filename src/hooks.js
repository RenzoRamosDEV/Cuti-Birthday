// Hooks reutilizables

// Aplica fade-in con IntersectionObserver a todos los elementos con clase .fadein
function useFadeIn(dep){
  React.useEffect(()=>{
    let io;
    const connect = () => {
      if(io) io.disconnect();
      io = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
      }, { threshold: .12 });
      document.querySelectorAll('.fadein').forEach(el => io.observe(el));
    };
    // intenta varias veces para capturar elementos que React renderiza de forma asíncrona
    connect();
    const t1 = setTimeout(connect, 100);
    const t2 = setTimeout(connect, 400);
    return () => { clearTimeout(t1); clearTimeout(t2); if(io) io.disconnect(); };
  }, [dep]);
}

// Devuelve true si el viewport es menor al breakpoint dado (px)
function useIsMobile(bp = 880){
  const [mobile, setMobile] = React.useState(() => window.innerWidth <= bp);
  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const fn  = e => setMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [bp]);
  return mobile;
}

Object.assign(window, { useFadeIn, useIsMobile });
