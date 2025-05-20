import clsx from "clsx";
import * as Scrollytelling from "~/lib/scrollytelling-client";

import s from "./intro.module.scss";

export const LabIntro = () => {
  return (
    <Scrollytelling.Root
      start="top bottom"
      scrub={1.1}
    >
      <div className={s.container}>
        <Scrollytelling.Parallax
          tween={{
            start: 0,
            end: 100,
            movementY: { value: -20, unit: "px" },
          }}
        >
          <div className={s.pretitle}>
            <svg
              width="5"
              height="9"
              viewBox="0 0 5 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>chevron right</title>
              <path
                d="M5 4.5L-5.28505e-07 8.5L-1.78814e-07 0.5L5 4.5Z"
                fill="#EFEFEF"
              />
            </svg>
            <span>Repository</span>
          </div>
        </Scrollytelling.Parallax>

        <Scrollytelling.Parallax
          tween={{
            start: 0,
            end: 100,
            movementY: { value: 40, unit: "px" },
          }}
        >
          
        </Scrollytelling.Parallax>

        <Scrollytelling.Parallax
          tween={{
            start: 0,
            end: 100,
            movementY: { value: -40, unit: "px" },
          }}
        >
          <h2 className={s.title}>Your gateway to the hackathon frontier</h2>
        </Scrollytelling.Parallax>
        <p className={s.subtitle}>
          <svg
            width="9"
            height="153"
            viewBox="0 0 9 153"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={s.arrowDown}
          >
            <path
              d="M4.14645 152.354C4.34171 152.549 4.65829 152.549 4.85355 152.354L8.03553 149.172C8.2308 148.976 8.2308 148.66 8.03553 148.464C7.84027 148.269 7.52369 148.269 7.32843 148.464L4.5 151.293L1.67157 148.464C1.47631 148.269 1.15973 148.269 0.964466 148.464C0.769204 148.66 0.769204 148.976 0.964466 149.172L4.14645 152.354ZM5 152L4.99999 -2.18557e-08L3.99999 2.18557e-08L4 152L5 152Z"
              fill="#EFEFEF"
            />
          </svg>
          Repository is shaping the future of student innovation by blending rapid learning with real-world hackathon experience – we’re building a culture where code, creativity, and collaboration collide to make impact inevitable.
        </p>

        <div className={s.marquees}>
          <Marquee className={s.marquee1} orange />
          <Marquee className={s.marquee2} reverse />
          <Scrollytelling.Animation
            tween={[
              {
                start: 0,
                end: 100,
                target: `.${s.marquee1} [data-marquee-animation-container]`,
                to: { x: -1000, ease: "linear" },
              },
              {
                start: 0,
                end: 100,
                target: `.${s.marquee2} [data-marquee-animation-container]`,
                to: { x: 1000, ease: "linear" },
              },
            ]}
          />
        </div>
      </div>
    </Scrollytelling.Root>
  );
};

// MARQUEE STUFF

const Marquee = ({
  reverse,
  orange,
  className,
}: {
  reverse?: boolean;
  orange?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={clsx(s.marqueeContainer, className)}
      style={{
        ["--marquee-color" as string]: orange
          ? "var(--color-orange)"
          : "var(--color-white)",
      }}
    >
      <div
        className={clsx(s.marqueeAnimationContainer, reverse && s.reverse)}
        data-marquee-animation-container
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={s.marqueeItem}>
            Repository <LabSvg />
          </div>
        ))}
      </div>
    </div>
  );
};

const LabSvg = () => {
  return (
    <svg viewBox="0 0 90 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45 42.7769c21.7462 0 39.375-8.3117 39.375-18.5647 0-10.253-17.6288-18.56474-39.375-18.56474S5.625 13.9592 5.625 24.2122 23.2538 42.7769 45 42.7769Z"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M44.9992 42.7769c7.6733 0 13.8938-8.3117 13.8938-18.5647 0-10.253-6.2205-18.56474-13.8938-18.56474S31.1055 13.9592 31.1055 24.2122s6.2204 18.5647 13.8937 18.5647Z"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M44.9984 42.7769c15.4243 0 27.9282-8.3117 27.9282-18.5647 0-10.253-12.5039-18.56474-27.9282-18.56474S17.0703 13.9592 17.0703 24.2122s12.5038 18.5647 27.9281 18.5647Z"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M68.8785 9.44531c-4.3734 3.09219-13.4297 5.21019-23.864 5.21019-10.4485 0-19.4907-2.118-23.8641-5.21019M21.1387 38.9807c4.3734-3.0922 13.4297-5.2102 23.864-5.2102 10.4485 0 19.4907 2.118 23.8641 5.2102M5.625 24.2119h78.7641M45 5.64746V42.7769"
        stroke="#fff"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M47.3558 21.8756c1.1855 1.2003 2.7942 1.9414 4.9052 2.3747-2.1136.4136-3.7277 1.1402-4.9233 2.3302-1.1933 1.1878-1.9308 2.7988-2.3627 4.9124-.4121-2.1162-1.1352-3.7327-2.3183-4.9306-1.1855-1.2003-2.7942-1.9413-4.9051-2.3747 2.1135-.4136 3.7277-1.1401 4.9232-2.3301 1.1933-1.1878 1.9308-2.7989 2.3627-4.9124.4121 2.1161 1.1352 3.7326 2.3183 4.9305Z"
        fill="#fff"
        stroke="#fff"
      />
    </svg>
  );
};
