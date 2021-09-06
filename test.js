let ceil = document.querySelectorAll('.tail'),
reset = document.getElementById('reset'),
massege = document.querySelector('.massage'),
player = 'X',
stepCount = 0,
winCombination = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
],
dataX = [],
dataO = [];

let game = document.querySelector('.game');

game.addEventListener('click', currentStep)

function currentStep(e) {
    let ceilArr = Array.prototype.slice.call(ceil);
    let i = ceilArr.indexOf(e.target)
    let num = i + 1;
    if(!e.target.textContent){
        e.target.innerText = player;
        ( player === 'X') ? dataX.push(num) : dataO.push(num);
        if(
            (dataX.length > 2 || dataO.length > 2) &&
            (checkWin(dataX, num) ||checkWin(dataO, num))
            ){
                game.removeEventListener('click', currentStep)
                return (massege.innerText = `Победил игрок${player}`);
            }
        changePlayer();
        stepCount++;
        if(stepCount == 9){
            massege.innerText = 'Ничья'
        }else{
            massege.innerText = `Ходит игрок ${player}`
        }
    }
}

function changePlayer() {
    player === 'X' ? (player = 'O') : (player = 'X');
}

reset.addEventListener('click', function(){
    for(let i in ceil){
        ceil[i].innerText = '';
    }
    player = 'X';
    stepCount = 0;
    dataX = [];
    dataO = [];
    massege.innerText = `Ходит игрок  ${player}`
    game.addEventListener('click', currentStep)
})

function checkWin(arr, num){
    for(let winC of winCombination){
        let count = 0;
        if(winC.indexOf(num) !== -1){
            for(let winNum of winC){
                if(arr.indexOf(winNum) !== -1){
                    count++;
                    if(count === 3){
                        return true;
                    }
                }
            }
            count = 0;
        }
    }
}