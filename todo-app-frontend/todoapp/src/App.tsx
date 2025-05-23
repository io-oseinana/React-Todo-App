import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import LoginPage from "@/pages/LoginPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import HomePage from "@/pages/IndexPage.tsx";
import TodosPage from "@/pages/TodosPage.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/todos" element={<ProtectedRoute><TodosPage/></ProtectedRoute>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default App
