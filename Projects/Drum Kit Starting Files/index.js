/*function fuiClicado() {
    alert("Fui clicado")
}*/

/*
document.querySelector('button').addEventListener("click", fuiClicado);
document.querySelectorAll('button')[1].addEventListener("click", function() {
    alert("Fui clicado também, mas sou uma função anônima")
});
document.querySelectorAll('button')[2].addEventListener("click", fuiClicado);
document.querySelectorAll('button')[3].addEventListener("click", fuiClicado);
document.querySelectorAll('button')[4].addEventListener("click", fuiClicado);
document.querySelectorAll('button')[5].addEventListener("click", fuiClicado);
document.querySelectorAll('button')[6].addEventListener("click", fuiClicado);*/

var numeroDeBaterias = document.querySelectorAll('.drum').length

for(var i = 0; i < numeroDeBaterias; i++) {
    /*document.querySelectorAll('.drum')[i].addEventListener('click', fuiClicado)*/
    document.querySelectorAll('.drum')[i].addEventListener("click", function() {
        //this.style.color = 'white'
        var buttonInnerHTML = this.innerHTML;

        makeSound(buttonInnerHTML);

        buttonAnimation(buttonInnerHTML)
        
    })

}

document.addEventListener('keydown', function(event) {
    makeSound(event.key)
    buttonAnimation(event.key)
})

function makeSound(key) {
    switch (key) {
        case 'w':
            var crash = new Audio('sounds/crash.mp3')
            crash.play();
            break;

        case 'a':
            var kick_bass = new Audio('sounds/kick-bass.mp3')
            kick_bass.play()
            break;

        case 's':
            var snare = new Audio('sounds/snare.mp3')
            snare.play()
            break;

        case 'd':
            var tom1 = new Audio('sounds/tom-1.mp3')
            tom1.play()
            break;
        case 'j':
            var tom2 = new Audio('sounds/tom-2.mp3')
            tom2.play()
            break;
        case 'k':
            var tom3 = new Audio('sounds/tom-3.mp3')
            tom3.play()
            break;
        case 'l':
            var tom4 = new Audio('sounds/tom-4.mp3')
            tom4.play()
            break;

        
    
        default:
            console.log(buttonInnerHTML)
            break;
    }
}


document.querySelector('#testandoEvent').addEventListener('click', function(event) {
    
    document.querySelector('#testandoEvent').classList.add('pressed')
    setTimeout(function() {
        document.querySelector('#testandoEvent').classList.remove('pressed')
    }, 2000)
})

function buttonAnimation (currentKey) {
    var activeButton = document.querySelector('.' + currentKey)
    activeButton.classList.add('pressed')
    
    
    setTimeout (function() {
        activeButton.classList.remove('pressed');}, 250)
}

/*function CandidatosEmprego(name, age, languages, workLicense) {
    this.name = name;
    this.age = age;
    this.languages = languages ; 
    this.workLicense = workLicense;
}

var candidato1 = new CandidatosEmprego('João', 20, ["Português", "Inglês"], true)
var candidato2 = new CandidatosEmprego('Felipe', 24, ["Português", "Inglês"], false)
var candidato3 = new CandidatosEmprego('Augusto', 29, ["Português", "Inglês"], true)

console.log(candidato1)
console.log(candidato2)
console.log(candidato3)*/

