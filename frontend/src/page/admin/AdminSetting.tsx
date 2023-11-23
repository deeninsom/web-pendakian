/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api"
import moment from "moment"

const AdminSetting = () => {

  const [status, setStatus] = useState(false)
  const [formatDatetime, setFormatDatetime] = useState("")

  useEffect(() => {
    axiosInstance.get("/website/f3cfc977-9cb5-4a4b-8daa-3504c88e4b36")
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
    axiosInstance.put("/website/f3cfc977-9cb5-4a4b-8daa-3504c88e4b36", {
      status_pendaftaran: inputStatus
    })
      .then(() => {
        setStatus(inputStatus)
      })
      .catch((error) => {
        alert(`Error updating website status: ${error}`)
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
    </LayoutAdmin>
  )
}

export default AdminSetting