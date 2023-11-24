import { ReactNode, useEffect, useState } from 'react'
import logoPenangunggan from '../../../assets/logo_penanggungan.png'
import { useNavigate } from 'react-router-dom'

const LayoutAdmin = ({ children }: { children: ReactNode }) => {

    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        setDropdown(false)
    }, [])

    const navigate = useNavigate()

    const handlePage = (route: string) => {
        navigate(route)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 fixed" style={{ backgroundColor: "#435585" }}>
                        <div className="d-flex flex-column align-items-center align-items-sm-start ps-5 pt-4 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <img src={logoPenangunggan} alt="Bootstrap" width="100" height="40" />
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" style={{ marginLeft: "-24px", marginTop: "24px" }} id="menu">
                                <li className="nav-item" style={{ cursor: "pointer" }}>
                                    <i className="fa fa-solid fa-house"></i> <span className="ms-1 d-none d-sm-inline" onClick={() => handlePage("/admin/dashboard")}>Dashboard</span>
                                </li>
                                <li className="nav-item" style={{ marginTop: "20px", cursor: 'pointer' }}>
                                    <i className="fa fa-solid fa-list-check"></i> <span className="ms-2 d-none d-sm-inline" onClick={() => handlePage("/admin/verifycation_data")}>Verifikasi</span>
                                </li>
                                <li className="nav-item" style={{ marginTop: "20px", cursor: 'pointer' }}>
                                    <i className="fa fa-solid fa-clock-rotate-left"></i> <span className="ms-2 d-none d-sm-inline" onClick={() => handlePage("/admin/history_booking")}>History</span>
                                </li>
                                <li className="nav-item" style={{ marginTop: "20px" }}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <i className="fa fa-solid fa-gear"></i> <span className="d-none d-sm-inline" style={{marginLeft: "11px"}}>Kelola</span>
                                        {
                                            dropdown ? (
                                                <i className="fa fa-solid fa-chevron-left" style={{ fontSize: "13px", fontWeight: "bold", marginLeft: "100px", cursor: "pointer" }} onClick={() => setDropdown(false)}></i>
                                            ) : <i className="fa fa-solid fa-chevron-down" style={{ fontSize: "13px", fontWeight: "bold", marginLeft: "100px", cursor: "pointer" }} onClick={() => setDropdown(true)}></i>
                                        }
                                    </div>
                                    {
                                        dropdown && (
                                            <ul style={{ marginLeft: "-7px" }}>
                                                <li style={{ listStyle: "none", marginTop: "3px", cursor: "pointer" }} onClick={() => handlePage("/admin/blacklist")}>
                                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Blacklist</span>
                                                </li>
                                                <li style={{ listStyle: "none", marginTop: "3px", cursor: "pointer" }} onClick={() => handlePage("/admin/setting")}>
                                                    <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Setting</span>
                                                </li>
                                            </ul>
                                        )
                                    }
                                </li>
                                <li className="nav-item" style={{ marginTop: "10px" }}>
                                    <a href="/login" className="nav-link align-middle px-0" style={{ color: "white" }}>
                                        <i className="fa fa-solid fa-arrow-right-from-bracket"></i> <span className="ms-2 d-none d-sm-inline">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col py-3">
                        <main style={{ marginBottom: "50px" }}>{children}</main>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LayoutAdmin