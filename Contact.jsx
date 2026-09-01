function DevContact(){
  const {Button}=window.MonoPortfLioDesignSystem_7978a9;
  const [copied,setCopied]=React.useState(false);
  return (<section id="contato" className="sec" style={{paddingBottom:'clamp(120px,14vw,200px)'}}>
    <div className="wrap" style={{display:'grid',gap:'var(--space-6)'}}>
      <SecHead n="§05" label="Contato" title="Tem um sistema que precisa conversar com outro?" note="Respondo e-mail e WhatsApp no mesmo dia." />
      <a href={"mailto:"+cv.email} style={{font:'var(--weight-medium) clamp(1.75rem,5.4vw,4.5rem)/1 var(--font-display)',letterSpacing:'-.035em',borderBottom:'none',wordBreak:'break-word'}}>{cv.email}</a>
      <div style={{display:'flex',gap:'var(--space-3)',flexWrap:'wrap'}}>
        <Button style={{background:"var(--bt-gradient)",color:"#fff",borderRadius:"var(--bt-radius)",boxShadow:"0 4px 15px var(--bt-accent-shadow)"}} as="a" href={"https://"+cv.github}>GitHub</Button>
        <Button variant="secondary" as="a" href={"https://"+cv.linkedin} style={{border:'2px solid var(--bt-accent-border)',color:'var(--bt-text)',borderRadius:'var(--bt-radius)'}}>LinkedIn</Button>
        <Button variant="secondary" as="a" href={"https://"+cv.site} style={{border:'2px solid var(--bt-accent-border)',color:'var(--bt-text)',borderRadius:'var(--bt-radius)'}}>{cv.site}</Button>
        <Button variant="ghost" onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(cv.telefone);setCopied(true);setTimeout(()=>setCopied(false),1800)}} style={{color:'var(--bt-text-2)'}}>{copied?'telefone copiado':'copiar telefone'}</Button>
      </div>
      <div className="rule" style={{marginTop:'var(--space-6)'}}></div>
      <div style={{display:'flex',justifyContent:'space-between',gap:18,flexWrap:'wrap'}}>
        <span className="mono dim">© 2026 {cv.nome}</span>
        <span className="mono dim">Mogi Guaçu · SP · Brasil</span>
      </div>
    </div></section>);
}
Object.assign(window,{DevContact});