import ServicesAccordion, { type ServicesAccordionProps } from '../components/ServicesAccordion';
import SectionTitle from "../components/SectionTitle";
import { type ThemeColor } from "../utils/type";

export type ServicesSectionProps = {
  id: number,
  __component: "layout.services",
  servicesTitle: {
    title: string,
    color: ThemeColor,
  },
  servicesAccordions: ServicesAccordionProps[],
}

export default function ServicesSection( {
  servicesTitle,
  servicesAccordions,
} : ServicesSectionProps) {

  const styles = {
    section: "flex flex-col gap-[3.75rem] py-[9.375rem] px-[1.25rem] items-center \
					md:px-[2.25rem] \
					lg:px-[4.25rem] \
					xl:px-[6.25rem]",
    titleWrap: "w-full",
    accordions: "flex flex-row flex-wrap justify-center gap-[1.25rem]",
  }

  return (
    <section className={styles.section}>
      <div className={styles.titleWrap}>
        <SectionTitle color={servicesTitle.color}>
          {servicesTitle.title}
        </SectionTitle>
      </div>
      <div className={styles.accordions}>
        {
          servicesAccordions.map((serviceAccordion) => 
            <ServicesAccordion key={serviceAccordion.id} {...serviceAccordion}></ServicesAccordion>)
        }
      </div>
    </section>
  )
}