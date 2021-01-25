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
      this.startView.show();
    }
    if (this.currentView === "game") {
      this.gameView.show();
    }
    if (this.currentView === "over") {
      this.gameOverView.show();
    }
  }

  public updateView(view: "start" | "game" | "over") {
    this.currentView = view;

    if (this.currentView === "start") {
      this.gameOverView.hide();
      this.gameView.hide();
      this.startView.show();
    } else if (this.currentView === "game") {
      this.gameOverView.hide();
      this.startView.hide();
      this.gameView.show();
    } else if (this.currentView === "over") {
      this.gameView.hide();
      this.startView.hide();
      this.gameOverView.show();
    }
  }
}
