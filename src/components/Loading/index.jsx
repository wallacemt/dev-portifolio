import React from "react";
import { PongSpinner} from "react-spinners-kit";

const Loading = ({ message = "Carregando...", size = 80, color = "#F2F8EF" }) => {
  return (
    <div
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,  }}
      className="flex flex-col items-center justify-center text-white bg-transparent"
    >
      <PongSpinner  size={size} color={color} />
      <p className="mt-4 text-lg font-semibold">{message}</p>
    </div>
  );
};
export default Loading;

