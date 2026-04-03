"use client";

import Link from "next/link";
import { useState } from "react";
import { type IconProps } from "../sections/NavBar";
import StrapiImage, { type StrapiImageProps } from "./StrapiImage";

export type MemberCardProps = {
  id: number;
  photo: StrapiImageProps;
  name: string;
  role: string;
  social?: IconProps[];
  biography?: string;
};

export default function MemberCard({
  photo,
  name,
  role,
  social,
  biography,
}: MemberCardProps) {
  const [showBio, setShowBio] = useState(false);

  const styles = {
    section: "flex flex-col items-center w-full px-[1.25rem] py-[1.25rem] gap-[1rem] md:w-[20rem] lg:w-[24rem] overflow-hidden",
    flipOuter: "w-full h-[21rem] rounded overflow-hidden",
    flipInner: "mc-flip-inner relative w-full h-full",
    flipFront: "mc-flip-face absolute inset-0",
    photo: "object-cover w-full h-full mc-photo",
    flipBack: "mc-flip-face mc-flip-back absolute inset-0 overflow-y-auto bg-pale_orange p-[1.25rem] font-poppins",
    bioText: "mc-bio-text text-black text-h5 leading-relaxed",
    contentWrap: "flex flex-col gap-[0.625rem] font-poppins text-black text-left w-full px-[0.8rem]",
    textWrap: "flex flex-col",
    name:" mc-name text-h4 font-semibold",
    role: "mc-role text-h5",
    bottomWrap: "flex flex-row justify-between items-center",
    socialWrap: "flex flex-row gap-[0.625rem] justify-start items-center",
    icon: "mc-icon relative w-[30px] h-[30px]",
    bioBtn: "mc-bio-btn relative text-h5 font-medium cursor-pointer shrink-0 text-orange",
    bioBtnUnderline: "mc-bio-btn-line absolute bottom-0 left-0 h-[1.5px] bg-orange w-full",
  };

  return (
    <>
      <style>{`
        /* ── Flip mechanic ── */
        .mc-flip-inner {
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
        }
        .mc-flip-inner.flipped {
          transform: rotateY(180deg);
        }
        .mc-flip-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .mc-flip-back {
          transform: rotateY(180deg);
        }

        /* ── Photo subtle zoom on hover ── */
        .mc-photo {
          transition: transform 0.5s ease;
        }
        .mc-flip-inner:not(.flipped):hover .mc-photo {
          transform: scale(1.04);
        }

        /* ── Bio text fade-up after flip lands ── */
        .mc-bio-text {
          opacity: 0;
          transform: translateY(10px);
          transition: none;
        }
        .flipped .mc-bio-text {
          animation: mcBioFadeUp 0.35s ease 0.4s forwards;
        }
        @keyframes mcBioFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Name slides in from left on mount ── */
        .mc-name {
          animation: mcSlideInLeft 0.45s ease 0.1s both;
        }
        @keyframes mcSlideInLeft {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Role fades in on mount ── */
        .mc-role {
          animation: mcFadeIn 0.4s ease 0.2s both;
        }
        @keyframes mcFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Social icons staggered pop-in on mount ── */
        .mc-icon {
          animation: mcIconPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .mc-icon:nth-child(1) { animation-delay: 0.28s; }
        .mc-icon:nth-child(2) { animation-delay: 0.36s; }
        .mc-icon:nth-child(3) { animation-delay: 0.44s; }
        .mc-icon:nth-child(4) { animation-delay: 0.52s; }
        @keyframes mcIconPop {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        .mc-icon:hover {
          transform: scale(1.2);
        }

        /* ── Biography button underline sweep on hover ── */
        .mc-bio-btn-line {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s ease;
        }
        .mc-bio-btn:hover .mc-bio-btn-line {
          transform: scaleX(1);
        }
        .mc-bio-btn span {
          display: inline-block;
          transition: transform 0.22s ease;
        }
        .mc-bio-btn:hover span {
          transform: translateY(-2px);
        }
      `}</style>

      <section className={styles.section}>

        <div className={styles.flipOuter} style={{ perspective: "1000px" }}>
          <div className={`${styles.flipInner}${showBio ? " flipped" : ""}`}>
            <div className={styles.flipFront}>
              <StrapiImage
                alternativeText={photo.alternativeText}
                className={styles.photo}
                height={photo.height}
                url={photo.url}
                width={photo.width}
              />
            </div>
            <div className={styles.flipBack}>
              <p className={styles.bioText}>{biography}</p>
            </div>

          </div>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.textWrap}>
            <h4 className={styles.name}>{name}</h4>
            <h5 className={styles.role}>{role}</h5>
          </div>

          <div className={styles.bottomWrap}>
            <div className={styles.socialWrap}>
              {social?.map((item) => (
                <div key={item.icon.id} className={styles.icon}>
                  {item.external ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      <StrapiImage
                        alternativeText={item.icon.alternativeText}
                        className="object-contain"
                        height={item.icon.height}
                        url={item.icon.url}
                        width={item.icon.width}
                      />
                    </a>
                  ) : (
                    <Link href={item.url}>
                      <StrapiImage
                        alternativeText={item.icon.alternativeText}
                        className="object-contain"
                        height={item.icon.height}
                        url={item.icon.url}
                        width={item.icon.width}
                      />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {biography && (
              <button
                onClick={() => setShowBio((prev) => !prev)}
                className={styles.bioBtn}
              >
                <span>{showBio ? "← Photo" : "Biography"}</span>
                <div className={styles.bioBtnUnderline} />
              </button>
            )}
          </div>
        </div>

      </section>
    </>
  );
}