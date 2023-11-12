import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

export default function Breadcrumb({ pages }) {
  const navigate = useNavigate();
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <a
            href="/"
            className="text-white hover:text-indigo-400 duration-200 shadow-lg"
          >
            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </a>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-white"
                aria-hidden="true"
              />
              <button
                onClick={() => {
                  navigate(page.href);
                }}
                className="ml-4 text-sm font-medium text-white hover:text-indigo-400 duration-200 shadow-lg"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
