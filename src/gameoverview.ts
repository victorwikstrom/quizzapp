class GameOverView {
  private gameWrapper: HTMLElement;

  constructor() {
    this.gameWrapper = document.createElement("div");
    document.body.appendChild(this.gameWrapper);
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
