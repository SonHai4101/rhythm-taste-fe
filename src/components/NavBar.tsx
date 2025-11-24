import { Link, useLocation } from "react-router";
// import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = useLocation().pathname;

  return (
    <nav className="fixed top-0 w-full border-b z-50 bg-transparent backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-primary">
          HS
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            return (
              <li key={item.href}>
                <Link to={item.href}>
                  <p
                    className={`text-sm font-medium hover:text-[#0096a5] ${
                      pathname === item.href ? "text-[#0096a5]" : ""
                    }`}
                  >
                    {item.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          {/* <ThemeSwitcher /> */}
          <a
            href="/resume.pdf"
            className="hidden md:block px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
