const form = document.getElementById("novoItem"); //captura formulário
const lista = document.getElementById("lista");   //capitura a lista

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements['nome']
  const quantidade = evento.target.elements['quantidade']

 criaElemento(nome.value,quantidade.value)
 
 
 nome.value = ""    //esvaziar formulário
 quantidade.value = ""
  
});

function criaElemento(nome, quantidade) {
  
  const novoItem = document.createElement("li"); //cria novo item e adiciona na li
  novoItem.classList.add("item");

  const numeroItem = document.createElement('strong'); // Insere uma tag strong para o número
  numeroItem.innerHTML = quantidade; // A quantidade do item fica dentro do HTML
  
  const nomeItem = document.createElement('span'); // Cria um elemento para o nome do item
  nomeItem.innerHTML = nome; // Define o valor do nome do item
  
  novoItem.appendChild(numeroItem); // Adiciona, dentro da tag strong, o número do item
  novoItem.appendChild(nomeItem); // Adiciona o elemento do nome do item
  
  lista.appendChild(novoItem);

  localStorage.setItem("nome",nome)  //salvar informação no localStorage
  localStorage.setItem("quantidade",quantidade)

}