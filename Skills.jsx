function Skills(){
  const {Tag}=window.MonoPortfLioDesignSystem_7978a9;
  return (<section id="stack" className="sec"><div className="wrap" style={{display:'grid',gap:'var(--space-7)'}}>
    <SecHead n="§03" label="Stack" title="Ferramentas que eu uso sem consultar a documentação" />
    <div style={{display:'grid',gap:0}}>
      {cv.stack.map(([grupo,itens])=>(
        <div key={grupo} className="cols2" style={{display:'grid',gridTemplateColumns:'minmax(0,.55fr) minmax(0,2fr)',gap:'var(--space-5)',padding:'var(--space-5) 0',borderBottom:'1px solid rgba(230,230,230,.1)',alignItems:'start'}}>
          <span className="mono dim">{grupo}</span>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>{itens.map(i=>(<Tag key={i} style={{background:"var(--bt-gradient)",color:"#fff",borderRadius:"var(--bt-radius)",boxShadow:"0 4px 15px var(--bt-accent-shadow)"}}>{i}</Tag>))}</div>
        </div>))}
    </div>
  </div></section>);
}
function Education(){
  return (<section id="formacao" className="sec"><div className="wrap" style={{display:'grid',gap:'var(--space-7)'}}>
    <SecHead n="§04" label="Formação" title="Estudo e idiomas" />
    <div className="cols2" style={{display:'grid',gridTemplateColumns:'minmax(0,1.4fr) minmax(0,1fr)',gap:'var(--space-7)'}}>
      <div>
        {cv.formacao.map(e=>(
          <div key={e.curso} style={{display:'grid',gap:6,padding:'var(--space-5) 0',borderTop:'1px solid rgba(230,230,230,.1)'}}>
            <span className="mono dim">{e.periodo}{e.nota?' · '+e.nota:''}</span>
            <h3 style={{font:'var(--weight-medium) var(--text-subtitle)/1.2 var(--font-display)',letterSpacing:'-.015em',margin:0}}>{e.curso}</h3>
            <span className="dim" style={{font:'var(--type-body)'}}>{e.escola}</span>
          </div>))}
      </div>
      <div>
        {cv.idiomas.map(([l,n])=>(
          <div className="kv" key={l}><span className="mono dim">{l}</span><span style={{font:'var(--type-body)'}}>{n}</span></div>))}
      </div>
    </div>
  </div></section>);
}
Object.assign(window,{Skills,Education});