import React from "react";
import "../Css/GameCard.css";
import { message } from "antd";

interface props {
  title: string;
  imgUrl: string;
  onBtnClick: (name: string) => void;
  onClose?: (name: string) => void;
  btnLabel: string;
}

export const GameCard = (props: props) => {
  return (
    <div className="gameCard">
      {props.onClose ? (
        <button className="closeBtn" onClick={() => (props.onClose ? props.onClose(props.title) : null)}>
          Delete
        </button>
      ) : null}
      <img src={props.imgUrl} />
      <h2>{props.title}</h2>
      <button
        id="mainBtn"
        onClick={() => {
          props.onBtnClick(props.title);
        }}
      >
        {props.btnLabel}
      </button>
    </div>
  );
};
