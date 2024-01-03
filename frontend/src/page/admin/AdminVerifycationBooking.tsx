/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api";

const AdminVerifycationBooking = () => {
  const [viewData, setViewData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filteredData, setFilteredData] = useState([]);
  const [viewDataById, setViewDataById] = useState<any>(null);
  const [status, setStatus] = useState(false)
  const [bookingId, setBookingId] = useState()

  useEffect(() => {
    axiosInstance.get(`/bookings?search=${searchValue}&&filterDate=${selectedDate}&&status=0`)
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
        (selectedDate === "" || item.date === selectedDate)
      );
    });
    setFilteredData(filteredData);
  }, [searchValue, selectedDate, viewData]);

  const handleOpenModal = (bookingId: any) => {
    axiosInstance.get(`/bookings/${bookingId}`)
      .then((response: any) => {
        setViewDataById(response.data.data)
        setStatus(response.data.data.status)
        setBookingId(bookingId)
      })
      .catch((error) => {
        alert(`Error fetching booking: ${error}`)
      });
  };

  const handleStatus = (event: any) => {
    setStatus(event.target.checked);
  };

  const handleSubmitStatus = () => {
    axiosInstance
      .post("/bookings/set_status", {
        booking_id: bookingId,
        status: status,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(`Error update status booking: ${error}`)
      });
  };
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
              <input type="date" className="form-control" placeholder="Cari kode booking" aria-label="Cari kode booking" aria-describedby="basic-addon1"
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
                <th scope="col" style={{ textAlign: "center" }}>Total Hari</th>
                <th scope="col" style={{ textAlign: "center" }}>Status</th>
                <th scope="col" style={{ textAlign: "center" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredData.map((item: any, index) => (
                  <tr key={index}>
                    <td>{item.kode_booking}</td>
                    <td style={{ textAlign: "center" }}>{item.tanggal_naik}</td>
                    <td style={{ textAlign: "center" }}>{item.tanggal_turun}</td>
                    <td style={{ textAlign: "center" }}>{item.total_hari}</td>
                    <td style={{ textAlign: "center" }}>{item.status == false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Pengajuan</span> : <span className="bg-success" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Disetujui</span>}</td>
                    <td style={{ textAlign: "center" }}><button onClick={() => handleOpenModal(item.id)} style={{ border: 0 }}> <i style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#exampleModal" className="fas fa-regular fa-pen-to-square"></i></button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Verifikasi data booking</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {
                    viewDataById && (
                      <ul style={{ listStyle: "none" }}>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Kode Booking</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.kode_booking}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Jalur</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.jalur}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Tanggal Naik</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.tanggal_naik}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Tanggal Naik</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.tanggal_turun}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Nama Ketua</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.nama_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>No. Identitas</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.no_identitas_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Tempat Lahir</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.tempat_lahir_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Tanggal Lahir</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.tanggal_lahir_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Jenis Kelamin</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.jenis_kelamin_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Alamat</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.alamat_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>No. Telepon</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.no_telepone_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>No. Kontak Darurat</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.no_kontak_darurat_ketua}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Tarif</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>Rp. {viewDataById.tarif}</div>
                        </li>
                        <li className="d-flex">
                          <div style={{ width: "40%" }}>Anggota</div>
                        </li>
                        {
                          viewDataById.anggota && viewDataById.anggota.map((value: any, index: any) => (
                            <ul key={index}>
                              <li className="d-flex">
                                <div className="me-2">{index + 1}.</div>
                                <div style={{ width: "30%" }}>Nama</div>
                                <div>:</div>
                                <div className="ms-2" style={{ fontWeight: "bold" }}>{value.nama}</div>
                              </li>
                              <li className="d-flex">
                                <div style={{ marginLeft: "19px", width: "30%" }}>No. Telepon</div>
                                <div>:</div>
                                <div className="ms-2" style={{ fontWeight: "bold" }}>{value.no_telepone}</div>
                              </li>
                              <li className="d-flex">
                                <div style={{ marginLeft: "19px", width: "30%" }}>Jenis Kelamin</div>
                                <div>:</div>
                                <div className="ms-2" style={{ fontWeight: "bold" }}>{value.jenis_kelamin}</div>
                              </li>
                              <li className="d-flex">
                                <div style={{ marginLeft: "19px", width: "30%" }}>Alamat</div>
                                <div>:</div>
                                <div className="ms-2" style={{ fontWeight: "bold" }}>{value.alamat}</div>
                              </li>
                            </ul>
                          ))
                        }
                        <li className="d-flex mt-4">
                          <div style={{ width: "40%" }}>Bukti Pembayaran</div>
                        </li>
                        <li className="d-flex">
                          <img src={viewDataById.bukti_pembayaran} height={200} width={400} alt="" />
                        </li>
                        <li className="d-flex mt-4">
                          <div style={{ width: "40%" }}>Status</div>
                          <div>:</div>
                          <div className="ms-2" style={{ fontWeight: "bold" }}>{viewDataById.status == false ? <span className="bg-warning" style={{ paddingLeft: "20px", paddingRight: "20px", fontWeight: "bold", color: "white", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px", fontSize: "10px" }}>Proses</span> : <span className="bg-succes" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "5px", paddingBottom: "5px", borderRadius: "10px" }}>Disetujui</span>}</div>
                        </li>
                      </ul>
                    )
                  }
                  <div className="isVerify mt-5">
                    <span>Setujui Pengajuan Booking ? </span>
                    <div className="content-2 d-flex gap-2">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault3"
                          checked={status}
                          onChange={handleStatus}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                          Ya
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault4"
                          checked={!status}
                          onChange={handleStatus}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault4">
                          Tidak
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmitStatus}>Ubah</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export default AdminVerifycationBooking