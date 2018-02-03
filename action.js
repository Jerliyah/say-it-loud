/* ====== DOM Grab ====== */
const voice_list = document.querySelector('select');

const options = Array.from( document.querySelectorAll('input') );
const rate = document.querySelector('#rate');
const pitch = document.querySelector('#pitch');

const input = document.querySelector('textarea');
const say_btn = document.querySelector('button#say');
const clear_btn = document.querySelector('button#clear');





/* ====== Variables ====== */
rate.min = 0.5;
rate.max = 2;
rate.step = 0.1;
rate.value = 1;

pitch.min = 0.1;
pitch.max = 2;
pitch.step = 0.1;
pitch.value = 1;

var message = new SpeechSynthesisUtterance();
var voices = []

message.text = "I'm black, and I'm proud"



/* ====== Functions ====== */

function clear_text(e) {
    e.preventDefault();
    input.value = '';

}

function populate_voices() {
    voices = this.getVoices();
    
    voice_list.innerHTML = voices.map( (voice, index) => {
                              return `<option value="${voice.name}" ${index == 1 ?  'selected': ''}> 
                                        ${voice.name} (${voice.lang}) 
                                      </option>`
                          }).join('')
}

function toggle() {
    speechSynthesis.cancel();
    speechSynthesis.speak(message);
}

function say_text(e) {
    e.preventDefault()
    message.text = input.value;
    console.log(message.text)
    toggle()
}

function set_voice() {
    message.voice = voices.find( (voice) => voice.name === this.value );
    toggle()
}

function set_option() {
    message[this.id] = this.value;
    toggle()
}


/* ====== Events ====== */

speechSynthesis.addEventListener('voiceschanged', populate_voices)

voice_list.addEventListener('change', set_voice)

options.forEach( (option) => option.addEventListener('change', set_option) )

say_btn.addEventListener('click', say_text)

clear_btn.addEventListener('click', clear_text)


toggle()