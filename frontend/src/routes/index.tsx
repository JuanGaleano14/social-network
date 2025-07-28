import {Route, Routes, Navigate} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
    )
}
