// Controles de cor e faróis
const colors = document.querySelectorAll('.color');
const carBody = document.getElementById('car-body');
const headlights = document.querySelectorAll('.headlight');
const toggleHeadlights = document.getElementById('toggle-headlights');
const revBtn = document.getElementById('rev');
const carWrap = document.querySelector('.car-wrap');

colors.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const color = btn.dataset.color;
    carBody.setAttribute('fill', color);
  });
});

let lightsOn = false;
toggleHeadlights.addEventListener('click', ()=>{
  lightsOn = !lightsOn;
  headlights.forEach(h=>{
    if(lightsOn) h.classList.add('on'); else h.classList.remove('on');
  });
});

// Sínteise simples para "rev" do motor
revBtn.addEventListener('click', ()=>{
  // Animação visual
  carWrap.classList.add('rev');
  setTimeout(()=>carWrap.classList.remove('rev'),400);

  // WebAudio para pequeno 'rev'
  try{
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(120, ctx.currentTime);
    o.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    o.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.25);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.start(); o.stop(ctx.currentTime + 0.45);
  }catch(e){console.warn('Audio não suportado',e)}
});

// pequenas interações: clicar no SVG central foca na cor 1
const svg = document.getElementById('car-svg');
svg.addEventListener('dblclick', ()=>{
  const first = document.querySelector('.color');
  if(first) first.click();
});
