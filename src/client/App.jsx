import Home from './component/page/Home'
import Login from './component/page/Login'
import Report from './component/page/Report'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import P404 from './component/page/P404'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/report' element={<Report />}/>
      <Route path='*' element={<P404/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App
