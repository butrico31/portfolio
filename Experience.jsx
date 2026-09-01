function SecHead({n,label,title,note}){
  return (<header style={{display:'grid',gap:'var(--space-4)',paddingBottom:'var(--space-5)',borderBottom:'1px solid rgba(230,230,230,.14)'}}>
    <div style={{display:'flex',justifyContent:'space-between',gap:18}}><span className="mono dim">{label}</span><span className="mono amber">{n}</span></div>
    <h2 style={{font:'var(--weight-medium) var(--text-display-2)/.96 var(--font-display)',letterSpacing:'-.03em',margin:0,maxWidth:'22ch'}}>{title}</h2>
    {note?<p className="dim" style={{font:'var(--type-body)',maxWidth:'52ch',margin:0}}>{note}</p>:null}
  </header>);
}
function Experience(){
  const ref=React.useRef(null);
  React.useEffect(()=>{
    if(!ref.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const ctx=gsap.context(()=>{gsap.fromTo(ref.current.querySelectorAll('[data-job]'),{y:28,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',stagger:.12,immediateRender:false,clearProps:'opacity,transform',scrollTrigger:{trigger:ref.current,start:'top 85%',once:true}});},ref);
    return()=>ctx.revert();
  },[]);
  return (<section id="experiencia" className="sec"><div className="wrap" style={{display:'grid',gap:'var(--space-7)'}}>
    <SecHead n="§01" label="Experiência" title="Onde eu escrevi código que alguém usa" />
    <div ref={ref} style={{display:'grid',gap:'var(--space-6)'}}>
      {cv.experiencia.map(j=>(
        <article data-job key={j.empresa} className="cols2" style={{display:'grid',gridTemplateColumns:'minmax(0,.8fr) minmax(0,2fr)',gap:'var(--space-6)',paddingTop:'var(--space-5)',borderTop:'1px solid rgba(230,230,230,.1)'}}>
          <div style={{display:'grid',gap:6,alignContent:'start'}}>
            <span className="mono">{j.periodo}</span>
            <span className="mono dim">{j.empresa}</span>
          </div>
          <div style={{display:'grid',gap:'var(--space-4)'}}>
            <h3 style={{font:'var(--weight-medium) var(--text-title)/1.15 var(--font-display)',letterSpacing:'-.015em',margin:0}}>{j.cargo}</h3>
            <ul style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:10}}>
              {j.bullets.map(b=>(<li key={b} style={{display:'grid',gridTemplateColumns:'18px 1fr',gap:8,font:'var(--type-body)',color:'var(--bt-text-2)'}}><span className="amber mono">›</span>{b}</li>))}
            </ul>
          </div>
        </article>))}
    </div>
  </div></section>);
}
Object.assign(window,{Experience,SecHead});