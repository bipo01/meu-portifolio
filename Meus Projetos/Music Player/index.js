var andariego = new Audio("./media/Andariego - Inca Son.mp3");
var aMontanha = new Audio(
  "./media/Ruban e Mauro Assumpção - A montanha - Ruban Oficial.mp3"
);
var nasAsasDoVento = new Audio(
  "./media/Nas asas do vento que vem - Padre Zezinho - André Vinícius.mp3"
);

const musicas = [andariego, aMontanha, nasAsasDoVento];
console.log(musicas);

function tocarAndariego() {
  $(".musicPlayer").html(`<div class="tocando andariego">
    <div class="capaAndariego"></div>
    <h2>Andariego</h2>
    <div class="controlsAMontanha">
      <div class="barrinha"></div>
      <div class="botoes">
        <button class="anterior">⏪</button>
        <button class="reproduzir">⏯</button>
        <button class="avançar">⏩</button>
      </div>
    </div>
  </div>`);
  $(".reproduzir").click(() => {
    if (andariego.paused) {
      andariego.play();
    } else {
      andariego.pause();
    }
  });

  $(".anterior").click(() => {
    andariego.pause();

    tocarNasAsasDoVento();
    nasAsasDoVento.play();
    $(".reproduzir").click(() => {
      if (nasAsasDoVento.paused) {
        nasAsasDoVento.play();
      } else {
        nasAsasDoVento.pause();
      }
    });
  });
}

function tocarAMontanha() {
  $(".musicPlayer").html(`<div class="tocando aMontanha">
    <div class="capaAMontanha"></div>
    <h2>A Montanha</h2>
    <div class="controlsAMontanha">
      <div class="barrinha"></div>
      <div class="botoes">
        <button class="anterior">⏪</button>
        <button class="reproduzir">⏯</button>
        <button class="avançar">⏩</button>
      </div>
    </div>
  </div>`);
  $(".reproduzir").click(() => {
    if (aMontanha.paused) {
      aMontanha.play();
    } else {
      aMontanha.pause();
    }
  });
  $(".anterior").click(() => {
    aMontanha.pause();

    tocarAndariego();
    andariego.play();
    $(".reproduzir").click(() => {
      if (andariego.paused) {
        andariego.play();
      } else {
        andariego.pause();
      }
    });
  });
}

function tocarNasAsasDoVento() {
  $(".musicPlayer").html(`<div class="tocando nasAsasDoVento">
  <div class="capaNasAsasDoVento"></div>
  <h2>Nas Asas Do Vento</h2>
  <div class="controlsAMontanha">
    <div class="barrinha"></div>
    <div class="botoes">
      <button class="anterior">⏪</button>
      <button class="reproduzir">⏯</button>
      <button class="avançar">⏩</button>
    </div>
  </div>
</div>`);
  $(".reproduzir").click(() => {
    if (nasAsasDoVento.paused) {
      nasAsasDoVento.play();
    } else {
      nasAsasDoVento.pause();
    }
  });
  $(".anterior").click(() => {
    nasAsasDoVento.pause();

    tocarAMontanha();
    aMontanha.play();
    $(".reproduzir").click(() => {
      if (aMontanha.paused) {
        aMontanha.play();
      } else {
        aMontanha.pause();
      }
    });
  });
}

$(".musicaUm").click(() => {
  tocarAndariego();
});
$(".musicaDois").click(() => {
  tocarAMontanha();
});
$(".musicaTres").click(() => {
  tocarNasAsasDoVento();
});
