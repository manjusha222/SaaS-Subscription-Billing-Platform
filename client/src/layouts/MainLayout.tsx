import { Outlet } from "react-router-dom";
function MainLayout(){
    return(
        <div className="flex min-h-screen">
            {/*sidebar*/}
            <div className="w-64 bg-gray-900 text-white p-5">
                <h1 className="text-2xl font-bold mb-10">
                    SaaS App
                </h1>
                <ul className="space-y-4">
                    <li>Dashboard</li>
                    <li>Plans</li>
                    <li>Profile</li>
                    <li>Logout</li>
                </ul>
            </div>

            {/*Main content*/}
            <div className="flex-1 p-6 bg-gray-100">
                <Outlet/>
            </div>
        </div>

    );
}
export default MainLayout;