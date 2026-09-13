import { ContactActionRow } from "@/components/contact/ContactActionRow";
import { Reveal } from "@/components/ui/Reveal";
import { contactActions, contactCopy } from "@/content/contact";
import { sectionIds } from "@/content/navigation";

/**
 * The last room. The page darkens to deep slate once, deliberately, and the
 * four ways to reach the studio are laid out as a quiet index.
 */
export function Contact() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-heading"
      className="room-slate grain relative overflow-hidden"
    >
      <div className="wrap grid gap-14 py-[clamp(6rem,15vh,11rem)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal family="wipeBottom">
            <h2
              id="contact-heading"
              className="heading-mark heading-mark-dark font-display text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[0.98] text-ivory"
            >
              {contactCopy.heading}
            </h2>
          </Reveal>
          <Reveal family="fade" delay={0.25}>
            <p className="measure-narrow mt-8 text-[1.0625rem] leading-relaxed text-ivory/70">
              {contactCopy.body}
            </p>
          </Reveal>
        </div>

        <Reveal family="fade" delay={0.15} className="lg:col-span-7 lg:pl-8">
          <ul className="border-t border-[var(--hairline-on-dark)]">
            {contactActions.map((action) => (
              <ContactActionRow key={action.kind} action={action} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
