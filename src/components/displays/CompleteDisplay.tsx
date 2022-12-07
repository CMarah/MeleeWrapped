import { CleanData } from '../../lib/types';
import CornerIcon    from './CornerIcon';

interface CompleteDisplayLineProps {
  data: CleanData;
};
interface CompleteDisplayProps {
  data: CleanData;
};

const PlayTimeLine: React.FC<CompleteDisplayLineProps> = ({ data }) => {
  const { games, playtime, winrate, openings_per_kill, kill_count } = data;

  return (<div className="flex flex-grow flex-col relative justify-center">
    <span>
      You played a total of
      <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
      games, for a whopping
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(playtime/60/60/60)} </b></span>
      hours of Melee!
      <br/>
    </span>
    <span>
      Averaging
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(openings_per_kill * 10)/10} </b></span>
      Openings per Kill, you had a final toll of
      <span style={{color: "var(--accent-yellow)"}}><b> {kill_count} </b></span>
      KOs.
    </span>
    <span>
      Your global winrate was
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}%.</b></span>
      <br/>
    </span>
  </div>);
};

const CharLine: React.FC<CompleteDisplayLineProps> = ({ data }) => {
  const main_game_count = data.my_chars[0].games;
  const main_game_winrate = data.my_chars[0].winrate;
  const main_char = data.my_chars[0].name;

  return (<div className="flex flex-grow flex-col relative justify-center">
    <span>
      Your most played character was
      <span style={{color: "var(--accent-yellow)"}}><b> {main_char},</b></span><br/>
      with whom you played
      <span style={{color: "var(--accent-yellow)"}}><b> {main_game_count} </b></span>
      games and won
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(main_game_winrate * 1000)/10}% </b></span>
      of those.
    </span>
  </div>);
};

const NemesisLine: React.FC<CompleteDisplayLineProps> = ({ data }) => {
  const { games, winrate, names } = data.nemesis[0];
  const nemesis_name = Object.entries(names)
      .sort((a, b) => b[1] - a[1])[0][0];
  return (<div className="flex flex-grow flex-col relative justify-center">
    <span>
      <span style={{color: "var(--accent-yellow)"}}><b>{nemesis_name} </b></span>
      was your greatest opponent,<br/>
      beating them
      <span style={{color: "var(--accent-yellow)"}}><b> {Math.floor(winrate * 1000)/10}% </b></span>
      of the
      <span style={{color: "var(--accent-yellow)"}}><b> {games} </b></span>
      matches played.
    </span>
  </div>);
};

export const CompleteDisplay: React.FC<CompleteDisplayProps> = ({ data }) => {
  return (<div
    className="flex flex-col items-center justify-center w-full h-full"
    style={{fontSize: '1.4em', marginBottom: '1.5em', marginTop: '1.5em'}}
  >
    <CornerIcon char_name={data.my_chars[0].name} is_turnip/>
    <PlayTimeLine data={data} />
    <CharLine data={data} />
    <NemesisLine data={data} />
    <CornerIcon char_name={data.my_chars[0].name} place_left/>
  </div>);
};
