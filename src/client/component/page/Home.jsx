import Nav from "../element/Nav"
import MapHos  from "../element/Map"
import checkTokenAndNavigate from "../checkToken/checkTokenAndNavigate"
export default function Home() {
  checkTokenAndNavigate()
  return (
    <div>
        <Nav/>
        <MapHos/>
    </div>
  )
}
