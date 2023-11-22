import unranked from "../../images/league_icons/unranked.svg";
import bronze1  from "../../images/league_icons/bronze-1.svg";
import bronze2  from "../../images/league_icons/bronze-2.svg";
import bronze3  from "../../images/league_icons/bronze-3.svg";
import silver1  from "../../images/league_icons/silver-1.svg";
import silver2  from "../../images/league_icons/silver-2.svg";
import silver3  from "../../images/league_icons/silver-3.svg";
import gold1    from "../../images/league_icons/gold-1.svg";
import gold2    from "../../images/league_icons/gold-2.svg";
import gold3    from "../../images/league_icons/gold-3.svg";
import plat1    from "../../images/league_icons/platinum-1.svg";
import plat2    from "../../images/league_icons/platinum-2.svg";
import plat3    from "../../images/league_icons/platinum-3.svg";
import diamond1 from "../../images/league_icons/diamond-1.svg";
import diamond2 from "../../images/league_icons/diamond-2.svg";
import diamond3 from "../../images/league_icons/diamond-3.svg";
import master1  from "../../images/league_icons/master-1.svg";
import master2  from "../../images/league_icons/master-2.svg";
import master3  from "../../images/league_icons/master-3.svg";
import gm       from "../../images/league_icons/grandmaster.svg";

interface Props {
  slippigg_elo: number | null;
}

const LeagueIcon: React.FC<Props> = ({ slippigg_elo }) => {
  const source_to_use =
    (!slippigg_elo || slippigg_elo === 0) ? unranked :
    slippigg_elo >= 2191.75 ? gm :
    slippigg_elo >= 2350 ? master3 :
    slippigg_elo >= 2275 ? master2 :
    slippigg_elo >= 2191.75 ? master1 :
    slippigg_elo >= 2136.28 ? diamond3 :
    slippigg_elo >= 2073.67 ? diamond2 :
    slippigg_elo >= 2003.92 ? diamond1 :
    slippigg_elo >= 1927.03 ? plat3 :
    slippigg_elo >= 1843 ? plat2 :
    slippigg_elo >= 1751.83 ? plat1 :
    slippigg_elo >= 1653.52 ? gold3 :
    slippigg_elo >= 1548.07 ? gold2 :
    slippigg_elo >= 1435.48 ? gold1 :
    slippigg_elo >= 1315.75 ? silver3 :
    slippigg_elo >= 1188.88 ? silver2 :
    slippigg_elo >= 1054.87 ? silver1 :
    slippigg_elo >= 913.72 ? bronze3 :
    slippigg_elo >= 765.43 ? bronze2 : bronze1;

  return (
    <img src={source_to_use} alt="" style={{
      width: "5em",
      opacity: "0.5",
      position: "absolute",
      bottom: "1em",
      right: "2em",
    }}/>
  );
};
export default LeagueIcon;
