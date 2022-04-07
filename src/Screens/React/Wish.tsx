import React, { useEffect, useState } from "react";
import { Pagination, Spin } from "antd";
import "../Sass/Wish.css";

const { ipcRenderer, shell } = window.require("electron");

export function Wish() {
  const [wishGame, setWishGames] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  function onWishGamesRecived(event: any, arg: any) {
    setWishGames(arg);
    setLoading(false);
  }

  function openGameLink(link: string) {
    shell.openExternal(link);
  }

  useEffect(() => {
    ipcRenderer.on("wishGames", onWishGamesRecived);
    getPage(page.toString());
    return () => {
      ipcRenderer.removeListener("wishGames", onWishGamesRecived);
    };
  }, [page]);

  function getPage(pageNumber: string) {
    setLoading(true);
    ipcRenderer.send("get-page", pageNumber);
  }

  function pageChange(pageNmbr: number) {
    setPage(pageNmbr);
  }

  return (
    <div className="wrapper">
      <Pagination defaultCurrent={page} onChange={pageChange} total={30} style={{ margin: "1rem auto" }} pageSize={1} />
      {loading ? (
        <Spin size="large" style={{ marginTop: "2rem" }} />
      ) : (
        <div className="gameList">
          {wishGame.map((game) => {
            return (
              <div className="game" key={game.link}>
                <img src={game.imageUrl} alt="" onClick={() => openGameLink(game.link)} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
