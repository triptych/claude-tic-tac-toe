const gameBoard = document.getElementById("game-board");
const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");
const loadButton = document.getElementById("load");
const saveStatus = document.getElementById("save-status");
const startGameButton = document.getElementById("start-game");
const gameContainer = document.getElementById("game-container");

let currentPlayer = "🦄";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let hoverSound, clickSound, winSound;

function initializeGame() {
	hoverSound = new Audio(
		"data:audio/wav;base64,UklGRnQGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YU8GAACA/4D/gP+A/4D/gP+A/4D/gf+H/53/zf/7/xoAHAAYABQAEQAOAAwACwAKAAoACgAKAAsADAAMAA0ADgAPAA8AEAAQABEAEQASABMAEwATABQAFAAVABUAFQAWABYAFgAXABcAFwAYABgAGAAYABkAGQAZABkAGgAaABoAGgAaABsAGwAbABsAGwAbABwAHAAcABwAHAAcABwAHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAfAB8AHwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdABwAHAAcABwAHAAcABwAHAAcABwAGwAbABsAGwAbABsAGwAbABoAGgAaABoAGgAaABoAGQAZABkAGQAZABkAGAAYABgAGAAYABcAFwAXABcAFwAWABYAFgAWABYAFQAVABUAFQAUABQAFAAUABMAEwATABMAEgASABIAEgARABEAEQARABAAEAAQABAADwAPAA8ADwAOAA4ADgAOAA0ADQANAAwADAAMAAwACwALAAsACwAKAAoACgAKAAkACQAJAAgACAAIAAcABwAHAAcABgAGAAYABQAFAAUABAAEAAQAAwADAAMAAgACAAIAAQABAAAAAAAAAP///v/+//7//f/9//3//P/8//v/+//6//r/+v/5//n/+P/4//f/9//3//b/9v/1//X/9P/0//P/8//y//L/8v/x//H/8P/w/+//7//u/+7/7f/t/+z/7P/r/+v/6v/q/+n/6f/o/+j/5//n/+b/5v/l/+X/5P/k/+P/4//i/+L/4f/h/+D/4P/f/9//3v/e/93/3f/c/9z/2//b/9r/2v/Z/9n/2P/Y/9f/1//W/9b/1f/V/9T/1P/T/9P/0v/S/9H/0f/Q/9D/z//P/87/zv/N/83/zP/M/8v/y//K/8r/yf/J/8j/yP/H/8f/xv/G/8X/xf/E/8T/w//D/8L/wv/B/8H/wP/A/7//v/++/77/vf+9/7z/vP+7/7v/uv+6/7n/uf+4/7j/t/+3/7b/tv+1/7X/tP+0/7P/s/+y/7L/sf+x/7D/sP+v/6//rv+u/63/rf+s/6z/q/+r/6r/qv+p/6n/qP+o/6f/p/+m/6b/pf+l/6T/pP+j/6P/ov+i/6H/of+g/6D/n/+f/57/nv+d/53/nP+c/5v/m/+a/5r/mf+Z/5j/mP+X/5f/"
	);
	clickSound = new Audio(
		"data:audio/wav;base64,UklGRqQDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YX8DAACA/4D/gP+A/4H/h/+d/83/+/8aABAAAgD9//v/+//9/wMADgAYACEAJwAqACsAKQAlAB8AFgALAP7/8P/h/9P/xP+3/67/qP+l/6X/qP+u/7b/wf/P/97/7v/+/w4AHQAqADYAQABIAE4AUgBUAFMAUABLAEQAPAAxACQAFgAIAPn/6//d/9D/xP+6/7H/q/+n/6X/pf+n/6v/sP+4/8H/zP/Y/+X/8//+/wkAEwAcACQAKgAvADIANAAzADIALwAqACMAGwATAAkA///1/+v/4f/Y/8//x/+//7n/tP+w/67/rf+t/67/sf+0/7n/v//G/83/1f/e/+f/7//3////BgAMABEAFQAYABoAGwAaABkAFwATAA8ACQADAPoA8QDoAN8A1wDQAMkAwwC+ALkAtQCyAK8ArQCtAK0ArgCwALMAtwC7AMAAyADOANYA3gDmAO4A9QD7AAEBBwELAQ8BEQEUARUBFAEUARMBEAEOAQsBCQEFAQIB/gD6APYA8gDtAOoA5QDhAN0A2gDXANUA1ADUANMAzwDGALsAswCwALEAtgC8AMUAzADQANIAzgDJAMUAwAC8ALkAtwC1ALUAtgC4ALsAvgDBAMUAygDOANMA2ADcAOEA5QDnAOgA5wDlAOMA3wDbANcA0gDNAMcAwQC7ALUArwCpAKQAngCZAJQAkACNAIsAiQCJAIgAhwCHAIcAiACJAIoAjACOAJAAlACYAJwAoAClAKoArgCxALUAuAC6ALwAvAC9AL0AvAC6ALgAtQCyAK4AqgCmAKEAnACXAJIAjQCJAIQAfwB8AHgAdQByAG8AbQBrAGkAaABnAGcAZwBnAGgAaQBrAGwAbgBxAHMAdgB6AH0AgQCFAIkAjACRAJQAmACcAJ8AogCkAKYApwCnAKcApQCkAKIAnwCcAJgAkwCPAIoAhAB/AHkAdABuAGgAYwBdAFgAUwBNAEgAQwA/ADsANwA0ADEALwAtACwAKwAqACsAKwAsAC0ALwAxADMANwA5AD0AQQBFAEoATwBTAFgAXQBhAGYAagBvAHIAdwB6AH0AgACCAIQAhgCHAIcAhwCGAIQAgwCAAH4AewB4AHQAcABsAGgAYwBfAFoAVQBQAEwARwBDAD4AOgA2ADMALwAsACkAJgAkACIAIAAeAB0AHAAcABwAGwAbABwAHAAdAB8AIAAiACQAJgAoACoALQAwADMANgA5ADwAPwBCAEUASABLAE0AUABSAFQAVgBYAFkAWgBcAFwAXQBdAF4AXgBeAF0AXQBcAFsAWgBYAFcAVQBTAFEATwBMAEkARwBE"
	);
	winSound = new Audio(
		"data:audio/wav;base64,UklGRrQHAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YY8HAACA/3j/cf9q/2T/Xv9Z/1X/Uv9R/1D/Uf9T/1f/XP9i/2n/cf96/4P/jf+X/6H/q/+1/7//yP/R/9n/4P/m/+v/7v/w//H/8f/w/+3/6f/k/93/1v/O/8X/u/+x/6b/nP+S/4j/fv91/2z/ZP9d/1f/Uv9O/0v/Sv9K/0v/Tf9Q/1T/Wf9f/2X/bP9z/3r/gv+K/5L/m/+j/6v/s/+6/8H/x//M/9D/1P/W/9f/1//W/9T/0P/M/8f/wf+7/7T/rf+m/5//mP+R/4v/hf9//3r/df9x/23/av9o/2f/Zv9m/2f/aP9q/2z/b/9y/3X/ef99/4H/hf+J/43/kf+V/5n/nf+g/6P/pf+n/6j/qf+p/6j/p/+l/6P/oP+d/5n/lf+R/43/if+F/4H/ff95/3b/c/9w/27/bP9r/2r/af9p/2n/af9q/2v/bP9t/27/cP9x/3L/c/90/3X/dv93/3j/eP95/3n/ef95/3n/eP93/3b/df9z/3L/cP9u/2z/af9n/2T/Yv9f/13/W/9Z/1f/Vv9V/1T/U/9T/1P/U/9U/1X/Vv9X/1j/Wv9b/13/Xv9g/2H/Yv9j/2T/ZP9k/2T/Y/9i/2H/X/9d/1v/WP9V/1L/T/9M/0j/Rf9C/z//PP85/zf/Nf80/zP/M/8z/zT/Nf82/zj/Ov88/z//Qf9E/0f/Sv9N/0//Uv9U/1b/V/9Y/1j/WP9X/1b/VP9S/0//TP9J/0X/Qf89/zn/NP8w/yz/KP8k/yH/Hv8c/xr/Gf8Y/xj/Gf8a/xv/Hf8f/yH/JP8n/yr/Lf8w/zP/Nv84/zr/O/88/zz/PP87/zr/OP82/zP/MP8t/yr/Jv8i/x7/Gv8W/xL/D/8M/wn/B/8F/wT/A/8D/wP/BP8F/wb/CP8K/wz/D/8S/xX/GP8b/x7/If8j/yX/J/8o/yj/KP8n/yb/JP8i/x//HP8Y/xT/EP8M/wj/BP///vv+9/7z/vD+7f7r/un+6P7o/uj+6f7q/uz+7v7w/vP+9v75/vz+//4C/wX/CP8K/wz/Df8O/w7/Df8M/wr/CP8F/wL//f75/vT+7/7q/uX+3/7a/tb+0v7O/sv+yf7H/sb+xv7H/sj+yv7M/s/+0v7W/tr+3v7i/ub+6v7t/vD+8v7z/vT+9P7z/vL+8P7t/ur+5v7i/t3+2P7T/s3+yP7C/r3+uP60/rD+rf6q/qj+p/6m/qb+p/6o/qr+rP6v/rL+tf65/r3+wf7F/sn+zP7P/tH+0v7T/tP+0v7R/s/+zP7J/sX+wf68/rf+sv6t/qj+o/6e/pr+lv6S/o/+jP6K/on+iP6I/oj+if6K/oz+jv6R/pT+l/6b/p/+o/6n/qv+rv6w/rL+s/6z/rP+sv6w/q7+q/6o/qT+oP6c/pf+kv6N/oj+g/5//nr+dv5y/m/+bP5q/mj+Z/5n/mf+aP5p/mv+bf5v/nL+df54/nv+f/6C/oX+iP6K/oz+jf6N/o3+jP6L/oj+hv6C/n/+e/53/nL+bf5o/mP+Xv5Z/lX+Uv5P/kz+Sv5J/kj+SP5J/kn+Sv5M/k7+UP5T/lb+Wf5c/l/+Yv5l/mj+av5r/mz+bP5r/mr+aP5m/mP+YP5c/lj+VP5P/kv+Rv5B/jz+OP40/jH+Lv4s/iv+Kv4q/ir+K/4s/i3+L/4x/jP+Nv45/jz+P/5C/kX+R/5J/kr+S/5L/kr+Sf5H/kX+Qv4//jv+N/4y/i3+KP4j/h7+Gf4V/hH+Df4K/gj+Bv4F/gX+Bf4G/gf+CP4K/gz+D/4S/hX+GP4b/h7+If4j/iX+Jv4n/if+Jv4l/iP+If4e/hv+F/4T/g/+Cv4F/gH+/P33/fP97/3s/en95v3l/eT95P3k/eX95v3o/er97P3v/fL99f34/fv9/v0A/gL+BP4F/gb+Bv4F/gT+Av4A/v39+f31/fH97f3o/eP93v3a/db90v3P/cz9yv3I/cf9x/3H/cj9yf3L/c39z/3S/dX92P3b/d794f3j/eX95v3m/eb95f3j/eH93v3b/df90/3P/cr9xf3A/bv9tv2y/a79q/2o/ab9pP2j/aP9o/2k/aX9p/2p/az9r/2y/bX9uf28/b/9wv3E/cb9x/3H/cf9xv3F/cP9wP2+/br9tv2y/a39qP2j/Z/9mv2W/ZL9j/2M/Yr9iP2H/Yf9h/2H/Yj9iv2M/Y/9kv2V/Zj9nP2g/aP9p/2q/az9rv2v/a/9r/2u/a39q/2p/ab9o/2f/Zv9l/2T/Y/9iv2G/YL9f/17/Xj9df1z/XH9cP1v/W/9cP1w/XH9c/10/Xb9eP16/Xz9f/2B/YP9hf2H/Yj9iP2I/Yj9h/2F/YP9gf1+/Xv9eP10/XD9bP1o/WT9YP1c/Vj9Vf1S/VD9T/1O/U79T/1Q/VH9U/1V/Vf9Wv1d/WD9Y/1m/Wn9bP1u/XD9cf1x/XH9cf1v/W79bP1p/Wb9Y/1f/Vv9V/1T/U/9S/1H/UP9QP09/Tv9Ov05/Tn9Of06/Tv9PP0+/UD9Q/1G/Un9TP1P/VL9VP1W/Vf9WP1Y/Vj9V/1W/VT9Uv1P/Uz9SP1E/UD9PP04/TT9MP0s/Sn9Jv0k/SL9If0h/SH9If0i/SP9Jf0n/Sn9LP0v/TL9Nf04/Tv9Pf0//UH9Qv1C/UL9Qf1A/T79PP05/Tb9M/0v/Sv9J/0j/R/9G/0X/RP9EP0N/Qv9Cf0I/Qj9CP0J/Qr9DP0O/RD9E/0W/Rn9HP0f/SL9JP0m/Sf9KP0o/Sj9J/0m/SX9I/0g/R39Gv0W/RL9Dv0K/Qb9Av3+/Pr89/z0/PH87/zu/O387fzt/O787/zx/PP89vz4/Pv8/vwB/QT9B/0J/Qv9DP0N/Q39DP0L/Qn9B/0E/QH9/fz5/PX88fzt/On85fzh/N380/zQ/M38y/zK/Mn8yfzK/Mv8zfzP/NH81PzX/Nr83fzg/OP85vzo/Or86/zr/Ov86fzo/OX84vze/Nr81fzR/Mz8x/zC/L38uPy0/LD8rfyq/Kj8p/ym/Kb8p/yo/Kn8q/yt/LD8s/y2/Ln8vPy//ML8xPzG/Mf8x/zH/Mb8xfzD/MH8vvy6/Lb8sfyt/Kj8pPyf/Jv8l/yT/JD8jfyL/In8iPyI/Ij8ifyK/Iz8j/yR/JT8l/ya/J38oPyj/Kb8qPyq/Kv8q/yr/Kr8qPym/KP8oPyc/Jj8lPyP/Ir8hfyB/Hz8ePx0/HD8bfxq/Gj8Z/xm/Gb8Z/xo/Gn8a/xt"
	);

	gameContainer.style.display = "block";
	// Add a small delay before adding the 'show' class to trigger the transition
	setTimeout(() => {
		gameContainer.classList.add("show");
	}, 50);
	startGameButton.style.display = "none";

	cells.forEach((cell) => {
		cell.addEventListener("click", handleCellClick);
		cell.addEventListener("mouseenter", () => {
			if (cell.textContent === "" && gameActive) {
				hoverSound.play();
			}
		});
	});
	restartButton.addEventListener("click", restartGame);
	loadButton.addEventListener("click", loadGameState);

	status.textContent = `${currentPlayer}'s turn`;

	// Check for a saved game state
	const savedGameState = localStorage.getItem("ticTacToeGameState");
	if (savedGameState) {
		loadGameState();
	}
}

