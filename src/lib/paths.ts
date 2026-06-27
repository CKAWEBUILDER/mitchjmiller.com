const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function publicPath(path: string) {
  return `${basePath}${path}`;
}
