import Layout from "./layout/Layout"
import imageStep1 from "../../assets/Screenshot from 2023-11-07 14-20-40.png"
import imageStep2 from "../../assets/Screenshot from 2023-11-07 14-21-03.png"
import imageStep3 from "../../assets/Screenshot from 2023-11-07 14-21-41.png"
import imageStep4 from "../../assets/Screenshot from 2023-11-07 14-22-00.png"
import imageStep5 from "../../assets/Screenshot from 2023-11-07 14-22-17.png"
import imageStep6 from "../../assets/Screenshot from 2023-11-07 14-22-39.png"
import imageStep7 from "../../assets/Screenshot from 2023-11-07 14-22-53.png"
import imageStep8 from "../../assets/Screenshot from 2023-11-07 14-54-49.png"
import imageStep9 from "../../assets/Screenshot from 2023-11-07 14-23-59.png"


const View_tutorial = () => {
  return (
    <Layout>
      <div className="rules" style={{ paddingTop: "90px", marginBottom: "10px" }}>
        <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
          <div className="content-text" style={{ marginLeft: "100px" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>Tutorial Booking Gunung Penanggungan</div>
          </div>
        </div>
        <div className="content p-5">
          <label className="my-3 d-flex gap-2 align-items-center" style={{ fontSize: "20px" }}><i className="fa fa-solid fa-gear" style={{ color: "gray" }}></i>Tutorial Booking</label>
          <div className="card rules-1">
            <div className="card-body">
              <ul>
                <li className="gap-2 mb-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>1.</div>
                    <span style={{ display: "block" }}>Buka laman booking Gunung Penanggungan, lalu klik "Booking Sekarang"</span>
                  </div>
                  <img src={imageStep1} style={{ height: "450px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>2.</div>
                    <span style={{ display: "block" }}>Lengkapi dan centang data sesuai daftar check list sampai muncul menu Daftar</span>
                  </div>
                  <img src={imageStep2} style={{ height: "450px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>3.</div>
                    <span style={{ display: "block" }}>Lengkapi form booking dengan memilih jalur pendakian dan tanggal naik/turun</span>
                  </div>
                  <img src={imageStep3} style={{ height: "450px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>4.</div>
                    <span style={{ display: "block" }}>Lengkapi form booking dengan mengisi data ketua</span>
                  </div>
                  <img src={imageStep4} style={{ height: "450px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>5.</div>
                    <span style={{ display: "block" }}>Lengkapi form booking dengan mengisi data anggotas</span>
                  </div>
                  <img src={imageStep5} style={{ height: "200px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>6.</div>
                    <span style={{ display: "block" }}>Klik menu lanjut</span>
                  </div>
                  <img src={imageStep6} style={{ height: "350px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>7.</div>
                    <span style={{ display: "block" }}>Jika sudah yakin, klik Kirim</span>
                  </div>
                  <img src={imageStep7} style={{ height: "350px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>8.</div>
                    <span style={{ display: "block" }}>Cek booking anda dengan mengetikan kode booking yang ada miliki.</span>
                  </div>
                  <img src={imageStep8} style={{ height: "500px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
                <li className="gap-2 my-4" style={{ listStyle: "none" }}>
                  <div className="header d-flex gap-2">
                    <div>8.</div>
                    <span style={{ display: "block" }}>Kirim bukti pembayaran dan cek status pendakian secara berkala, jika ingin melakukan pembatalan booking bisa klik "Batal Booking".</span>
                  </div>
                  <img src={imageStep9} style={{ height: "500px", width: "100%", marginTop: "10px" }} alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default View_tutorial