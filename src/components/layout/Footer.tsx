"use client";

import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useI18n } from "@/i18n/I18nProvider";
import { getSite } from "@/data/site";

export function Footer() {
  const { lang, t } = useI18n();
  const site = getSite(lang);
  const socials = [
    { href: site.socials.linkedin, label: "LinkedIn", Icon: FaLinkedin, color: "text-[#0a66c2] hover:brightness-110" },
    { href: site.socials.github, label: "GitHub", Icon: FaGithub, color: "text-white hover:text-gray-300" },
    { href: site.socials.whatsapp, label: "WhatsApp", Icon: FaWhatsapp, color: "text-[#25d366] hover:brightness-110" },
    { href: site.socials.youtube, label: "YouTube", Icon: FaYoutube, color: "text-[#ff0000] hover:brightness-110" },
    { href: site.socials.instagram, label: "Instagram", Icon: FaInstagram, color: "text-[#e4405f] hover:brightness-110" },
    { href: site.socials.email, label: "Email", Icon: FaEnvelope, color: "text-text-muted hover:text-accent" },
  ];

  return (
    <footer className="mt-auto mb-4 pt-16 sm:pt-48 pb-6">
      <hr className="w-full border-t border-border/60 mb-8" />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-10">
        <div className="flex flex-col sm:flex-row w-full items-center justify-between gap-6">
          <p className="font-mono text-xs sm:text-sm text-text-muted text-center sm:text-left order-2 sm:order-1">
            © {new Date().getFullYear()} {t.footer.portfolio} {site.ownerName}
          </p>
          <div className="flex items-center justify-center sm:justify-end gap-5 order-1 sm:order-2">
            {socials.map(({ href, label, Icon, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={`p-1 rounded-md transition-all duration-300 hover:-translate-y-1 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${color}`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
