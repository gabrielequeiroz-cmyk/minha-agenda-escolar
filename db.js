function promessa(pedido) {
    return new Promise((resolve, reject) => {
        pedido.onsuccess = () => resolve(pedido.result);
        pedido.onerror = () => reject(pedido.error);
    });
}

function abrirBanco() {
    const pedido = indexedDB.open("agenda-db", 1);
    pedido.onupgradeneeded = () => {
        pedido.result.createObjectStore("compromissos", {
            keyPath: "id", 
            autoIncrement: true,
        });
    };

    return promessa(pedido);
}

function adicionar(compromisso) {
    return abrirBanco() .then(db => {
        const store = db.transaction("compromissos", "readwrite").objectStore("compromissos");
        return promessa(store.add(compromisso));
    });
}

adicionar({ hora:"8:00", titulo:"Aula de PWA"}).then((id) => 
console.log("Salvo com id", id),
);