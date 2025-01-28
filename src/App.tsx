import Home from "./pages/home/home";
import { themeContext } from "./context/theme/theme";
import { useState } from "react";
import Switch from "react-switch";
import { FaSun, FaMoon } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(!checked);
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <themeContext.Provider value={theme}>
      <Switch
        onChange={changeHandler}
        checked={checked}
        className="react-switch"
        uncheckedIcon={
          <FaMoon size={18} color="white" style={{ padding: "4px" }} />
        }
        checkedIcon={
          <FaSun size={18} color="orange" style={{ padding: "4px" }} />
        }
        offColor="#282c34"
        onColor="#ff0"
        onHandleColor="#282c34"
      />
      <Home />;
    </themeContext.Provider>
  );
};

export default App;
