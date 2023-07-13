// Some variables
let tone = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let isGameOver = false;

// By defaul turn
let turn = "X";

// Changing turn for both user
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// continuesly cheacking, 
const checkWin = () => {

    // Getting all boxes
    let boxtext = document.getElementsByClassName("boxtext");
    console.log(boxtext[2].innerText);

    // Winning combinations
    let winPossibility = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // Cheacking each and every winning combination with boxes
    winPossibility.forEach((e) => {

        // Comparing boxes with combination
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && boxtext[e[0]].innerText !== "") {
            
            // When one user won
            isGameOver = true
            document.getElementById("turn").innerHTML = `${boxtext[e[0]].innerText} won`;
            gameover.play()
        }
    })
}

// Getting the all div-element, which class name is "box" HTMLCollections
let boxes = document.querySelectorAll(".box");

// Making them all array and targeting one div-element of array
Array.from(boxes).forEach((element) => {

    // When someone click on any div-element
    element.addEventListener("click", (event) => {

        // Getting span-tag fromn that div-element
        let boxtext = element.querySelector(".boxtext");

        // If something is not in span-tag
        if (boxtext.innerHTML === "") {

            // Put value inside
            boxtext.innerHTML = turn;

            // Change the value for second user
            turn = changeTurn();

            // play tone
            tone.play()

            // Until game over is false
            if (!isGameOver) {
                document.getElementById("turn").innerHTML = `Turn for ${turn}`;
                checkWin()
            }   
        }
    })
});


// When someone click on reset button
document.getElementById("reset").addEventListener("click", (event) => {

    // Selecting all snap-tag
    let boxtext = document.querySelectorAll(".boxtext");

    // Making it array and targeting each and every span tag
    Array.from(boxtext).forEach((element) => {
        
        // Clearing
        isGameOver = false
        document.getElementById("turn").innerHTML = `Turn for ${turn}`;

        // Each and every span tag
        element.innerText = ""
    })
})