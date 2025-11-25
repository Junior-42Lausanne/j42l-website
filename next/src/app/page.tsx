import {Color} from "./components/type"
import WelcomeSection from "./components/home/welcomeSection"
import ServiceSection from "./components//home/serviceSection"
import HeroSection from "./components/home/heroSection"
import PortfolioSection from "./components/home/portfolioSection"
import FooterCTA from "./components/footerCTA"
import Footer from "./components/footer"

// async function getStrapiData(path: string) {
//   const baseUrl = "http://localhost:1337";
//   try {
//     const response: Response = await fetch(baseUrl + path);
//     const data = await response.json();
//     return data
//   } catch (error) {
//     console.error(error);
//   }
// }

export default async function Home() {
  // const strapiHero = await getStrapiData("/api/accueil");
  // const { heroTitle, text, link, backgroundImage} = strapiHero.data.attributes;

  return (
    <div>
      <HeroSection background="/stock photo/home background.jpg" 
                    // title={heroTitle}
                    title="TEST TEST"
                    subTitle="Propulsant l'innovation en tant que plus grande Junior Entreprise du réseau 42 – où de jeunes consultants IT donnent vie à vos projets digitaux."
                    buttonText="Nos Services"
                    buttonPath="https://www.google.com" 
                    triangleColor={Color.orange}
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

