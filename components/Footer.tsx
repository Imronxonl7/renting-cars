import Link from "next/link";
import Container from "./Container";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.29a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.7V11H8v3h2.3v7h3.2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M17.9 4H20l-5.7 6.5L21 20h-5.2l-4.1-5.3L7 20H4.9l6.1-7-6.4-9h5.3l3.7 4.9L17.9 4Zm-.9 14.4h1.4L8.2 5.5H6.7L17 18.4Z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14.6 3c.3 2 1.5 3.8 3.4 4.8 1 .5 2.1.8 3.2.8v3.1a9.8 9.8 0 0 1-3.6-.7v5.6a6.6 6.6 0 1 1-6.6-6.6c.4 0 .7 0 1.1.1v3.2a3.8 3.8 0 1 0 2.5 3.6V3h3Z" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

const contactItems = [
  {
    title: "Call us",
    value: "+971 52-333-4444",
    icon: <PhoneIcon />,
  },
  {
    title: "Write to us",
    value: "info@renax.com",
    icon: <MailIcon />,
  },
  {
    title: "Address",
    value: "Vadodara, Water Tower, Office 123",
    icon: <LocationIcon />,
  },
];

const quickLinks = ["About", "Cars", "Car Types", "FAQ", "Contact"];

const socialLinks = [
  { label: "Facebook", icon: <FacebookIcon />, href: "#" },
  { label: "X", icon: <XIcon />, href: "#" },
  { label: "TikTok", icon: <TikTokIcon />, href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] pt-14 text-white sm:pt-16 lg:pt-20">
      <Container className="">
        <div className="border border-white/5 bg-[#202020]">
          <div className="grid divide-y divide-white/5 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {contactItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 px-6 py-6 sm:px-8 lg:px-6 xl:px-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edb458] text-[#1f1f1f]">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold leading-none text-white">{item.title}</p>
                  <p className="mt-2 text-base leading-7 text-white/90">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1fr] lg:gap-16 lg:py-16">
          <div className="max-w-md">
            <Link href="/" className="inline-block">
              <h2 className="text-4xl font-semibold tracking-tight text-white">
                Dri<span className="text-[#edb458]">vora</span>
              </h2>
            </Link>
            <p className="mt-6 text-lg leading-8 text-white/55">
              Rent a car imperdiet sapien porttito the bibenum ellentesue the commodo
              erat nesuen.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[#edb458] text-[#f5f2ea] transition hover:bg-[#edb458] hover:text-[#1f1f1f]"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
            <div className="mt-7 space-y-4">
              {quickLinks.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="flex items-center gap-4 text-lg text-white/60 transition hover:text-white"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#edb458]" />
                  <span>{link}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white">Subscribe</h3>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/55">
              Want to be notified about our services? Just sign up and we&apos;ll send you a
              notification by email.
            </p>

            <form className="mt-8">
              <label className="flex items-center rounded-full border border-[#8d6d2f] px-3 py-3 sm:px-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-transparent px-3 text-base text-white outline-none placeholder:text-white/45"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#edb458] text-[#1f1f1f] transition hover:scale-105"
                >
                  <ArrowUpRightIcon />
                </button>
              </label>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 py-6 text-center text-lg text-white/55">
          <p>
            <span className="text-[#8f7ae3]">©</span> 2025. All Rights Reserved.{" "}
            <span className="font-semibold text-white">ProjectKillersTeam</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