function handleCellClick(clickedCellEvent) {
	const clickedCell = clickedCellEvent.target;
	const clickedCellIndex = parseInt(
		clickedCell.getAttribute("data-cell-index")
	);

	if (gameState[clickedCellIndex] !== "" || !gameActive) {
		return;
	}

	gameState[clickedCellIndex] = currentPlayer;
	clickedCell.textContent = currentPlayer;
	clickSound.play();
	checkResult();
	saveGameState();
}

function checkResult() {
	let roundWon = false;
	for (let i = 0; i < winningConditions.length; i++) {
		const [a, b, c] = winningConditions[i];
		if (
			gameState[a] &&
			gameState[a] === gameState[b] &&
			gameState[a] === gameState[c]
		) {
			roundWon = true;
			cells[a].classList.add("winner");
			cells[b].classList.add("winner");
			cells[c].classList.add("winner");
			break;
		}
	}

	if (roundWon) {
		status.textContent = `${currentPlayer} wins!`;
		gameActive = false;
		winSound.play();
		return;
	}

	if (!gameState.includes("")) {
		status.textContent = "It's a draw!";
		gameActive = false;
		return;
	}

	currentPlayer = currentPlayer === "🦄" ? "🌈" : "🦄";
	status.textContent = `${currentPlayer}'s turn`;
}

