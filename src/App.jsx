// App.jsx
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { LoaderProvider } from "./context/LoaderContext";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/authContext";
import TokenVerifier from "./components/TokenVerifier";
import { PrimeReactProvider } from "primereact/api";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <BrowserRouter>
        <AuthProvider>
          <TokenVerifier />
          <LoaderProvider>
            {/* <UserProvider> */}
            <PrimeReactProvider>
              <AppRoutes />
              <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* </UserProvider> */}
            </PrimeReactProvider>
          </LoaderProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
