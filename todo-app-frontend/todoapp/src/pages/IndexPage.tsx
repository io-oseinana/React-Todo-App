import Nav from "@/features/user/Nav.tsx";

const HomePage = () => {
    return (
        <>
            <Nav/>
            <div className="p-5 text-center">
                <h1 className="text-2xl mb-3">Welcome to the Todo App!</h1>
                <p>Please register or login to manage your todos.</p>
            </div>
        </>
    );
}
export default HomePage
