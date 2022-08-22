let posts = [];

(async () => {
  const todasAsImagens = await (await fetch("/api/listagem")).json();

  posts = todasAsImagens;

  todasAsImagens.forEach((arquivo) => {
    const div = document.createElement("div");
    div.className = "imagem";

    div.innerHTML = !arquivo.encoding.includes("mp4") ? `
    <img
    src="/arquivos/${arquivo.id}"
    />
    <p>${arquivo.nome}</p>` : `
    <video
    src="/arquivos/${arquivo.id}"
    controls
    ></video>
    <p>${arquivo.nome}</p>`;

    document.querySelector(".listagem").appendChild(div);
  });
})();

document.getElementById("pesquisa").addEventListener("keydown", listarPorPesquisa)

function listarPorPesquisa() {
  const pesquisa = document.getElementById("pesquisa").value.trim();

  document.querySelector(".listagem").innerHTML = "";

  if (!pesquisa || pesquisa.length == 1) {
    posts.forEach((arquivo) => {
      const div = document.createElement("div");
      div.className = "imagem";
  
      div.innerHTML = !arquivo.encoding.includes("mp4") ? `
      <img
      src="/arquivos/${arquivo.id}"
      />
      <p>${arquivo.nome}</p>` : `
      <video
      src="/arquivos/${arquivo.id}"
      controls
      ></video>
      <p>${arquivo.nome}</p>`;
  
      document.querySelector(".listagem").appendChild(div);
    });
  }

  posts.filter((p) => p.nome.toLowerCase().includes(pesquisa)).forEach((arquivo) => {
    const div = document.createElement("div");
    div.className = "imagem";

    div.innerHTML = !arquivo.encoding.includes("mp4") ? `
    <img
    src="/arquivos/${arquivo.id}"
    />
    <p>${arquivo.nome}</p>` : `
    <video
    src="/arquivos/${arquivo.id}"
    controls
    ></video>
    <p>${arquivo.nome}</p>`;

    document.querySelector(".listagem").appendChild(div);
  });
}
