"use client";

import { useRef } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { contactActions } from "@/content/contact";
import { contactCta, primaryNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { gsap, motionQueries, useGSAP } from "@/lib/gsap";

/**
 * Links glide a hair to the right on hover. Tailwind v4 keeps translate as its own property,
 * so it is named in the transition list rather than transform.
 */
const glide =
  "inline-block transition-[color,translate] duration-300 ease-[var(--ease-out)] hover:translate-x-0.5";
const footerLink = `${glide} hover:text-teal-light`;

/** Quiet exit. Continues the slate room; nothing here competes with the contact rows above. */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();
  const email = contactActions.find((a) => a.kind === "email");
  const phone = contactActions.find((a) => a.kind === "phone");
  const location = contactActions.find((a) => a.kind === "location");

  // Entrance: the footer rises as it reaches the viewport and its four regions follow a tenth
  // of a second apart. Reduced motion drops every translation for a short fade. from() applies
  // the start values on mount, which never flashes because the footer sits far below the fold;
  // without JavaScript the server markup simply stays visible.
  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const mm = gsap.matchMedia(footerRef);
      mm.add(motionQueries, (context) => {
        const { reduce } = context.conditions ?? {};

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: footer, start: "top 85%", once: true },
        });
        if (reduce) {
          tl.from(footer, { opacity: 0, duration: 0.4, ease: "none" });
          return;
        }

        tl.from(footer, { y: 40, opacity: 0, duration: 1 }).from(
          "[data-footer-region]",
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 },
          0.1
        );
      });

      return () => mm.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="room-slate border-t border-teal-soft/35">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div data-footer-region className="md:col-span-5">
          <Logo height={28} />
          <p className="measure-narrow mt-5 text-[0.9375rem] font-medium leading-relaxed text-ivory/55">
            {siteConfig.tagline}. {siteConfig.region}.
          </p>
        </div>

        <nav data-footer-region aria-label="Footer" className="md:col-span-3">
          <ul className="flex flex-col gap-2.5 text-[0.9375rem] text-ivory/70">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={contactCta.href}
                // The underline retraction lives on background-size, so it stays in the transition.
                className="link-line inline-block font-bold text-teal-light transition-[color,translate,background-size] duration-300 ease-[var(--ease-out)] hover:translate-x-0.5"
              >
                {contactCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div
          data-footer-region
          className="flex flex-col gap-2.5 text-[0.9375rem] text-ivory/70 md:col-span-4"
        >
          {email && (
            <a href={email.href} className={`${footerLink} self-start`}>
              {email.value}
            </a>
          )}
          {phone && (
            <a href={phone.href} className={`${footerLink} self-start`}>
              {phone.value}
            </a>
          )}
          {location && <span>{location.value}</span>}
          {siteConfig.socialLinks.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {siteConfig.socialLinks.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line inline-block text-ivory transition-[color,translate,background-size] duration-300 ease-[var(--ease-out)] hover:translate-x-0.5 hover:text-teal-light"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        data-footer-region
        className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline-on-dark)] py-5 text-[0.8125rem] text-ivory/60"
      >
        <p>
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <Link
          href="#top"
          className="inline-block transition-[color,translate] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:text-teal-light"
        >
          Back to top
        </Link>
      </div>
    </footer>
  );
}
