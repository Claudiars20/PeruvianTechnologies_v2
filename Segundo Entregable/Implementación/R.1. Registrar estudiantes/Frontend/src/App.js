import { Route, Switch, useLocation } from "react-router";
import Sidebar from "./Sidebar";
import Estudiantes from "./Pages/Registro Estudiante";
import Team from "./Pages/Team";
import Calender from "./Pages/Calender";
import Documents from "./Pages/Documents";
import Projects from "./Pages/Projects";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

const Pages = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F3F2F2;
`;

function App() {
  const location = useLocation();
  return (
    <>
      <Sidebar />
      <Pages>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Estudiantes} />
            <Route path="/team" component={Team} />
            <Route path="/calender" component={Calender} />
            <Route path="/documents" component={Documents} />
            <Route path="/projects" component={Projects} />
          </Switch>
        </AnimatePresence>
      </Pages>
    </>
  );
}

export default App;
