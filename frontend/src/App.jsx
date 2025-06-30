 import { Route,Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginCard from "./component/LoginCard.jsx"
 

const App = () => {
  return (
  <div className="h-full w-full">
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"/>
      <Routes>
        <Route path="/" element={<HomePage/>} /> 
        <Route path="/create" element={<CreatePage/>} /> 
        <Route path="/note/:id" element={<NoteDetailPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginCard/>}/>
      </Routes>
  </div>
  )
}

export default App
