import {} from "react";
import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <div className="App">
        <header className="App-header">Hello</header>
      </div>
    </MantineProvider>
  );
}

export default App;
