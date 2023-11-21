import slippilogo   from '../../images/slippilogo.svg';
import dk           from '../../images/characters/dk.png';
import yl           from '../../images/characters/yl.png';
import doc          from '../../images/characters/doc.png';
import fox          from '../../images/characters/fox.png';
import gaw          from '../../images/characters/gaw.png';
import ics          from '../../images/characters/ics.png';
import roy          from '../../images/characters/roy.png';
import link         from '../../images/characters/link.png';
import falco        from '../../images/characters/falco.png';
import mario        from '../../images/characters/mario.png';
import sheik        from '../../images/characters/sheik.png';
import zelda        from '../../images/characters/zelda.png';
import falcon       from '../../images/characters/falcon.png';
import marth        from '../../images/characters/marth.png';
import luigi        from '../../images/characters/luigi.png';
import bowser       from '../../images/characters/bowser.png';
import ganon        from '../../images/characters/ganon.png';
import jigglypuff   from '../../images/characters/jigglypuff.png';
import kirby        from '../../images/characters/kirby.png';
import mewtwo       from '../../images/characters/mewtwo.png';
import peach        from '../../images/characters/peach.png';
import pichu        from '../../images/characters/pichu.png';
import pikachu      from '../../images/characters/pikachu.png';
import samus        from '../../images/characters/samus.png';
import yoshi        from '../../images/characters/yoshi.png';
import ness         from '../../images/characters/ness.png';
import fd           from '../../images/stages/fd.png';
import fod          from '../../images/stages/fod.png';
import dreamland    from '../../images/stages/dreamland.png';
import yoshis       from '../../images/stages/yoshis.png';
import bf           from '../../images/stages/bf.png';
import pokemon      from '../../images/stages/pokemon.png';
import dk_t         from '../../images/turnips/dk.png';
import yl_t         from '../../images/turnips/yl.png';
import doc_t        from '../../images/turnips/doc.png';
import fox_t        from '../../images/turnips/fox.png';
import gaw_t        from '../../images/turnips/gaw.png';
import ics_t        from '../../images/turnips/ics.png';
import roy_t        from '../../images/turnips/roy.png';
import link_t       from '../../images/turnips/link.png';
import falco_t      from '../../images/turnips/falco.png';
import mario_t      from '../../images/turnips/mario.png';
import sheik_t      from '../../images/turnips/sheik.png';
import zelda_t      from '../../images/turnips/zelda.png';
import falcon_t     from '../../images/turnips/falcon.png';
import marth_t      from '../../images/turnips/marth.png';
import luigi_t      from '../../images/turnips/luigi.png';
import bowser_t     from '../../images/turnips/bowser.png';
import ganon_t      from '../../images/turnips/ganon.png';
import jigglypuff_t from '../../images/turnips/jigglypuff.png';
import kirby_t      from '../../images/turnips/kirby.png';
import mewtwo_t     from '../../images/turnips/mewtwo.png';
import peach_t      from '../../images/turnips/peach.png';
import pichu_t      from '../../images/turnips/pichu.png';
import pikachu_t    from '../../images/turnips/pikachu.png';
import samus_t      from '../../images/turnips/samus.png';
import yoshi_t      from '../../images/turnips/yoshi.png';
import ness_t       from '../../images/turnips/ness.png';

interface Props {
  char_name: string;
  place_left?: boolean;
  is_turnip?: boolean;
}

const STAGES_CHARS = {
  "DK": dk, "Young Link": yl, "Dr. Mario": doc, "Fox": fox, "Mr. G&W": gaw, "Ice Climbers": ics, "Roy": roy,
  "Link": link, "Falco": falco, "Mario": mario, "Sheik": sheik, "Zelda": zelda, "Cpt. Falcon": falcon,
  "Marth": marth, "Luigi": luigi, "Bowser": bowser, "Ganondorf": ganon, "Jigglypuff": jigglypuff,
  "Kirby": kirby, "Mewtwo": mewtwo, "Peach": peach, "Pichu": pichu, "Pikachu": pikachu, "Samus": samus,
  "Yoshi": yoshi, "Ness": ness, "DREAMLAND": dreamland, "FINAL_DESTINATION": fd, "FOUNTAIN_OF_DREAMS": fod,
  "YOSHIS_STORY": yoshis, "BATTLEFIELD": bf, "POKEMON_STADIUM": pokemon,
};

const TURNIPS = {
  "DK": dk_t, "Young Link": yl_t, "Dr. Mario": doc_t, "Fox": fox_t, "Mr. G&W": gaw_t, "Ice Climbers": ics_t, "Roy": roy_t,
  "Link": link_t, "Falco": falco_t, "Mario": mario_t, "Sheik": sheik_t, "Zelda": zelda_t, "Cpt. Falcon": falcon_t, "Marth": marth_t,
  "Luigi": luigi_t, "Bowser": bowser_t, "Ganondorf": ganon_t, "Jigglypuff": jigglypuff_t, "Kirby": kirby_t, "Mewtwo": mewtwo_t,
  "Peach": peach_t, "Pichu": pichu_t, "Pikachu": pikachu_t, "Samus": samus_t, "Yoshi": yoshi_t, "Ness": ness_t,
};

const CUSTOM_STYLES = {
  "Fox": { left: "-3em", bottom: "-1em", width: "18em" },
  "Falco": { left: "-3em", bottom: "-3em", width: "18em" },
  "Marth": { left: "-3em", bottom: "-2em", width: "18em" },
  "Sheik": { left: "-5em", bottom: "-7em", width: "24em" },
  "Ice Climbers": { left: "-3em", bottom: "-4em", width: "18em" },
  "Cpt. Falcon": { left: "-3em", bottom: "0", width: "18em" },
  "Luigi": { left: "-3em", bottom: "-2em", width: "18em" },
  "Ganondorf": { left: "-1em", bottom: "-3em", width: "20em" },
  "Jigglypuff": { left: "-4em", bottom: "-5em", width: "20em" },
  "Peach": { left: "-3em", bottom: "0", width: "16em" },
  "Pikachu": { left: "-3em", bottom: "-4em", width: "20em" },
  "Samus": { left: "-7em", bottom: "-1em", width: "20em" },
  "Yoshi": { left: "-4em", bottom: "-2em", width: "20em" },
};

export const CornerIcon: React.FC<Props> = ({ char_name, place_left, is_turnip }) => {
  const source_to_use = is_turnip ?
    (TURNIPS as { [key: string]: any })[char_name] :
    (STAGES_CHARS as { [key: string]: any })[char_name];

  const conditional_style = (CUSTOM_STYLES as { [key: string]: any })[char_name] || (
    place_left ? { left: "-5em", bottom: "-4em", width: "16em" } :
    is_turnip ? { right: "0", top: "-1em" } :
    { right: "-3em", bottom: "-5em" }
  );

  return (
    <img src={source_to_use || slippilogo} alt="" style={{
      width: is_turnip ? "4em" : "20em",
      opacity: "0.5",
      position: "absolute",
      bottom: "-5em",
      ...conditional_style,
    }}/>
  );
};
export default CornerIcon;
