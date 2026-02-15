import NoButtonHeader from "@/components/onboard/Header/nobuttonheader";
import LoginContent from "@/components/onboard/login/LoginContent";
import Footer from "@/components/common/Footer";

export default function Login() { 
    return (
        <div className="bg-ot-background min-h-screen">
            <NoButtonHeader/>
            <LoginContent/>
            <Footer/>
        </div>
    )
}