import error404 from "../images/404.gif";

export default function Error404() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-slate-800 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <img src={error404} alt="404" className="mx-auto mt-10"></img>
          <h1 className="mt-8 mb-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <span className="text-indigo-500 text-3xl font-bold tracking-tigh sm:text-5xl">
            404
          </span>
          <p className="mt-6 text-base leading-7 text-gray-200">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
