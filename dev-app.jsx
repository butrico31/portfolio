(function(){
  gsap.registerPlugin(ScrollTrigger);
  const {ParticleField}=window.MonoPortfLioDesignSystem_7978a9;
  let lenis=null;
  try{
    if(window.Lenis&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      lenis=new Lenis({duration:1.1,lerp:.085,smoothWheel:true,autoRaf:true});
      lenis.on('scroll',ScrollTrigger.update);window.lenis=lenis;
    }
  }catch(err){console.warn('Lenis indisponível',err)}
  function App(){
    React.useEffect(()=>{
      const on=e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const el=document.querySelector(a.getAttribute('href'));if(!el)return;e.preventDefault();
        if(lenis)lenis.scrollTo(el,{offset:-56});else window.scrollTo({top:el.offsetTop-56,behavior:'smooth'})};
      document.addEventListener('click',on);
      const id=setTimeout(()=>ScrollTrigger.refresh(),400);
      return()=>{document.removeEventListener('click',on);clearTimeout(id)};
    },[]);
    return (<>
      <ParticleField spread="document" color="rgba(168,85,247," dotOpacity={.9} lineOpacity={.22} dotSize={2.6} glow={7} density={0.00013} link={155} zIndex={0} />
      <TopBar/>
      <main style={{position:'relative',zIndex:1}}>
        <Intro/><Experience/><Projects/><Skills/><Education/><DevContact/>
      </main>
      <StatusBar/>
    </>);
  }
  ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
})();