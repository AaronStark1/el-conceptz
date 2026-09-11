import { contactActions } from "@/content/contact";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

/**
 * LocalBusiness structured data built from the configured content.
 * Placeholder contact values (all zeros) are left out so nothing invented is published.
 */
export function StudioJsonLd() {
  const email = contactActions.find((a) => a.kind === "email")?.value;
  const phone = contactActions.find((a) => a.kind === "phone")?.value;
  const hasRealPhone = phone && !/0{5,}/.test(phone);

  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteConfig.siteUrl}/#studio`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    image: `${siteConfig.siteUrl}/opengraph-image`,
    logo: `${siteConfig.siteUrl}/brand/el-conceptz-logo.png`,
    areaServed: siteConfig.region,
    ...(email ? { email } : {}),
    ...(hasRealPhone ? { telephone: phone } : {}),
    ...(siteConfig.foundedYear ? { foundingDate: String(siteConfig.foundedYear) } : {}),
    ...(siteConfig.socialLinks.length ? { sameAs: siteConfig.socialLinks.map((s) => s.url) } : {}),
    knowsAbout: services.map((s) => s.title),
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.description },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
