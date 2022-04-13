import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Memory } from "../../Storage/GamePhases";
import { GameCard } from "../../Components/React/GameCard";
import { FireStoreController } from "../../Storage/FireStoreController";
import { Game } from "../../Models/Game";
import "../Css/Downloads.css";
import { clone } from "../../Utils/Cloner";
import { message, Spin } from "antd";

const { ipcRenderer } = window.require("electron");

export function Downloads() {
  const [gameList, setGameList] = useState(Memory.getOnDownloadListGames());
  const [downloadingGameName, setDownloadingGameName] = useState<string>("");
  const [feedBack, setFeedBack] = useState<string>("");
  const theme = useSelector((state: any) => state.theme.theme);

  const success = () => {
    message.success("In Library!");
  };

  function onDownloadReady(event: any, arg: any) {
    Memory.removeGameFromDownloads(arg);
    setDownloadingGameName("");
    setFeedBack("");
    success();
  }

  function progressDownload(event?: any, arg?: any) {
    setFeedBack(arg);
  }

  useEffect(() => {
    ipcRenderer.on("download-ready", onDownloadReady);
    ipcRenderer.on("feedBack", progressDownload);
    return () => {
      ipcRenderer.removeListener("download-ready", onDownloadReady);
      ipcRenderer.removeListener("feedBack", progressDownload);
    };
  }, []);

  const onRemove = (name: string) => {
    Memory.removeGameFromDownloads(name);
    setGameList(Memory.getOnDownloadListGames());
  };

  const onStartDownload = (title: string) => {
    setDownloadingGameName(title);
    setGameList((prev) => {
      const clonedGameList = clone(prev);
      //const index = clonedGameList.indexOf(title);
      const index = clonedGameList.findIndex((game: Game) => game.title == title);
      if (index > -1) {
        clonedGameList.splice(index, 1);
      }
      return clonedGameList;
    });
    const index = gameList.findIndex((game) => game.title == title);
    ipcRenderer.send("download", gameList[index]);
  };

  return (
    <div className="downloads">
      <div id="style-5" className="queue">
        <h1 style={{ color: theme.letterColor, fontWeight: "bold", textDecoration: "underline" }}>
          Pending for download
        </h1>
        <div className="backgroundQueue">
          {gameList.map((game) => {
            return (
              <GameCard
                key={game.title}
                btnLabel="Start Download"
                onClose={onRemove}
                onBtnClick={onStartDownload}
                title={game.title}
                imgUrl={game.imgUrl ? game.imgUrl : "https://images.pexels.com/photos/247676/pexels-photo-247676.jpeg"}
              />
            );
          })}
        </div>
      </div>
      <div className="downloading">
        <h1 style={{ color: theme.letterColor, padding: "50px" }}>{downloadingGameName}</h1>
        <h2 style={{ color: theme.letterColor }}>{feedBack}</h2>
        {downloadingGameName != "" ? <Spin size="large" style={{ marginTop: "2rem" }} /> : null}
      </div>
    </div>
  );
}
