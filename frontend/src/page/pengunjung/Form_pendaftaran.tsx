/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "./layout/Layout"
import axiosInstance from "../../api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Form_pendaftaran = () => {
  const navigate = useNavigate();
  const [alertText, setAlertText] = useState(false)

  const initialMember = {
    nama: '',
    no_identitas_anggota: '',
    noTelepone: '',
    alamat: '',
    jenisKelamin: ''
  };

  const [formData, setFormData] = useState({
    jalurPendakian: 'Tamiajeng',
    tanggalBerangkat: '',
    tanggalPulang: '',
    namaKetua: '',
    alamatKetua: '',
    noIdentitasKetua: '',
    noTeleponKetua: '',
    tempatLahirKetua: '',
    tanggalLahirKetua: '',
    jenisKelaminKetua: '',
    noKontakDaruratKetua: '',
    anggota: [initialMember],
    tarif: 0,
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      if (formData.noIdentitasKetua.length >= 16) {
        const result = await axiosInstance.post("/bookings", {
          jalur: formData.jalurPendakian,
          tanggal_naik: formData.tanggalBerangkat,
          tanggal_turun: formData.tanggalPulang,
          nama_ketua: formData.namaKetua,
          alamat_ketua: formData.alamatKetua,
          no_identitas_ketua: formData.noIdentitasKetua,
          no_telepone_ketua: formData.noTeleponKetua,
          tempat_lahir_ketua: formData.tempatLahirKetua,
          tanggal_lahir_ketua: formData.tanggalLahirKetua,
          jenis_kelamin_ketua: formData.jenisKelaminKetua,
          no_kontak_darurat_ketua: formData.noKontakDaruratKetua,
          anggota: formData.anggota,
          tarif: calculateTarif(15000, totalParticipants),
          rombongan: totalParticipants
        })
        navigate(`/view_booking?search=${result.data.data.kode_booking}`);
      } else {
        setAlertText(true)
      }
    } catch (error: any) {
      if (error.response) {
        alert(`Error: ${error.response.data.message}`)
      }
    }
  }

  const addMember = () => {
    const newMember = { ...initialMember };
    setFormData({
      ...formData,
      anggota: [...formData.anggota, newMember],
    });
  };

  const removeMember = (index: any) => {
    const updatedAnggota = [...formData.anggota];
    updatedAnggota.splice(index, 1);
    setFormData({ ...formData, anggota: updatedAnggota });
  };

  const [isKetuaComplete, setIsKetuaComplete] = useState(false);
  useEffect(() => {
    const isKetuaComplete: any =
      formData.namaKetua &&
      formData.alamatKetua &&
      formData.noIdentitasKetua &&
      formData.noTeleponKetua &&
      formData.tempatLahirKetua &&
      formData.tanggalLahirKetua &&
      formData.jenisKelaminKetua &&
      formData.noKontakDaruratKetua

    setIsKetuaComplete(isKetuaComplete);
  }, [formData]);


  const isAnggotaComplete = (anggotaData: any) => {
    return (
      anggotaData.nama !== '' &&
      anggotaData.noTelepon !== '' &&
      anggotaData.noIdentitas !== '' &&
      anggotaData.alamat !== '' &&
      anggotaData.jenisKelamin !== ''
    );
  };

  const totalParticipants = formData.anggota.reduce(
    (total, anggota) => total + (isAnggotaComplete(anggota) ? 1 : 0),
    isKetuaComplete ? 1 : 0
  );

  const calculateTarif = (tarifPerHari: number, totalAnggota: number) => {
    const tanggalNaik: any = new Date(formData.tanggalBerangkat);
    const tanggalTurun: any = new Date(formData.tanggalPulang);

    const selisihHari = Math.ceil((tanggalTurun - tanggalNaik) / (1000 * 60 * 60 * 24));
    const total = tarifPerHari * totalAnggota * selisihHari;

    if (!total) {
      return 0
    }

    return total;
  };


  return (
    <Layout>
      <div className="content-form" style={{ paddingTop: "90px" }} >
        <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
          <div className="content-text" style={{ marginLeft: "100px" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>Form Booking</div>
          </div>
        </div>
        <div className="form" style={{ padding: "20px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col">
                <label className="form-label" style={{ fontWeight: "bold" }}>Jalur Pendakian</label>
                <select
                  value={formData.jalurPendakian}
                  onChange={(e) => setFormData({ ...formData, jalurPendakian: e.target.value })}
                  disabled
                  id="inputState" className="form-select">
                  <option >Tamiajeng</option>
                </select>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <label className="form-label" style={{ fontWeight: "bold" }}>Kunjungan</label>
              <div className="col-md-6 my-2">
                <label className="form-label">Tgl. Naik</label>
                <div className="input-group date" id="datepicker">
                  <input
                    value={formData.tanggalBerangkat}
                    onChange={(e) => setFormData({ ...formData, tanggalBerangkat: e.target.value })}
                    type="date" className="form-control" id="date"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">Tgl. Turun</label>
                <div className="input-group date" id="datepicker">
                  <input
                    value={formData.tanggalPulang}
                    onChange={(e) => setFormData({ ...formData, tanggalPulang: e.target.value })}
                    type="date" className="form-control" id="date"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            <div className="row g-3 mt-3">
              <label className="form-label" style={{ fontWeight: "bold" }}>Data Ketua Rombongan</label>
              <div className="col-md-6">
                <label className="form-label">Nama Ketua</label>
                <input
                  value={formData.namaKetua}
                  onChange={(e) => setFormData({ ...formData, namaKetua: e.target.value })}
                  type="text" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Alamat</label>
                <input
                  value={formData.alamatKetua}
                  onChange={(e) => setFormData({ ...formData, alamatKetua: e.target.value })}
                  type="text" className="form-control" />
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">Nomor Identitas (KTP/SIM/Kartu Pelajar/Passport)</label>
                <input
                  value={formData.noIdentitasKetua}
                  onChange={(e) => setFormData({ ...formData, noIdentitasKetua: e.target.value })}
                  type="text" className="form-control" />
                {
                  alertText && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>No identitas harus 16 digit</p>
                  )
                }
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">No. Telepon</label>
                <input
                  value={formData.noTeleponKetua}
                  onChange={(e) => setFormData({ ...formData, noTeleponKetua: e.target.value })}
                  type="text" className="form-control" />
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">Tempat Lahir</label>
                <input
                  value={formData.tempatLahirKetua}
                  onChange={(e) => setFormData({ ...formData, tempatLahirKetua: e.target.value })}
                  type="text" className="form-control" />
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">Tanggal Lahir</label>
                <div className="input-group date" id="datepicker">
                  <input
                    value={formData.tanggalLahirKetua}
                    onChange={(e) => setFormData({ ...formData, tanggalLahirKetua: e.target.value })}
                    type="date" className="form-control" id="date" />
                </div>
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">Jenis Kelamin</label>
                <select
                  value={formData.jenisKelaminKetua}
                  onChange={(e) => setFormData({ ...formData, jenisKelaminKetua: e.target.value })}
                  id="inputState" className="form-select">
                  <option selected>--Pilih--</option>
                  <option>Laki - Laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
              <div className="col-md-6 my-2">
                <label className="form-label">No. Kontak Darurat</label>
                <input
                  value={formData.noKontakDaruratKetua}
                  onChange={(e) => setFormData({ ...formData, noKontakDaruratKetua: e.target.value })}
                  type="text" className="form-control" />
              </div>
            </div>
            <div className="row mt-4">
              <div className="button-tambah d-flex justify-content-between mb-2">
                <label className="form-label" style={{ fontWeight: "bold" }}>Data Anggota</label>
                <button type="button" onClick={addMember} className="bg-primary" style={{ borderRadius: "10px", border: "none", color: "white", width: "11%", fontSize: "15px", padding: "5px" }}>Tambah Anggota</button>
              </div>
              {
                formData.anggota.map((anggota, index) => (
                  <>
                    <div key={index} className="col-md-3 my-2">
                      <label className="form-label">Nama</label>
                      <input
                        value={anggota.nama}
                        onChange={(e) => {
                          const updatedAnggota = [...formData.anggota];
                          updatedAnggota[index].nama = e.target.value;
                          setFormData({ ...formData, anggota: updatedAnggota });
                        }}
                        type="text" className="form-control" />
                    </div>
                    <div className="col-md-2 my-2">
                      <label className="form-label">No. Telepon</label>
                      <input
                        value={anggota.noTelepone}
                        onChange={(e) => {
                          const updatedAnggota = [...formData.anggota];
                          updatedAnggota[index].noTelepone = e.target.value;
                          setFormData({ ...formData, anggota: updatedAnggota });
                        }}
                        type="text" className="form-control" />
                    </div>
                    <div className="col-sm-2 my-2">
                      <label className="form-label">No. Identitas</label>
                      <input
                        value={anggota.no_identitas_anggota}
                        onChange={(e) => {
                          const updatedAnggota = [...formData.anggota];
                          updatedAnggota[index].no_identitas_anggota = e.target.value;
                          setFormData({ ...formData, anggota: updatedAnggota });
                        }}
                        type="text" className="form-control" />
                    </div>
                    <div className="col-md-2 my-2">
                      <label className="form-label">Alamat</label>
                      <input
                        value={anggota.alamat}
                        onChange={(e) => {
                          const updatedAnggota = [...formData.anggota];
                          updatedAnggota[index].alamat = e.target.value;
                          setFormData({ ...formData, anggota: updatedAnggota });
                        }}
                        type="text" className="form-control" />
                    </div>
                    <div className="col-md-2 my-2">
                      <label className="form-label">Jenis Kelamin</label>
                      <select
                        value={anggota.jenisKelamin}
                        onChange={(e) => {
                          const updatedAnggota = [...formData.anggota];
                          updatedAnggota[index].jenisKelamin = e.target.value;
                          setFormData({ ...formData, anggota: updatedAnggota });
                        }}
                        id="inputState" className="form-select">
                        <option selected>--Pilih--</option>
                        <option>Laki - Laki</option>
                        <option>Perempuan</option>
                      </select>
                    </div>
                    <div className="col-md-1 d-flex justify-content-center" style={{ marginTop: "45px" }}>
                      <i className="fa fa-solid fa-trash " onClick={() => removeMember(index)} style={{ cursor: "pointer", color: "red" }}></i>
                    </div>
                  </>
                ))
              }
            </div>
            <div className="ringkasan-booking">
              <label className="form-label" style={{ marginTop: "40px", fontWeight: "bold" }}>Ringkasan Booking</label>
              <span style={{ display: "block", color: "GrayText" }}>Dengan menekan tombol Kirim dibawah ini, maka Anda menyetujui segala Persyaratan dan Kebijakan !</span>
              <span style={{ display: "block", color: "GrayText", fontWeight: "bold" }}>Tarif per-hari : Rp. 15.000</span>
              <div className="data ringkasan my-4">
                <div className="row">
                  <div className="col-md-2 my-2">Tujuan</div>
                  <div className="col-md-4 my-2">:</div>
                  <div className="col-md-4 my-2">{formData.jalurPendakian}</div>
                </div>
                <div className="row">
                  <div className="col-md-2 my-2">Tanggal Naik</div>
                  <div className="col-md-4 my-2">:</div>
                  <div className="col-md-4 my-2">{formData.tanggalBerangkat}</div>
                </div>
                <div className="row">
                  <div className="col-md-2 my-2">Tanggal Turun</div>
                  <div className="col-md-4 my-2">:</div>
                  <div className="col-md-4 my-2">{formData.tanggalPulang}</div>
                </div>
                <div className="row">
                  <div className="col-md-2 my-2">Total Rombongan</div>
                  <div className="col-md-4 my-2">:</div>
                  <div className="col-md-4 my-2">
                    {totalParticipants} Orang
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-2 my-2">Tarif</div>
                  <div className="col-md-4 my-2">:</div>
                  <div className="col-md-4 my-2">Rp. {calculateTarif(15000, totalParticipants).toLocaleString('id-ID')}</div>
                </div>
              </div>
            </div>
            <button type="button" className="btn bg-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ width: "100%", color: "white" }}>Lanjut</button>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Apakah data anda sudah benar ?</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <span>Jika sudah lengkap, klik kirim untuk registrasi.</span>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Kirim</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Form_pendaftaran