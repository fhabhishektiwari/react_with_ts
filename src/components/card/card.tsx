import { useContext } from "react";
import { themeContext } from "../../context/theme/theme";
import "./card.css";

type CardProps = {
  children: JSX.Element;
  bgColor?: string;
  height?: string;
  padding?: string;
};
const Card = (props: CardProps) => {
  const theme = useContext(themeContext);
  return (
    <div
      className={`card ${theme === "dark" ? "dark" : "light"}`}
      style={{
        backgroundColor: props.bgColor,
        height: `${props.height}rem`,
        padding: `${props.padding}rem`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Card;
