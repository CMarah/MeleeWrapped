import NodeGroup   from "react-move/NodeGroup";
import { Feature } from "../../../lib/types";
import './index.css';

const BAR_HEIGHT = 25;
const BAR_PADDING = 2;
const BAR_COLOUR = "var(--accent-green)";

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

const Bar: React.FC<BarProps> = ({ bar_data, max_games, state }) => {
  const { games, winrate } = state;
  const width1 = max_games !== 0 ? ((games / max_games) * 100).toFixed(2) + "%" : "0%";
  const width2 = (winrate * 100).toFixed(1) + "%";

  const full_height = 2 * (BAR_HEIGHT + BAR_PADDING);

  return (<div className="flex" style={{height: full_height + 'px', marginBottom: '2em'}}>
    <div className="flex flex-col justify-center" style={{
      width: '6em',
      fontSize: '1.2em',
    }}>
      {bar_data.name}
    </div>
    <div className="flex flex-col">
      <svg>
        <rect
          y={BAR_PADDING}
          width={width1}
          height={BAR_HEIGHT - BAR_PADDING}
          style={{ fill: BAR_COLOUR, opacity: 1 }}
        />
        <text
          className="value-label"
          alignmentBaseline="middle"
          x={6}
          y={2 + (BAR_HEIGHT * 0.5)}
        >
          {games} games
        </text>
      </svg>
      <svg>
        <rect
          y={BAR_PADDING}
          width={width2}
          height={BAR_HEIGHT - BAR_PADDING}
          style={{ fill: BAR_COLOUR, opacity: 1 }}
        />
        <text
          className="value-label"
          alignmentBaseline="middle"
          x={6}
          y={2 + (BAR_HEIGHT * 0.5)}
        >
          {width2} winrate
        </text>
      </svg>
    </div>
  </div>);
};

const BarChart: React.FC<Props> = ({ data }) => {

  const max_games = data[0].games;

  const startTransition = () => {
    return { games: 0, winrate: 0, opacity: 0 };
  };

  const enterTransition = (d: Feature) => {
    return { games: [d.games], winrate: [d.winrate], opacity: [1], timing: { duration: 1000 } };
  };

  const updateTransition = (d: Feature) => {
    return { games: [d.games], winrate: [d.winrate], opacity: [1], timing: { duration: 1000 } };
  };

  const leaveTransition = () => {
    return { opacity: [0], timing: { duration: 1000 } };
  };

  return (<NodeGroup
      data={data}
      keyAccessor={(d: any) => d.name}
      start={startTransition}
      enter={enterTransition}
      update={updateTransition}
      leave={leaveTransition}
    >
    {nodes => (<>
      {nodes.map(({ key, data, state }) => (
        <Bar key={key} bar_data={data} max_games={max_games} state={state}/>
      ))}
    </>)}
    </NodeGroup>
  );
};
export default BarChart;
