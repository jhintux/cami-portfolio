"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { skills } from "@/lib/portfolio-data";

export function SkillBars() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add("visible"), i * 70);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
    );

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>(".skill-fill").forEach((bar, i) => {
            setTimeout(() => {
              bar.style.width = bar.dataset.width ?? "0%";
            }, i * 150 + 300);
          });
          skillObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );

    revealObserver.observe(el);
    skillObserver.observe(el);
    return () => {
      revealObserver.disconnect();
      skillObserver.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="about-skills reveal">
      {skills.map((skill) => (
        <div key={skill.key} className="skill-item">
          <div className="skill-label">{t(`skills.${skill.key}`)}</div>
          <div className="skill-bar">
            <div className="skill-fill" data-width={skill.width} />
          </div>
        </div>
      ))}
    </div>
  );
}
