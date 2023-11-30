import { ReactNode, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import logoPenangunggan from '../../../assets/logo_penanggungan.png'

const Layout = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue) {
      navigate(`/view_booking?search=${searchValue}`);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg position-fixed w-100 z-3" style={{paddingLeft: "40px", paddingRight: "40px"}}>
        <div className="container-fluid" style={{backgroundColor: "gray", opacity: "90%", borderRadius: "20px"}}>
          <a className="navbar-brand" href="/">
            <img src={logoPenangunggan} alt="Bootstrap" width="100" height="40" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ marginLeft: "60px"}}>
              <li className="nav-item">
                <NavLink className="nav-link active" style={{color: "white"}} aria-current="page" to={"/"}>Beranda</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{color: "white"}} aria-current="page" to={"/tutorial"}>Tutorial</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{color: "white"}} to={"/sop_booking"}>SOP</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{color: "white"}} to={"/cuaca"}>Cuaca</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" style={{color: "white"}} to={"/kuota"}>Kuota</NavLink>
              </li>
            </ul>
          </div>
          <form className="d-flex" role="search">
            <div className="input-group">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="form-control me-2" type="search" placeholder="Cek Kode Booking" aria-label="Search" />
              <button onClick={handleSearch} className="btn" style={{ backgroundColor: "#232D3F", color: "white" }} type="submit">
                <i className="fas fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </nav>
      <main>{children}</main>
      {/* <footer className="p-2" style={{ backgroundColor: "#232D3F", color: "white" }}>
        <div className="text-center fs-6">
          © 2023 Penanggungan. Seluruh hak cipta dilindungi.
        </div>
      </footer> */}
    </>
  )
}

export default Layout