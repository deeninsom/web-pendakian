import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./AdminDashboard"
import AdminVerifycationBooking from "./AdminVerifycationBooking"
import AdminHistoryBooking from "./AdminHistoryBooking"

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/verifycation_data" element={<AdminVerifycationBooking />} />
            <Route path="/history_booking" element={<AdminHistoryBooking />} />
        </Routes>
    )
}

export default AdminRoutes