import Footer from "./components/Footer";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import Menu from "./components/Menu";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="container">
      <Menu />
      <Header />
      <Footer title="Tee" website="www.tee.com" postcode={62050139} isOpened />
      <Logo />
      <Sidebar />
    </div>
  );
}

export default App;
