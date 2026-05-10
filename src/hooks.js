// Hooks reutilizables

// Aplica fade-in con IntersectionObserver a todos los elementos con clase .fadein
function useFadeIn(){
  React.useEffect(()=>{
    const connect = () => {
      const els = document.querySelectorAll('.fadein');
      const io  = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
      }, { threshold: .12 });
      els.forEach(el => io.observe(el));
      return io;
    };
    const io = connect();
    // re-observa tras un tick para capturar elementos renderizados después del login
    const t = setTimeout(() => { io.disconnect(); connect(); }, 100);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);
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
