import OnboardHeader from "@/components/onboard/Header/Header";
import LoginContent from "@/components/onboard/login/LoginContent";
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