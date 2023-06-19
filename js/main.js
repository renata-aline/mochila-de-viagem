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

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual 

  } else {
    itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;// se tiver vazio aplica zero se não pega ultimo da lista e acrescenta mais 1

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

  novoItem.appendChild(botaoDeleta(item.id))

  novoItem.appendChild(numeroItem); // Adiciona, dentro da tag strong, o número do item
  novoItem.appendChild(nomeItem); // Adiciona o elemento do nome do item

  lista.appendChild(novoItem);
}

function atualizaElemento(item){
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button")
  elementoBotao.innerText = "x"

  elementoBotao.addEventListener("click",function(){
    deletaElemento(this.parentNode,id)
  })

  return elementoBotao

}

function deletaElemento(tag,id){
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id),1) //acha o elemento que eu removi e deleta
  localStorage.setItem("itens",JSON.stringify(itens))  //escreve no localStorage

}