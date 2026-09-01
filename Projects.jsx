const SNIPPETS={
 "01":[["POST","kw"],[" /api/v1/checkout\n",""],["Authorization","key"],[": Bearer ","" ],["<jwt>","str"],["\n\n{\n  ",""],["\"items\"","key"],[": [{ ",""],["\"sku\"","key"],[": ",""],["\"SKT-114\"","str"],[", ",""],["\"qty\"","key"],[": ",""],["2","num"],[" }],\n  ",""],["\"provider\"","key"],[": ",""],["\"stripe\"","str"],["\n}\n\n",""],["201","num"],[" Created  ",""],["→","op"],[" payment_intent.succeeded\n              ",""],["→","op"],[" refund.allowed ",""],["=","op"],[" role:admin",""]],
 "02":[["// integração Mercado Pago\n","cm"],["oauth2","kw"],[" ",""],["→","op"],[" mercadopago.authorize(seller)\n",""],["split","kw"],["  ",""],["→","op"],[" { ",""],["platform","key"],[": ",""],["0","num"],[", ",""],["receiver","key"],[": ",""],["100","num"],[" }\n\n",""],["POST","kw"],[" /donations\n  ",""],["amount","key"],[": ",""],["50.00","num"],["\n  ",""],["campaign","key"],[": ",""],["\"posto-saude-04\"","str"],["\n\n",""],["webhook ✓ payment.approved","cm"]],
 "03":[["// n8n workflow · onboarding\n\n","cm"],["[form]","key"],[" ",""],["→","op"],[" ",""],["[validate CNPJ]","key"],[" ",""],["→","op"],[" ",""],["[gera contrato]","key"],["\n      ",""],["→","op"],[" ",""],["[whatsapp: boas-vindas]","key"],["\n      ",""],["→","op"],[" ",""],["[clickup: cria tarefas]","key"],["\n      ",""],["→","op"],[" ",""],["[notifica squad]","key"],["\n\n",""],["17","num"],[" execuções/dia · ",""],["0","num"],[" digitação manual",""]],
 "04":[["clickup","kw"],[".api\n  ",""],["lists","key"],["     ",""],["→","op"],[" pipeline comercial\n  ",""],["custom_fields","key"],[" ",""],["→","op"],[" LDR score, MRR\n  ",""],["webhooks","key"],["  ",""],["→","op"],[" status change\n\n",""],["node-cron","kw"],[" ",""],["→","op"],[" relatório semanal ",""],["08:00","num"]]
};
const SYN={kw:'var(--syn-keyword)',str:'var(--syn-string)',num:'var(--syn-number)',key:'var(--syn-key)',cm:'var(--syn-comment)',op:'var(--syn-operator)'};
function CodePanel({index}){
  const parts=SNIPPETS[index]||[];
  return (<div style={{position:'absolute',inset:0,display:'grid',gridTemplateRows:'auto 1fr',background:'var(--bt-code-bg)',borderLeft:'1px solid var(--bt-code-border)'}}>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,padding:'12px 16px',background:'var(--bt-code-header)',borderBottom:'1px solid var(--bt-code-border)'}}>
      <span style={{font:'500 11px/1 var(--font-mono)',letterSpacing:'.14em',textTransform:'uppercase',color:'var(--bt-code-muted)'}}>{index}.log</span>
      <span style={{width:26,height:2,background:'var(--bt-accent-border)'}}></span>
    </div>
    <pre style={{margin:0,padding:'clamp(16px,2vw,28px)',overflow:'hidden',font:'500 clamp(10px,1vw,13px)/1.75 var(--font-mono)',color:'var(--bt-code-text)',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>
      {parts.map(([txt,kind],i)=>(<span key={i} style={kind?{color:SYN[kind]}:undefined}>{txt}</span>))}
    </pre>
  </div>);
}
function Projects(){
  const {StackCard,ProjectRow}=window.MonoPortfLioDesignSystem_7978a9;
  const wrap=React.useRef(null),list=React.useRef(null);
  React.useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const ctx=gsap.context(()=>{
      const cards=wrap.current?gsap.utils.toArray(wrap.current.querySelectorAll('article')):[];
      cards.forEach((card,i)=>{
        if(!i)return;
        gsap.fromTo(card,{scale:.94},{scale:1,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'top center',scrub:true}});
      });
      if(list.current)gsap.fromTo(list.current.querySelectorAll('a'),{y:20,opacity:0},{y:0,opacity:1,duration:.6,stagger:.07,ease:'power3.out',immediateRender:false,clearProps:'opacity,transform',scrollTrigger:{trigger:list.current,start:'top 88%',once:true}});
    });
    return()=>ctx.revert();
  },[]);
  return (<section id="projetos" className="sec">
    <div className="wrap" style={{display:'grid',gap:'var(--space-7)'}}>
      <SecHead n="§02" label="Projetos" title="Quatro coisas que eu construí de ponta a ponta" note="Role para empilhar. Dois acadêmicos, dois em produção na Imersa." />
      <div ref={wrap} style={{display:'grid',gap:'var(--space-6)'}}>
        {cv.projetos.map((p,i)=>(<StackCard key={p.index} {...p} media={<CodePanel index={p.index} />} style={{top:'calc(var(--stack-top) + '+(i*16)+'px)',zIndex:i+1}} />))}
      </div>
      <div ref={list} style={{marginTop:'var(--space-6)'}}>
        <span className="mono dim" style={{display:'block',marginBottom:'var(--space-4)'}}>outras entregas</span>
        {cv.entregas.map(e=>(<ProjectRow key={e.title} {...e} href="#projetos" />))}
      </div>
    </div></section>);
}
Object.assign(window,{Projects,CodePanel});
