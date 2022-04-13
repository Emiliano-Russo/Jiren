import React, { useEffect, useState } from "react";
import { Game } from "../../Models/Game";
import { GameCard } from "../../Components/React/GameCard";
import { Memory } from "../../Storage/GamePhases";
import { FireStoreController } from "../../Storage/FireStoreController";
import { Button, Input, Spin } from "antd";
import "../Css/Store.css";
import { message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export function Store() {
  const [gamelistBuckUp, setGameListBuckUp] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loadingGames, setLoadingGames] = useState(false);

  const success = (title: string) => {
    message.success("In Downloads!");
  };

  const prepareList = async () => {
    const gameList: Game[] = await FireStoreController.Instance.getAllGames();
    setGames(gameList);
    setGameListBuckUp(gameList);
    Memory.setNewGameList(gameList);
    setLoadingGames(false);
  };

  useEffect(() => {
    if (!Memory.gameListExist()) {
      setLoadingGames(true);
      prepareList();
    } else {
      setGames(Memory.getGameList());
      setGameListBuckUp(Memory.getGameList());
    }
  }, []);

  const onDownload = (name: string) => {
    const index = games.findIndex((x, index) => {
      return x.title == name;
    });
    Memory.addGameToDownloads(games[index]);
    success(name);
  };

  const onRefresh = () => {
    setLoadingGames(true);
    prepareList();
  };

  const onSearch = (value: string) => {
    setGames(gamelistBuckUp.filter((game) => game.title.includes(value)));
  };

  const onChange = (e: any) => {
    const value = e.target.value.toUpperCase();
    if (value == "") {
      setGames(gamelistBuckUp);
      return;
    }
    const filterResult = gamelistBuckUp.filter((game) => game.title.toUpperCase().includes(value));
    setGames(filterResult);
  };

  const { Search } = Input;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Button id="refreshBtn" onClick={onRefresh} icon={<ReloadOutlined />} style={{ position: "absolute", right: 5 }}>
        {" "}
        Refresh
      </Button>

      <Input
        placeholder="Game Name"
        onChange={onChange}
        style={{ minWidth: "200px", width: "35%", marginTop: "50px" }}
      />

      <div className="gameList">
        {loadingGames ? (
          <Spin size="large" style={{ marginTop: "2rem" }} />
        ) : (
          games.map((game: any) => {
            return (
              <GameCard
                key={game.title}
                title={game.title}
                imgUrl={game.imgUrl}
                btnLabel="Download"
                onBtnClick={onDownload}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
