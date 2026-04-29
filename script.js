/* ===== PARTICLES ===== */
const canvas=document.getElementById('particleCanvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
class Particle{
  constructor(){this.reset();}
  reset(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.vx=(Math.random()-.5)*.4;
    this.vy=(Math.random()-.5)*.4;
    this.r=Math.random()*1.5+.5;
    this.alpha=Math.random()*.5+.1;
    this.color=Math.random()>.5?'124,58,237':'14,165,233';
  }
  update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height)this.reset();}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.alpha})`;ctx.fill();}
}
for(let i=0;i<120;i++)particles.push(new Particle());
function connectParticles(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ctx.beginPath();ctx.strokeStyle=`rgba(124,58,237,${.12*(1-d/100)})`;ctx.lineWidth=.5;ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();}
    }
  }
}
function animParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw();});connectParticles();requestAnimationFrame(animParticles);}
animParticles();

/* ===== CURSOR ===== */
const cur=document.getElementById('cursor'),fol=document.getElementById('cursorFollower');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function followCursor(){fx+=(mx-fx)*.12;fy+=(my-fy)*.12;fol.style.left=fx+'px';fol.style.top=fy+'px';requestAnimationFrame(followCursor);})();
document.querySelectorAll('a,button,.service-card,.review-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2)';fol.style.transform='translate(-50%,-50%) scale(1.5)';});
  el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';fol.style.transform='translate(-50%,-50%) scale(1)';});
});

/* ===== NAVBAR SCROLL ===== */
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60);});

/* ===== HAMBURGER ===== */
const ham=document.getElementById('hamburger'),links=document.getElementById('navLinks');
ham.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.nav-link').forEach(l=>l.addEventListener('click',()=>links.classList.remove('open')));

/* ===== TYPED TEXT ===== */
const words=['Web Developer','Full-Stack Dev','Problem Solver','Digital Marketer','Data Analyst'];
let wi=0,ci=0,del=false;
const typed=document.getElementById('typed');
function type(){
  const word=words[wi];
  typed.textContent=del?word.slice(0,ci--)  :word.slice(0,ci++);
  if(!del&&ci>word.length){setTimeout(()=>{del=true;},1400);return setTimeout(type,100);}
  if(del&&ci<0){del=false;wi=(wi+1)%words.length;return setTimeout(type,400);}
  setTimeout(type,del?60:100);
}
type();

/* ===== REVEAL ON SCROLL ===== */
const revEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');}});
},{threshold:.15});
revEls.forEach(el=>observer.observe(el));

/* ===== SKILL BARS ===== */
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.skill-fill').forEach(b=>b.classList.add('animate'));}});
},{threshold:.3});
const skillsSection=document.getElementById('skills');
if(skillsSection)skillObs.observe(skillsSection);

/* ===== STAT COUNTERS ===== */
const counters=document.querySelectorAll('.stat-num[data-count]');
const cObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el=e.target,target=parseFloat(el.dataset.count),isFloat=target%1!==0;
      let cur=0;const step=target/60;
      const t=setInterval(()=>{cur+=step;if(cur>=target){el.textContent=isFloat?target.toFixed(1):target;clearInterval(t);}else{el.textContent=isFloat?cur.toFixed(1):Math.floor(cur);}},20);
      cObs.unobserve(el);
    }
  });
},{threshold:.5});
counters.forEach(c=>cObs.observe(c));

/* ===== FORM ===== */
function handleSubmit(e){
  e.preventDefault();
  const btn=document.getElementById('submitBtn');
  btn.textContent='Sending...';btn.disabled=true;
  setTimeout(()=>{
    document.getElementById('formSuccess').style.display='block';
    btn.textContent='Send Message 🚀';btn.disabled=false;
    e.target.reset();
    setTimeout(()=>{document.getElementById('formSuccess').style.display='none';},5000);
  },1200);
}

/* ===== SMOOTH NAV ===== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});
