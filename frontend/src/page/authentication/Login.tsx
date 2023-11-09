/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../api'
import coverPenangunggan from '../../assets/penanggungan.jpg'
import { useState } from 'react'

const Login = () => {
    const navigate = useNavigate()
    const [payloadLogin, setPayloadLogin] = useState({
        username: "",
        password: ""
    })
    const [error, setError] = useState("");

    const handleLogin = (e: any) => {
        e.preventDefault();

        axiosInstance.post('/auth/login', {
            username: payloadLogin.username,
            password: payloadLogin.password
        })
            .then((response) => {
                localStorage.setItem('token', response.data.data.role);
                navigate("/admin/dashboard")
            })
            .catch((error) => {
                setError(error.response.data.message);
            });
    }
    return (
        <>
            <div className="cover-image">
                <img src={coverPenangunggan} alt="Cover Penanggungan" height={550} style={{ position: "absolute", zIndex: "-50", height: "100vh", width: "100%" }} />
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "40%" }}>
                    <div className="card-body">
                        <div className="my-5" style={{ fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>Login Admin Penanggungan</div>
                        <form onSubmit={handleLogin}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example1">Username</label>
                                <input type="text" id="form2Example1" className="form-control"
                                    value={payloadLogin.username}
                                    onChange={(e) => setPayloadLogin({ ...payloadLogin, username: e.target.value })}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example2">Password</label>
                                <input type="password" id="form2Example2" className="form-control"
                                    value={payloadLogin.password}
                                    onChange={(e) => setPayloadLogin({ ...payloadLogin, password: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block mb-4" style={{ width: "100%" }}>Masuk</button>
                            {
                                error && (
                                    <div className='d-flex justify-content-center' style={{ textAlign: "center", width: "100%" }}>
                                        <span style={{ textAlign: "center", display: "flex", color: "red" }}>{error}</span>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login