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
