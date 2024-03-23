const preco = [50, 45];

const valorTotal = [0, 0];

const qnt = [0, 0];

const subtotal = document.getElementById("subtotal");

function adicionar(item) {
    const quantidade = document.getElementById("quantidade" + item);
    const total = document.getElementById("total" + item);

    qnt[item]++;
    valorTotal[item] = qnt[item] * preco[item];

    quantidade.innerHTML = qnt[item];
    total.innerHTML = valorTotal[item];

    subtotal.innerHTML = valorTotal[0] + valorTotal[1];
}

function remover(item) {
    const quantidade = document.getElementById("quantidade" + item);
    const total = document.getElementById("total" + item);
    if (qnt[item] > 0) {
        qnt[item]--;
    }

    valorTotal[item] = qnt[item] * preco[item];

    quantidade.innerHTML = qnt[item];
    total.innerHTML = valorTotal[item];

    subtotal.innerHTML = valorTotal[0] + valorTotal[1];
}
