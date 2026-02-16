import HeaderWithNoButton from "@/components/onboard/Header/HeaderNoButton";
import LoginContent from "@/components/onboard/login/LoginContent";
import Footer from "@/components/common/Footer";

export default function Login() { 
    return (
        <div className="bg-ot-background min-h-screen">
            <HeaderWithNoButton/>
            <LoginContent/>
            <Footer/>
        </div>
    )
}