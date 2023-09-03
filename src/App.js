import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/student/View";
import Edit from "./components/student/Edit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/view/:id" Component={View} />
          <Route exact path="/edit/:id" Component={Edit} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
