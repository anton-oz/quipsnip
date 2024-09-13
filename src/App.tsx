import Nav from "./components/Nav/Nav";

export default function App() {
  const slides = [
    {
      title: "Audio Pitch Changer", // oof
      content: [
        "Simple app where all it is is you upload an audio file, and you have the opportunity to speed it up or slow it down",
        "functions like a native app, test on IOS first",
        "Similar to the red pitch knob in fl studio",
        "Make high audio quality.",
        "Clean, ultra simple UI",
      ],
    },
    {
      title: "All in one audio suite app",
      content: [
        "able to upload files and make a ringtone, mess with pitch, reverse, etc.",
        "able to export finished products",
        "need to put warning to shun using copyrighted material",
        "file generation suite",
        "include spotify, apple playlist converter",
      ],
    },
  ];

  return (
    // main container for app
    <main className="h-screen w-screen grid items-center place-items-center ">
      <Nav />
      {/* container for slides */}
      <div className="w-[75vw] h-[75vh] flex overflow-y-hidden overflow-x-scroll snap-x snap-mandatory scroll-smooth rounded-md">
        {slides.map((slide, i) => (
          <div
            className="min-w-[75vw] min-h-[75vh] flex flex-col justify-start items-start bg-sky-300 snap-center"
            key={i}
          >
            <h2 className="px-6 py-2 font-light bg-rose-200 text-3xl rounded-br-lg">
              {slide.title}
            </h2>
            <ul className="list-disc text-2xl font-extralight p-2 space-y-4 bg-sky-300">
              {slide.content.map((text, i) => (
                <li className="pl-4 bg-sky-300" key={i}>
                  - {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
