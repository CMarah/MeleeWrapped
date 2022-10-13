import { CleanData } from '../../lib/types';

interface Props {
  data: CleanData;
  main_progress: number;
};

const texts = (playtime: number, data: CleanData) => [
  `2022 was great year for Melee`,
  `You played a total of ${data.games} games, for a total of ${playtime} frames.
    That's more than ${Math.floor(playtime/60/60/60)} hours of Melee!
  `,
];

export const PlayTimeDisplay: React.FC<Props> = ({ data, main_progress }) => {
  const partial_progress = main_progress % 100;

  console.log('PP', partial_progress, data);

  return (<div className="flex flex-grow relative" style={{width: '100%', height: '100%', paddingTop: '10em'}}>
    que tio 2
  </div>);
};
