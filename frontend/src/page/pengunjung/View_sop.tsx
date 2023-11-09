import Layout from "./layout/Layout"

const View_sop = () => {
  return (
    <Layout>
             <div className="rules" style={{ paddingTop: "90px", marginBottom: "10px" }}>
                <div className="content-booking w-full d-flex justify-content-between align-items-center p-4" style={{ height: "auto", color: "white", backgroundColor: "#232D3F" }}>
                    <div className="content-text" style={{ marginLeft: "100px" }}>
                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>SOP Gunung Penanggungan</div>
                    </div>
                </div>
                <div className="content p-5">
                    <div className="text-header">
                        <span style={{ fontSize: "20px", fontWeight: "bold", display: "block" }}>Selamat datang di Registrasi Online</span>
                        <br />
                        <span>Sebelum melakukan pendakian, bagi setiap individu/kelompok yang ingin melakukan wisata Gunung Penanggungan dan, dipersilahkan untuk mencermati tata cara registrasi dengan seksama. Peraturan dan Larangan merupakan hal yang harus ditaati oleh calon pengunjung.</span>
                    </div>
                    <label className="my-3 d-flex gap-2 align-items-center" style={{ fontSize: "20px" }}><i className="fa fa-solid fa-gear" style={{ color: "gray" }}></i>PERATURAN</label>
                    <div className="card rules-1">
                        <div className="card-body">
                            <ul>
                                <li className="d-flex gap-2 my-2 ">
                                    <i className="fa fa-solid fa-check" style={{ marginTop: "3px" }}></i>
                                    Pengunjung wajib memperhatikan dan mentaati pilihan site kunjungan destinasi wisata Gunung Penanggungan, sesuai dengan site pada tiket masuk yang telah dipesan melalui booking online.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Pilihan site kunjungan destinasi wisata Gunung Penanggungan, sesuai dengan site pada tiket masuk yang telah dipesan melalui booking online.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    SOP kunjungan wisata alam di Gunung Penanggungan tetap harus dipedomani dan diterapkan secara ketat dan teratur.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Protokol kesehatan juga bagi pelaku usaha (al. transportasi, konsumsi dan akomodasi) harus diterapkan secara ketat dan teratur dengan mempedomani dan memperhatikan kriteria health, hygine, security dan safety.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Larangan masuk kawasan Gunung Penanggungan untuk ibu hamil.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Batasan usia pengunjung menyesuaikan peraturan pada masa pandemi Covid-19.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Sudah divaksin (minimal dosis pertama) dengan menunjukkan sertifikat vaksin atau swab antigen/pcr sesuai ketentuan.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Pengunjung dan para pelaku usaha wajib memakai MASKER.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Pengunjung membawa hand sanitizer dan / atau sabun cair untuk membersihkan tangan.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa kresek kecil berwarna kuning untuk membuang masker.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Pengunjung menjaga jarak dengan pengunjung yang lain, tidak berkerumun, dan selalu membawa ketertiban.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Nominal pembayaran harus sesuai dengan tarif nominal pada booking online.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Tidak ada pengembalian pembayaran uang karcis yang telah disetor karena adanya pembatalan / refund.</li>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Setelah melakukan pembayaran, pengunjung tidak dapat melakukan reschedule / jadwal ulang.</li>
                            </ul>
                        </div>
                    </div>
                    <label className="my-3 d-flex gap-2 align-items-center" style={{ fontSize: "20px" }}><i className="fa fa-solid fa-gear" style={{ color: "gray" }}></i> LARANGAN</label>
                    <div className="card rules-2">
                        <div className="card-body">
                            <span className="my-3 ms-3" style={{ color: "gray", display: "block", fontSize: "16px" }}>Setiap pengunjung yang memasuki kawasan Gunung Penanggungan dilarang :</span>
                            <ul style={{ listStyle: "none" }}>
                                <li className="d-flex gap-2 my-2 align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Mengambil, memetik, memotong tumbuhan dan atau bagian-bagiannya serta benda-benda lainnya.
                                </li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Menangkap, melukai dan atau membunuh satwa yang ada dalam kawasan.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa binatang ke dalam maupun keluar kawasan.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa minuman keras atau beralkohol.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa obat-obatan terlarang seperti putau, heroin, ganja dan sejenisnya.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa alat musik dan alat bunyi-bunyian lainnya.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa alat elektronik seperti radio komunikasi (Handy Talky), radio tape, dll, kecuali jam tangan.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa senjata api, senapan angin, bahan peledak, dan senjata tajam lainnya.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa alat-alat yang lazim digunakan untuk berburu seperti senjata api, senapan, panah, dll.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa bahan detergen dan bahan pencemaran lainnya yang membahayakan bagi lingkungan.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membawa berbagai jenis cat, termasuk cat semprot dan jenis pewarna lainnya.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Melakukan vandalisme, perusakan fasilitas wisata, dan menempel menempel pada kawasan.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membuang sampah dalam kawasan dan tidak membawa turun kembali sampah bawaannya.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Membuat api unggun dan atau perapian di dalam kawasan yang dapat menimbulkan kebakaran hutan.</li>
                                <li className="d-flex gap-2 my-2  align-items-center">
                                    <i className="fa fa-solid fa-check"></i>
                                    Melakukan perbuatan asusila.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="p-2" style={{ backgroundColor: "#232D3F", color: "white" }}>
                <div className="text-center fs-6">
                    © 2023 Penanggungan. Seluruh hak cipta dilindungi.
                </div>
            </footer>
    </Layout>
  )
}

export default View_sop