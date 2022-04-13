import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FireStoreController } from "../../../Storage/FireStoreController";
import { Input, Button, Spin } from "antd";

export const RemoveGame = () => {
  let history = useNavigate();
  const [gameList, setGameList] = useState<string[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [deletingGame, setDeletingGame] = useState(false);

  useEffect(() => {
    const setAllGames = async () => {
      const games = await FireStoreController.Instance.getAllGamesID();
      console.log("ALL THE GAMES");
      setGameList(games);
      setLoadingGames(false);
    };
    setAllGames();
  }, []);

  const deleteGame = async (id: string) => {
    setDeletingGame(true);
    const result = await FireStoreController.Instance.deleteGame(id);
    setDeletingGame(false);
  };

  return (
    <div style={{ padding: 10 }}>
      <Button onClick={() => history("/admin")} loading={deletingGame}>
        Back
      </Button>
      {loadingGames ? <Spin size="large" style={{ marginLeft: 20, marginTop: 20 }} /> : null}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {gameList.map((game) => {
          return (
            <div key={game} style={{ background: "white", padding: 20, margin: 5, borderRadius: 10 }}>
              <h1>{game}</h1>
              <Button onClick={() => deleteGame(game)} loading={deletingGame}>
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
