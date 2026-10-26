const form = document.querySelector("#form-tarefa");
const campoTarefa = document.querySelector("#tarefa");
const listaTarefas = document.querySelector("#lista-tarefas");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const texto = campoTarefa.value.trim();
  if (texto === "") {
    return;
  }

  const item = document.createElement("li");
  item.textContent = texto;
  listaTarefas.appendChild(item);
  campoTarefa.value = "";
  campoTarefa.focus();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((registro) => {
      console.log("Service Worker registrado com sucesso:", registro);
    })
    .catch((erro) => {
      console.error("Erro ao registrar Service Worker:", erro);
    });
}


/////////////versão 2 

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => console.log("Service Worker registrado com sucesso."))
    .catch((erro) => console.error("Erro ao SW:", erro));
}

function atualizarStatus() {
  const status = document.getElementById("status");

  if (navigator.onLine) {
    status.textContent = "Online";
    status.className = "online";
  } else {
    status.textContent = "Offline";
    status.className = "offline";   
  }
}


window.addEventListener("online", atualizarStatus);
window.addEventListener("offline", atualizarStatus);
atualizarStatus();

function carregarCompromissos() {
  const main = document.querySelector("#conteudo");

  fetch("./dados.json")
    .then(resposta => resposta.json())
    .then(lista => {
      main.innerHTML = lista
      .map(c => `<p>${c.hora} - ${c.titulo}</p>`)
      .join("");
})

.catch(() => {
  main.innerHTML = "<p>Sem conexão. Tente mais tarde.</p>";
});
}

carregarCompromissos();