import "./App.css";

import { MantineProvider, createTheme } from "@mantine/core";
import Routes from "./routes";

function App() {
  const theme = createTheme();
  return (
    <MantineProvider>
      <Routes />
    </MantineProvider>
  );
}

export default App;
