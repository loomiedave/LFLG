import Link from "next/link";
import {
  Shield,
  FileText,
  Plus,
  HomeIcon,
  PenIcon,
  TrophyIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { ReactNode } from "react";

const adminNavLinks: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "Licences",
    href: "/admin",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    name: "Nouvelle licence",
    href: "/admin/create",
    icon: <Plus className="w-4 h-4" />,
  },
  {
    name: "Clubs et Zone",
    href: "/admin/clubs&districts",
    icon: <HomeIcon className="w-4 h-4" />,
  },
  {
    name: "Affiliations",
    href: "/admin/clubs",
    icon: <PenIcon className="w-4 h-4" />,
  },
  {
    name: "Competitions",
    href: "/admin/competitions",
    icon: <TrophyIcon className="w-4 h-4" />,
  },
];

export default function AdminNav() {
  return (
    <nav className="bg-background text-foreground shadow-lg border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            {/* Left Section: Logo + Title */}
            <Link href="/admin" className="flex items-center gap-2">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="font-bold">Administration</h1>
                <p className="text-xs">FTF - Lomé Gulf League</p>
              </div>
            </Link>

            {/* Main Nav Links */}
            <div className="hidden md:flex items-center space-x-2 ">
              {adminNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 p-2 text-xs font-medium rounded-md hover:bg-gray-200 hover:text-gray transition whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section: Public Site + User */}
          <div className="flex items-center gap-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </nav>
  );
}
