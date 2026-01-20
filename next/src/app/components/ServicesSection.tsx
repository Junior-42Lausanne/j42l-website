import ServicesAccordion, { ServicesAccordionProps } from './sub_components/ServicesAccordion';
import SectionTitle from "./sub_components/SectionTitle";
import { ThemeColor } from "../utils/type";

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
    section: "flex flex-col gap-[3.75rem] py-[9.375rem] mx-[6.25rem] items-center",
    accordions: "flex flex-row flex-wrap justify-center gap-[1.25rem]",
  }

  return (
    <div className={styles.section}>
      <div>
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
    </div>
  )
}