import './App.css';
import Navbar from './navbar';
import Notes from './Components/notes';
import About from './about';
import Contact from './Components/contact';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
     
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Notes></Notes>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/contact" element={<Contact></Contact>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
