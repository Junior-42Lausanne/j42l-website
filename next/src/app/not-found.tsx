"use client";

import ButtonLink from "./components/sub_components/ButtonLink";

export default function NotFound() {
    const styles = {
        section: "w-full h-screen overflow-hidden flex justify-center items-center bg-black",
        centerDiv: "flex flex-row w-full px-[6.25rem] py-[6.25rem] justify-between",
        leftTriangleDiv: "flex flex-col justify-start items-start",
        textWrap: "flex flex-col font-poppins text-white text-center justify-center items-center",
        contentWrap: "flex flex-col gap-[2rem] items-center",
        heading: "text-[15rem] font-bold",
        subheading: "text-h5 pb-[2.5rem]",
        rightTriangleDiv: "flex flex-col justify-end items-end",
	}
    return (
        <div className = {styles.section}>
            <div className={styles.centerDiv}>
                <div className={styles.leftTriangleDiv}>
                    <div className={`w-0 h-0 border-t-[6rem] border-r-[6rem] border-white border-r-transparent`}></div>
                </div>
                <div className={styles.contentWrap}>
                    <div className={styles.textWrap}>
                        <h1 className={styles.heading}>404</h1>
                        <div className={styles.subheading}>Oops! Page non trouvée. <br></br>
                            La page que vous recherchez n'existe pas ou a été déplacée.</div>
                    </div>
                    <ButtonLink url={"/"} color={"orange"}>Accueil</ButtonLink>
                </div>
                <div className={styles.rightTriangleDiv}>
                    <div className={`w-0 h-0 border-l-[6rem] border-b-[6rem] border-white border-l-transparent`}></div>
                </div>
            </div>
        </div>
    );
}
