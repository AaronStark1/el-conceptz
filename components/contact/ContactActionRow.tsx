import { ArrowUpRight, Mail, MailOpen, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import type { ContactAction } from "@/types";
import { cn } from "@/lib/utils";

const stroke = 1.6;

/**
 * One contact channel as a full-width row. Each icon has its own small gesture on hover
 * or focus, driven by CSS keyframes in globals.css so the row itself is server-rendered.
 */
export function ContactActionRow({ action }: { action: ContactAction }) {
  const external = action.kind === "whatsapp" || action.kind === "location";
  return (
    <li className="border-b border-[var(--hairline-on-dark)]">
      <a
        href={action.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={`${action.label}: ${action.value}`}
        className={cn(
          `action-${action.kind}`,
          "group grid grid-cols-[3rem_1fr_auto] items-center gap-5 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-7 sm:py-7 focus-visible:outline-offset-[-3px]"
        )}
      >
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[var(--hairline-on-dark)] text-ivory transition-colors duration-300 group-hover:border-teal-light group-hover:text-teal-light sm:h-14 sm:w-14">
          <ActionIcon kind={action.kind} />
        </span>

        <span className="min-w-0">
          <span className="text-label block text-ivory/50">{action.label}</span>
          <span className="font-display mt-1.5 block truncate text-[1.5rem] leading-tight text-ivory sm:text-[1.875rem]">
            {action.value}
          </span>
          {action.note && (
            <span className="mt-1 block text-[0.875rem] text-ivory/55">{action.note}</span>
          )}
        </span>

        <ArrowUpRight
          aria-hidden
          strokeWidth={stroke}
          className="h-5 w-5 text-ivory/50 transition-[transform,color] duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-light"
        />
      </a>
    </li>
  );
}

function ActionIcon({ kind }: { kind: ContactAction["kind"] }) {
  switch (kind) {
    case "email":
      return (
        <>
          <Mail
            aria-hidden
            strokeWidth={stroke}
            className="absolute h-5 w-5 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
          />
          <MailOpen
            aria-hidden
            strokeWidth={stroke}
            className="absolute h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          />
          <Send
            aria-hidden
            strokeWidth={stroke}
            className="icon-plane absolute right-1.5 top-1.5 h-3 w-3 text-brick opacity-0"
          />
        </>
      );
    case "whatsapp":
      return (
        <>
          <MessageCircle aria-hidden strokeWidth={stroke} className="h-5 w-5" />
          <span
            aria-hidden
            className="icon-ripple absolute inset-0 rounded-full border border-brick opacity-0"
          />
        </>
      );
    case "phone":
      return (
        <Phone aria-hidden strokeWidth={stroke} className="icon-phone h-5 w-5 origin-center" />
      );
    case "location":
      return (
        <>
          <MapPin aria-hidden strokeWidth={stroke} className="icon-pin relative h-5 w-5" />
          <span
            aria-hidden
            className="icon-pin-shadow absolute bottom-3 h-[3px] w-3 rounded-full bg-brick/70 opacity-0"
          />
        </>
      );
  }
}
