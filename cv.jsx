const cv={
 nome:"Vinicius Butrico de Freitas",
 handle:"butrico31",
 funcao:"Desenvolvedor Full Stack",
 titulos:["Full Stack Developer","APIs REST em Node.js","Java Spring Boot","Vue.js e React","Automações em N8N","Integrações de pagamento","Salesforce · LWC","Agentes de IA"],
 local:"Mogi Guaçu · SP",
 email:"butrico0@gmail.com",
 telefone:"(19) 98975-1609",
 github:"github.com/butrico31",
 linkedin:"linkedin.com/in/vinicius-butrico-de-freitas-82912a240",
 site:"butrico.com.br",
 resumo:"APIs REST, integração de gateways de pagamento e automações que ligam sistemas que não foram feitos para conversar. Node.js e Spring Boot no backend, Vue e React na frente, N8N no meio de campo.",
 status:"Estagiário Salesforce na BeeCloud · aberto a freelance",
 idiomas:[["Português","nativo"],["Inglês","básico-intermediário"]],
 experiencia:[
  {cargo:"Estagiário Desenvolvedor Salesforce",empresa:"BeeCloud Solutions",periodo:"abr/2026 — atual",bullets:["Desenvolvimento e customização em Sales Cloud e Service Cloud.","Automações com Flow Builder e Process Builder.","Componentes de front-end em LWC (Lightning Web Components).","Integrações REST com sistemas externos.","Configuração de ambientes: perfis, permissões e objetos customizados."]},
  {cargo:"Desenvolvedor de Software",empresa:"Imersa Tecnologia",periodo:"jul/2025 — abr/2026",bullets:["Automações full stack com N8N, Node.js e Java Spring Boot: onboarding de cliente, contratos e geração de LDR para prospecção.","APIs REST consumidas por aplicações internas e externas.","ChatBots de WhatsApp para atendimento e aviso automático de reuniões.","CRM construído sobre o ClickUp como plataforma central.","Agentes de IA em N8N para automação de tarefas.","Landing pages responsivas em React e Vue.js."]},
  {cargo:"Aprendiz — Assistente Administrativo",empresa:"CAMP",periodo:"jul/2024 — jul/2025",bullets:["Relatórios de contas de clientes e organização de documentos.","Controle de estoque de uniformes e EPIs.","Suporte técnico a computadores e dispositivos móveis."]}
 ],
 projetos:[
  {index:"01",title:"SakaTech",client:"Projeto acadêmico · Node.js",year:"2025",tags:["Node.js","MongoDB","Stripe","JWT"],description:"API REST com autenticação JWT e autorização por papéis. Stripe para cobrança e estorno, MongoDB para dados, bcrypt para senhas, versionamento completo em Git.",tone:"brand"},
  {index:"02",title:"FinancSUS",client:"Projeto acadêmico · Node.js + Vue",year:"2025",tags:["Vue.js","OAuth2","Mercado Pago"],description:"Doações em modelo marketplace: split via Mercado Pago com OAuth2, autenticação JWT, front-end responsivo em Vue com login, gestão de conta e upload de imagens.",tone:"brand-deep"},
  {index:"03",title:"Onboarding automatizado",client:"Imersa Tecnologia",year:"2025",tags:["N8N","Spring Boot","WhatsApp"],description:"Fluxo que recebe o cliente, gera contrato, dispara mensagens no WhatsApp e cria as tarefas no CRM sem ninguém digitar duas vezes.",tone:"brand"},
  {index:"04",title:"CRM sobre ClickUp",client:"Imersa Tecnologia",year:"2025",tags:["ClickUp API","Node.js"],description:"Pipeline comercial, campos customizados e integrações que transformaram uma ferramenta de tarefas no CRM da operação.",tone:"brand-deep"}
 ],
 entregas:[
  {title:"Agentes de IA em N8N",meta:"Automação de tarefas · Imersa",year:"2025"},
  {title:"ChatBot de WhatsApp",meta:"Atendimento e notificações",year:"2025"},
  {title:"Geração de LDR",meta:"Prospecção automatizada",year:"2025"},
  {title:"Landing pages React / Vue",meta:"Front-end responsivo",year:"2025"}
 ],
 stack:[
  ["Linguagens",["JavaScript","Java"]],
  ["Back-end",["Node.js","Spring Boot","APIs REST","JWT","bcrypt"]],
  ["Front-end",["Vue.js","React","LWC"]],
  ["Dados",["MongoDB"]],
  ["Integrações",["Stripe","Mercado Pago","OAuth2","N8N","ClickUp","Salesforce"]],
  ["Infra",["Git","Docker","SSL","CI/CD básico"]]
 ],
 formacao:[
  {curso:"Bacharelado em Sistemas de Informação",escola:"FHO Uniararas",periodo:"2023 — 2026 (previsto)",nota:"6º semestre"},
  {curso:"Técnico em Mecatrônica",escola:"ETEC Pedro Ferreira Alves",periodo:"2020 — 2022"}
 ]
};
Object.assign(window,{cv});