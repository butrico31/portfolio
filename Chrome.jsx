function TopBar(){
  const [t,setT]=React.useState('');
  React.useEffect(()=>{
    const fmt=()=>new Date().toLocaleTimeString('pt-BR',{timeZone:'America/Sao_Paulo',hour:'2-digit',minute:'2-digit',second:'2-digit'});
    setT(fmt());const id=setInterval(()=>setT(fmt()),1000);return()=>clearInterval(id);
  },[]);
  const link={textDecoration:'none',borderBottom:'none'};
  return (<header style={{position:'fixed',top:0,left:0,right:0,zIndex:10,background:'rgba(15,17,19,.82)',backdropFilter:'blur(12px)',borderBottom:'1px solid var(--bt-accent-border)'}}>
    <div className="wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:26,height:52}}>
      <a href="#topo" className="mono" style={{...link,color:'var(--bt-text)'}}>vinicius<span className="dim">.butrico</span></a>
      <nav style={{display:'flex',gap:22}}>
        {[['§01','#experiencia'],['§02','#projetos'],['§03','#stack'],['§04','#formacao'],['§05','#contato']].map(([n,h])=>(
          <a key={h} href={h} className="mono dim" style={link}>{n}</a>))}
      </nav>
      <span className="mono dim" style={{fontVariantNumeric:'tabular-nums'}}>SP {t}</span>
    </div></header>);
}
function StatusBar(){
  return (<div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:10,background:'var(--bt-bg-footer)',backdropFilter:'blur(12px)',borderTop:'1px solid var(--bt-accent-border)'}}>
    <div className="wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,height:44,flexWrap:'wrap'}}>
      <span className="mono dim" style={{display:'flex',alignItems:'center',gap:8}}><span className="amber" style={{animation:'blink 1.6s steps(1) infinite'}}>●</span>{cv.status}</span>
      <a href={"mailto:"+cv.email} className="mono" style={{textDecoration:'none',borderBottom:'none'}}>{cv.email}</a>
    </div></div>);
}
Object.assign(window,{TopBar,StatusBar});