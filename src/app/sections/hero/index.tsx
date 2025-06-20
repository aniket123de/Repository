"use client";

import * as Scrollytelling from "~/lib/scrollytelling-client";
import Image from "next/image";

import s from "./hero.module.scss";
import Link from "next/link";
import { LogoBasement } from "../../logos/logo";
import { toVw } from "~/lib/utils";
import { useMedia } from "~/hooks/use-media";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPeopleGroup, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export const Hero = () => {
  const isMobileSize = useMedia("(max-width: 768px)");

  return (
    <Scrollytelling.Root
      defaults={{ ease: "linear" }}
    >
      <Scrollytelling.Pin
        childHeight={"100vh"}
        pinSpacerHeight={"300vh"}
        pinSpacerClassName={s["pin-spacer"]}
      >
        <header className={s["header"]}>
          <Link title="basement scrollytelling" href="/">
            <LogoBasement className={s["logo"]} />
          </Link>

          <div className={s["hero-decorative-header"]}>
            <span className={s["starburst"]}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#57B9C2" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="28" cy="28" r="28" fill="url(#glow1)"/>
                <circle cx="28" cy="28" r="22" fill="#57B9C2"/>
                <path d="M28 10L31.5 22.5L44 26L31.5 29.5L28 42L24.5 29.5L12 26L24.5 22.5L28 10Z" fill="#fff"/>
              </svg>
            </span>            <span className={s["circle-img-container"]}>
              <Image src="/circle.png" alt="Circle" className={s["star"]} width={100} height={100} priority quality={100} />
            </span>
            <span className={s["starburst"]}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#b2ebf2" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#57B9C2" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="28" cy="28" r="28" fill="url(#glow2)"/>
                <circle cx="28" cy="28" r="22" fill="#57B9C2"/>
                <path d="M28 10L31.5 22.5L44 26L31.5 29.5L28 42L24.5 29.5L12 26L24.5 22.5L28 10Z" fill="#fff"/>
              </svg>
            </span>
          </div>
          <div className={s["cta"]}>
            <pre>
              <code>Let's grow together</code>
            </pre>
            <div className={s["cta--buttons"]}>            <Link 
              href="/community"
              className={s["docs-link"]}
            >
              <FontAwesomeIcon 
                icon={faUserGroup} 
                width={15}
                height={15}
              />
              Community            </Link><Link 
              href="/fyt"
            >
              <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                width={15}
                height={15}
              />
              <span>FYT</span>            </Link><Link
              href="/team"
            >
              <FontAwesomeIcon 
                icon={faPeopleGroup} 
                width={15}
                height={15}
              />
              <span>Team</span>
            </Link>
            </div>
          </div>
        </header>

        <section className={s["section"]}>
          <div className={s["model-container"]}>
            {/* <CanvasWithMacModel /> */}
          </div>

          <div className="wrapper">
            <div className={s["content"]}>
              <div className={s["svg__container"]}>
                <Scrollytelling.Animation
                  tween={{
                    start: 0,
                    end: 100,
                    fromTo: [
                      {
                        attr: {
                          viewBox: "0 0 543 183",
                        },
                        width: toVw(543),
                      },
                      {
                        attr: {
                          viewBox: "0 0 1856 183",
                        },
                        width: isMobileSize ? "100%" : toVw(1856),
                      },
                    ],
                  }}
                >
                  {/* First word: "WE" */}
                  <svg
                    className={s["svg-we"]}
                    viewBox="0 0 543 183"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M210.102 0H124.631L97.6302 136.781H96.1997L62.0471 0H0L45.5965 183H134.644L159.856 55.8385H161.287L183.638 183H286.275L329.904 0H270.003L236.387 140.769H234.956L210.102 0Z"
                      fill="white"
                    />
                    <path
                      d="M339.823 0V183H400.618V140.769V109.096V71.5577V42.2308V0H339.823Z"
                      fill="white"
                    />
                    <Scrollytelling.Animation
                      tween={{
                        start: 0,
                        end: 40,
                        fromTo: [
                          {
                            attr: {
                              width: toVw(143, 1920, 143),
                            },
                          },
                          {
                            attr: {
                              width: isMobileSize
                                ? toVw(400, 800, 400)
                                : toVw(300, 1920, 490),
                            },
                          },
                        ],
                      }}
                    >
                      <rect
                        x="400"
                        y="141"
                        width="143"
                        height="42"
                        fill="white"
                      />
                    </Scrollytelling.Animation>
                    <Scrollytelling.Animation
                      tween={{
                        start: 0,
                        end: 40,
                        fromTo: [
                          {
                            attr: {
                              width: toVw(143, 1920, 143),
                            },
                          },
                          {
                            attr: {
                              width: isMobileSize
                                ? toVw(400, 800, 400)
                                : toVw(300, 1920, 490),
                            },
                          },
                        ],
                      }}
                    >
                      <rect
                        x="400"
                        y="71"
                        width="143"
                        height="38"
                        fill="white"
                      />
                    </Scrollytelling.Animation>
                    <Scrollytelling.Animation
                      tween={[
                        {
                          start: 0,
                          end: 40,
                          fromTo: [
                            {
                              attr: {
                                width: toVw(143, 1920, 143),
                              },
                            },
                            {
                              attr: {
                                width: isMobileSize
                                  ? toVw(400, 800, 400)
                                  : toVw(300, 1920, 490),
                              },
                            },
                          ],
                        },
                        {
                          start: 40,
                          end: 100,
                          to: {
                            attr: {
                              width: toVw(1440, 1920, 1440),
                            },
                          },
                        },
                      ]}
                    >
                      <rect x="400" width="143" height="42" fill="white" />
                    </Scrollytelling.Animation>
                  </svg>
                </Scrollytelling.Animation>
                <Scrollytelling.Animation
                  tween={{
                    start: 0,
                    end: 40,
                    to: {
                      translateX: "0%",
                      scaleY: 0.613,
                    },
                  }}
                >
                  {/* Second word: "MAKE" */}
                  <svg
                    className={s["svg-make"]}
                    fill="none"
                    viewBox="0 0 924 187"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M59.0072 187V56.8192H60.6165L96.9148 187H169.869L206.346 53.9423H207.419V187H268.214V0H173.624L138.756 126.824H137.326L102.1 0.479482L0 0V187H59.0072Z"
                      fill="white"
                    />
                    <path
                      d="M449.1 0H348.788L277.979 187H341.457L352.722 155.354H442.126L452.14 187H517.942L449.1 0ZM367.205 114.597L396.172 33.5641H397.603L428 114.597H367.205Z"
                      fill="white"
                    />
                    <path
                      d="M527.698 187H588.493V167.581L620.858 127.544L656.62 187H731.362L664.13 80.0744L727.786 0H662.163L588.493 94.459V0H527.698V187Z"
                      fill="white"
                    />
                    <path
                      d="M741.257 0V187H924V143.846H802.052V111.481H916.49V73.1218H802.052V43.1538H923.642V0H741.257Z"
                      fill="white"
                    />
                  </svg>
                </Scrollytelling.Animation>
              </div>
              <div>
                {/* Third word: "COOL SHIT" replaced with hero.svg */}
                <Image 
                  src="/hero.svg" 
                  alt="Hero" 
                  className={s["svg-coolshit"]} 
                  width={1856} 
                  height={257} 
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className={s["svg__container"]}>
                <Scrollytelling.Animation
                  tween={{
                    start: 0,
                    end: 100,
                    fromTo: [
                      {
                        xPercent: 0,
                        width: toVw(415),
                        marginRight: toVw(70),
                        attr: {
                          viewBox: "0 0 415 115",
                        },
                      },
                      {
                        xPercent: 0,
                        width: toVw(125),
                        marginRight: toVw(24),
                        attr: {
                          viewBox: "0 0 125 115",
                        },
                      },
                    ],
                  }}
                >
                  {/* Fourth word: "THAT" */}
                  <svg
                    className={s["svg-that"]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 415 115"
                    fill="none"
                  >
                    <Scrollytelling.Animation
                      tween={{ start: 0, end: 100, to: { scaleX: 0.3 } }}
                    >
                      <path
                        fill="#fff"
                        d="M32.877 113H63.42V26.077h33.057V0H0v26.077h32.877V113ZM101.415 113h30.542V66.351h40.423V113h30.542V0H172.38v40.274h-40.423V0h-30.542v113ZM292.994 0H242.6l-35.573 113h31.89l5.659-19.123h44.914L294.521 113h33.057L292.994 0Zm-41.142 69.249 14.552-48.967h.719l15.271 48.967h-30.542ZM351.401 113h30.542V26.077H415V0h-96.476v26.077h32.877V113Z"
                      />
                    </Scrollytelling.Animation>
                  </svg>
                </Scrollytelling.Animation>

                <Scrollytelling.Animation
                  tween={{ start: 0, end: 100, to: { scaleX: 1.5 } }}
                >
                  {/* Fifth word: "PERFORMS" */}
                  <svg
                    className={s["svg-performs"]}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1118 115"
                    fill="none"
                  >
                    <path
                      fill="#fff"
                      d="M0 1.716v111.568h38.416V78.24h48.699c27.117-2.288 33.897-9.87 33.897-37.904 0-30.896-6.78-38.62-33.897-38.62H0Zm38.416 50.778V27.463h27.909c12.09 0 15.14 2.574 15.14 13.016 0 9.583-3.05 12.015-15.14 12.015H38.416ZM129.541 1.716v111.568h115.475V87.537h-77.059v-19.31h72.313V45.343h-72.313v-17.88h76.833V1.717H129.541ZM335.542 1.716h-79.771v111.568h38.417V75.379h30.055c14.236 0 15.818 1.288 15.818 13.589v24.316h38.417V87.251c0-16.878-9.265-24.173-30.846-24.173v-.858c21.581 0 30.846-8.439 30.846-28.178 0-25.889-5.876-32.326-42.936-32.326Zm-41.354 49.347v-25.03h28.473c14.689 0 16.27 1.287 16.27 12.3 0 11.443-1.581 12.73-16.27 12.73h-28.473ZM389.174 1.716v111.568h38.416l.339-38.62h71.974V48.918h-71.635l.226-21.455h75.929V1.716H389.174ZM587.497 24.316c32.089 0 35.591 3.29 35.591 33.184s-3.502 33.184-35.591 33.184-35.592-3.29-35.592-33.184 3.503-33.184 35.592-33.184ZM512.359 57.5c0 46.057 15.14 57.5 75.138 57.5 59.997 0 75.138-11.443 75.138-57.5S647.494 0 587.497 0c-59.998 0-75.138 11.443-75.138 57.5ZM750.866 1.716h-79.77v111.568h38.416V75.379h30.055c14.237 0 15.819 1.288 15.819 13.589v24.316h38.416V87.251c0-16.878-9.265-24.173-30.846-24.173v-.858c21.581 0 30.846-8.439 30.846-28.178 0-25.889-5.875-32.326-42.936-32.326Zm-41.354 49.347v-25.03h28.474c14.688 0 16.27 1.287 16.27 12.3 0 11.443-1.582 12.73-16.27 12.73h-28.474ZM841.785 113.284V35.616h1.017l22.937 77.668h46.099l23.05-79.385h.678v79.385h38.417V1.716h-59.772l-22.033 75.666h-.904l-22.259-75.38-64.517-.286v111.568h37.287ZM1049.98 90.684c-25.76 0-28.59-1.43-28.59-14.876h-38.977c0 31.325 14.349 39.192 68.247 39.192 53.89 0 67.34-6.294 67.34-31.754 0-27.605-13.56-35.472-67.79-39.191-21.02-1.574-26.33-3.576-26.33-10.299 0-8.439 2.71-9.44 26.78-9.44 24.97 0 27.79 1.573 27.79 16.449h38.99C1117.44 8.153 1103.42 0 1050.66 0c-53.107 0-66.327 6.723-66.327 33.47 0 24.173 12.316 31.325 61.807 36.045 25.87 2.431 32.31 4.863 32.31 12.158 0 8.153-2.82 9.011-28.47 9.011Z"
                    />
                  </svg>
                </Scrollytelling.Animation>
              </div>
              <div className={s["footer"]}>
                <p>
                  We&apos;re a passionate team of creative developers crafting cutting-edge
                  digital experiences. We combine innovation with technical expertise
                  to transform ideas into exceptional digital solutions through
                  strategic branding, stunning design & robust development.
                </p>
                <svg
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 0.226562L24 6.00007L14 11.7736L14 7.00006L0 7.00006V5.00006L14 5.00007L14 0.226562Z"
                    fill="white"
                  />
                </svg>
                <p>
                  Collaboration is our foundation. We approach every hackathon and initiative with bold creativity, technical precision, and a passion for impact. We don&apos;t just build projects : we cultivate innovation and community at every step.
                </p>
                <p>
                  We collaborate with builders at every level, from curious beginners to seasoned hackers, bringing unmatched energy, guidance, and purpose to every team, every build, every breakthrough.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Scrollytelling.Pin>
    </Scrollytelling.Root>
  );
};
