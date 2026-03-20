import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Dumbbell, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Trainers", href: "#trainers" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out border-b border-transparent",
          isScrolled
            ? "bg-black/70 backdrop-blur-lg border-white/10 py-3 md:py-4 shadow-lg"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <Dumbbell className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display font-bold text-lg md:text-xl tracking-wider text-white">
              FAT 2 <span className="text-primary text-glow">FIT</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full font-bold text-sm bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-black transition-all duration-300"
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-transform"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background/97 backdrop-blur-xl flex flex-col"
          >
            <div className="p-4 flex justify-between items-center border-b border-white/5">
              <span className="font-display font-bold text-lg text-white">FAT 2 <span className="text-primary">FIT</span></span>
              <button
                className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-white/80 hover:text-primary active:scale-90 transition-transform"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display text-2xl font-bold text-white hover:text-primary transition-colors w-full text-center py-2 active:scale-95"
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 px-8 py-4 rounded-xl font-bold text-lg bg-primary text-black active:scale-95 transition-all w-full text-center max-w-xs min-h-[56px] flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom CTA Bar — Mobile Only */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 3.2 }}
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-black/90 backdrop-blur-lg border-t border-white/10 px-4 py-3 flex gap-3"
      >
        <a
          href="#pricing"
          className="flex-1 min-h-[48px] flex items-center justify-center rounded-xl font-bold text-sm text-black bg-primary active:scale-95 transition-transform box-glow"
        >
          Join Now
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[48px] flex items-center justify-center gap-2 rounded-xl font-bold text-sm text-white bg-[#25D366] active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </motion.div>
    </>
  );
}
