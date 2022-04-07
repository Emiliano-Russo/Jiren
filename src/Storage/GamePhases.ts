import { Game } from "../Models/Game";

class Storage {
  private checkLocalSotrage(nameLocalStorage: string): void {
    if (localStorage.getItem(nameLocalStorage) == null) {
      const gameArrStringify = JSON.stringify([]);
      localStorage.setItem(nameLocalStorage, gameArrStringify);
    }
  }

  private getValueLocalStorage(nameLocalStorage: string): any {
    let valueStringlify = localStorage.getItem(nameLocalStorage);
    if (valueStringlify == null) return [];
    const value: Game[] = JSON.parse(valueStringlify);
    return value;
  }

  private setValueLocalStorage(nameLocalStorage: any, value: any): void {
    localStorage.setItem(nameLocalStorage, JSON.stringify(value));
  }

  private addGameToPhase(game: Game, phase: string) {
    this.checkLocalSotrage(phase);
    const gamePhasesArr = this.getValueLocalStorage(phase);
    //if (!gamePhasesArr.includes(game)) gamePhasesArr.push(game); // problem
    if (gamePhasesArr.length == 0) {
      gamePhasesArr.push(game);
    } else {
      const gameInList = gamePhasesArr.some((x: Game) => x.title == game.title);
      if (!gameInList) gamePhasesArr.push(game);
    }

    this.setValueLocalStorage(phase, gamePhasesArr);
  }

  private setGameList(games: Game[], phase: string) {
    this.checkLocalSotrage(phase);
    const gamePhasesArr = this.getValueLocalStorage(phase);
    this.setValueLocalStorage(phase, games);
  }

  private removeGameFromPhase(gameTitle: string, phase: string) {
    this.checkLocalSotrage(phase);
    const gamePhasesArr = this.getValueLocalStorage(phase);
    const index = gamePhasesArr.findIndex((x: Game, fromIndex: number) => {
      return x.title == gameTitle;
    });
    if (index >= 0) {
      gamePhasesArr.splice(index, 1);
    }
    this.setValueLocalStorage(phase, gamePhasesArr);
  }

  setNewGameList(games: Game[]): void {
    this.setGameList(games, "games");
  }

  gameListExist(): boolean {
    return localStorage.getItem("games") != null;
  }

  getGameList(): Game[] {
    return this.getValueLocalStorage("games");
  }

  getGame(title: string): Game | undefined {
    const gameList = this.getGameList();
    return gameList.find((game) => game.title == title);
  }

  addGameToDownloads(game: Game) {
    this.addGameToPhase(game, "gamesOnDownload");
  }

  removeGameFromDownloads(title: string) {
    console.log("Removing: " + title);
    this.removeGameFromPhase(title, "gamesOnDownload");
  }

  getOnDownloadListGames(): Game[] {
    this.checkLocalSotrage("gamesOnDownload");
    return this.getValueLocalStorage("gamesOnDownload");
  }
}

export const Memory = new Storage();
