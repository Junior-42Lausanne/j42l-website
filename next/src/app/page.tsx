import TextSection from "./components/home/textSection"
import ServiceSection from "./components//home/serviceSection"
import HeroSection from "./components/home/heroSection"
import PortfolioSection from "./components/home/portfolioSection"
import FooterCTA from "./components/footerCTA"
import Footer from "./components/footer"
import getStrapiData from "./utils"

export default async function Home() {
  let heroTitle = "";
  let subtitle = "";

  try {
    const strapiHero = await getStrapiData("/api/accueil?populate=*");
    const heroArray = strapiHero.data.hero;

    if (heroArray && heroArray.length > 0) {
      heroTitle = heroArray[0].title;
      subtitle = heroArray[0].text;
    }
  } catch (err) {
    console.error("Strapi unreachable: " + err);
    heroTitle = "Title not available during setup";
  }

  return (
    <div>
      <HeroSection background="/stock photo/home background.jpg" 
                    title={heroTitle}
                    subTitle={subtitle}
                    triangleColor='orange'
                    haveSubtile={true}
                    button={{
                      text: "Nos Services",
                      path: "https://www.google.com",
                      color:'white'
                    }} />
      <TextSection />
      <ServiceSection />
      <PortfolioSection />
      <div className="h-[700px] bg-black"></div>
      <FooterCTA  text= "Réalisez votre projet de rêve avec nous!" 
                  button={{
                    text: "Contactez-Nous",
                    path: "https://www.google.com",
                    color: 'orange'
                   }} />
      <Footer />
    </div>
  )
}

