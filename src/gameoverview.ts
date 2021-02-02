class GameOverView {
  private gameWrapper: HTMLElement;
  private restartGame: HTMLElement;
  private highScore: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("over-view", "game-wrapper");

    this.highScore = document.createElement("div");
    this.highScore.classList.add("view-highscore");

    // Creates a button and offers the player the option to play again (Funkar ej)
    this.restartGame = document.createElement("button");
    this.restartGame.classList.add("all-buttons");
    this.restartGame.innerHTML = "PLAY AGAIN";

    this.gameWrapper.appendChild(this.highScore);

    this.gameWrapper.appendChild(this.restartGame);
  }

  public run() {
    this.gameWrapper.appendChild(gameState.soundBar);
    this.gameWrapper.appendChild(gameState.logoImage);
    gameState.logoImage.classList.add("logo-img-absolute");

    this.updateText();
    this.getHighScoreFromLS();
    document.body.appendChild(this.gameWrapper);
    this.restartGame.addEventListener("click", () => {
      location.reload();
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  private updateText() {
    let scoreLS = JSON.parse(localStorage.getItem("score"));

    if (gameState.winner == gameState.playerName) {
      this.highScore.innerHTML =
        "Good job, " +
        scoreLS.player +
        ". Feast your eyes on your score: " +
        scoreLS.score;
    } else {
      this.highScore.innerText = gameState.winner + " won!";
    }
  }

  private getHighScoreFromLS() {
    let highScoreLS = JSON.parse(localStorage.getItem("highscore"));
    let highScoreTable = document.createElement("table");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");

    th1.innerText = "Name";
    th2.innerText = "Score";

    highScoreTable.appendChild(th1);
    highScoreTable.appendChild(th2);

    let highScoreTop5;

    if (highScoreLS !== null) {
      highScoreLS.sort((a: any, b: any) => a.score - b.score);
      highScoreTop5 = highScoreLS.slice(0, 5);
    } else {
      highScoreTop5 = [];
    }

    for (const hs of highScoreTop5) {
      let tr = document.createElement("tr");
      let cell1 = document.createElement("td");
      let cell2 = document.createElement("td");

      cell1.innerHTML = hs.player;
      cell2.innerHTML = hs.score;

      tr.appendChild(cell1);
      tr.appendChild(cell2);

      highScoreTable.appendChild(tr);
    }

    this.highScore.append(highScoreTable);
  }
}
