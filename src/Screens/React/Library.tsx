import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { GameCard } from "../../Components/React/GameCard";
import { Game } from "../../Models/Game";
import { FireStoreController } from "../../Storage/FireStoreController";
import { Memory } from "../../Storage/GamePhases";
import { clone } from "../../Utils/Cloner";
import "../Css/Library.css";

const { ipcRenderer } = window.require("electron");

export function Library() {
  const [gamelistBuckUp, setGameListBuckUp] = useState<Game[]>([]);
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
    setGameListBuckUp(filteredArr);
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

  const onChange = (e: any) => {
    const value = e.target.value.toUpperCase();
    if (value == "") {
      setGameList(gamelistBuckUp);
      return;
    }
    const filterResult = gamelistBuckUp.filter((game) => game.title.toUpperCase().includes(value));
    setGameList(filterResult);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {deletingGame ? (
        <h1 style={{ margin: "0 auto", textAlign: "center", fontWeight: "bold" }}>Deleting Game....</h1>
      ) : null}
      <Input
        placeholder="Game Name"
        onChange={onChange}
        style={{ minWidth: "200px", width: "35%", marginTop: "50px" }}
      />
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
