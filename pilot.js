(() => {
  // ---------------------------------------
  // READ PARAMS FROM URL
  // ---------------------------------------
  // cond: billboard | side-left | side-right | inline | bottom
  // set:  A | B   (defaults to A if missing)
  const params = new URLSearchParams(window.location.search);
  const cond = params.get("cond");
  const set = (params.get("set") || "A").toUpperCase();

  const SLOTS = ["billboard", "side-left", "side-right", "inline", "bottom"];

  if (!SLOTS.includes(cond)) {
    console.warn(
      "Invalid or missing condition. Use ?cond=billboard|side-left|side-right|inline|bottom"
    );
    return;
  }

  if (!["A", "B"].includes(set)) {
    console.warn("Invalid set. Use ?set=A or ?set=B");
    return;
  }

// ---------------------------------------
// BRAND SETUP (EDIT THESE NAMES ONLY)
// ---------------------------------------
// Folder names must match exactly (case-sensitive)
const SETS = {
  A: {
    focal: "Encool",
    fillers: ["Vivoxy", "Mijiro", "Soliva", "Nuniva"],
  },
  B: {
    focal: "McDonalds",
    fillers: ["KFC", "Wendys", "Chilis", "Jack"],
  },
};

const FOCAL = SETS[set].focal;
const FILLERS = SETS[set].fillers;


  // ---------------------------------------
  // MAP SLOT -> IMAGE ELEMENT ID
  // ---------------------------------------
  const IMG_ID = {
    billboard: "img-billboard",
    "side-left": "img-side-left",
    "side-right": "img-side-right",
    inline: "img-inline",
    bottom: "img-bottom",
  };

  // ---------------------------------------
  // CREATIVE PATHS
  // ---------------------------------------
  function creativePath(brand, slot, set) {
    // Set B: one square image used for all slots
    if (set === "B") {
      return `images/brands/${brand}/ad.jpg`;
    }

    // Set A: slot-specific creatives
    if (slot === "billboard") return `images/brands/${brand}/billboard.jpg`;
    if (slot === "side-left") return `images/brands/${brand}/side-left.jpg`;
    if (slot === "side-right") return `images/brands/${brand}/side-right.jpg`;
    if (slot === "inline") return `images/brands/${brand}/inline.jpg`;
    return `images/brands/${brand}/bottom.jpg`;
  }

  // ---------------------------------------
  // ASSIGN BRANDS TO SLOTS
  // ---------------------------------------
  const remainingSlots = SLOTS.filter((slot) => slot !== cond);

  const assignment = {};
  assignment[cond] = FOCAL;

  remainingSlots.forEach((slot, i) => {
    assignment[slot] = FILLERS[i];
  });

  // ---------------------------------------
  // APPLY IMAGES
  // ---------------------------------------
  SLOTS.forEach((slot) => {
    const img = document.getElementById(IMG_ID[slot]);
    if (!img) return;

    const brand = assignment[slot];
    img.src = creativePath(brand, slot, set);
    img.setAttribute("data-brand", brand);
    img.setAttribute("data-slot", slot);
    img.setAttribute("data-set", set);
  });

  console.log("Set:", set, "Condition:", cond);
  console.log("Ad assignment:", assignment);
})();
