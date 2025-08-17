import WelcomeSection from "./components/welcomeSection"
import ServiceSection from "./components/serviceSection"
import HeroSection, {HeroProps} from "./components/heroSection"
import PortfolioSection from "./components/portfolioSection"
import FooterCTA, {footerCtaProps} from "./components/footerCTA"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div>
      <HeroSection background="/stock photo/home background.jpg" 
                    title="Votre vision réalisée par les étudiants de 42 Lausanne"
                    subTitle="Propulsant l'innovation en tant que plus grande Junior Entreprise du réseau 42 – où de jeunes consultants IT donnent vie à vos projets digitaux."
                    buttonText="Nos Services"
                    buttonPath="https://www.google.com" 
                    triangleColor="orange"
                    haveSubtile />
      <WelcomeSection />
      <ServiceSection />
      <PortfolioSection />
      <div className="h-[700px] bg-black"></div>
      <FooterCTA text="Réalisez votre projet de rêve avec nous!"
                buttonText="Contactez-Nous"
                buttonPath="https://www.google.com" />
      <Footer />
    </div>
  )
}

