import { Examples } from "../components/Examples";
import Navbar from "../components/Navbar";
import { Example } from "../examples/examples";
import useAppState from "../hooks/useAppState";
import BookmarkIcon from "../icons/bookmark";


export default function Bookmarks() {

  const { bookmarks } = useAppState();


  return (
    <>
      <Navbar />
      <main class="mx-6 lg:mx-56 my-12">

        <section>

        <h5 class="opacity-80 flex">
          <span class="block w-6 h-6"><BookmarkIcon /></span> Bookmarks
        </h5>

        <Examples showExamples={bookmarks as Example[]} />

        </section>

      </main>
    </>
  )
}
