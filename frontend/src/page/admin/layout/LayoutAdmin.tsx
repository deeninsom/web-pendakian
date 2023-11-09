import { ReactNode } from 'react'
import logoPenangunggan from '../../../assets/logo_penanggungan.png'

const LayoutAdmin = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{ backgroundColor: "#435585" }}>
                        <div className="d-flex flex-column align-items-center align-items-sm-start ps-5 pt-4 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <img src={logoPenangunggan} alt="Bootstrap" width="100" height="40" />
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" style={{ marginLeft: "-24px", marginTop: "24px" }} id="menu">
                                <li className="nav-item">
                                    <a href="/admin/dashboard" className="nav-link align-middle px-0" style={{ color: "white"}}>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </a>
                                </li>
                                <li className="nav-item" style={{ marginTop: "-10px" }}>
                                    <a href="/admin/verifycation_data" className="nav-link align-middle px-0" style={{ color: "white"}}>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Verifikasi</span>
                                    </a>
                                </li>
                                <li className="nav-item" style={{ marginTop: "-10px" }}>
                                    <a href="/admin/history_booking" className="nav-link align-middle px-0" style={{ color: "white"}}>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">History</span>
                                    </a>
                                </li>
                                <li className="nav-item" style={{ marginTop: "-10px" }}>
                                    <a href="#" className="nav-link align-middle px-0" style={{ color: "white"}}>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Logout</span>
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