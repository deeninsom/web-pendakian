/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Layout from "./layout/Layout"
import axiosInstance from "../../api";
import { useLocation, useNavigate } from "react-router-dom";

const View_booking = () => {

    const navigate = useNavigate()
    const location = useLocation();
    const searchValue = new URLSearchParams(location.search).get("search");

    const [bookingData, setBookingData]: any = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };


    useEffect(() => {
        axiosInstance.get(`/bookings?search=${searchValue}`)
            .then((response) => {
                setBookingData(response.data.data);
            })
            .catch((error) => {
                alert(`Error fetching booking data: ${error}`)
            });
    }, [searchValue]);

    const handleUpload = (bookingId: any) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile);

            axiosInstance
                .post("/upload", formData)
                .then((response) => {
                    axiosInstance.post(`/bookings/bukti_pembayaran`, {
                        booking_id: bookingId,
                        bukti_pembayaran: response.data.data.url,
                    })
                        .then(() => {
                            window.location.reload();
                        })
                        .catch((error) => {
                            alert(`Error send payment file: ${error}`)
                        });
                })
                .catch((error) => {
                    alert(`Error uploading file: ${error}`)
                });
        }
    };

    const bookingCanceled = (bookingId: string) => {
        axiosInstance
            .delete(`/bookings/${bookingId}`)
            .then(() => {
                alert("Booking di hapus")
                navigate("/")
            })
            .catch((error) => {
                alert(`Error fetching remove booking: ${error}`)
            });
    }

    return (
        <Layout>
            <div className="content-view-booking" style={{ paddingTop: "90px" }}>
                <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
                    <div className="content-text" style={{ marginLeft: "100px" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Lihat booking anda</div>
                    </div>
                </div>
                {
                    bookingData && bookingData.map((booking: any, index: any) => (
                        <div key={index} className="card mt-5 m-4" style={{ fontSize: "13px" }}>
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Kode Booking</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <div className="col-md-4 my-2">{booking.kode_booking}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Tujuan</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <div className="col-md-4 my-2">{booking.jalur}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Tanggal Berangkat</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <div className="col-md-4 my-2">{booking.tanggal_naik}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Tanggal Pulang</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <div className="col-md-4 my-2">{booking.tanggal_turun}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Rombongan</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <div className="col-md-4 my-2">{booking.rombongan}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Tarif</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <div className="col-md-4 my-2">Rp. {booking.tarif.toLocaleString('id-ID')}</div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="col-md-2 my-1">Status</div>
                                    <div className="col-md-4 my-2">:</div>
                                    <td style={{ textAlign: "center" }}>{booking.status == false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Pengajuan</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Disetujui</span>}</td>
                                </div>
                                {
                                    booking.bukti_pembayaran === null && (
                                        <>
                                            <div className="mt-5">
                                                <label style={{ fontWeight: "bold" }}>Pembayaran</label>
                                                <div className="d-flex align-items-center">
                                                    <div className="col-md-2 my-1">Bank Tujuan</div>
                                                    <div className="col-md-4 my-2">:</div>
                                                    <div className="col-md-4 my-2">Bank Rakyat Indonesia <span style={{ fontWeight: "bold" }}>(BRI)</span></div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="col-md-2 my-1">No. Rekeking</div>
                                                    <div className="col-md-4 my-2">:</div>
                                                    <div className="col-md-4 my-2" style={{ fontWeight: "bold" }}>882012100000089</div>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="col-md-2">Upload Bukti Pembayaran</div>
                                                    <div className="col-md-4 my-2">:</div>
                                                    <div className="col-md-3 my-2"><input onChange={handleFileChange} style={{ height: "30px", fontSize: "13px" }} className="form-control" type="file" id="formFile" /></div>
                                                    <button className="btn btn-primary ms-3" onClick={() => handleUpload(booking.id)} style={{ fontSize: "10px", height: "30px", fontWeight: "bold" }}>Kirim</button>
                                                </div>
                                            </div>

                                            <span className="mt-4 mb-2" style={{ display: "block" }}>Batalkan Booking ?</span>
                                            <button className="btn btn-danger mb-5" onClick={() => bookingCanceled(booking.id)} style={{ fontSize: "10px", fontWeight: "bold" }}>Batal Booking</button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <footer className="fixed-bottom p-2" style={{ backgroundColor: "#232D3F", color: "white" }}>
                <div className="text-center fs-6">
                    © 2023 Penanggungan. Seluruh hak cipta dilindungi.
                </div>
            </footer>
        </Layout>
    )
}

export default View_booking