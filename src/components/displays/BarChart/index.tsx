import NodeGroup   from "react-move/NodeGroup";
import { Feature } from "../../../lib/types";
import './index.css';

interface Map {
  [key: string]: string | undefined
}
const TRANSLATIONS: Map = {
  "DREAMLAND": "Dreamland",
  "YOSHIS_STORY": "Yoshi's Story",
  "FOUNTAIN_OF_DREAMS": "Fountain of Dreams",
  "POKEMON_STADIUM": "Pokemon Stadium",
  "BATTLEFIELD": "Battlefield",
  "FINAL_DESTINATION": "Final Destination",
};

const BAR_HEIGHT = 27;
const BAR_PADDING = 0;
const BAR_COLOUR = "var(--accent-red)";

interface SingleBarProps {
  width: number;
  text: string;
}

interface BarProps {
  bar_data: Feature;
  max_games: number;
  state: {
    games: number;
    winrate: number;
  } 
};

interface Props {
  data: Array<Feature>;
};

const SingleBar: React.FC<SingleBarProps> = ({ width, text }) => (
  <div className="flex flex-row" style={{height: "2em"}}>
    <svg width={width*0.45 + "%"}>
      <rect
        width="100%"
        y={BAR_PADDING}
        height={BAR_HEIGHT - BAR_PADDING}
        style={{ fill: BAR_COLOUR, opacity: 1 }}
      />
    </svg>
    <div className="value-label" style={{ marginLeft: "0.5em" }}>
      {text}
    </div>
  </div>
);

const Bar: React.FC<BarProps> = ({ bar_data, max_games, state }) => {
  const { games, winrate } = state;
  const width1 = max_games !== 0 ? ((games / max_games) * 100) : 0;
  const width2 = winrate * 100;

  const full_height = 2 * (BAR_HEIGHT + BAR_PADDING);
  const bar_text = TRANSLATIONS[bar_data?.name] || bar_data.name || "";
  const text_size =
    bar_text.length > 14 ? "0.8em" :
    bar_text.length > 10 ? "0.9em" :
    bar_text.length > 8  ? "1em" : "1.2em";

  if (!games) return (<div></div>);

  return (<div className="flex" style={{height: full_height + 'px', marginBottom: '2em'}}>
    <div className="flex flex-col justify-center" style={{width: '10em'}}>
      <span style={{fontSize: text_size}}>{bar_text}</span>
    </div>
    <div className="flex flex-col">
      <SingleBar width={width1} text={Math.ceil(games) + " games"} />
      <SingleBar width={width2} text={width2.toFixed(1) + "% winrate"} />
    </div>
  </div>);
};

const BarChart: React.FC<Props> = ({ data }) => {

  const max_games = data.reduce((acc, cur) => acc > cur.games ? acc : cur.games, 0);

  const startTransition = () => ({
    games: 0, winrate: 0, opacity: 0,
  });
  const enterTransition = (d: Feature, i: number) => ({
    games: [d.games], winrate: [d.winrate], opacity: [1], timing: { duration: 1000, delay: 1200*(i) },
  });
  const leaveTransition = () => ({
    opacity: [0], timing: { duration: 1000 },
  });

  return (<NodeGroup
    data={data}
    keyAccessor={(d: any) => d.name}
    start={startTransition}
    enter={enterTransition}
    leave={leaveTransition}
  >
    {nodes => (<>
      {nodes.map(({ key, data, state }) => (
        <Bar key={key} bar_data={data} max_games={max_games} state={state}/>
      ))}
    </>)}
  </NodeGroup>);
};
export default BarChart;
