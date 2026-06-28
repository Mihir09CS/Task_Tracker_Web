import { useState, useRef, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import {
  CheckSquare,
  Menu,
  X,
  Info,
  User,
  ChevronDown,
  Check,
  Terminal,
  Sparkles,
  Code2,
} from "lucide-react";
import ThemeToggle from "../common/ThemeToggle.jsx";
import Modal from "../common/Modal.jsx";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);

  const dropdownRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuItemRefs = useRef([]);
  const dropdownId = useId();

  const dropdownItems = [
    {
      label: "About Project",
      icon: Info,
      onSelect: () => setIsAboutOpen(true),
    },
    {
      label: "Developer Information",
      icon: Code2,
      onSelect: () => setIsDevOpen(true),
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const focusFirstItem = requestAnimationFrame(() => {
      menuItemRefs.current[0]?.focus();
    });

    return () => cancelAnimationFrame(focusFirstItem);
  }, [isDropdownOpen]);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const openDropdown = (focusIndex = 0) => {
    setIsDropdownOpen(true);

    requestAnimationFrame(() => {
      menuItemRefs.current[focusIndex]?.focus();
    });
  };

  const handleMenuButtonKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDropdown(0);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openDropdown(dropdownItems.length - 1);
    }
  };

  const handleDropdownKeyDown = (event, index) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDropdown();
      menuButtonRef.current?.focus();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      menuItemRefs.current[(index + 1) % dropdownItems.length]?.focus();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      menuItemRefs.current[(index - 1 + dropdownItems.length) % dropdownItems.length]?.focus();
    }

    if (event.key === "Home") {
      event.preventDefault();
      menuItemRefs.current[0]?.focus();
    }

    if (event.key === "End") {
      event.preventDefault();
      menuItemRefs.current[dropdownItems.length - 1]?.focus();
    }

    if (event.key === "Tab") {
      closeDropdown();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-primary-700 transition-colors">
              <CheckSquare className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
              Task<span className="text-primary-600">Tracker</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <ThemeToggle />
              
              {/* Dropdown Container */}
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={menuButtonRef}
                  onClick={() => {
                    if (isDropdownOpen) {
                      closeDropdown();
                    } else {
                      openDropdown();
                    }
                  }}
                  onKeyDown={handleMenuButtonKeyDown}
                  className="flex items-center gap-2 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/80 pr-2 pl-1 py-1 hover:bg-slate-50 dark:hover:bg-slate-800/90 hover:shadow-card transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-controls={dropdownId}
                  aria-label="User profile menu"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-950 ring-1 ring-primary-200/70 dark:ring-primary-900/60 flex items-center justify-center transition-colors duration-300">
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">M</span>
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-none">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Demo User</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Project Preview</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    id={dropdownId}
                    role="menu"
                    aria-label="Demo user menu"
                    className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-border dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-dropdown backdrop-blur-md p-2 animate-scale-in text-left"
                  >
                    <div className="px-3 py-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 dark:bg-primary-950 ring-1 ring-primary-200/70 dark:ring-primary-900/60">
                          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">M</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Demo User</p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            Explore the project details and developer profile.
                          </p>
                          <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 text-[10px] font-medium bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-400 rounded-full border border-primary-200/50 dark:border-primary-900/50">
                            <Sparkles className="h-3 w-3" />
                            Demo Preview
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="my-1 border-t border-slate-100 dark:border-slate-800/80" />

                    {dropdownItems.map(({ label, icon: Icon, onSelect }, index) => (
                      <button
                        key={label}
                        ref={(element) => {
                          menuItemRefs.current[index] = element;
                        }}
                        role="menuitem"
                        onKeyDown={(event) => handleDropdownKeyDown(event, index)}
                        onClick={() => {
                          onSelect();
                          closeDropdown();
                        }}
                        className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 text-left"
                      >
                        <Icon className="w-4 h-4 text-slate-450 dark:text-slate-500" />
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t border-border dark:border-slate-850 bg-white dark:bg-slate-900 transition-colors duration-300 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center gap-3 p-2 border-b border-slate-100 dark:border-slate-800/80 pb-3 transition-colors duration-300">
              <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-950 flex items-center justify-center transition-colors duration-300">
                <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">M</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Demo User</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Project Preview</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={() => {
                  setIsAboutOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left cursor-pointer transition-colors duration-200"
              >
                <Info className="w-4.5 h-4.5 text-slate-400" />
                About Project
              </button>
              <button
                onClick={() => {
                  setIsDevOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left cursor-pointer transition-colors duration-200"
              >
                <User className="w-4.5 h-4.5 text-slate-400" />
                Developer Information
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Project Modal */}
      <Modal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} title="About Project" size="md">
        <div className="space-y-5 text-slate-600 dark:text-slate-300 text-sm leading-relaxed text-left">
          <div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-colors duration-300">
              <CheckSquare className="w-5 h-5 text-primary-600" />
              Task Tracker
            </h3>
            <p className="mt-1 text-slate-550 dark:text-slate-400 transition-colors duration-300">
              Production-inspired MERN Stack application.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Technology Stack</h4>
              <ul className="space-y-1 text-xs">
                <li className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary-500" /> React</li>
                <li className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary-500" /> Tailwind CSS</li>
                <li className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary-500" /> Node.js</li>
                <li className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary-500" /> Express</li>
                <li className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-primary-500" /> MongoDB</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Version</h4>
              <div className="rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 px-3 py-3">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">1.0.0</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Frontend and backend integration demo build.</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Implemented Features</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> CRUD</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Search</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Filter</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Sorting</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Pagination</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Statistics Dashboard</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Responsive Design</span>
              <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Light/Dark Theme</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 transition-colors duration-300">
            <span>Task Tracker</span>
            <span>Production-ready UI demo</span>
          </div>
        </div>
      </Modal>

      {/* Developer Info Modal */}
      <Modal isOpen={isDevOpen} onClose={() => setIsDevOpen(false)} title="Developer Information" size="sm">
        <div className="space-y-5 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-950 flex items-center justify-center shadow-sm transition-colors duration-300">
            <span className="text-xl font-bold text-primary-700 dark:text-primary-300">MP</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">Mihir Parida</h3>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium transition-colors duration-300">Full Stack Developer</p>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-300">
            Passionate about building responsive, accessible, and performant web interfaces with clean architectures and premium user experiences.
          </p>

          <div className="pt-2 text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 transition-colors duration-300">Developer Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Express", "MongoDB"].map((tech) => (
                <span key={tech} className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-850 rounded-lg text-slate-650 dark:text-slate-350 transition-colors duration-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
            <a
              href="https://github.com/mihirparida15"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-slate-550 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              github.com/mihirparida15
            </a>
          </div>
        </div>
      </Modal>
    </header>
  );
}
