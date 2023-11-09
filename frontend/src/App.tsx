import { BrowserRouter, Route, Routes } from "react-router-dom"
import Pengunjung_routes from "./page/pengunjung/Pengunjung_routes"
import AdminRoutes from "./page/admin/AdminRoutes"
import Login from "./page/authentication/Login"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Pengunjung_routes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App