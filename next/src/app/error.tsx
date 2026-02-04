'use client'

import ButtonLink from "./components/sub_components/ButtonLink";

export default function Error() {
    const styles = {
        section: "w-full h-screen overflow-hidden flex justify-center items-center bg-black",
        centerDiv: "flex flex-col gap-[2rem] w-full px-[1.25rem] py-[6.25rem] justify-between \
                    md:px-[2.25rem] \
					lg:px-[4.25rem] \
					xl:px-[6.25rem]",
        leftTriangleDiv: "flex flex-col justify-start items-start",
        leftTriangle: `w-0 h-0 border-t-[4.5rem] border-r-[4.5rem] border-white border-r-transparent \
					md:border-t-[6rem] md:border-r-[6rem]`,
        textWrap: "flex flex-col font-poppins text-white text-center justify-center items-center",
        contentWrap: "flex flex-col gap-[2rem] items-center",
        heading: "text-[7rem] font-bold \
                md:text-[15rem]",
        subheading: "text-h5 pb-[2.5rem]",
        rightTriangleDiv: "flex flex-col justify-end items-end",
        rightTriangle: `w-0 h-0 border-b-[4.5rem] border-l-[4.5rem] border-white border-l-transparent \
					md:border-b-[6rem] md:border-l-[6rem]`,
	}
    return (
        <div className = {styles.section}>
            <div className={styles.centerDiv}>
                <div className={styles.leftTriangleDiv}>
                    <div className={styles.leftTriangle}></div>
                </div>
                <div className={styles.contentWrap}>
                    <div className={styles.textWrap}>
                        <h1 className={styles.heading}>500</h1>
                        <div className={styles.subheading}>Aye! Erreur du serveur. <br></br>
                            Veuillez réessayer ultérieurement.</div>
                    </div>
                    <ButtonLink url={"/"} color={"orange"}>Retourne à la page d&#39;accueil</ButtonLink>
                </div>
                <div className={styles.rightTriangleDiv}>
                    <div className={styles.rightTriangle}></div>
                </div>
            </div>
        </div>
    );
}