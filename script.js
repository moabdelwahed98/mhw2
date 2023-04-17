// /* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const CHECKED_IMAGE_URL = "checked.png";
const UNCHECKED_IMAGE_URL = "unchecked.png";
const userAnswers = {};

function opacity(selected){
    const ansewerId = selected.dataset.choiceId;
    const options = selected.parentNode.querySelectorAll('div');
    for (let op of options){
        if (op.dataset.choiceId !== ansewerId){
            op.classList.add('opacity');
            op.querySelector('.checkbox').src = UNCHECKED_IMAGE_URL;
            op.classList.remove('selected');            
        }
    }
}

function selectCharacter(event)
{
    const container = event.currentTarget;
    container.querySelector('.checkbox').src = CHECKED_IMAGE_URL;
    container.classList.add('selected');
    container.classList.remove('opacity');
    opacity(container);

    userAnswers[container.dataset.questionId] = container.dataset.choiceId;
    if (userAnswers.one && userAnswers.two && userAnswers.three){
        for (let box of boxes){
            box.removeEventListener('click', selectCharacter);
        }
        showResults(chooseResult());
    }
}


const boxes = document.querySelectorAll(".choice-grid div");
for (const box of boxes)
{
    box.addEventListener("click", selectCharacter);
}


function chooseResult(){
    if(userAnswers.two === userAnswers.three)
        return userAnswers.two;
    return userAnswers.one;
}

function Reset(){
    for (let info in userAnswers) {
        delete userAnswers[info];
    }
    const hide = document.querySelector('#summary');
    hide.classList.add('hidden');
    for (let box of boxes) {
        box.classList.remove('selected');
        box.addEventListener('click', selectCharacter);
        box.classList.remove('opacity');
        box.querySelector('.checkbox').src = UNCHECKED_IMAGE_URL;
    }
}

function showResults(result){
    const show = document.querySelector('#summary');
    show.querySelector('h1').textContent = RESULTS_MAP[result].title;
    show.querySelector('p').textContent = RESULTS_MAP[result].contents;
    show.classList.remove('hidden');
    const button = document.querySelector('#button');
    button.addEventListener('click', Reset);
}
