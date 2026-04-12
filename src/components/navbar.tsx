import { Command, CommandInput } from "./ui/command";
import notificationButton from "../assets/Button.svg"
import userProfilePic from "../assets/Container-5.svg"
import { Separator } from "./ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import sidebarButtonPic from "../assets/Button-1.svg"
import { useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";

export function Navbar() {

  const { toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <nav className="flex h-12 border-b items-center">
      {!isMobile ? (
        <Command className="max-w-sm rounded-lg">
          <CommandInput placeholder="Explore datasets..." />
        </Command>
      ) : (
        <Button variant="link" onClick={toggleSidebar}>
          <img src={sidebarButtonPic} className="p-2" />
        </Button>
      )}
      <div className="flex ml-auto items-center gap-x-2 px-4 py-1">
        <img src={notificationButton} alt="notification" className="size-10" />
        <Separator
          orientation="vertical"
          className="h-8 w-0.5 bg-gray-400 opacity-60 ml-4 mr-4"
        />
        {!isMobile ? (
          <div className="flex flex-col text-right">
            <span className="text-xs font-semibold">Julian Capablanca</span>
            <span className="text-xs font-extralight">Chief Curator</span>
          </div>
        ) : null}
        <img src={userProfilePic} alt="notification" className="size-10" />
      </div>
    </nav>

  )
}
