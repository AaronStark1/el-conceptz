import { Reveal } from "@/components/ui/Reveal";
import { WorkItem } from "@/components/work/WorkItem";
import { workCopy } from "@/content/copy";
import { sectionIds } from "@/content/navigation";
import type { ResolvedProject } from "@/lib/images";

/**
 * Selected work as an editorial sequence. Each project takes a different composition
 * from the layout cycle, so scrolling through them feels like turning pages rather
 * than reading a grid.
 */
export function SelectedWork({ projects }: { projects: ResolvedProject[] }) {
  return (
    <section
      id={sectionIds.work}
      aria-labelledby="work-heading"
      className="room-ivory py-[clamp(5rem,12vh,9rem)]"
    >
      <div className="wrap">
        <Reveal family="wipeBottom">
          <h2
            id="work-heading"
            className="heading-mark font-display text-[clamp(2.25rem,4.2vw,3.75rem)] leading-[1.02] text-slate"
          >
            {workCopy.heading}
          </h2>
        </Reveal>
        <Reveal family="fade" delay={0.15}>
          <p className="measure-narrow mt-5 text-[1.0625rem] text-slate-muted">{workCopy.intro}</p>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-[clamp(6rem,14vh,11rem)] lg:mt-24">
        {projects.map((project, i) => (
          <WorkItem key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
