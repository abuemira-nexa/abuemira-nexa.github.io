/* ============================================================
   Mohamed Essam Abu Emira — Portfolio JavaScript
   Author  : Mohamed Essam Abu Emira
   Version : 4.0
   ============================================================ */

// Project filter
const fbtns=document.querySelectorAll(".fbtn"),cards=document.querySelectorAll(".proj-card");
fbtns.forEach(b=>b.addEventListener("click",()=>{
  fbtns.forEach(x=>x.classList.remove("active"));b.classList.add("active");
  const f=b.dataset.filter;
  cards.forEach(c=>c.style.display=(f==="all"||c.dataset.cat===f)?"":"none");
}));
// Skill bars animation on scroll
const fills=document.querySelectorAll(".sk-fill"),ws=[];
fills.forEach(el=>{ws.push(el.style.width);el.style.width="0"});
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){fills.forEach((el,i)=>setTimeout(()=>el.style.width=ws[i],i*55));}});
},{threshold:.2});
const sc=document.querySelector(".skills-card");
if(sc)obs.observe(sc);
// Cert link hover visibility
document.querySelectorAll(".cert-card").forEach(c=>{
  c.style.textDecoration="none";c.style.color="inherit";
  const lk=c.querySelector(".cert-link");
  if(lk){c.addEventListener("mouseenter",()=>lk.style.opacity="1");c.addEventListener("mouseleave",()=>lk.style.opacity="0");}
});
