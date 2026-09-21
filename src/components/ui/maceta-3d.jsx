// Maceta de flores amarillas en 3D — escena Three.js montada dentro de un contenedor

// Construye la escena dentro de `host`. Devuelve la función de limpieza, o null
// si el navegador no puede crear un contexto WebGL.
function crearMaceta3D(host, { quieto = false } = {}){
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3e9d2);   // el papel crema del sitio
  scene.fog        = new THREE.Fog(0xf3e9d2, 18, 40);

  const ancho = () => host.clientWidth  || 1;
  const alto  = () => host.clientHeight || 1;

  const camera = new THREE.PerspectiveCamera(38, ancho()/alto(), 0.1, 100);


  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias:true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(ancho(), alto());
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
  renderer.outputEncoding    = THREE.sRGBEncoding;
  renderer.toneMapping       = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.domElement.style.touchAction = 'none';  // para poder arrastrar en móvil
  renderer.domElement.style.display     = 'block';
  host.appendChild(renderer.domElement);

  // ---------- luces ----------
  scene.add(new THREE.HemisphereLight(0xfff7e3, 0x9a8a6a, 0.55));
  const sun = new THREE.DirectionalLight(0xfff0c9, 1.25);
  sun.position.set(6, 11, 7);
  sun.castShadow = true;
  const sombra = innerWidth < 700 ? 1024 : 2048;   // los móviles no necesitan más
  sun.shadow.mapSize.set(sombra, sombra);
  Object.assign(sun.shadow.camera, { left:-8, right:8, top:12, bottom:-5, near:1, far:40 });
  sun.shadow.camera.updateProjectionMatrix();      // si no, los valores de arriba no se aplican
  sun.shadow.bias = -0.0005;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xdfe9ff, 0.4);
  fill.position.set(-7, 4, -5);
  scene.add(fill);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(40, 64),
    new THREE.MeshStandardMaterial({ color:0xe9dcb8, roughness:1 })
  );
  ground.rotation.x = -Math.PI/2;
  ground.position.y = -3.25;
  ground.receiveShadow = true;
  scene.add(ground);

  // ---------- materiales ----------
  const M = (c, r = 0.7, extra = {}) =>
    new THREE.MeshStandardMaterial({ color:c, roughness:r, metalness:0, side:THREE.DoubleSide, ...extra });

  const yellow  = M(0xffb300, 0.6);
  const gold    = M(0xf28c00, 0.6);
  const pale    = M(0xffd02e, 0.6);
  const lemon   = M(0xffe23a, 0.6);
  const brown   = M(0x4a2c12, 0.95);
  const darkbr  = M(0x2a170a, 0.95);
  const amber   = M(0xd98a12, 0.8);
  const stemMat = M(0x4c7d2f, 0.85);
  const leafA   = M(0x5f9d3a, 0.8);
  const leafB   = M(0x3e7a2a, 0.8);

  const bouquet = new THREE.Group();
  scene.add(bouquet);

  const shadowed = m => { m.castShadow = true; m.receiveShadow = true; return m; };

  // pétalo que apunta hacia +x, con la base en el origen
  function petalGeo(len, wid, thick){
    const g = new THREE.SphereGeometry(1, 14, 10);
    g.scale(len, thick, wid);
    g.translate(len * 0.92, 0, 0);
    return g;
  }

  // coloca n copias en anillo; make(i) devuelve el mesh ya orientado hacia +x
  function ring(parent, n, r, y, offset, make){
    for(let i = 0; i < n; i++){
      const a = i/n * Math.PI*2 + offset;
      const h = new THREE.Group();
      h.rotation.y = -a;
      const m = make(i);
      m.position.set(r, y, 0);
      h.add(m);
      parent.add(h);
    }
  }

  // ---------- tipos de flor (todas miran hacia +y) ----------
  function sunflower(){
    const g = new THREE.Group();
    const disk = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.62, 28, 18), brown));
    disk.scale.set(1, 0.32, 1);
    g.add(disk);
    const inner = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 14), darkbr));
    inner.scale.set(1, 0.42, 1);
    inner.position.y = 0.03;
    g.add(inner);

    const seedGeo = new THREE.SphereGeometry(0.03, 6, 5);
    for(let i = 0; i < 110; i++){
      const rr = 0.06 + Math.sqrt(i/110) * 0.5, a = i * 2.39996;
      const s = new THREE.Mesh(seedGeo, i % 2 ? amber : darkbr);
      s.position.set(Math.cos(a)*rr, 0.19 - rr*rr*0.22, Math.sin(a)*rr);
      g.add(s);
    }

    const pg = petalGeo(0.8, 0.15, 0.05);
    ring(g, 24, 0.55,  0.02, 0,           () => { const p = shadowed(new THREE.Mesh(pg, yellow)); p.rotation.z =  0.12; return p; });
    ring(g, 24, 0.5,  -0.04, Math.PI/24,  () => { const p = shadowed(new THREE.Mesh(pg, gold));   p.rotation.z = -0.05; return p; });
    return g;
  }

  function rose(){
    const g = new THREE.Group();
    const bud = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), gold));
    bud.scale.set(1, 1.3, 1);
    bud.position.y = 0.15;
    g.add(bud);

    const layers = [
      { n:5,  r:0.24, len:0.44, y: 0.10, m:gold  },
      { n:7,  r:0.34, len:0.40, y: 0.02, m:yellow},
      { n:9,  r:0.44, len:0.34, y:-0.06, m:yellow},
      { n:11, r:0.54, len:0.28, y:-0.14, m:pale  },
    ];
    layers.forEach((L, li) => {
      const shell = new THREE.SphereGeometry(1, 16, 12, 0, Math.PI*0.75, Math.PI*0.18, Math.PI*0.5);
      for(let i = 0; i < L.n; i++){
        const p = shadowed(new THREE.Mesh(shell, L.m));
        p.scale.set(L.r, L.len, L.r);
        p.position.y = L.y;
        p.rotation.y = i/L.n * Math.PI*2 + li*0.45;
        p.rotation.z = li * 0.16;
        g.add(p);
      }
    });
    return g;
  }

  function tulip(){
    const g  = new THREE.Group();
    const pg = new THREE.SphereGeometry(1, 14, 12);
    pg.scale(0.19, 0.48, 0.11);
    pg.translate(0, 0.42, 0);
    ring(g, 3, 0.12,  0,    0,         () => { const p = shadowed(new THREE.Mesh(pg, yellow)); p.rotation.z = -0.22; return p; });
    ring(g, 3, 0.2,  -0.02, Math.PI/3, () => { const p = shadowed(new THREE.Mesh(pg, lemon));  p.rotation.z = -0.42; return p; });
    return g;
  }

  function daisy(){
    const g = new THREE.Group();
    const c = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.22, 20, 14), amber));
    c.scale.set(1, 0.5, 1);
    g.add(c);
    const pg = petalGeo(0.55, 0.11, 0.035);
    ring(g, 18, 0.18,  0,    0,          () => { const p = shadowed(new THREE.Mesh(pg, lemon)); p.rotation.z = 0.18; return p; });
    ring(g, 18, 0.16, -0.03, Math.PI/18, () => { const p = shadowed(new THREE.Mesh(pg, pale));  p.rotation.z = 0.02; return p; });
    return g;
  }

  // "billy button": bola amarilla
  function craspedia(){
    const g = new THREE.Group();
    g.add(shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 16), gold)));
    const dot = new THREE.SphereGeometry(0.035, 6, 5);
    for(let i = 0; i < 70; i++){
      const u = Math.random()*2 - 1, ph = Math.random()*Math.PI*2, k = Math.sqrt(1 - u*u);
      const d = new THREE.Mesh(dot, yellow);
      d.position.set(k*Math.cos(ph), u, k*Math.sin(ph)).multiplyScalar(0.26);
      g.add(d);
    }
    return g;
  }

  // racimo de bolitas
  function mimosa(){
    const g = new THREE.Group();
    const dot = new THREE.SphereGeometry(0.075, 8, 6);
    for(let i = 0; i < 26; i++){
      const d = shadowed(new THREE.Mesh(dot, Math.random() < 0.5 ? lemon : yellow));
      d.position.set((Math.random()-0.5)*0.9, Math.random()*0.7, (Math.random()-0.5)*0.9);
      g.add(d);
    }
    return g;
  }

  // ---------- tallo + hojas ----------
  const leafGeo = new THREE.SphereGeometry(1, 12, 8);
  leafGeo.scale(0.55, 0.02, 0.2);
  leafGeo.translate(0.5, 0, 0);
  const up = new THREE.Vector3(0, 1, 0);

  function stem(from, to, thick = 0.045, leaves = 2){
    const dir = new THREE.Vector3().subVectors(to, from);
    const len = dir.length();
    const s = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(thick*0.8, thick, len, 10), stemMat));
    s.position.copy(from).addScaledVector(dir, 0.5);
    s.quaternion.setFromUnitVectors(up, dir.clone().normalize());
    bouquet.add(s);

    for(let i = 0; i < leaves; i++){
      const l = shadowed(new THREE.Mesh(leafGeo, Math.random() < 0.5 ? leafA : leafB));
      l.position.copy(from).addScaledVector(dir, 0.55 + Math.random()*0.35);
      l.rotation.set(Math.random()*0.6 - 0.3, Math.random()*Math.PI*2, 0.35 + Math.random()*0.5);
      bouquet.add(l);
    }
  }

  // ---------- composición del ramo ----------
  const BASE = new THREE.Vector3(0, -1.0, 0);

  function place(make, pos, thick, leaves){
    const head = make();
    head.position.copy(pos);
    // cada flor mira hacia fuera, desde el corazón del ramo
    const look = new THREE.Vector3().subVectors(pos, new THREE.Vector3(0, -2.2, 0)).normalize();
    head.quaternion.setFromUnitVectors(up, look);
    head.rotation.y += Math.random() * Math.PI*2;
    bouquet.add(head);

    const from = new THREE.Vector3(
      BASE.x + (Math.random()-0.5)*2.4, BASE.y, BASE.z + (Math.random()-0.5)*2.4
    );
    stem(from, pos.clone().addScaledVector(look, -0.12), thick, leaves);
  }

  const spots = [{ m:sunflower, p:[0, 2.9, 0], t:0.06 }];

  [0, 1.05, 2.1, 3.14, 4.2, 5.24].forEach((a, i) => {
    const r = 1.4, y = 2.35 + (i%2)*0.15;
    spots.push({ m:[rose, tulip, sunflower, rose, daisy, rose][i], p:[Math.cos(a)*r, y, Math.sin(a)*r], t:0.05 });
  });
  for(let i = 0; i < 10; i++){
    const a = i/10 * Math.PI*2 + 0.3, r = 2.3, y = 1.55 + (i%3)*0.18;
    spots.push({ m:[tulip, daisy, rose, craspedia, tulip, sunflower, daisy, rose, tulip, daisy][i], p:[Math.cos(a)*r, y, Math.sin(a)*r], t:0.045 });
  }
  for(let i = 0; i < 8; i++){
    const a = i/8 * Math.PI*2 + 0.15, r = 1.9 + (i%2)*0.9, y = 3.0 - (i%2)*1.0;
    spots.push({ m: i%2 ? mimosa : craspedia, p:[Math.cos(a)*r, y, Math.sin(a)*r], t:0.025, l:0 });
  }
  spots.forEach(s => place(s.m, new THREE.Vector3(...s.p), s.t, s.l ?? 2));

  // ---------- maceta de terracota ----------
  const terra   = M(0xb85a2b, 0.85);
  const terraDk = M(0x8f4220, 0.9);
  const soil    = M(0x3b2614, 1.0);

  const body = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.35, 2.6, 56), terra));
  body.position.y = -1.85;
  bouquet.add(body);

  const lip = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(2.05, 2.05, 0.42, 56, 1, true), terra));
  lip.position.y = -0.55;
  bouquet.add(lip);

  const lipEdge = shadowed(new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.05, 8, 64), terraDk));
  lipEdge.rotation.x = Math.PI/2;
  lipEdge.position.y = -0.34;
  bouquet.add(lipEdge);

  const inside = new THREE.Mesh(new THREE.CylinderGeometry(2.05, 1.8, 0.75, 56, 1, true), terraDk);
  inside.position.y = -0.7;
  bouquet.add(inside);

  const dirt = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(1.86, 1.86, 0.1, 56), soil));
  dirt.position.y = -1.0;
  bouquet.add(dirt);

  // grumos de tierra: dos materiales compartidos, no uno por piedrecita
  const soilA = M(0x2a1a0c, 1), soilB = M(0x5a3d22, 1);
  const dotG  = new THREE.SphereGeometry(0.06, 6, 5);
  for(let i = 0; i < 40; i++){
    const a = Math.random()*Math.PI*2, r = Math.random()*1.7;
    const d = new THREE.Mesh(dotG, Math.random() < 0.5 ? soilA : soilB);
    d.position.set(Math.cos(a)*r, -0.94, Math.sin(a)*r);
    bouquet.add(d);
  }

  const saucer = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.6, 0.22, 56), terraDk));
  saucer.position.y = -3.14;
  bouquet.add(saucer);

  // ---------- encuadre ----------
  // Se mide la caja real de la maceta en vez de estimarla: así entra entera
  // aunque se cambien las flores. En vertical no cabe a lo ancho, de modo que
  // se abre el ángulo del objetivo y se aleja la cámara.
  bouquet.updateMatrixWorld(true);
  const caja   = new THREE.Box3().setFromObject(bouquet);
  const centro = caja.getCenter(new THREE.Vector3());
  const tam    = caja.getSize(new THREE.Vector3());
  const RADIO  = Math.max(tam.x, tam.z) / 2;
  const MEDIA_ALTURA = tam.y / 2;
  const MARGEN = 1.1;

  function encuadrar(){
    const a = ancho() / alto();
    camera.fov    = a < 1 ? 52 : 38;
    camera.aspect = a;
    camera.updateProjectionMatrix();
    const media = Math.tan(camera.fov * Math.PI / 360);
    return Math.max(MEDIA_ALTURA * MARGEN / media, RADIO * MARGEN / (media * a));
  }

  // ---------- cámara e interacción ----------
  let ajuste = encuadrar();          // distancia a la que la maceta entra entera
  let zoomManual = false;            // si el usuario toca la rueda, dejamos de reencuadrar
  let rotY = 0.3, rotX = 0.28, dist = ajuste;
  let targetRotY = rotY, targetRotX = rotX, targetDist = ajuste;
  let dragging = false, lastX = 0, lastY = 0;

  const el = renderer.domElement;
  const onDown = e => { dragging = true; lastX = e.clientX; lastY = e.clientY; el.setPointerCapture?.(e.pointerId); };
  const onUp   = () => { dragging = false; };
  const onMove = e => {
    if(!dragging) return;
    targetRotY += (e.clientX - lastX) * 0.008;
    targetRotX  = Math.max(-0.2, Math.min(1.2, targetRotX + (e.clientY - lastY) * 0.005));
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const onWheel = e => {
    zoomManual = true;
    targetDist = Math.max(ajuste * 0.5, Math.min(ajuste * 2.2, targetDist + e.deltaY * 0.01));
  };

  el.addEventListener('pointerdown', onDown);
  addEventListener('pointerup',   onUp);
  addEventListener('pointermove', onMove);
  el.addEventListener('wheel', onWheel, { passive:true });

  const ro = new ResizeObserver(() => {
    renderer.setSize(ancho(), alto());
    ajuste = encuadrar();
    if(!zoomManual) targetDist = ajuste;   // al girar el móvil vuelve a caber entera
  });
  ro.observe(host);

  // ---------- animación ----------
  const clock = new THREE.Clock();
  let frame;
  function animate(){
    frame = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if(!dragging && !quieto) targetRotY += 0.0025;  // giro lento
    rotY += (targetRotY - rotY) * 0.08;
    rotX += (targetRotX - rotX) * 0.08;
    dist += (targetDist - dist) * 0.08;

    camera.position.set(
      centro.x + Math.sin(rotY) * Math.cos(rotX) * dist,
      centro.y + Math.sin(rotX) * dist,
      centro.z + Math.cos(rotY) * Math.cos(rotX) * dist
    );
    camera.lookAt(centro);

    if(!quieto){
      bouquet.rotation.z = Math.sin(t * 0.7) * 0.012;  // balanceo suave
      bouquet.rotation.x = Math.cos(t * 0.5) * 0.01;
    }
    renderer.render(scene, camera);
  }
  animate();

  return () => {
    cancelAnimationFrame(frame);
    ro.disconnect();
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('wheel', onWheel);
    removeEventListener('pointerup',   onUp);
    removeEventListener('pointermove', onMove);
    scene.traverse(o => {
      o.geometry?.dispose();
      (Array.isArray(o.material) ? o.material : o.material ? [o.material] : []).forEach(m => m.dispose());
    });
    renderer.dispose();
    el.remove();
  };
}

// Contenedor React: monta la escena al aparecer y la desmonta al salir.
// Si no hay Three.js o WebGL, cae al ramo en SVG.
function Maceta3D(){
  const host = React.useRef(null);
  const [falla, setFalla] = React.useState(typeof THREE === 'undefined');

  React.useEffect(() => {
    if(typeof THREE === 'undefined' || !host.current) return;
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let limpiar;
    try {
      limpiar = crearMaceta3D(host.current, { quieto });
    } catch {
      limpiar = null;
    }
    if(!limpiar) setFalla(true);
    return () => limpiar?.();
  }, []);

  if(falla) return (
    <div style={{ display:'grid', placeItems:'center', width:'100%', height:'100%' }}>
      <RamoSVG/>
    </div>
  );

  return <div ref={host} style={{ position:'absolute', inset:0 }}/>;
}

Object.assign(window, { Maceta3D, crearMaceta3D });
