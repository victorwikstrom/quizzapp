class GameState {
  currentView: "start" | "game" | "over";
  startView: StartView;
  gameView: GameView;
  gameOverView: GameOverView;
  playerName: string;

  winner: string;
  guessCount: number;

  // gameWrapper: HTMLElement;
  backgroundMusic: HTMLAudioElement;
  playButton: HTMLElement;
  pauseButton: HTMLElement;

  soundBar: HTMLElement;
  logoImage: HTMLImageElement;

  constructor() {
    this.currentView = "start";
    this.startView = new StartView();
    this.gameView = new GameView();
    this.gameOverView = new GameOverView();
    this.playerName = "";

    this.winner = "";
    this.guessCount = 0;

    this.soundBar = document.createElement("div");
    this.soundBar.innerHTML = "Music:";
    this.soundBar.classList.add("sound-bar");

    this.playButton = document.createElement("button");
    this.playButton.innerHTML = "On";
    this.playButton.classList.add("sound-buttons");
    this.backgroundMusic = new Audio("./Music/takeonme.mp3");

    this.pauseButton = document.createElement("button");
    this.pauseButton.innerHTML = "Off";
    this.pauseButton.classList.add("sound-buttons");

    this.soundBar.appendChild(this.playButton);
    this.soundBar.appendChild(this.pauseButton);

    this.logoImage = document.createElement("img");
    this.logoImage.src = "./images/logo.png";

    this.playButton.addEventListener("click", () => {
      this.backgroundMusic.play();
    });

    this.pauseButton.addEventListener("click", () => {
      this.backgroundMusic.pause();
    });
  }

  public runGame() {
    if (this.currentView === "start") {
      this.startView.run();
    }
    if (this.currentView === "game") {
      this.gameView.run();
    }
    if (this.currentView === "over") {
      this.gameOverView.run();
    }
  }

  public updateView(view: "start" | "game" | "over") {
    this.currentView = view;

    if (this.currentView === "start") {
      this.gameOverView.hide();
      this.startView.run();
    } else if (this.currentView === "game") {
      this.startView.hide();
      this.gameView.run();
    } else if (this.currentView === "over") {
      this.gameView.hide();
      this.gameOverView.run();
    }
  }
}
