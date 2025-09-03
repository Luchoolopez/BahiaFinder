import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import './App.css'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/iniciar-sesion' element={<Login/>}/>
        <Route path='/registrarse' element={<Register/>}/>
        <Route path='/crear-post' element={<CreatePost/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
