/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api"
import moment from "moment"

const AdminSetting = () => {

  const [status, setStatus] = useState(false)
  const [formatDatetime, setFormatDatetime] = useState("")
  const [formData, setFormData] = useState({
    bulan: 0,
  });

  useEffect(() => {
    axiosInstance.get("/website/a0dcabc3-0dbc-4550-bc77-f518b30fefa9")
      .then((response) => {
        const dateTime = moment(response.data.data).format('YYYY-MM-DD HH:mm:ss')
        setFormatDatetime(dateTime)
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

  const closeBooking = (inputStatus: boolean) => {
    axiosInstance.put("/website/a0dcabc3-0dbc-4550-bc77-f518b30fefa9", {
      status_pendaftaran: inputStatus
    })
      .then(() => {
        setStatus(inputStatus)
      })
      .catch((error) => {
        alert(`Error updating website status: ${error}`)
      });
  }

  const addKuota = () => {
    axiosInstance.post("/kuota", {
      month: formData.bulan
    })
      .then(() => {
        alert("Kuota Berhasil ditambahkan")
      })
      .catch((error) => {
        alert(`Error fetching website status: ${error}`)
      });
  }

  return (
    <LayoutAdmin>
      <div className="close-booking">
        <div className="card p-3 mt-5" style={{ backgroundColor: "#D2E3C8" }}>
          <div className="content d-flex align-items-center gap-3">
            {
              status ? (
                <>
                  <button className="btn btn-primary" style={{ width: "320px", fontSize: "13px", fontWeight: "bold" }} onClick={() => closeBooking(false)}><i className="fa-solid fa-laptop me-1"></i>Tutup Pendaftaran Booking Online!</button>
                  <div style={{ fontSize: "13px" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Status pendaftaran booking online</span> masih <span>dibuka</span>. Terakhir diubah {formatDatetime}</div>
                </>
              ) : (
                <>
                  <button className="btn btn-danger" style={{ width: "320px", fontSize: "13px", fontWeight: "bold" }} onClick={() => closeBooking(true)}><i className="fa-solid fa-laptop me-1"></i>Buka Pendaftaran Booking Online!</button>
                  <div style={{ fontSize: "13px" }}><span style={{ fontWeight: "bold", fontSize: "14px" }}>Status pendaftaran booking online</span> masih <span>ditutup</span>. Terakhir diubah {formatDatetime}</div>
                </>
              )
            }
          </div>
        </div>
      </div>
      <div className="add-kuota mt-5">
        <div className="card">
          <div className="card-header">
            <span>Kuota</span>
          </div>
          <div className="card-body">
            <div className="form-group my-3">
              <label htmlFor="exampleInputPassword1">Silahkan Pilih Bulan</label>
              <div className="d-flex gap-3 mt-2">
                <div className="form-group" style={{ width: "20%" }}>
                  <select
                    value={formData.bulan}
                    onChange={(e) => setFormData({ ...formData, bulan: parseInt(e.target.value) })}
                    className="form-control" id="exampleFormControlSelect1">
                    <option>Bulan</option>
                    <option value={1}>Jan</option>
                    <option value={2}>Feb</option>
                    <option value={3}>Mar</option>
                    <option value={4}>Apr</option>
                    <option value={5}>May</option>
                    <option value={6}>Jun</option>
                    <option value={7}>Jul</option>
                    <option value={8}>Aug</option>
                    <option value={9}>Sep</option>
                    <option value={10}>Oct</option>
                    <option value={11}>Nov</option>
                    <option value={12}>Des</option>
                  </select>
                </div>
                <button className="btn btn-primary" onClick={() => addKuota()}>Generate</button>
              </div>
              <span style={{ fontSize: "10px", color: "red" }}>* Tahun akan di generate otomatis</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default AdminSetting