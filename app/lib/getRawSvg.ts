// Find all 'usp' bloks and fetch their SVG content
export const findAndFetchSvgs = async (bloks: any[]) => {
  if (!bloks || !Array.isArray(bloks)) return;

  for (const blok of bloks) {
    // Check if this is the component we're looking for
    if (blok.component === "usp" && blok.icon?.filename) {
      try {
        const svgResponse = await fetch(blok.icon.filename);
        if (svgResponse.ok) {
          // Add the raw SVG content to a new property on the blok
          blok.icon.raw = await svgResponse.text();
        }
      } catch (e) {
        console.error("Failed to fetch SVG:", blok.icon.filename, e);
      }
    }

    // Recursively check for nested bloks (e.g., in columns)
    const nestedBloks = Object.values(blok).find((value) =>
      Array.isArray(value)
    );
    if (nestedBloks) {
      await findAndFetchSvgs(nestedBloks as any[]);
    }
  }
};
