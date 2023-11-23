/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api";
import moment from "moment";
import 'moment/locale/id';

const AdminHistoryBooking = () => {
  const [viewData, setViewData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    axiosInstance.get(`/bookings?search=${searchValue}&&status=1&&filterDate=${selectedDate}`)
      .then((response) => {
        setViewData(response.data.data);
      })
      .catch((error) => {
        alert(`Error fetching booking data: ${error}`)
      });
  }, [searchValue, selectedDate]);

  useEffect(() => {
    const filteredData = viewData.filter((item: any) => {
      return (
        item.kode_booking.toLowerCase().includes(searchValue.toLowerCase()) ||
        (selectedDate === "" || item.tanggal_naik === selectedDate)
      );
    });
    setFilteredData(filteredData);
  }, [searchValue, viewData, selectedDate]);

  return (
    <LayoutAdmin>
      <div className="tabel-booking mb-4">
        <span className="d-block pt-4 mb-2">Filter</span>
        <div className="input-group">
          <div className="form-outline d-flex gap-2">
            <div className="input-group mb-3">
              <input type="search" className="form-control" placeholder="Cari kode booking" aria-label="Cari kode booking" aria-describedby="basic-addon1"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon1"><i className="fa fas-solid fa-search"></i></span>
            </div>
            <div className="input-group mb-3">
              <input type="date" placeholder="yyyy-mm-dd" className="form-control"
                value={selectedDate}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const parts = inputValue.split('/');
                  if (parts.length === 3) {
                    const newDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
                    setSelectedDate(newDate);
                  } else {
                    setSelectedDate(inputValue);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <span className="py-3 d-block">Data Booking: </span>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-striped table-bordered" >
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                <th scope="col" style={{ width: "30%" }}>Kode Booking</th>
                <th scope="col" style={{ textAlign: "center" }}>Tgl. Naik</th>
                <th scope="col" style={{ textAlign: "center" }}>Tgl. Turun</th>
                <th scope="col" style={{ textAlign: "center" }}>Dibuat</th>
                <th scope="col" style={{ textAlign: "center" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredData.map((item: any, index) => (
                  <tr key={index}>
                    <td>{item.kode_booking}</td>
                    <td style={{ textAlign: "center" }}>{item.tanggal_naik}</td>
                    <td style={{ textAlign: "center" }}>{item.tanggal_turun}</td>
                    <td style={{ textAlign: "center" }}>{moment(item.created_at).startOf('hour').fromNow()}</td>
                    <td style={{ textAlign: "center" }}>{item.status == false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Pengajuan</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Disetujui</span>}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default AdminHistoryBooking