export default function getStoryblokComponents() {
  const modules = import.meta.glob("../storyblok/**/*.tsx", {
    eager: true,
  });

  const components: Record<string, any> = {};
  Object.entries(modules).forEach(([path, module]) => {
    const fileName = path.split("/").pop()?.replace(".tsx", "") || "";
    const componentName = fileName
      .replace(/([A-Z])/g, "_$1")
      .toLowerCase()
      .replace(/^_/, "");

    components[componentName] = (module as any).default;
  });

  return components;
}
