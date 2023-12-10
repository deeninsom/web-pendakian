/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api";

const AdminDashboard = () => {
  const [viewData, setViewData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusNaik, setStatusNaik] = useState(false)
  const [statusTurun, setStatusTurun] = useState(false)
  const [bookingId, setBookingId] = useState()
  const [totalBooking, setTotalBooking] = useState([])
  const [allBooking, setAllBooking] = useState([])

  useEffect(() => {
    axiosInstance.get('/bookings')
      .then((response) => {
        setAllBooking(response.data.data)
      })
      .catch((error) => {
        alert(`Error fetching booking data: ${error}`)
      });


    axiosInstance.get('/bookings?status=1')
      .then((response) => {
        setTotalBooking(response.data.data)
      })
      .catch((error) => {
        alert(`Error fetching booking data: ${error}`)
      });

    axiosInstance.get(`/bookings?search=${searchValue}&&filterDate=${selectedDate}&&status=1`)
      .then((response) => {
        setViewData(response.data.data);
      })
      .catch((error) => {
        alert(`Error fetching booking data: ${error}`)
      });
  }, [searchValue, selectedDate]);

  const handleOpenModal = (bookingId: any) => {
    axiosInstance.get(`/bookings/${bookingId}`)
      .then((response: any) => {
        setStatusNaik(response.data.data.naik)
        setStatusTurun(response.data.data.turun)
        setBookingId(response.data.data.id)
      })
      .catch((error) => {
        alert(`Error fetching booking data: ${error}`)
      });
  };

  const handleNaikChange = (event: any) => {
    setStatusNaik(event.target.checked);
  };

  const handleTurunChange = (event: any) => {
    setStatusTurun(event.target.checked);
  };

  useEffect(() => {
    const filteredData = viewData.filter((item: any) => {
      return (
        item.kode_booking.toLowerCase().includes(searchValue.toLowerCase()) ||
        (selectedDate === "" || item.tanggal_naik === selectedDate)
      );
    });
    setFilteredData(filteredData);
  }, [searchValue, selectedDate, viewData]);

  const handleSubmitChanges = () => {
    axiosInstance
      .post("/bookings/change_status", {
        booking_id: bookingId,
        naik: statusNaik,
        turun: statusTurun
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(`Error update booking status: ${error}`)
      });
  };

  return (
    <LayoutAdmin>
      <div className="content-card d-flex gap-3">
        <div className="card" style={{ marginTop: "35px", width: "250px", backgroundColor: "#F1EFEF" }}>
          <div className="card-body d-flex gap-2 align-items-center justify-content-center">
            <i className="fa fa-solid fa-user"></i>
            <span>Data Pengunjung</span>
          </div>
          <span style={{ textAlign: "center", fontWeight: "bold", marginBottom: "10px", color: "green" }}>{totalBooking.length} <span style={{ color: "black", fontWeight: "normal" }}>Orang</span></span>
        </div>
        <div className="card" style={{ marginTop: "35px", width: "250px", backgroundColor: "#F1EFEF" }}>
          <div className="card-body d-flex gap-2 align-items-center justify-content-center">
            <i className="fa fa-solid fa-user"></i>
            <span>Total Booking</span>
          </div>
          <span style={{ textAlign: "center", fontWeight: "bold", marginBottom: "10px", color: "green" }}>{allBooking.length} <span style={{ color: "black", fontWeight: "normal" }}>Orang</span></span>
        </div>
      </div>
      <div className="tabel-booking mb-4 mt-4">
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
                <th scope="col" style={{ textAlign: "center" }}>Status</th>
                <th scope="col" style={{ textAlign: "center" }}>Naik</th>
                <th scope="col" style={{ textAlign: "center" }}>Turun</th>
                <th scope="col" style={{ textAlign: "center" }}>Total Hari</th>
                <th scope="col" style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredData.map((item: any, index) => (
                  <tr key={index}>
                    <td>{item.kode_booking}</td>
                    <td style={{ textAlign: "center" }}>{item.status == false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Pengajuan</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Disetujui</span>}</td>
                    <td style={{ textAlign: "center" }}>{item.naik === false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Tidak</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Ya</span>}</td>
                    <td style={{ textAlign: "center" }}>{item.turun == false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Tidak</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Ya</span>}</td>
                    <td className="text-center">0</td>
                    <td style={{ textAlign: "center" }}><button onClick={() => handleOpenModal(item.id)} style={{ border: 0 }}> <i style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal" className="fas fa-regular fa-pen-to-square"></i></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Ubah data booking</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <span>Sedang Naik: </span>
                  <div className="content-1 d-flex gap-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1"
                        checked={statusNaik}
                        onChange={handleNaikChange}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Ya
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2"
                        checked={!statusNaik}
                        onChange={handleNaikChange}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Tidak
                      </label>
                    </div>
                  </div>
                  <span>Sedang Turun: </span>
                  <div className="content-2 d-flex gap-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault3"
                        checked={statusTurun}
                        onChange={handleTurunChange}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault3">
                        Ya
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault4"
                        checked={!statusTurun}
                        onChange={handleTurunChange}
                      />
                      <label className="form-check-label" htmlFor="flexRadioDefault4">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmitChanges} >Ubah</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default AdminDashboard
