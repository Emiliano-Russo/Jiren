import React, { useEffect, useState } from "react";
import { GameCard } from "../../Components/React/GameCard";
import { Game } from "../../Models/Game";
import { FireStoreController } from "../../Storage/FireStoreController";
import { Memory } from "../../Storage/GamePhases";
import { clone } from "../../Utils/Cloner";
import "../Css/Library.css";

const { ipcRenderer } = window.require("electron");

export function Library() {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [deletingGame, setDeletingGame] = useState(false);

  useEffect(() => {
    ipcRenderer.on("get-installed-games", onGettingInstalledGames);
    ipcRenderer.send("get-installed-games", "");
    ipcRenderer.on("gameRemoved", onRemovedGame);
    return () => {
      ipcRenderer.removeListener("get-installed-games", onGettingInstalledGames);
      ipcRenderer.removeListener("gameRemoved", onRemovedGame);
    };
  }, []);

  const onRemovedGame = () => {
    setDeletingGame(false);
  };

  const onGettingInstalledGames = (event: any, gameNameList: string[]) => {
    const arr = gameNameList.map((gameName) => {
      const game = Memory.getGame(gameName);
      if (game != undefined) {
        const gameNotUndefined = game;
        return gameNotUndefined;
      } else {
        return {
          title: "error",
          description: "error",
          downloadLinks: ["error"],
          imgUrl: "error",
          totalSize: "error",
          youtubeTrailerUrl: "error",
        };
      }
    });
    const filteredArr: Game[] = arr.filter(function (element) {
      return element !== undefined;
    });
    setGameList(filteredArr);
  };

  const onBtnPlay = (gameName: string) => {
    ipcRenderer.send("play-game", gameName);
  };

  const onDeleteGame = (gameName: string) => {
    setDeletingGame(true);
    ipcRenderer.send("delete-game", gameName);
    clickRefresh();
  };

  const clickRefresh = () => {
    ipcRenderer.send("get-installed-games", "");
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      {deletingGame ? (
        <h1 style={{ margin: "0 auto", textAlign: "center", fontWeight: "bold" }}>Deleting Game....</h1>
      ) : null}
      <div className="gameList">
        {gameList.map((game) => {
          return (
            <GameCard
              key={game.title}
              imgUrl={game.imgUrl}
              btnLabel="Play"
              onBtnClick={onBtnPlay}
              title={game.title}
              onClose={onDeleteGame}
            />
          );
        })}
      </div>
    </div>
  );
}
