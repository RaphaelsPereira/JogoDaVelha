// Seleciona o elemento HTML com a classe "currentPlayer" para mostrar o jogador atual
const currentPlayer = document.querySelector(".currentPlayer");

// Inicializa variáveis
let selected, player = "X";

// Define as posições vencedoras possíveis no jogo da velha
let positions = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // Linhas horizontais
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // Linhas verticais
  [1, 5, 9], [3, 5, 7] // Diagonais
];

// Função de inicialização do jogo
function iniciarJogo() {
  // Inicializa o array 'selected' para rastrear as jogadas dos jogadores
  selected = [];

  // Exibe qual jogador está jogando atualmente no elemento HTML
  currentPlayer.innerHTML = `VEZ DO JOGADOR: ${player}`;

  // Limpa o texto dos botões do tabuleiro e adiciona ouvintes de clique a eles
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.addEventListener("click", novaJogada);
  });
}

// Inicializa o jogo
iniciarJogo();

// Função chamada quando um jogador faz uma jogada
function novaJogada(e) {
  // Obtém o índice do botão clicado
  const indice = e.target.getAttribute("data-i");

  // Define o símbolo do jogador atual (X ou O) no botão clicado
  e.target.innerHTML = player;

  // Remove o ouvinte de clique para evitar jogadas repetidas na mesma célula
  e.target.removeEventListener("click", novaJogada);

  // Registra a jogada no array 'selected' na posição correspondente
  selected[indice] = player;

  // Aguarda um curto período e, em seguida, verifica o resultado do jogo
  setTimeout(verificarResultado, 100);

  // Alterna para o próximo jogador (X -> O ou O -> X) e atualiza o elemento "currentPlayer"
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `VEZ DO JOGADOR: ${player}`;
}

// Função para verificar o resultado do jogo
function verificarResultado() {
  // Define o símbolo do jogador anterior com base no jogador atual
  const jogadorUltimaJogada = player === "X" ? "O" : "X";

  // Obtém as posições jogadas pelo jogador anterior
  const posicoesJogadas = selected.map((item, i) => [item, i])
    .filter((item) => item[0] === jogadorUltimaJogada)
    .map((item) => item[1]);

  // Verifica se alguma combinação vencedora é atendida pelas posições do jogador anterior
  for (posicao of positions) {
    if (posicao.every((item) => posicoesJogadas.includes(item))) {
      // Exibe um alerta com o vencedor e reinicia o jogo
      alert(`O JOGADOR '${jogadorUltimaJogada}' VENCEU!`);
      iniciarJogo();
      return;
    }
  }

  // Se todas as posições estiverem preenchidas e não houver um vencedor, exibe um alerta de empate e reinicia o jogo
  if (selected.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    iniciarJogo();
  }
}
