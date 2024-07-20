let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;//playerX, playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked");
        // player O
        if(turnO){
            box.classList.remove("red");
            box.innerText = "O";
            box.classList.add("blue");
            turnO = false;
        }
        // player X
        else{
            box.classList.remove("blue");
            box.innerText = "X";
            box.classList.add("red");
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        
    }
}

const Draw = ()=>{
    msg.innerText = "Match Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
}


const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = ()=>{
    let count = 0;
    for(let pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // );
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner is", pos1Val);
                showWinner(pos1Val);
            }else{
                count++;
            }
        }
    }
// Checking if all the winning patterns did't work for the Draw condition.
    if(count === winPatterns.length){
        Draw();
    }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);