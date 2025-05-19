"use client";

import * as Scrollytelling from "@bsmnt/scrollytelling";
import s from "./falling-caps.module.scss";
import { useMemo } from "react";

const splitText = (text: string, wordClass?: string) => {
  const wordsArray = text.split(" ");

  const htmlWords = wordsArray.map((word, i) => {
    const hasLineBreak = word.includes("\n");

    return (
      <span className={wordClass} key={i}>
        {word}
        {i < wordsArray.length - 1 && " "}
        {hasLineBreak && <br />}
      </span>
    );
  });

  return htmlWords;
};

const lines = ["We want to help", "you become a builder", "and not just a user"];

export const FallingCaps = () => {
  const splittedText = useMemo(
    () =>
      lines
        .map((line, lineIdx) => {
          const isLast = lineIdx === lines.length - 1;
          const wordElements = splitText(
            line + "\n",
            isLast ? s["highlight"] : undefined
          );

          return wordElements;
        })
        .flat(),
    []
  );

  return (
    <Scrollytelling.Root end="bottom bottom">
      <section className={s["spacer"]}>
        <div className={s["pin"]}>
          <div className={s["canvas-container"]}>{/* 3D model content removed */}</div>

          <p className={s["paragraph"]}>
            <Scrollytelling.Stagger
              overlap={0}
              tween={{
                start: 0,
                end: 50,
                fromTo: [
                  {
                    opacity: 0.2,
                  },
                  {
                    opacity: 1,
                    ease: "power2.out",
                  },
                ],
              }}
            >
              {splittedText}
            </Scrollytelling.Stagger>
          </p>
        </div>
      </section>
    </Scrollytelling.Root>
  );
};
