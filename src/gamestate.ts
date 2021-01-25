class GameState {
  currentView: "start" | "game" | "over";
  startView: StartView;
  gameView: GameView;
  GameOverView: GameOverView;

  constructor() {
    this.currentView = "game";
    this.startView = new StartView();
    this.gameView = new GameView();
    this.GameOverView = new GameOverView();
  }

  public runGame() {
    if (this.currentView === "start") {
      this.startView.show();
      this.startView.run();
    }
    if (this.currentView === "game") {
      this.gameView.show();
      this.gameView.run();
    }
    if (this.currentView === "over") {
      this.GameOverView.show();
      this.GameOverView.run();
    }
  }

  public updateView(view: "start" | "game" | "over") {
    this.currentView = view;

    if (this.currentView === "start") {
      this.GameOverView.hide();
      this.gameView.hide();
      this.startView.show();
    } else if (this.currentView === "game") {
      this.GameOverView.hide();
      this.startView.hide();
      this.gameView.show();
    } else if (this.currentView === "over") {
      this.gameView.hide();
      this.startView.hide();
      this.GameOverView.show();
    }
  }
}
