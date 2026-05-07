import { useState, useEffect } from "react";
import { Card, CardContent } from "../../../components/ui/card";

const metrics = [
  { value: 30, suffix: "+", label: "INTERVENANTS" },
  { value: 55, suffix: "+", label: "EXPOSANTS" },
  { value: 8, suffix: "+", label: "PANELS & WORKSHOPS" },
  { value: 3000, suffix: "+", label: "VISITEURS ATTENDUS" },
];

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * (end > 100 ? 5 : 1);

    let timer = setInterval(() => {
      start += end > 100 ? 13 : 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <h2 className="font-display-display-large text-[48px] font-bold tracking-tight text-[#00AB92] lg:text-[64px]">
      {count.toLocaleString()}{suffix}
    </h2>
  );
};

export const KeyMetricsStripSection = () => {
  return (
    <section
      aria-label="Chiffres clés"
      className="relative w-full bg-dominant"
    >
      <Card className="h-auto w-full rounded-none border-0 bg-transparent shadow-none">
        <CardContent className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-y-12 gap-x-8 px-5 py-20 lg:flex lg:items-center lg:justify-between lg:py-[120px]">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <Counter target={metric.value} suffix={metric.suffix} />
              <p className="font-body-regular text-[13px] sm:text-[14px] font-normal uppercase tracking-wider text-white opacity-80">
                {metric.label}
              </p>
            </article>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
