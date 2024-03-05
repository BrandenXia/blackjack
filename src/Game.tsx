import useGame from "./lib/useGame.ts";
import Cards from "./components/Cards.tsx";

export default function Game() {
  const { player, computer, playerTurn, hit, stand, bust, winner, restart } =
    useGame();

  return (
    <>
      <div className="flex min-h-screen w-screen flex-col-reverse">
        <div className="flex-grow">
          <div className="flex flex-row">
            <div className="flex flex-grow translate-y-16 flex-row items-center justify-center gap-0 -space-x-32">
              <Cards cards={player.cards} />
            </div>
            <div className="flex basis-1/2 flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-5xl font-bold">{player.value}</div>
                <div className="basis-1/2">
                  {playerTurn && (
                    <div className="flex flex-row items-center justify-center gap-4">
                      <button className="btn btn-neutral btn-lg" onClick={hit}>
                        Hit
                      </button>
                      <button
                        className="btn btn-neutral btn-lg"
                        onClick={stand}
                      >
                        Stand
                      </button>
                    </div>
                  )}
                  {bust && (
                    <div className="absolute left-1/2 top-1/2 z-30 translate-y-28">
                      <div className="text-5xl font-bold">Bust</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex flex-row">
            <div className="flex flex-grow translate-y-16 flex-row items-center justify-center gap-0 -space-x-32">
              <Cards cards={computer.cards} hidden={playerTurn} />
            </div>
            <div className="flex basis-1/2 flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-4">
                {!playerTurn && (
                  <div className="text-5xl font-bold">{computer.value}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {winner && (
        <div className="absolute left-1/2 top-1/2 z-30 -translate-y-6">
          <div className="flex items-center justify-center gap-4">
            <div className="text-5xl font-bold">{winner} wins</div>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                restart();
              }}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
