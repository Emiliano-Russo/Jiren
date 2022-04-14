import { Button, Form, Input, message, Modal, Spin } from "antd";
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

  const success = () => {
    message.success("Game Uploaded");
  };

  const error = () => {
    message.error("Error while Uploading");
  };

  const onFinish = async (values: any) => {
    Object.keys(values).forEach((key) => (values[key] === undefined ? delete values[key] : {}));
    const clonedValues = clone(values);
    if (clonedValues.downloadLinks) clonedValues.downloadLinks = clonedValues.downloadLinks.split(",");
    delete clonedValues.gameId;
    FireStoreController.Instance.updateGame(values.gameId, clonedValues)
      .then((value) => {
        success();
      })
      .catch((err) => {
        error();
      });
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
          padding: 10,
          background: "white",
          margin: "50px auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "red" }}>Game IDS</h1>
        {gameList.map((game) => {
          return (
            <div key={game} style={{ background: "beige", margin: 5 }}>
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
