async function takeData() {
    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();

    console.log(data);

    const postsContainer = document.querySelector(".posts");

    data.forEach((dado) => {
        const html = `<div class="post">
        <h1>${dado.titulo}</h1>
        <p class="postPostado">${dado.post}</p>
        <div class="dadosPost"> 
        <p class="categoria">${dado.categoria}</p>
        <p class="autor">${dado.autor}</p>
        <p class="dataPublicacao">
            ${dado.datapublicacao} <span>ID: ${dado.id}</span><button class="deletarBtn" onclick="deletarPost(${dado.id})">🗑️</button>
        </p>
        </div>
    </div>`;

        postsContainer.insertAdjacentHTML("afterbegin", html);
    });
}
takeData();

async function deletarPost(id) {
    const response = await fetch(`http://localhost:3000/deletar/${id}`);
    const data = await response.json();
    console.log(data);
    console.log(id);

    location.reload();
}

async function novoPost() {
    const tituloInp = document.querySelector("#tituloInp").value;
    const postInp = document.querySelector("#postInp").value;
    const categoriaInp = document.querySelector("#categoriaInp").value;
    const autorInp = document.querySelector("#autor").value;

    const response = await fetch(
        `http://localhost:3000/add?title=${tituloInp}&post=${postInp}&category=${categoriaInp}&author=${autorInp}`
    );

    const data = await response.json();

    location.reload();
}

const btnAdd = document.querySelector(".btnAdicionar");

function criarInputs() {
    document.querySelector(".novoPost").insertAdjacentHTML(
        "afterbegin",
        `<input type="text" id="tituloInp" placeholder="Novo título" />
    <input
        type="text"
        id="postInp"
        placeholder="Escreva o que desejar"
    />
    <input type="text" id="categoriaInp" placeholder="Categoria" />
    <input type="text" id="autor" placeholder="Autor" />

    <button class="addNovoPost">✅</button>`
    );

    document.querySelector(".addNovoPost").addEventListener("click", novoPost);
}

btnAdd.addEventListener("click", () => {
    document.querySelector(".novoPost").innerHTML = "";
    criarInputs();
});
