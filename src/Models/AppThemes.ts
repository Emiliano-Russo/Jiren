import { Theme } from "./Theme";

export const themes: Theme[] = [
  {
    name: "Dark",
    letterColor: "white",
    buttonPreviewStyle: {
      color: "white",
      backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(35deg, #485461 0%, #28313b 74%)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    },
  },
  {
    name: "Light",
    letterColor: "black",
    buttonPreviewStyle: {
      color: "black",
      backgroundImage: "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(147deg, #f9fcff 0%, #dee4ea 74%)",
    },
  },
  {
    name: "Night",
    letterColor: "white",
    buttonPreviewStyle: {
      color: "white",
      backgroundImage: "linear-gradient(90deg, #0cbaba 0%, #380036 74%)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(30deg, #0cbaba 0%, #380036 74%)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(90deg, #0cbaba 0%, #380036 74%)",
    },
  },
  {
    name: "Beach",
    letterColor: "black",
    buttonPreviewStyle: {
      color: "black",
      backgroundImage: "linear-gradient(315deg, #f9ea8f 0%, #aff1da 74%)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(315deg, #f9ea8f 0%, #aff1da 74%)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(55deg, #f9ea8f 0%, #aff1da 74%)",
    },
  },
  {
    name: "Celestial",
    letterColor: "white",
    buttonPreviewStyle: {
      color: "white",
      backgroundImage: "linear-gradient(to right, #c33764, #1d2671)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(to right, #c33764, #1d2671)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(to right, #c33764, #1d2671)",
    },
  },
  {
    name: "Nelson",
    letterColor: "white",
    buttonPreviewStyle: {
      color: "white",
      backgroundImage: "linear-gradient(to right, #f2709c, #ff9472)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(to right, #f2709c, #ff9472)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(to right, #f2709c, #ff9472)",
    },
  },
  {
    name: "Sea",
    letterColor: "white",
    buttonPreviewStyle: {
      color: "white",
      backgroundImage: "linear-gradient(90deg, #0beef9 0%, #48a9fe 74%)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(-90deg, #0beef9 0%, #48a9fe 74%)",
    },
    bodyStyle: {
      backgroundImage: "linear-gradient(-90deg, #0beef9 0%, #48a9fe 74%)",
    },
  },
  {
    name: "Nacional",
    letterColor: "white",
    buttonPreviewStyle: {
      color: "white",
      backgroundImage: "linear-gradient(90deg, rgba(2,3,220,1) 0%, rgba(223,1,1,1) 80%, rgba(255,255,255,1) 100%)",
    },
    headerStyle: {
      backgroundImage: "linear-gradient(90deg, #0d3dff 0%, rgba(223,1,1,1) 80%",
    },
    bodyStyle: {
      //backgroundImage: "linear-gradient(70deg, rgba(2,3,220,1) 0%, rgba(223,1,1,1) 80%, rgba(255,255,255,1) 100%)",
      backgroundImage: "linear-gradient(90deg, #0d3dff 0%, rgba(223,1,1,1) 80%",
    },
  },
];
