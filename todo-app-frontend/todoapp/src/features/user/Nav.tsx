import {Link} from "react-router-dom";
import useAuthStore from "@/features/auth/store/authStore.ts";

const Nav = () => {
    const {user, isLoading, logout} = useAuthStore();

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleLogout = () => {
        logout();
    };
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="flex items-center space-x-4">
                <Link to="/">Home</Link>
                {user ? (
                    <>
                        <Link to="/todos">My Todos</Link>
                        <span>Welcome, {user.name}!</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
export default Nav
