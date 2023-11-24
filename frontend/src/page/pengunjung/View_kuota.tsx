/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import Layout from "./layout/Layout"
import axiosInstance from "../../api"

const View_kuota = () => {
    const [kuota, setKuota]: any = useState([]);
    const [selectedDate, setSelectedDate] = useState(getCurrentMonthYear());
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axiosInstance.get(`/kuota?search=${selectedDate}`)
            .then((response: any) => {
                setKuota(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                alert(`Error fetching kuota data: ${error}`)
            });
    }, [selectedDate]);

    return (
        <Layout>
            <div className="weather" style={{ paddingTop: "90px", marginBottom: "10px" }}>
                <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
                    <div className="content-text" style={{ marginLeft: "100px" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Kapasitas</div>
                    </div>
                </div>
                <div className="weather-details p-4">
                    <form >
                        <div className="row g-3">
                            <div className="col-md-5 d-flex align-items-center mb-4">
                                <label className="form-label mt-2" style={{ width: "170px", color: "gray" }}>Bulan, Tahun</label>
                                <select
                                    id="inputState"
                                    className="form-select"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                >
                                    {getFutureMonths().map((dateString) => (
                                        <option key={dateString} value={dateString}>
                                            {formatMonthYear(dateString)} {/* Ubah format tampilan di sini */}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <table className="table" border={1}>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th scope="col">Tanggal</th>
                                <th scope="col">Kuota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <div className="spinner-container" style={{ textAlign: "center", marginTop: "100px" }}>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : kuota.length > 0 ?
                                kuota.map((item: any, index: any) => (
                                    <tr key={index} style={{ textAlign: "center" }}>
                                        <td>{item.tanggal}</td>
                                        <td>{item.kuota > 0 ? <span style={{ color: "green" }}>{item.kuota}</span> : <span style={{ color: "red" }}>{item.kuota}</span>}</td>
                                    </tr>
                                ))
                                : (
                                    <div style={{ alignItems: "center", position: "absolute", marginLeft: "550px" }}>
                                        <p >Kuota Belum Tersedia</p>
                                    </div>
                                )}

                        </tbody>
                    </table>
                </div>
            </div>
            <footer className="fixed-bottom p-2" style={{ backgroundColor: "#232D3F", color: "white" }}>
                <div className="text-center fs-6">
                    © 2023 Penanggungan. Seluruh hak cipta dilindungi.
                </div>
            </footer>
        </Layout>
    );
};

const getCurrentMonthYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
};

const getFutureMonths = () => {
    const futureMonths = [];
    const now = new Date();
    for (let i = 0; i < 5; i++) {
        let year = now.getFullYear();
        let month = now.getMonth() + i;
        if (month > 11) {
            year += 1;
            month -= 12;
        }
        const monthString = (month + 1).toString().padStart(2, '0');
        futureMonths.push(`${year}-${monthString}`);
    }
    return futureMonths;
};

const formatMonthYear = (dateString: any) => {
    const [year, month] = dateString.split('-');
    const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'long' });
    return `${monthName}, ${year}`;
};

export default View_kuota;
