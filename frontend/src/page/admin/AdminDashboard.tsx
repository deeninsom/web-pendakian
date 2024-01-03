/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api";

const AdminDashboard = () => {
  const [viewData, setViewData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [bookingId, setBookingId] = useState()
  const [totalBooking, setTotalBooking] = useState([])
  const [allBooking, setAllBooking] = useState([])
  const [detailBooking, setDetailBooking]: any = useState()

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
        setBookingId(response.data.data.id)
        setDetailBooking(response.data.data)
      })
      .catch((error) => {
        alert(`Error fetching booking data: ${error}`)
      });
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
        status_pendakian: detailBooking.status_pendakian
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
                <th scope="col" style={{ textAlign: "center" }}>Status Verifikasi</th>
                <th scope="col" style={{ textAlign: "center" }}>Status Pendakian</th>
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
                    <td style={{ textAlign: "center" }}>
                      {/* {item.naik === false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Tidak</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Ya</span>}*/}
                      {
                        item.status_pendakian === 'pending' && (
                          <span className="bg-secondary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Pending</span>
                        )
                      }
                      {
                        item.status_pendakian === 'naik' && (
                          <span className="bg-primary" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Naik</span>
                        )
                      }
                      {
                        item.status_pendakian === 'turun' && (
                          <span className="bg-danger" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Turun</span>
                        )
                      }
                    </td>
                    <td className="text-center">{item.total_hari}</td>
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
                  <h1 className="modal-title fs-5" id="exampleModalLabel">UBAH BOOKING</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col">
                      <label className="form-label" style={{ fontWeight: "bold" }}>Status Pendakian</label>
                      <select
                        value={detailBooking?.status_pendakian}
                        onChange={(e) => setDetailBooking({ ...detailBooking, status_pendakian: e.target.value })}
                        id="inputState" className="form-select">
                        {/* <option selected>{detailBooking?.status_pendakian ? detailBooking.status_pendakian.charAt(0).toUpperCase() + detailBooking.status_pendakian.slice(1) : ''}</option> */}
                        <option value="naik">Naik</option>
                        <option value="turun">Turun</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
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
