import { Button, Form, Input, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FireStoreController } from "../../../Storage/FireStoreController";
import { clone } from "../../../Utils/Cloner";

export const EditGame = () => {
  let history = useNavigate();
  const [gameList, setGameList] = useState<string[]>([]);
  const [loadingGames, setLoadingGames] = useState(true);
  const [modalVisible, setModalVisible] = useState(Array(gameList.length));
  const [submiting, setSubmiting] = useState(false);
  useEffect(() => {
    const setAllGames = async () => {
      const games = await FireStoreController.Instance.getAllGamesID();
      console.log("ALL THE GAMES");
      setGameList(games);
      setLoadingGames(false);
    };
    setAllGames();
  }, []);

  const onFinish = async (values: any) => {
    Object.keys(values).forEach((key) => (values[key] === undefined ? delete values[key] : {}));
    const clonedValues = delete clone(values)["gameId"];
    FireStoreController.Instance.updateGame(values.gameId, clonedValues);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button onClick={() => history("/admin")} style={{ marginLeft: 20, marginTop: 20 }}>
        Back
      </Button>
      {loadingGames ? <Spin size="large" style={{ marginLeft: 20, marginTop: 20 }} /> : null}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "50%", margin: "20px auto", background: "white", padding: "20px" }}
      >
        <Form.Item label="Game Id" name="gameId" rules={[{ required: false, message: "Game ID" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: false, message: "Game Title" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: false, message: "Game Description" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Download Links" name="downloadLinks" rules={[{ required: false, message: "link1,link2" }]}>
          <Input placeholder="link1,link2,link3" />
        </Form.Item>
        <Form.Item label="Image Url" name="imgUrl" rules={[{ required: false, message: "Game Image" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Total Size" name="totalSize" rules={[{ required: false, message: "Game Size" }]}>
          <Input placeholder="5GB" />
        </Form.Item>
        <Form.Item label="Crack Link" name="crackUrl" rules={[{ required: false, message: "Game Crack" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Youtube Trailer Url"
          name="youtubeTrailerUrl"
          rules={[{ required: false, message: "Game Trailer" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={submiting}>
            Edit
          </Button>
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "300px",
          background: "white",
          margin: "10px auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "red" }}>Game IDS</h1>
        {gameList.map((game) => {
          return (
            <div key={game} style={{ background: "white" }}>
              <h1>{game}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/*
          <Button
                onClick={() =>
                  setModalVisible((prev) => {
                    const prevCloned = clone(prev);
                    prevCloned[gameList.indexOf(game)] = true;
                    return prevCloned;
                  })
                }
              >
                Edit
              </Button>
*/
