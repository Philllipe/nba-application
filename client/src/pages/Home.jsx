import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchConfig } from "../utils/fetchConfig.js";

export default function Home() {
  document.title = "Home | NBA Games Finder";

  const [visits, setVisits] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function getVisits() {
      const backendURL = await fetchConfig();
      // Get the number of visits to the site
      fetch(`${backendURL}/counter`)
        .then((res) => res.json())
        .then((data) => {
          setVisits(data.visits);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getVisits();
  }, []);

  return (
    <div className="bg-slate-800 ">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome To The NBA{" "}
              <span className="text-indigo-500">Games Finder</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-200">
              This website is a simple way to find NBA games and their details.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate("/games")}
              >
                To The Games...
              </button>
            </div>
            <p className="mt-6 text-lg leading-8 text-indigo-200">
              {visits > 0 ? (
                <span>Total Visitors: {visits}</span>
              ) : (
                <span></span>
              )}
            </p>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
