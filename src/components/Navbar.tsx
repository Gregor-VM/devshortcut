import BookmarkIcon from "../icons/bookmark";
import GitHubIcon from "../icons/github";
import HoverEffect from "./HoverEffect";
import ThemeButton from "./ThemeButton";



export default function Navbar() {


    return (
      <nav class="flex justify-between items-center py-4 px-6 border-b-2 dark:border-b-purple-800/40 shadow-2xl shadow-purple-500/10 dark:bg-neutral-800/70">

        <h1>DevShortcut</h1>

        <ul class="flex gap-4 items-center">
            
            <a class="flex" href="/bookmarks">
              <HoverEffect color="text-yellow-500">
                <div class="w-6 h-6 block">
                  <BookmarkIcon />
                </div>
              </HoverEffect>
              <HoverEffect color="text-yellow-500">Bookmarks</HoverEffect>
            </a>
            
            <HoverEffect>
                <a href="#" class="w-6 h-6 block"><GitHubIcon /></a>
            </HoverEffect>

            <ThemeButton />
        </ul>

      </nav>
    )
  }
  