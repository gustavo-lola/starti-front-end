import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AppRoutes } from "./routes";

export function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <ToastContainer
                position="bottom-right"
                autoClose={2800}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                toastClassName="starti-toast"
                progressClassName="starti-toast-progress"
            />
        </BrowserRouter>
    );
}
