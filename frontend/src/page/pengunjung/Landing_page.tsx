import Layout from "./layout/Layout"
import coverPenangunggan from '../../assets/penanggungan.jpg'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../api"

const Landing_page = () => {
    const navigate = useNavigate()

    const switchBooking = () => {
        navigate("/peraturan")
    }

    const [status, setStatus] = useState(false)
    useEffect(() => {
        axiosInstance.get("/website/a0dcabc3-0dbc-4550-bc77-f518b30fefa9")
            .then((response) => {
                if (response.data.data.status_pendaftaran == true) {
                    setStatus(true)
                } else {
                    setStatus(false)
                }
            })
            .catch((error) => {
                alert(`Error fetching website status: ${error}`)
            });
    })

    return (
        <Layout>
            <div className="cover-image">
                <img src={coverPenangunggan} alt="Cover Penanggungan" height={550} style={{ width: "100%" }} />
            </div>
            <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
                <div className="content-text" style={{ marginLeft: "100px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "bold" }}>Booking Online Penanggungan</div>
                    <div style={{ marginRight: "200px" }}>Booking online selama 24 jam. cermati tata cara dan aturan sesuai dengan prosedur yang sudah ditetapkan, disarankan untuk booking dan pembayaran dilakukan jauh hari sebelum tanggal keberangkatan.</div>
                </div>
                {
                    status ? (
                        <button className="btn bg-white p-3 mr-4 " style={{ height: "60px", width: "400px", marginRight: "200px", fontWeight: "bold", color: "black" }} onClick={switchBooking}>Booking Sekarang</button>
                    ) : (
                        <button className="btn bg-warning p-3 mr-4" disabled style={{ height: "60px", width: "400px", marginRight: "200px", fontWeight: "bold", color: "black" }} >Booking Ditutup</button>
                    )
                }
            </div>
            <footer className="p-2" style={{ backgroundColor: "#232D3F", color: "white" }}>
                <div className="text-center fs-6">
                    © 2023 Penanggungan. Seluruh hak cipta dilindungi.
                </div>
            </footer>
        </Layout>
    )
}

export default Landing_page