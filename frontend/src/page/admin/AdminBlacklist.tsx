/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LayoutAdmin from "./layout/LayoutAdmin"
import axiosInstance from "../../api";

export const AdminBlacklist = () => {
  const [years, setYears] = useState([]);
  const [blacklistData, setBlacklistData]: any = useState([])
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    no_telepon: '',
    bulan: 0,
    tahun: ''
  });

  useEffect(() => {
    axiosInstance.get("/blacklist")
      .then((response) => {
        setBlacklistData(response.data.data)
      })
      .catch((error) => {
        alert(`Error fetching website status: ${error}`)
      });
  })

  useEffect(() => {
    const currentYear = new Date().getFullYear();

    const numberOfYears = 10;

    const yearArray: any = Array.from({ length: numberOfYears * 2 + 1 }, (_, index) => currentYear - numberOfYears + index);

    setYears(yearArray);
  }, []);

  const addBlacklist = () => {
    const formattedMonth = formData.bulan < 10 ? `0${formData.bulan}` : `${formData.bulan}`;
    const date = `${formData.tahun}-${formattedMonth}-01`;
 
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    axiosInstance.post("/blacklist", {
      nik: formData.nik,
      nama: formData.nama,
      no_telepon: formData.no_telepon,
      dibuat: formattedCurrentDate,
      berakhir: date
    })
      .then((response) => {
        setBlacklistData([...blacklistData, response.data.data]);
      })
      .catch((error) => {
        alert(`Error fetching website status: ${error}`)
      });
  }

  return (
    <LayoutAdmin>
      <div className="tabel-booking mb-4">
        <span className="d-block pt-4 mb-2">Filter</span>
        <div className="input-group">
          <div className="form-outline d-flex gap-2">
            <div className="input-group mb-3">
              <input type="search" className="form-control" placeholder="Cari berdasarkan NIK" aria-label="Cari kode booking" aria-describedby="basic-addon1"
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon1"><i className="fa fas-solid fa-search"></i></span>
            </div>
          </div>
        </div>
        <div className="header d-flex justify-content-between align-items-center">
          <span className="py-3 d-block">Data blacklist pendaki: </span>
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addblacklist" style={{ fontSize: "12px" }}>tambah</button>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-bordered table-responsive table-striped" >
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                <th scope="col" style={{ width: "20%" }}>NIK</th>
                <th scope="col" style={{ width: "32%" }}>Nama</th>
                <th scope="col" style={{}}>No. Telepon</th>
                <th scope="col" style={{}}>Dibuat</th>
                <th scope="col" style={{}}>Berakhir</th>
              </tr>
            </thead>
            <tbody>
              {
                blacklistData.map((val: any, index: any) => (
                  <tr key={index}>
                    <td>{val.nik}</td>
                    <td>{val.nama}</td>
                    <td>{val.no_telepon}</td>
                    <td>{val.dibuat}</td>
                    <td>{val.berakhir}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade" id="addblacklist" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add blacklist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="form-group my-2">
                  <label htmlFor="exampleInputEmail1">Masukan NIK</label>
                  <input
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    type="text" className="form-control" id="exampleInputText" />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="exampleInputPassword1">Nama</label>
                  <input
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    type="text" className="form-control" id="exampleInputText" />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="exampleInputPassword1">No. Telepon</label>
                  <input
                    value={formData.no_telepon}
                    onChange={(e) => setFormData({ ...formData, no_telepon: e.target.value })}
                    type="text" className="form-control" id="exampleInputText" />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="exampleInputPassword1">Periode Berakhir</label>
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
                    <div className="form-group" style={{ width: "20%" }}>
                      <select
                        value={formData.tahun}
                        onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                        className="form-control" id="exampleFormControlSelect1">
                        <option>Tahun</option>
                        {years.map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => addBlacklist()}>Tambahkan</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="detailblacklist" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Detail blacklist</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* {
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
                          viewDataById.anggota.map((value: any, index: any) => (
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
                  } */}
              {/* <div className="isVerify mt-5">
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
                  </div> */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Ubah</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}
