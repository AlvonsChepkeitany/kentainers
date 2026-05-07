import CartSidebar from "./CartSidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";

interface Props {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <footer className="bg-primary text-primary-foreground py-6 px-4 hidden md:block">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm font-body">
          <span className="text-primary-foreground/80">
            © {new Date().getFullYear()} Kentainers. Quality Tanks, Reliable
            Service.
          </span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/60 hover:text-secondary transition-colors text-xs"
          >
            Built with love using caffeine.ai
          </a>
        </div>
      </footer>
      <MobileNav />
      <CartSidebar />
    </div>
  );
}
