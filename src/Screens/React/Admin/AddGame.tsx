import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../Firebase/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { resolve } from "path";
import { FireStoreController } from "../../../Storage/FireStoreController";
import { message, Input, Form, Button } from "antd";
import { useNavigate } from "react-router-dom";

export function AddGame() {
  const [submiting, setSubmiting] = useState(false);

  const success = () => {
    message.success("Game Uploaded");
  };

  const error = () => {
    message.error("Error while Uploading");
  };

  let history = useNavigate();

  const onFinish = async (values: any) => {
    setSubmiting(true);
    const gameId = values.gameId;
    const newGame = {
      title: values.title,
      description: values.description,
      downloadLinks: values.downloadLinks,
      crackUrl: values.crackUrl,
      totalSize: values.totalSize,
      youtubeTrailerUrl: values.youtubeTrailerUrl,
      imgUrl: values.imgUrl,
    };
    Object.keys(newGame).forEach((key) => (newGame[key] === undefined ? delete newGame[key] : {}));
    FireStoreController.Instance.addGame(gameId, newGame)
      .then((value) => {
        success();
        console.log("Sucess");
      })
      .catch((error) => {
        error();
        console.log("Error");
      })
      .finally(() => {
        console.log("Finally");
        setSubmiting(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ background: "white", padding: 20 }}>
      <Button onClick={() => history("/admin")} style={{ marginLeft: 20 }} loading={submiting}>
        Back
      </Button>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ width: "85%", marginTop: 20 }}
      >
        <Form.Item label="Game Id" name="gameId" rules={[{ required: true, message: "Game ID" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Game Title" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Game Description" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Download Links" name="downloadLinks" rules={[{ required: true, message: "link1,link2" }]}>
          <Input placeholder="link1,link2,link3" />
        </Form.Item>
        <Form.Item label="Image Url" name="imgUrl" rules={[{ required: true, message: "Game Image" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Total Size" name="totalSize" rules={[{ required: true, message: "Game Size" }]}>
          <Input placeholder="5GB" />
        </Form.Item>
        <Form.Item label="Crack Link" name="crackUrl" rules={[{ required: false, message: "Game Crack" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Youtube Trailer Url"
          name="youtubeTrailerUrl"
          rules={[{ required: true, message: "Game Trailer" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={submiting}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  /*
  return (
    <div>
      <button onClick={() => history("/admin")}>Back</button>
      <div className="AdminPanel">
        <h1>Add New Game</h1>
        <form>
          <input id="gameID" placeholder="Game ID on firebase" />
          <input id="title" placeholder="title" />
          <input id="description" placeholder="description" />
          <input id="downloadLinks" placeholder="download links separated by comma" />
          <input id="imgUrl" placeholder="imgUrl" />
          <input id="totalSize" placeholder="total size: '5GB'" />
          <input id="crackUrl" placeholder="link crack" />
          <input id="youtubeTrailerUrl" placeholder="youtube Trailer URL" />
          <button onClick={onSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );*/
}
