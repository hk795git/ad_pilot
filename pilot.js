(() => {
  // Condition comes from URL: ?cond=billboard|side-left|side-right|inline|bottom
  const params = new URLSearchParams(window.location.search);
  const cond = params.get("cond");

  const SLOTS = ["billboard", "side-left", "side-right", "inline", "bottom"];
  if (!SLOTS.includes(cond)) {
    console.warn("Missing/invalid cond. Use ?cond=billboard|side-left|side-right|inline|bottom");
    return;
  }

  // CHANGE THESE brand folder names to match your repo folders exactly
  const FOCAL = "Encool"; // focal brand
  const FILLERS = ["Filler1", "Filler2", "Filler3", "Filler4"]; // four filler brands

  const IMG_ID = {
    "billboard": "img-billboard",
    "side-left": "img-side-left",
    "side-right": "img-side-right",
    "inline": "img-inline",
    "bottom": "img-bottom",
  };

  // Slot-specific creative paths (same filenames for every brand)
  function creativePath(brand, slot) {
    if (slot === "billboard") return `images/brands/${brand}/billboard.jpg`;
    if (slot === "side-left" || slot === "side-right") return `images/brands/${brand}/side.jpg`;
    if (slot === "inline") return `images/brands/${brand}/inline.jpg`;
    return `images/brands/${brand}/bottom.jpg`;
  }

  // Assign focal brand to the condition slot; fillers to remaining slots (fixed order)
  const remainingSlots = SLOTS.filter(s => s !== cond);

  const assignment = {};
  assignment[cond] = FOCAL;

  remainingSlots.forEach((slot, i) => {
    assignment[slot] = FILLERS[i];
  });

  // Apply images
  for (const slot of SLOTS) {
    const img = document.getElementById(IMG_ID[slot]);
    if (!img) continue;
    const brand = assignment[slot];
    img.src = creativePath(brand, slot);
    img.setAttribute("data-brand", brand);
    img.setAttribute("data-slot", slot);
  }

  console.log("Pilot condition:", cond, "Assignment:", assignment);
})();
