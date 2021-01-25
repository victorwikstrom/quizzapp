class GameOverView {
  private gameWrapper: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
  }

  public show() {
    document.body.appendChild(this.gameWrapper);
    this.run();
  }

  public hide() {
    document.body.removeChild(this.gameWrapper);
  }
  public run() {}
}
