if("serviceWorker" in navigator){
    navigator.serviceWorker
    .register("./sw.js")
    .then(() => {
        console.log("Service Worker registrado!")
    })
    .catch(erro => {
        console.error(
            "Erro ao registrar:",
            erro
        );
    });
}