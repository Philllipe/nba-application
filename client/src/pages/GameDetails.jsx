import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchConfig } from "../utils/fetchConfig.js";

import Breadcrumb from "../components/Breadcrumb";
import GameCard from "../components/GameCard";
import PlayerTable from "../components/PlayerTable.jsx";
import GoogleMap from "../components/GoogleMap.jsx";

import formatDate from "../utils/formatDate";

const pages = [
  { name: "Games", href: "/games", current: false },
  { name: "Game Details", current: true },
];

export default function GameDetails() {
  document.title = "Game Details | NBA Games Finder";

  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);
  const [videoID, setVideoID] = useState(null);
  const [upcomingDetails, setUpcomingDetails] = useState({});
  const [busy, setBusy] = useState(true);
  const [KEY, setKEY] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchGame() {
      const backendURL = await fetchConfig();

      // Get Google Maps API key
      fetch(`${backendURL}/maps/api`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setKEY(data.key);
        })
        .catch((err) => {
          console.log(err);
        });

      // Get game details
      fetch(`${backendURL}/games/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setGame(data);
          // If the game is finished
          if (data.status === "Final") {
            async function fetchPlayers() {
              const backendURL = await fetchConfig();
              // Get player stats
              fetch(`${backendURL}/stats?per_page=100&game_ids[]=${id}`, {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  setPlayers(
                    data.data.map((playerData) => ({
                      id: playerData.player.id,
                      name: `${playerData.player.first_name} ${playerData.player.last_name}`,
                      position: playerData.player.position,
                      points: playerData.pts,
                      assists: playerData.ast,
                      rebounds: playerData.reb,
                      steals: playerData.stl,
                      blocks: playerData.blk,
                      team: playerData.team.id,
                    }))
                  );
                  setBusy(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            async function fetchVideo() {
              const backendURL = await fetchConfig();
              // Get game highlights
              fetch(
                `${backendURL}/youtube?q=${data.home_team.full_name} vs ${
                  data.visitor_team.full_name
                } ${formatDate(data.date) + " highlights"}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setVideoID(data.items[0].id.videoId);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            fetchVideo();
            fetchPlayers();
            // If the game is upcoming
          } else if (data.status !== "Final" && data.status !== "error") {
            async function fetchUpcomingDetails() {
              const backendURL = await fetchConfig();
              // Get upcoming game details
              fetch(
                `${backendURL}/seatgeek?datetime_utc=${data.status}&q=${data.home_team.full_name}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setUpcomingDetails(data.events[0]);
                  setBusy(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            async function fetchVideo() {
              const backendURL = await fetchConfig();
              // Get video related to upcoming game
              fetch(
                `${backendURL}/youtube?q=${data.home_team.full_name} vs ${data.visitor_team.full_name} News`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  setVideoID(data.items[0].id.videoId);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            fetchVideo();
            fetchUpcomingDetails();
          } else {
            throw new Error("Game not found");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/404");
        });
    }
    fetchGame();
  }, [id, navigate]);

  return (
    <div className="bg-slate-800">
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

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="column-1 mx-auto">
            <Breadcrumb pages={pages} />
            <div className="p-4 mt-5 grid grid-cols-1">
              {game.id ? (
                <GameCard
                  homeTeam={game.home_team.full_name}
                  awayTeam={game.visitor_team.full_name}
                  time={game.status}
                  score={`${game.home_team_score} - ${game.visitor_team_score}`}
                  id={game.id}
                  key={game.id}
                />
              ) : (
                <div className="text-center">
                  <p className="text-3xl font-medium-bold text-white">
                    Loading...
                  </p>
                </div>
              )}
            </div>
            {!busy && (
              <div className="p-4 mt-5">
                {game.status === "Final" ? (
                  <>
                    <PlayerTable
                      players={players}
                      homeTeam={game.home_team.id}
                      homeName={game.home_team.abbreviation}
                      awayTeam={game.visitor_team.id}
                      awayName={game.visitor_team.abbreviation}
                    />
                    <iframe
                      src={`https://www.youtube.com/embed/${videoID}`}
                      title="Game Highlights"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen={true}
                      className="mt-8 mx-auto w-full aspect-video"
                    ></iframe>
                  </>
                ) : (
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-white uppercase ">
                        {upcomingDetails.short_title}
                      </p>
                      <p className="text-2xl font-medium text-white ">
                        {upcomingDetails.venue.name}
                      </p>
                      <p className="text-xl font-medium-bold text-white ">
                        {upcomingDetails.venue.address}
                      </p>
                      <a
                        className="inline-flex mt-10 items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        href={upcomingDetails.url}
                      >
                        Get Tickets!
                      </a>
                      <p className="text-xl font-medium-bold text-white mt-2">
                        From ${upcomingDetails.stats.lowest_sg_base_price}
                      </p>
                      <p className="text-xl font-medium-bold text-white mt-2">
                        {upcomingDetails.stats.visible_listing_count} Tickets
                        Left
                      </p>
                      <iframe
                        src={`https://www.youtube.com/embed/${videoID}`}
                        title="Game Highlights"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen={true}
                        className="justify-end mt-4 mx-auto w-full aspect-video"
                      ></iframe>
                    </div>
                    <div className="grid grid-row-2">
                      <img
                        src={upcomingDetails.performers[0].image}
                        alt="venue"
                        className="shadow-lg mx-auto w-max rounded-lg mb-8 mt-8"
                      ></img>
                      <GoogleMap
                        lat={upcomingDetails.venue.location.lat}
                        lng={upcomingDetails.venue.location.lon}
                        venueName={upcomingDetails.venue.name}
                        className="row-span-2"
                        API_KEY={KEY}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
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
