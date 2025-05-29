import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"


export const Layout = () => {
    return (
        <div className="bg-dark min-vh-100 d-flex flex-column">
            <ScrollToTop>
                <Navbar />
                <Outlet />
                <Footer />
            </ScrollToTop>
        </div>
    )
}