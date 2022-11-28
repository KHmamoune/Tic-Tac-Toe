const wincons = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const grid = document.querySelector(".board")
const start = document.querySelector(".start")
const marks = ["X", "O"]
let players = []
let board = []
let tie = false
let win = true
let turn = 0

const gameSlot = (ind) => {
    const index = ind
    let mark = ""

    return{mark, index}
}

const player = (n, m) => {
    const name = n
    const mark = m

    return {name, mark}
}

const gameBoard = (() => {    
    const startGame = () => {
        win = false
        tie = false
        for(let i=0; i<9; i++){
            board[i][0].mark = ""
        }
        gameBoard.displaySlots()
        gameBoard.createPlayers()
    }

    const createPlayers = () => {
        const r = Math.floor(Math.random()*2)
        const player1 = player(prompt("player1 name:"), marks[r])
        const player2 = player(prompt("player2 name:"), marks[1-r])
        players = [player1, player2]
    }

    const createBoard = () => {
        for(let i=0; i<9; i++){
            const slot = document.createElement("div")
            const slotD = gameSlot(i)
            board.push([slotD, slot])
            slot.classList.add("slot")
            slot.addEventListener("mousedown", () => update(slotD.index))
            grid.appendChild(slot)
        }
    }

    const displaySlots = () => {
        for(let i=0; i<9; i++){
            board[i][1].textContent = board[i][0].mark
        }

        gameBoard.checkWin()
        if(win || tie){
            gameBoard.endGame()
        }else{
            gameBoard.switchTurn()
        }
    }

    const switchTurn = () => {
        if(turn == 1){
            turn = 0
        }else{
            turn = 1
        }
    }

    const checkWin = () => {
        for(let i=0; i<8; i++){
            cons = wincons[i]
            if(board[cons[0]][0].mark != ""){   
                if(board[cons[0]][0].mark == board[cons[1]][0].mark && board[cons[0]][0].mark == board[cons[2]][0].mark){
                    win =  true
                }
            }
        }

        for(let i=0; i<9; i++){
            if(board[i][0].mark == ""){
                return
            }
        }
        tie = true
    }

    const endGame = () => {
        if(tie && !win){
            alert("it's a tie")
        }else{
            alert(players[turn].name + " wins")
        }

        for(let i=0; i<9; i++){
            board[i][1].removeEventListener("mousedown", update)
        }
    }

    return{startGame, createPlayers, createBoard, displaySlots, switchTurn, checkWin, endGame}
})()

function update(index){
    if(board[index][0].mark == "" && win == false){
        board[index][0].mark = players[turn].mark
        gameBoard.displaySlots()
    }
}

start.addEventListener("click", () => {
    gameBoard.startGame()
    start.textContent = "Restart Game"
})
gameBoard.createBoard()