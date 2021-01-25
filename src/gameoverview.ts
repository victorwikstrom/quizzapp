class GameOverView {
  private gameWrapper: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
  }

  public run() {
    document.body.appendChild(this.gameWrapper);
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
}
