
var section = document.querySelector('section');
var editable = document.querySelector('.editable');
var textareaJS = document.querySelector('.playable-js');
var reset = document.getElementById('reset');
var jsCode = textareaJS.value;

function fillCode() {
       console.log('okay1');
    editable.textContent = textareaJS.value;
    section.innerHTML = ' ';
    console.log('okay2');
    try {
        
      eval(editable.textContent);
           console.log('okay3');
    } catch(e) {
           console.log('e====' + e);
      let para = document.createElement('p');
      para.textContent = e;
      section.appendChild(para);
           console.log('okay5');
        
    }
}

reset.addEventListener('click', function () {
    textareaJS.value = jsCode;
    fillCode();
});

textareaJS.addEventListener('input', fillCode);
window.addEventListener('load', fillCode);