function restartGame() {
	currentPlayer = "🦄";
	gameState = ["", "", "", "", "", "", "", "", ""];
	gameActive = true;
	status.textContent = `${currentPlayer}'s turn`;
	cells.forEach((cell) => {
		cell.textContent = "";
		cell.classList.remove("winner");
	});
	localStorage.removeItem("ticTacToeGameState");
	showSaveStatus("Game restarted");
}

function saveGameState() {
	const gameStateData = {
		currentPlayer,
		gameState,
		gameActive
	};
	localStorage.setItem("ticTacToeGameState", JSON.stringify(gameStateData));
	showSaveStatus("Game saved");
}

function loadGameState() {
	const savedGameState = localStorage.getItem("ticTacToeGameState");
	if (savedGameState) {
		const { currentPlayer: savedPlayer, gameState: savedState, gameActive: savedActive } = JSON.parse(savedGameState);
		currentPlayer = savedPlayer;
		gameState = savedState;
		gameActive = savedActive;
		status.textContent = gameActive ? `${currentPlayer}'s turn` : (gameState.includes("") ? `${currentPlayer} wins!` : "It's a draw!");
		cells.forEach((cell, index) => {
			cell.textContent = gameState[index];
			cell.classList.remove("winner");
		});
		checkWinningCondition();
		showSaveStatus("Game loaded");
	} else {
		showSaveStatus("No saved game found!");
	}
}

function checkWinningCondition() {
	for (let i = 0; i < winningConditions.length; i++) {
		const [a, b, c] = winningConditions[i];
		if (
			gameState[a] &&
			gameState[a] === gameState[b] &&
			gameState[a] === gameState[c]
		) {
			cells[a].classList.add("winner");
			cells[b].classList.add("winner");
			cells[c].classList.add("winner");
			break;
		}
	}
}

function showSaveStatus(message) {
	saveStatus.textContent = message;
	saveStatus.style.opacity = "1";
	setTimeout(() => {
		saveStatus.style.opacity = "0";
	}, 2000);
}

startGameButton.addEventListener("click", initializeGame);
