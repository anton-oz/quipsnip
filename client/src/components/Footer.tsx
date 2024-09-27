export default function Footer() {
  const footerLinks = [
    {
      name: "Quipsnip Github",
      link: "https://github.com/anton-oz/quipsnip",
    },
    {
      name: "Creator Github",
      link: "https://github.com/anton-oz",
    },
  ];
  return (
    <footer className="p-16 flex justify-end items-center text-white footer-gradient bg-opacity-25">
      <ul className="flex items-center justify-center gap-4 relative">
        {footerLinks.map((item, i) => (
          <li
            key={i}
            className={`absolute bottom-5 ${i === 0 ? "mr-[20em]" : null}`}
          >
            <a href={item.link} className="brutalButton w-max ">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
