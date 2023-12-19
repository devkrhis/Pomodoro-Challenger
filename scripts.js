const pomodoroBtn = document.querySelector("#pomodoroTime")
const pausaCurtaBtn = document.querySelector("#pauseShortBreak")
const pausaLongaBtn = document.querySelector("#pauseLongBreak")
const tempo = document.querySelector("#timer")
const playStop = document.querySelector("#playStop")
const stopPlay = document.querySelector("#stopPlay")

const fraseTempo = document.querySelector('.conteudo__tempo h1')

const buttonClick = new Audio('./sounds/button-click.mp3')
const pauseOn = new Audio('./sounds/pauseOn.ogg')
const pauseOff = new Audio('./sounds/pauseOff.ogg')
const musicFim = new Audio('./sounds/musicfinal.wav')


let tempoSemFormato = 1500
let intervaloID = null

pomodoroBtn.addEventListener('click', () => {
    tempoSemFormato = 1500
    buttonClick.play()
    musicFim.pause()
    fraseTempo.innerHTML = "Tempo: "
    mostrandoTempo()
    clearInterval(intervaloID)
    
})

pausaCurtaBtn.addEventListener('click', () => {
    tempoSemFormato = 300
    buttonClick.play()
    musicFim.pause()
    fraseTempo.innerHTML = "Tempo De Descanso Curto: "
    mostrandoTempo()
    clearInterval(intervaloID)

})

pausaLongaBtn.addEventListener('click', () => {
    tempoSemFormato = 900
    buttonClick.play()
    musicFim.pause()
    fraseTempo.innerHTML = "Tempo De Descanso Longo: "
    mostrandoTempo()
    clearInterval(intervaloID)
})

function mostrandoTempo(){
    let date = new Date(tempoSemFormato * 1000)
    let minutes = date.getUTCMinutes()
    let secods = date.getSeconds()
    let tempoFormatado = minutes.toString().padStart(2, '0') + ':' + secods.toString().padStart(2, '0');
    tempo.innerHTML = `${tempoFormatado}`
}
mostrandoTempo()

function diminuindoSegundos(){
    tempoSemFormato -= 1
    console.log(tempoSemFormato)
    if(tempoSemFormato <= 0){
        fimDoTempo()
        clearInterval(intervaloID)
    }
    mostrandoTempo()
}

playStop.addEventListener('click', () => {
    pauseOn.play()
    musicFim.pause()
    clearInterval(intervaloID)
    intervaloID = setInterval(diminuindoSegundos, 1000);
    if(tempoSemFormato <= 0){
        fimDoTempo()
        musicFim.pause()
        clearInterval(intervaloID)
    }
})

stopPlay.addEventListener('click', () => {
    pauseOff.play()
    musicFim.pause()
    clearInterval(intervaloID)
})

function fimDoTempo(){
    musicFim.play()
}


