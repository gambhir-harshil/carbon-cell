import { Home, Menu, Package2, BarChart, Coins, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";

const navlinks = [
  {
    name: "Dashboard",
    link: "/",
    logo: <Home className="w-4 h-4" />,
  },
  {
    name: "Population",
    link: "/population",
    logo: <BarChart className="w-4 h-4" />,
  },
  { name: "Assets", link: "/assets", logo: <Coins className="w-4 h-4" /> },
  { name: "Wallet", link: "/wallet", logo: <Wallet className="w-4 h-4" /> },
];

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block w-[240px]">
        <div className="flex flex-col h-full max-h-screen gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <span className="flex items-center gap-2 font-semibold">
              <Package2 className="w-6 h-6" />
              <span>Carbon Cell</span>
            </span>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              {navlinks.map((navLink) => (
                <Link
                  to={navLink.link}
                  key={navLink.name}
                  className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg cursor-pointer text-muted-foreground hover:text-primary hover:bg-muted ${
                    pathname === navLink.link && "text-primary bg-muted"
                  }`}
                >
                  {navLink.logo}
                  <span className="font-semibold">{navLink.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <span className="flex items-center gap-2 text-lg font-semibold">
                  <Package2 className="w-6 h-6" />
                  <span className="sr-only">Acme Inc</span>
                </span>
                {navlinks.map((navlink) => (
                  <Link
                    to={navlink.link}
                    key={navlink.name}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer ${
                      pathname === navlink.link && "text-primary bg-muted"
                    }`}
                  >
                    {navlink.logo}
                    {navlink.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </>
    </>
  );
};

export default Navbar;
