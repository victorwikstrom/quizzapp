class GameState {
  currentView: "start" | "game" | "over";
  startView: StartView;
  gameView: GameView;
  gameOverView: GameOverView;

  constructor() {
    this.currentView = "start";
    this.startView = new StartView();
    this.gameView = new GameView();
    this.gameOverView = new GameOverView();
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
