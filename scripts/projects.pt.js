/**
 * Array of projects
 * @type {Project[]}
 */
const projects = [
  {
    name: 'Portfolio',
    image: 'assets/images/portfolio.png',
    sourceCodeUrl: 'https://github.com/BenjamimFG/portfolio',
    liveDemoUrl: null,
    description:
      'Sim, este mesmo que você está navegando!<br />Programei este site de portfólio utilizando Javascript, HTML5 e CSS3 nenhuma biblioteca externa foi utilizada.<br />Ícones por <a href="https://github.com/feathericons/feather/">Feather Icons</a>.',
    tags: ['frontend', 'responsive', 'html5', 'css3', 'javascript']
  },
  {
    name: 'NLW Spacetime',
    image: 'assets/images/nlwspacetime.png',
    sourceCodeUrl: 'https://github.com/BenjamimFG/nlw-spacetime',
    liveDemoUrl: null,
    description:
      'Aplicação desenvolvida durante o evento Next Level Week Spacetime, evento de tecnologia hospedado pela <a href="http://rocketseat.com.br/nlw">Rocketseat</a> para compartilhamento de conhecimento e desenvolvimento de habilidades.<br />A aplicação é uma cápsula do tempo onde os usuários podem registrar suas memórias e se quiserem.',
    tags: [
      'frontend',
      'backend',
      'mobile',
      'reactjs',
      'react-native',
      'nodejs',
      'fastify',
      'typescript',
      'tailwindcss'
    ]
  },
  {
    name: 'P2P Chat',
    image: 'assets/images/p2pchat.png',
    sourceCodeUrl: 'https://github.com/BenjamimFG/p2p-chat',
    liveDemoUrl: null,
    description:
      "Um chat peer-to-peer CLI para Linux desenvolvido em C utilizando somente as bibliotecas PThreads e NCurses.<br />Desenvolvi esta aplicação enquanto lia o Guia Beej's Para Programação em Rede para melhor entender sockets e programação em rede.",
    tags: ['C', 'network', 'sockets', 'pthreads', 'ncurses']
  },
  {
    name: 'Apollo',
    image: 'assets/images/apollo.png',
    sourceCodeUrl: 'https://github.com/BenjamimFG/Apollo',
    liveDemoUrl: null,
    description:
      'Projeto Full stack de uma plataforma agregadora de serviços de barbearia desenvolvida em grupo na Universidade de Fortaleza para a cadeira de Projeto Final.<br />A aplicação consiste em um backend em NodeJS utilizando o framework ExpressJS e a linguagem Typescript e um frontend web utilizando a biblioteca ReactJS.',
    tags: ['reactjs', 'expressjs', 'typescript', 'frontend', 'backend', 'webdev', 'postgresql']
  }
];
