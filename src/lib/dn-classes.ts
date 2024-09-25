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
      return "/job-icons/Gladiator-icon-new.webp";
    case "Windwalker":
      return "/job-icons/Windwalker-icon-new.webp";
    case "Tempest":
      return "/job-icons/Tempest-icon-new.webp";
    case "SpiritDancer":
      return "/job-icons/Spirit_Dancer_Icon.webp";
    case "Souleater":
      return "/job-icons/Souleater-icon.webp";
    case "Sniper":
      return "/job-icons/Souleater-icon.webp";
    case "Smasher":
      return "/job-icons/Smasher-icon-new.webp";
    case "Saleana":
      return "/job-icons/SaleanaLogo.webp";
    case "Saint":
      return "/job-icons/Saint-icon-new.webp";
    case "Physician":
      return "/job-icons/Physician-icon-new.webp";
    case "Moonlord":
      return "/job-icons/Moonlord-icon-new.webp";
    case "Majesty":
      return "/job-icons/Majesty-icon-new.webp";
    case "Inquisitor":
      return "/job-icons/Inquisitor-icon-new.webp";
    case "Guardian":
      return "/job-icons/Guardian-icon-new.webp";
    case "Elestra":
      return "/job-icons/ElestraIcon.webp";
    case "Destroyer":
      return "/job-icons/Destroyer-icon-new.webp";
    case "Darksummoner":
      return "/job-icons/Darksummoner-icon.webp";
    case "Crusader":
      return "/job-icons/Crusader-icon-new.webp";
    case "Bladedancer":
      return "/job-icons/Bladedancer-icon.webp";
    case "Artillery":
      return "/job-icons/Artillery-icon-new.webp";
    case "Adept":
      return "/job-icons/Adept-icon-new.webp";
    case "GearMaster":
      return "/job-icons/43px-Gear_Master_Icon.webp";
    case "ShootingStar":
      return "/job-icons/39px-Shooting_Star_Icon.webp";
    case "Barbarian":
      return "/job-icons/Barbarian-icon-new.webp";
    default:
      break;
  }
}
