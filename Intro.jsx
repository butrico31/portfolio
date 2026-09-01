function Typewriter({items,speed=68,erase=34,hold=1700,gap=320}){
  const [i,setI]=React.useState(0);
  const [txt,setTxt]=React.useState('');
  React.useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setTxt(items[0]);return}
    const word=items[i%items.length];
    let n=0,del=false,t;
    const tick=()=>{
      if(!del){
        n++;setTxt(word.slice(0,n));
        if(n===word.length){del=true;t=setTimeout(tick,hold);return}
      }else{
        n--;setTxt(word.slice(0,n));
        if(n===0){t=setTimeout(()=>setI(v=>v+1),gap);return}
      }
      t=setTimeout(tick,del?erase:speed);
    };
    t=setTimeout(tick,260);
    return()=>clearTimeout(t);
  },[i,items,speed,erase,hold,gap]);
  return (<span>{txt}<span className="amber" style={{animation:'blink 1s steps(1) infinite',fontWeight:400}}>_</span></span>);
}
function Intro(){
  const DS=window.MonoPortfLioDesignSystem_7978a9;
  const {Button}=DS;
  // fallback: se o bundle ainda não trouxe GlitchText, renderiza o texto puro
  const GlitchText=DS.GlitchText||(({children,font,style})=><span style={{font,background:'var(--bt-gradient)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',...style}}>{children}</span>);
  const ref=React.useRef(null);
  React.useLayoutEffect(()=>{
    if(!ref.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const ctx=gsap.context(()=>{gsap.fromTo(ref.current.children,{y:24,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',stagger:.09,delay:.15,clearProps:'opacity,transform'});},ref);
    return()=>ctx.revert();
  },[]);
  const nameFont='400 clamp(2.5rem,7.6vw,7rem)/1.02 var(--bt-font-name)';
  return (<section id="topo" style={{minHeight:'100svh',display:'flex',alignItems:'center',padding:'112px 0 88px'}}>
    <div className="wrap" style={{width:'100%'}}>
      <div ref={ref} style={{display:'grid',gap:'var(--space-6)'}}>
        <span className="mono dim">{cv.funcao} · {cv.local}</span>
        <h1 style={{margin:0,display:'grid',gap:'.06em',justifyItems:'start'}}>
          <GlitchText font={nameFont} text="Vinicius">Vinicius</GlitchText>
          <GlitchText font={nameFont} text="Butrico">Butrico</GlitchText>
        </h1>
        <p style={{font:'300 clamp(1.25rem,2.4vw,2rem)/1.25 var(--bt-font-tech)',margin:0,color:'var(--bt-text)',minHeight:'1.3em'}}>
          <Typewriter items={cv.titulos} />
        </p>
        <p style={{font:'var(--weight-regular) var(--text-body-lg)/1.55 var(--font-body)',color:'var(--bt-text-2)',maxWidth:'54ch',margin:0}}>{cv.resumo}</p>
        <div className="cols2" style={{display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',gap:'var(--space-7)',marginTop:'var(--space-4)'}}>
          <div>
            {[['função',cv.funcao],['stack principal','Node.js · Spring Boot · Vue · React'],['formação','Sistemas de Informação — 6º sem.'],['desde','2024 em produção']].map(([k,v])=>(
              <div className="kv" key={k}><span className="mono dim">{k}</span><span style={{font:'var(--type-body)'}}>{v}</span></div>))}
          </div>
          <div>
            {[['github',cv.github],['linkedin','vinicius-butrico-de-freitas'],['site',cv.site],['telefone',cv.telefone]].map(([k,v])=>(
              <div className="kv" key={k}><span className="mono dim">{k}</span><span style={{font:'var(--type-body)',wordBreak:'break-word'}}>{v}</span></div>))}
          </div>
        </div>
        <div style={{display:'flex',gap:'var(--space-3)',flexWrap:'wrap',marginTop:'var(--space-4)'}}>
          <Button size="lg" as="a" href={"https://"+cv.github} style={{background:'var(--bt-gradient)',color:'#fff',borderRadius:'var(--bt-radius)',boxShadow:'0 4px 15px var(--bt-accent-shadow)'}}>Ver GitHub</Button>
          <Button size="lg" as="a" href="#projetos" style={{background:'transparent',color:'var(--bt-text)',border:'2px solid var(--bt-accent-border)',borderRadius:'var(--bt-radius)'}}>Ver projetos</Button>
          <Button size="lg" as="a" href={"mailto:"+cv.email} style={{background:'transparent',color:'var(--bt-text)',border:'2px solid var(--bt-accent-border)',borderRadius:'var(--bt-radius)'}}>Falar comigo</Button>
        </div>
      </div>
    </div></section>);
}
Object.assign(window,{Intro,Typewriter});
