const nestIcons = (nest: string): string => {
  switch (nest) {
    case "minotaur":
      return "https://i.imgur.com/Ryne4OH.png";
    case "cerberus":
      return "https://i.imgur.com/imq7Y77.png";
    case "manticore":
      return "https://i.imgur.com/xUGPDXF.png";
    case "apocalypse":
      return "https://i.imgur.com/CHGprXc.png";
    case "archbishop":
      return "https://i.imgur.com/tlxVu4k.png";
    case "gigantes":
      return "https://i.imgur.com/cTR7ROt.png";
    case "seadragon":
      return "https://i.imgur.com/Uk0sHJh.png";
    default:
      return "https://i.imgur.com/ulpZNIV.png";
  }
};

export default nestIcons;
