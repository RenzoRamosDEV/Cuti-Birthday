// Hooks reutilizables

// Aplica fade-in con IntersectionObserver a todos los elementos con clase .fadein
function useFadeIn(dep){
  React.useEffect(()=>{
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: .12 });

    const observeNew = () => {
      document.querySelectorAll('.fadein:not(.observed)').forEach(el => {
        el.classList.add('observed');
        io.observe(el);
      });
    };

    // MutationObserver: captura elementos .fadein en cuanto React los añade al DOM
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });
    observeNew();

    return () => { io.disconnect(); mo.disconnect(); };
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
