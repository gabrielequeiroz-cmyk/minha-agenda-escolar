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


