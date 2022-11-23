import slippilogo from '../../images/slippilogo.svg';
import dk         from '../../images/characters/dk.png';
import yl         from '../../images/characters/yl.png';
import doc        from '../../images/characters/doc.png';
import fox        from '../../images/characters/fox.png';
import gaw        from '../../images/characters/gaw.png';
import ics        from '../../images/characters/ics.png';
import roy        from '../../images/characters/roy.png';
import link       from '../../images/characters/link.png';
import falco      from '../../images/characters/falco.png';
import mario      from '../../images/characters/mario.png';
import sheik      from '../../images/characters/sheik.png';
import zelda      from '../../images/characters/zelda.png';
import falcon     from '../../images/characters/falcon.png';
import marth      from '../../images/characters/marth.png';
import luigi      from '../../images/characters/luigi.png';
import bowser     from '../../images/characters/bowser.png';
import ganon      from '../../images/characters/ganon.png';
import jigglypuff from '../../images/characters/jigglypuff.png';
import kirby      from '../../images/characters/kirby.png';
import mewtwo     from '../../images/characters/mewtwo.png';
import peach      from '../../images/characters/peach.png';
import pichu      from '../../images/characters/pichu.png';
import pikachu    from '../../images/characters/pikachu.png';
import samus      from '../../images/characters/samus.png';
import yoshi      from '../../images/characters/yoshi.png';
import fd         from '../../images/stages/fd.png';
import fod        from '../../images/stages/fod.png';
import dreamland  from '../../images/stages/dreamland.png';
import yoshis     from '../../images/stages/yoshis.png';
import bf         from '../../images/stages/bf.png';
import pokemon    from '../../images/stages/pokemon.png';

interface Props {
  char_name: string;
}

export const CornerIcon: React.FC<Props> = ({ char_name }) => {
  const source_to_use = {
    "DK": dk,
    "Young Link": yl,
    "Dr. Mario": doc,
    "Fox": fox,
    "Mr. G&W": gaw,
    "Ice Climbers": ics,
    "Roy": roy,
    "Link": link,
    "Falco": falco,
    "Mario": mario,
    "Sheik": sheik,
    "Zelda": zelda,
    "Cpt. Falcon": falcon,
    "Marth": marth,
    "Luigi": luigi,
    "Bowser": bowser,
    "Ganondorf": ganon,
    "Jigglypuff": jigglypuff,
    "Kirby": kirby,
    "Mewtwo": mewtwo,
    "Peach": peach,
    "Pichu": pichu,
    "Pikachu": pikachu,
    "Samus": samus,
    "Yoshi": yoshi,
    "DREAMLAND": dreamland,
    "FINAL_DESTINATION": fd,
    "FOUNTAIN_OF_DREAMS": fod,
    // TODO CLEAN YOSHIS! It's a jpeg!
    "YOSHIS_STORY": yoshis,
    "BATTLEFIELD": bf,
    "POKEMON_STADIUM": pokemon,
  }[char_name] || slippilogo;
  return (
    <img src={source_to_use} alt="" style={{ width: "20em", opacity: "0.5", position: "absolute", bottom: "-5em", right: "-3em" }}/>
  );
};
export default CornerIcon;
