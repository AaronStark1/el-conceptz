import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { WordReveal } from "@/components/ui/WordReveal";
import { studioCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import { studioImages } from "@/content/studio";
import { resolvePhoto } from "@/lib/images";

/**
 * Introduction. A slow editorial reveal: the statement arrives word by word, the
 * photograph wipes in from the left and sits a little higher than the text so it
 * overlaps the entrance behind it.
 */
export function Studio() {
  const portrait = resolvePhoto(studioImages.portrait);
  const detail = resolvePhoto(studioImages.detail);

  return (
    <section
      id={sectionIds.studio}
      aria-labelledby="studio-heading"
      className="room-white relative z-10 py-[clamp(5rem,12vh,9rem)] lg:py-[clamp(6rem,14vh,10rem)]"
    >
      <div className="wrap grid items-start gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:pr-16">
          <WordReveal
            as="h2"
            text={studioCopy.statement}
            className="heading-mark font-display max-w-[15ch] text-[clamp(2.5rem,4.8vw,4.5rem)] leading-[1.02] text-slate"
          />
          <span id="studio-heading" className="sr-only">
            About the studio
          </span>

          <div className="measure mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-slate-muted">
            {studioCopy.paragraphs.map((paragraph, i) => (
              <Reveal key={i} family="fade" delay={0.1 + i * 0.12}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal family="rise" delay={0.2} className="mt-14 flex items-baseline gap-5">
            <span className="font-display text-[clamp(4.5rem,7vw,6.5rem)] leading-[0.85] text-teal">
              {studioCopy.experience.figure}
              <span className="text-[0.5em] align-top text-brick">+</span>
            </span>
            <span className="max-w-[16ch] text-[0.9375rem] leading-snug text-slate-muted">
              <span className="font-semibold text-slate">{studioCopy.experience.unit}</span>{" "}
              {studioCopy.experience.line}
            </span>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:-mt-28 lg:pl-10">
          <div className="relative lg:ml-16">
            <ParallaxFrame
              photo={portrait}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5]"
              enter="wipeLeft"
              amount={4}
            />
            <Reveal
              family="rise"
              delay={0.35}
              className="absolute -bottom-14 -left-16 hidden w-[40%] lg:block"
            >
              <div className="photo aspect-[4/5] shadow-[0_30px_60px_-30px_rgb(var(--shadow-tint)/0.45)]">
                <Photo photo={detail} sizes="18vw" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
