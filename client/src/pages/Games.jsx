import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchConfig } from "../utils/fetchConfig.js";

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

import Breadcrumb from "../components/Breadcrumb";
import GameCard from "../components/GameCard";

const pages = [{ name: "Games", current: true }];

export default function Games() {
  document.title = "Games | NBA Games Finder";
  const [date, setDate] = useState(new Date());
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    async function fetchGames() {
      const backendURL = await fetchConfig();
      if (date === null) return;
      const dateQuery = date.toISOString().split("T")[0];

      // Get games for the selected date
      fetch(`${backendURL}/games?dates[]=${dateQuery}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGames(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchGames();
  }, [date]);

  function displayGames() {
    return games.data.map((game) => {
      return (
        <GameCard
          homeTeam={game.home_team.full_name}
          awayTeam={game.visitor_team.full_name}
          time={game.status}
          score={`${game.home_team_score} - 
                  ${game.visitor_team_score}`}
          id={game.id}
          key={game.id}
        />
      );
    });
  }

  return (
    <div className="bg-slate-800">
      <div className="relative px-6 isolate pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80"
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

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto column-1">
            <Breadcrumb pages={pages} />
            <div className="flex justify-between p-4 mt-5 font-bold text-center text-white rounded-lg">
              <button
                onClick={() => {
                  setDate(new Date(date.setDate(date.getDate() - 1)));
                }}
              >
                <ArrowLeftCircleIcon className="w-10 h-10 text-white duration-200 shadow-lg hover:-translate-x-2 hover:text-indigo-400" />
              </button>
              <span className="">
                <DatePicker
                  showIcon
                  className="text-3xl text-center text-white underline duration-200 bg-transparent rounded-lg text- hover:text-indigo-400 hover:scale-105 hover:-translate-y-2"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  format="yyyy-MM-dd"
                  todayButton="Goto Today"
                  dateFormat="dd/MM/yyyy"
                />
              </span>
              <button
                onClick={() => {
                  setDate(new Date(date.setDate(date.getDate() + 1)));
                }}
              >
                <ArrowRightCircleIcon className="w-10 h-10 text-white duration-200 shadow-lg hover:translate-x-2 hover:text-indigo-400" />
              </button>
            </div>
            <div className="grid gap-8 sm:grid-cols-1 xl:grid-cols-2">
              {loading ? (
                <p className="mt-20 text-4xl font-semibold text-center text-white col-span-full">
                  Loading...
                </p>
              ) : games.data && games.data.length > 0 ? (
                displayGames()
              ) : (
                <p className="mt-20 text-4xl font-semibold text-center text-white col-span-full">
                  No Games Found!
                </p>
              )}
            </div>
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
