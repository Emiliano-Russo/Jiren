import React, { useEffect, useState } from "react";
import { FireStoreController } from "../../../Storage/FireStoreController";
import { BrowserRouter as Router, Route, useParams, useNavigate } from "react-router-dom";
import { Button, Input, Spin } from "antd";

enum LoginState {
  Checking,
  NotLogged,
  Logged,
}

export const Home = (props: any) => {
  const [logged, setLogged] = useState(LoginState.Checking);
  let history = useNavigate();
  useEffect(() => {
    const notParsedToken = localStorage.getItem("adminToken");
    if (notParsedToken != null) {
      setLogged(LoginState.Logged);
    } else {
      setLogged(LoginState.NotLogged);
    }
  }, []);

  const login = async () => {
    setLogged(LoginState.Checking);
    const element = document.getElementById("inputToken") as HTMLInputElement;
    const inputTkn = element?.value;
    const isValidToken = await FireStoreController.Instance.tokenIsValid(inputTkn);
    if (isValidToken) {
      localStorage.setItem("adminToken", JSON.stringify(inputTkn));
      setLogged(LoginState.Logged);
    } else setLogged(LoginState.NotLogged);
  };

  var panel = null;

  if (logged == LoginState.NotLogged)
    panel = (
      <div
        style={{
          margin: "0 auto",
          width: "500px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          background: "white",
          padding: "20px",
          borderRadius: 20,
          marginTop: 50,
        }}
      >
        <h1>Login</h1>
        <Input id="inputToken" placeholder="token" />
        <Button onClick={login} style={{ marginTop: 20 }}>
          Submit
        </Button>
      </div>
    );
  else if (logged == LoginState.Logged)
    panel = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          margin: "0 auto",
          marginTop: "200px",
          width: "200px",
        }}
      >
        <Button onClick={() => history("/admin/addgame")}>Add Game</Button>
        <Button onClick={() => history("/admin/removegame")}>Remove Game</Button>
        <Button onClick={() => history("/admin/editgame")}>Edit Game</Button>
      </div>
    );
  else
    panel = (
      <div style={{ margin: "0 auto", width: "max-content" }}>
        <Spin size="large" />
      </div>
    );

  return <div>{panel}</div>;
};
