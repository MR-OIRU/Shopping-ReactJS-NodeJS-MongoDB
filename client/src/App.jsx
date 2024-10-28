import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'

import Member from './page/Member';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/member" element={<Member />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
