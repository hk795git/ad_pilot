(() => {
  // ---------------------------------------
  // READ CONDITION FROM URL
  // ---------------------------------------
  // Expected: ?cond=billboard | side-left | side-right | inline | bottom
  const params = new URLSearchParams(window.location.search);
  const cond = params.get("cond");

  const SLOTS = ["billboard", "side-left", "side-right", "inline", "bottom"];

  if (!SLOTS.includes(cond)) {
    console.warn(
      "Invalid or missing condition. Use ?cond=billboard|side-left|side-right|inline|bottom"
    );
    return;
  }

  // ---------------------------------------
  // BRAND SETUP (EDIT THESE NAMES ONLY)
  // ---------------------------------------
  // Folder names must match exactly (case-sensitive)
  const FOCAL = "Encool"; // focal brand
  const FILLERS = ["Filler1", "Filler2", "Filler3", "Filler4"]; // filler brands

  // ---------------------------------------
  // MAP SLOT -> IMAGE ELEMENT ID
  // ---------------------------------------
  const IMG_ID = {
    "billboard": "img-billboard",
    "side-left": "img-side-left",
    "side-right": "img-side-right",
    "inline": "img-inline",
    "bottom": "img-bottom",
  };

  // ---------------------------------------
  // SLOT-SPECIFIC CREATIVE PATHS
  // ---------------------------------------
  function creativePath(brand, slot) {
    if (slot === "billboard") {
      return `images/brands/${brand}/billboard.jpg`;
    }
    if (slot === "side-left") {
      return `images/brands/${brand}/side-left.jpg`;
    }
    if (slot === "side-right") {
      return `images/brands/${brand}/side-right.jpg`;
    }
    if (slot === "inline") {
      return `images/brands/${brand}/inline.jpg`;
    }
    return `images/brands/${brand}/bottom.jpg`;
  }

  // ---------------------------------------
  // ASSIGN BRANDS TO SLOTS
  // ---------------------------------------
  // Focal brand goes in the condition slot
  // Fillers go in remaining slots (fixed order)
  const remainingSlots = SLOTS.filter(slot => slot !== cond);

  const assignment = {};
  assignment[cond] = FOCAL;

  remainingSlots.forEach((slot, i) => {
    assignment[slot] = FILLERS[i];
  });

  // ---------------------------------------
  // APPLY IMAGES TO PAGE
  // ---------------------------------------
  SLOTS.forEach(slot => {
    const img = document.getElementById(IMG_ID[slot]);
    if (!img) return;

    const brand = assignment[slot];
    img.src = creativePath(brand, slot);
    img.setAttribute("data-brand", brand);
    img.setAttribute("data-slot", slot);
  });

  // ---------------------------------------
  // DEBUG LOG (REMOVE FOR FINAL RUN IF NEEDED)
  // ---------------------------------------
  console.log("Pilot condition:", cond);
  console.log("Ad assignment:", assignment);
})();
