import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { contactActions } from "@/content/contact";
import { contactCta, primaryNav } from "@/content/navigation";
import { siteConfig } from "@/content/site";

/** Quiet exit. Continues the slate room; nothing here competes with the contact rows above. */
export function Footer() {
  const year = new Date().getFullYear();
  const email = contactActions.find((a) => a.kind === "email");
  const phone = contactActions.find((a) => a.kind === "phone");
  const location = contactActions.find((a) => a.kind === "location");

  return (
    <footer className="room-slate border-t border-[var(--hairline-on-dark)]">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Logo height={28} />
          <p className="measure-narrow mt-5 text-[0.9375rem] leading-relaxed text-ivory/55">
            {siteConfig.tagline}. {siteConfig.region}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="flex flex-col gap-2.5 text-[0.9375rem] text-ivory/70">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={contactCta.href} className="link-line text-ivory">
                {contactCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-2.5 text-[0.9375rem] text-ivory/70 md:col-span-4">
          {email && (
            <a href={email.href} className="transition-colors hover:text-ivory">
              {email.value}
            </a>
          )}
          {phone && (
            <a href={phone.href} className="transition-colors hover:text-ivory">
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
                    className="link-line text-ivory"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline-on-dark)] py-5 text-[0.8125rem] text-ivory/45">
        <p>
          &copy; {year} {siteConfig.legalName}. All rights reserved.
        </p>
        <Link href="#top" className="transition-colors hover:text-ivory">
          Back to top
        </Link>
      </div>
    </footer>
  );
}
