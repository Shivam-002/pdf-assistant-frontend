import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";

import { GlobalStateProvider } from "./provider/GlobalStateProvider";
import { MessageStateProvider } from "./provider/MessageStateProvider";

function App() {
  return (
    <Router>
      <GlobalStateProvider>
        <MessageStateProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </MessageStateProvider>
      </GlobalStateProvider>
    </Router>
  );
}

export default App;
