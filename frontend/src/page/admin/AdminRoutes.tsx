import { Route, Routes } from "react-router-dom"
import AdminDashboard from "./AdminDashboard"
import AdminVerifycationBooking from "./AdminVerifycationBooking"
import AdminHistoryBooking from "./AdminHistoryBooking"
import { AdminBlacklist } from "./AdminBlacklist"
import AdminSetting from "./AdminSetting"

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/verifycation_data" element={<AdminVerifycationBooking />} />
            <Route path="/history_booking" element={<AdminHistoryBooking />} />
            <Route path="/blacklist" element={<AdminBlacklist />} />
            <Route path="/setting" element={<AdminSetting />} />
        </Routes>
    )
}

export default AdminRoutes