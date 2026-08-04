import { FaGithub, FaTwitter, FaLinkedin,FaWhatsapp } from 'react-icons/fa'


const LINKS = [
  { href: 'https://github.com/SCIPIO666', icon: FaGithub, label: 'GitHub' },
  { href: 'https://x.com/scipio_NEO', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://www.linkedin.com/in/esphoney-ondicho-859043331?utm_source=share_via&utm_content=profile&utm_medium=member_android', icon: FaLinkedin, label: 'LinkedIn' },
   { href: 'https://wa.me/254115529179', icon: FaWhatsapp, label: 'WhatsApp' }, 
]

export default function SocialLinks() {
  return (
    <div className="hidden lg:flex flex-col items-center gap-6 fixed left-8 bottom-0 pb-8 z-10">
      {LINKS.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="text-muted hover:text-primary hover:-translate-y-1 transition"
        >
          <Icon size={20} />
        </a>
      ))}
      <span className="w-px h-24 bg-muted-soft" aria-hidden="true" />
    </div>
  )
}