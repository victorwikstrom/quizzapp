class GameOverView {
  private gameWrapper: HTMLElement;
  private restartGame: HTMLElement;
  private highScore: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    this.gameWrapper.classList.add("over-view", "game-wrapper");

    this.gameWrapper.innerText = "Correct! Do you want to play again???";

    this.highScore = document.createElement("div");
    this.highScore.classList.add("view-highscore");
    this.highScore.innerHTML = "Feast your eyes on your score:";

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

    //Sends player back to startview
    this.getLocalStorage();
    document.body.appendChild(this.gameWrapper);
    this.restartGame.addEventListener("click", () => {
      location.reload();
    });
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }

  private getLocalStorage() {
    let scoreLS = JSON.parse(localStorage.getItem("score"));
    let highScoreLS = JSON.parse(localStorage.getItem("highscore"));

    let printScore =
      "Name: " + scoreLS.player + " | " + "Score: " + scoreLS.score;

    this.highScore.innerHTML =
      "Feast your eyes on your score: " + printScore + "<br>" + "HighScore:";

    let highScoreTable = document.createElement("table");

    let th1 = document.createElement("th");
    let th2 = document.createElement("th");

    th1.innerText = "Name";
    th2.innerText = "Score";

    highScoreTable.appendChild(th1);
    highScoreTable.appendChild(th2);

    for (const hs of highScoreLS) {
      let tr = document.createElement("tr");
      let cell1 = document.createElement("td");
      let cell2 = document.createElement("td");

      cell1.innerHTML = hs.player;
      cell2.innerHTML = hs.score;

      tr.appendChild(cell1);
      tr.appendChild(cell2);

      highScoreTable.appendChild(tr);

      let rows: any,
        switching: boolean,
        i: number,
        x: HTMLTableElement,
        y: HTMLTableElement,
        shouldSwitch: boolean;

      switching = true;
      shouldSwitch = false;

      while (switching) {
        switching = false;
        rows = highScoreTable.rows;

        for (i = 1; i < rows.length - 1; i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[1];
          y = rows[i + 1].getElementsByTagName("TD")[1];

          if (Number(x.innerHTML) > Number(y.innerHTML)) {
            shouldSwitch = true;
            break;
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }

      this.highScore.append(highScoreTable);
    }
  }
}
