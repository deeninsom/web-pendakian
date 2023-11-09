import { Route, Routes } from "react-router-dom"
import Landing_page from "./Landing_page"
import Form_pendaftaran from "./Form_pendaftaran"
import View_booking from "./View_booking"
import Peraturan from "./Peraturan"
import View_cuaca from "./View_cuaca"
import View_kuota from "./View_kuota"
import View_sop from "./View_sop"
import View_tutorial from "./View_tutorial"

const Pengunjung_routes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landing_page />} />
                <Route path="/form_pendaftaran" element={<Form_pendaftaran />} />
                <Route path="/view_booking" element={<View_booking />} />
                <Route path="/peraturan" element={<Peraturan />} />
                <Route path="/cuaca" element={<View_cuaca />} />
                <Route path="/kuota" element={<View_kuota />} />
                <Route path="/sop_booking" element={<View_sop />} />
                <Route path="/tutorial" element={<View_tutorial />} />
            </Routes>
        </>
    )
}

export default Pengunjung_routes