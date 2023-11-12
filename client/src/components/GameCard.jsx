import { useNavigate } from "react-router-dom";
import formatTime from "../utils/formatTime";

export default function Card({ homeTeam, awayTeam, time, score, id }) {
  const navigate = useNavigate();
  return (
    <button
      className="rounded-lg bg-slate-100 shadow-lg hover:shadow-indigo-500 hover:-translate-y-1 hover:scale-103 duration-200 px-4 py-5 sm:p-6"
      onClick={() => {
        if (id) {
          navigate(`/games/${id}`);
        }
      }}
    >
      <div className="justify-between grid grid-rows-3 grid-flow-col gap-4 font-medium">
        <img
          src={require(`../images/${homeTeam}.png`)}
          alt="Brooklyn Nets Logo"
          className="aspect-[1/1] w-36 row-span-2"
        ></img>
        <p>{homeTeam}</p>
        <p>{formatTime(time)}</p>

        <p className="text-xl md:text-4xl xl:text-5xl font-medium-bold mt-12">
          {score}
        </p>
        <p className="text-4xl font-bold">VS</p>
        <img
          src={require(`../images/${awayTeam}.png`)}
          alt="Brooklyn Nets Logo"
          className="aspect-[1/1] w-36 row-span-2 flex-basis-1/2"
        ></img>
        <p>{awayTeam}</p>
      </div>
    </button>
  );
}
