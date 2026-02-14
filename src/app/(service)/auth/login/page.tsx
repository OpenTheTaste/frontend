import OnboardHeader from "@/components/Onboard/Header/Header";
import LoginContent from "@/components/Onboard/login/LoginContent";
import Footer from "@/components/common/Footer";

export default function Login() { 
    return (
        <div className="bg-background min-h-screen">
            <OnboardHeader />
            <LoginContent/>
            <Footer/>
        </div>
    )
}