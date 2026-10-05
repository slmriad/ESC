(()=>{
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const slug=document.body.dataset.demo;
const config=window.DEMO_CONFIG;
let reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
const tierInfo={
 basic:{name:"BASIC",summary:"A clean, focused website that gets the essentials right without unnecessary complexity.",pills:["Responsive design","Core pages","Contact / CTA","Basic SEO"]},
 business:{name:"BUSINESS",summary:"A complete brand experience with richer storytelling, more sections and polished motion designed to convert.",pills:["Everything in Basic","Advanced sections","Scroll animation","Lead-focused UX","Enhanced SEO"]},
 premium:{name:"PREMIUM",summary:"The flagship build: cinematic motion, editorial layouts, deeper storytelling and high-end interactive detail.",pills:["Everything in Business","Cinematic motion","Custom interactions","Premium art direction","Advanced storytelling"]}
};
let tier=new URLSearchParams(location.search).get("tier")||"business";
if(!tierInfo[tier]) tier="business";
function applyTier(next,push=true){
 tier=next; document.body.dataset.tier=tier;
 $$(".tier-dock button").forEach(b=>b.classList.toggle("active",b.dataset.tier===tier));
 $("#tierName").textContent=tierInfo[tier].name+" WEBSITE";
 $("#tierSummary").textContent=tierInfo[tier].summary;
 $("#tierPills").innerHTML=tierInfo[tier].pills.map(x=>`<span>${x}</span>`).join("");
 $("#tierEyebrow").textContent=`${config.brand} / ${tierInfo[tier].name} CONCEPT`;
 if(push){const u=new URL(location.href);u.searchParams.set("tier",tier);history.replaceState({},'',u)}
 animateTier();
}
function animateTier(){
 if(!window.gsap||reducedMotion)return;
 gsap.fromTo(".tier-intro-inner",{y:10,opacity:.4},{y:0,opacity:1,duration:.45,ease:"power3.out"});
 gsap.fromTo(".hero h1",{y:18,opacity:.55},{y:0,opacity:1,duration:.55,ease:"power3.out"});
}
$$ (".tier-dock button").forEach(b=>b.addEventListener("click",()=>{applyTier(b.dataset.tier);syncCanvas()}));
applyTier(tier,false);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(e=>io.observe(e));
let scrollFrame=0;
addEventListener("scroll",()=>{
 if(scrollFrame)return;
 scrollFrame=requestAnimationFrame(()=>{
  scrollFrame=0;
  const d=document.documentElement,p=$(".progress"),nav=$("nav");
  if(p)p.style.transform=`scaleX(${Math.max(0,Math.min(1,scrollY/Math.max(1,d.scrollHeight-innerHeight)))})`;
  nav?.classList.toggle("scrolled",scrollY>25);
 });
},{passive:true});
let pointerFrame=0,pointerEvent=null;
addEventListener("pointermove",e=>{
 if(e.pointerType==="touch")return;
 pointerEvent=e;
 if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{
  pointerFrame=0;
  document.documentElement.style.setProperty("--mx",pointerEvent.clientX+"px");
  document.documentElement.style.setProperty("--my",pointerEvent.clientY+"px");
 });
},{passive:true});
$$ (".card").forEach(c=>{
 let frame=0,pointer=null;
 c.addEventListener("pointermove",e=>{
  pointer=e;
  if(frame)return;
  frame=requestAnimationFrame(()=>{
   frame=0;
   const r=c.getBoundingClientRect();
   c.style.setProperty("--cx",pointer.clientX-r.left+"px");
   c.style.setProperty("--cy",pointer.clientY-r.top+"px");
  });
 },{passive:true});
});
if(window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches){
 gsap.registerPlugin(ScrollTrigger);
 gsap.to(".hero-media",{yPercent:12,scale:1.12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.to(".hero-grid",{y:90,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.from(".hero h1",{y:70,opacity:0,filter:"blur(10px)",duration:1.15,ease:"power4.out",delay:.15});
 gsap.from(".hero p,.hero .actions,.hero .stats",{y:28,opacity:0,duration:.8,stagger:.08,ease:"power3.out",delay:.45});
 gsap.to(".mini-ui",{rotateY:5,rotateX:-2,y:-24,ease:"none",scrollTrigger:{trigger:".showcase-shell",start:"top bottom",end:"bottom top",scrub:1}});
 gsap.to(".image",{backgroundPosition:"50% 62%",ease:"none",scrollTrigger:{trigger:".image",start:"top bottom",end:"bottom top",scrub:1}});
}
const canvas=$("#ambient"),ctx=canvas.getContext("2d");
const mobile=matchMedia("(max-width: 820px), (pointer: coarse)");
let W=0,H=0,dpr=1,pts=[],raf=0,lastDraw=0,visible=!document.hidden;
function resize(){
 dpr=Math.min(devicePixelRatio||1,mobile.matches?1:1.35);
 W=Math.floor(innerWidth*dpr);H=Math.floor(innerHeight*dpr);
 if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H}
 pts=Array.from({length:mobile.matches?8:14},()=>({x:Math.random()*W,y:Math.random()*H,r:(90+Math.random()*220)*dpr,s:.08+Math.random()*.18,p:Math.random()*6.28}));
 if(tier!=="basic"&&!reducedMotion&&visible&&!raf)raf=requestAnimationFrame(draw);
}
function draw(now){
 raf=0;
 if(!visible||reducedMotion||tier==="basic")return;
 if(now-lastDraw<1000/30){raf=requestAnimationFrame(draw);return}
 const delta=lastDraw?Math.min(now-lastDraw,50):1000/30;
 lastDraw=now;
 ctx.clearRect(0,0,W,H);
 const step=delta/(1000/60),a=tier==="premium"?.055:.03;
 pts.forEach((p,i)=>{
  p.p+=p.s*.004*step;p.x+=Math.sin(p.p+i)*.12*dpr*step;p.y+=Math.cos(p.p*.8+i)*.08*dpr*step;
  const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
  g.addColorStop(0,`rgba(255,255,255,${a})`);g.addColorStop(1,"rgba(255,255,255,0)");
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
 });
 raf=requestAnimationFrame(draw);
}
function syncCanvas(){
 if(!visible||reducedMotion||tier==="basic"){
  cancelAnimationFrame(raf);raf=0;lastDraw=0;
  if(tier==="basic")ctx.clearRect(0,0,W,H);
 }else if(!raf)raf=requestAnimationFrame(draw);
}
addEventListener("resize",resize,{passive:true});
mobile.addEventListener?.("change",resize);
document.addEventListener("visibilitychange",()=>{
 visible=!document.hidden;
 document.documentElement.classList.toggle("page-hidden",!visible);
 syncCanvas();
});
resize();
const motionTargets=$$(".hero-grid,.premium-strip-track");
if("IntersectionObserver"in window){
 const motionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("motion-paused",!entry.isIntersecting)));
 motionTargets.forEach(element=>motionObserver.observe(element));
}
const motionPreference=matchMedia("(prefers-reduced-motion: reduce)");
motionPreference.addEventListener?.("change",event=>{
 reducedMotion=event.matches;
 syncCanvas();
});
})();