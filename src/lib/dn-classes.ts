export const jobsList = [
  "Gladiator",
  "Windwalker",
  "Tempest",
  "SpiritDancer",
  "Souleater",
  "Sniper",
  "Smasher",
  "Saleana",
  "Saint",
  "Physician",
  "Moonlord",
  "Majesty",
  "Inquisitor",
  "Guardian",
  "Elestra",
  "Destroyer",
  "Darksummoner",
  "Crusader",
  "Bladedancer",
  "Artillery",
  "Adept",
  "GearMaster",
  "ShootingStar",
  "Barbarian",
];

export function jobsEmoji(job: string) {
  switch (job) {
    case "Gladiator":
      return "<:Gladiator:1285591779730522132>";
    case "Windwalker":
      return "<:Windwalker:1285592086472822825>";
    case "Tempest":
      return "<:Tempest:1285592062212964352>";
    case "SpiritDancer":
      return "<:SpiritDancer:1285592023516184606>";
    case "Souleater":
      return "<:Souleater:1285592005161910293>";
    case "Sniper":
      return "<:Sniper:1285591980537155594>";
    case "Smasher":
      return "<:Smasher:1285591957686714509>";
    case "Saleana":
      return "<:Saleana:1285591939537698926>";
    case "Saint":
      return "<:Saint:1285591913336016896>";
    case "Physician":
      return "<:Physician:1285591888119988297>";
    case "Moonlord":
      return "<:Moonlord:1285591867890728960>";
    case "Majesty":
      return "<:Majesty:1285591847468793970>";
    case "Inquisitor":
      return "<:Inquisitor:1285591824836071445>";
    case "Guardian":
      return "<:Guardian:1285591803277344781>";
    case "Elestra":
      return "<:Elestra:1285591757475807282>";
    case "Destroyer":
      return "<:Destroyer:1285591709538975785>";
    case "Darksummoner":
      return "<:Darksummoner:1285591679503700053>";
    case "Crusader":
      return "<:Crusader:1285591655528796272>";
    case "Bladedancer":
      return "<:Bladedancer:1285591614181478461>";
    case "Artillery":
      return "<:Artillery:1285591573068775486>";
    case "Adept":
      return "<:Adept:1285591483344224276>";
    case "GearMaster":
      return "<:GearMaster:1285591328490520677>";
    case "ShootingStar":
      return "<:ShootingStar:1285591253978972222>";
    case "Barbarian":
      return "<:Barbarian:1285591155484000423>";
    default:
      break;
  }
}
