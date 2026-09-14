const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

// Make reveal animations fail-safe: content is ALWAYS readable even if JS/observer is unavailable.
document.documentElement.classList.add('js');
$$('.reveal').forEach(el=>el.classList.add('reveal-ready'));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08,rootMargin:'0px 0px -5% 0px'});
$$('.reveal').forEach(el=>observer.observe(el));
setTimeout(()=>$$('.reveal').forEach(el=>el.classList.add('visible')),1800);

// Cursor glow on desktop; touch users get card/ripple interactions instead.
const cursor=$('.cursor-glow');
window.addEventListener('pointermove',e=>{if(cursor){cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'}});

// Ambient particles.
const particleBox=$('#particles');
if(particleBox){for(let i=0;i<55;i++){const p=document.createElement('span');p.className='particle';p.style.left=Math.random()*100+'%';p.style.top=Math.random()*100+'%';p.style.animationDelay=(-Math.random()*8)+'s';p.style.animationDuration=(6+Math.random()*8)+'s';particleBox.appendChild(p)}}

// Certificate cinematic popup.
const modal=$('#certModal'), modalImg=$('#modalImg'), modalTitle=$('#modalTitle');
$$('.cert-card').forEach(card=>card.addEventListener('click',()=>{modalImg.src=card.dataset.img;modalTitle.textContent=card.dataset.title;modal.classList.add('open');document.body.classList.add('modal-open')}));
function closeModal(){modal.classList.remove('open');document.body.classList.remove('modal-open');setTimeout(()=>{if(!modal.classList.contains('open'))modalImg.src=''},300)}
$('.modal-close')?.addEventListener('click',closeModal);modal?.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Touch/click feedback: ripple on buttons/cards and subtle tilt on pointer devices.
$$('.button,.cert-card,.contribution,.skill-card,.floating-card').forEach(el=>{
  el.addEventListener('pointerdown',e=>{
    const r=document.createElement('span');r.className='ripple';const rect=el.getBoundingClientRect();const size=Math.max(rect.width,rect.height)*.25;r.style.width=r.style.height=size+'px';r.style.left=e.clientX-rect.left-size/2+'px';r.style.top=e.clientY-rect.top-size/2+'px';el.appendChild(r);setTimeout(()=>r.remove(),700);
  });
  el.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const rect=el.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5;const y=(e.clientY-rect.top)/rect.height-.5;if(el.classList.contains('cert-card')||el.classList.contains('floating-card'))el.style.transform=`perspective(700px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-5px)`});
  el.addEventListener('pointerleave',()=>{if(el.classList.contains('cert-card')||el.classList.contains('floating-card'))el.style.transform=''});
});

// Back to top.
const top=$('.back-top');window.addEventListener('scroll',()=>top?.classList.toggle('show',scrollY>800));top?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Active navigation.
const sections=$$('section[id]'), links=$$('.nav nav a');
const navObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(a=>a.classList.remove('active'));const a=$(`.nav nav a[href="#${e.target.id}"]`);if(a)a.classList.add('active')}}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>navObs.observe(s));

// Intro can be skipped immediately with any key/tap and never blocks navigation.
const intro=$('#introPop');
function skipIntro(){if(!intro)return;intro.style.animation='introOut .5s cubic-bezier(.76,0,.24,1) forwards';setTimeout(()=>intro.remove(),520)}
intro?.addEventListener('pointerdown',skipIntro,{once:true});document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape'||e.key===' '){skipIntro()}},{once:false});
