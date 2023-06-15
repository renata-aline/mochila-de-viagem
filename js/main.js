const form = document.getElementById("novoItem"); //captura formulário
const lista = document.getElementById("lista"); //capitura a lista
const itens = JSON.parse(localStorage.getItem("itens")) || [];

// for forEach() mantem os dados na página
itens.forEach((elemento) => {
  criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements["nome"];
  const quantidade = evento.target.elements["quantidade"];

  const existe = itens.find((elemento) => elemento.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existe) {
    itemAtual.id = existe.id;

    atualizaElemento(itemAtual)

    itens[existe.id] = itemAtual 

  } else {
    itemAtual.id = itens.length;

    criaElemento(itemAtual);

    itens.push(itemAtual); //incerir elemento no array
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = ""; //esvaziar formulário
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li"); //cria novo item e adiciona na li
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong"); // Insere uma tag strong para o número
  numeroItem.innerHTML = item.quantidade; // A quantidade do item fica dentro do HTML

  numeroItem.dataset.id = item.id;

  const nomeItem = document.createElement("span"); // Cria um elemento para o nome do item
  nomeItem.innerHTML = item.nome; // Define o valor do nome do item

  novoItem.appendChild(numeroItem); // Adiciona, dentro da tag strong, o número do item
  novoItem.appendChild(nomeItem); // Adiciona o elemento do nome do item

  lista.appendChild(novoItem);
}

function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}
