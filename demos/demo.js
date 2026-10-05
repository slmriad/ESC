(()=>{
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const slug=document.body.dataset.demo;
const config=window.DEMO_CONFIG;
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
 if(!window.gsap||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
 gsap.fromTo(".tier-intro-inner",{y:10,opacity:.4},{y:0,opacity:1,duration:.45,ease:"power3.out"});
 gsap.fromTo(".hero h1",{y:18,opacity:.55},{y:0,opacity:1,duration:.55,ease:"power3.out"});
}
$$(".tier-dock button").forEach(b=>b.addEventListener("click",()=>applyTier(b.dataset.tier)));
applyTier(tier,false);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(e=>io.observe(e));
addEventListener("scroll",()=>{const d=document.documentElement;$(".progress").style.width=`${scrollY/(d.scrollHeight-innerHeight)*100}%`;$("nav").classList.toggle("scrolled",scrollY>25)},{passive:true});
addEventListener("pointermove",e=>{document.documentElement.style.setProperty("--mx",e.clientX+"px");document.documentElement.style.setProperty("--my",e.clientY+"px");});
$$(".card").forEach(c=>c.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();c.style.setProperty("--cx",e.clientX-r.left+"px");c.style.setProperty("--cy",e.clientY-r.top+"px")}));
if(window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches){
 gsap.registerPlugin(ScrollTrigger);
 gsap.to(".hero-media",{yPercent:12,scale:1.12,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.to(".hero-grid",{y:90,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
 gsap.from(".hero h1",{y:70,opacity:0,filter:"blur(10px)",duration:1.15,ease:"power4.out",delay:.15});
 gsap.from(".hero p,.hero .actions,.hero .stats",{y:28,opacity:0,duration:.8,stagger:.08,ease:"power3.out",delay:.45});
 gsap.to(".mini-ui",{rotateY:5,rotateX:-2,y:-24,ease:"none",scrollTrigger:{trigger:".showcase-shell",start:"top bottom",end:"bottom top",scrub:1}});
 gsap.to(".image",{backgroundPosition:"50% 62%",ease:"none",scrollTrigger:{trigger:".image",start:"top bottom",end:"bottom top",scrub:1}});
}
const canvas=$("#ambient"),ctx=canvas.getContext("2d");let W,H,dpr=Math.min(devicePixelRatio,2),pts=[];
function resize(){W=canvas.width=innerWidth*dpr;H=canvas.height=innerHeight*dpr;canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";pts=Array.from({length:18},(_,i)=>({x:Math.random()*W,y:Math.random()*H,r:(90+Math.random()*220)*dpr,s:.08+Math.random()*.18,p:Math.random()*6.28}))}
function draw(t){ctx.clearRect(0,0,W,H);if(tier==="basic"){requestAnimationFrame(draw);return}pts.forEach((p,i)=>{p.p+=p.s*.004;p.x+=Math.sin(p.p+i)*.12*dpr;p.y+=Math.cos(p.p*.8+i)*.08*dpr;let g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);let a=tier==="premium"?.055:.03;g.addColorStop(0,`rgba(255,255,255,${a})`);g.addColorStop(1,"rgba(255,255,255,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()});requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();requestAnimationFrame(draw);
})();