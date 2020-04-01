export default function imageExists(
  src: string,
  callback: (exists: boolean) => void
): void {
  const checks: any = {};

  if (src in checks) {
    return callback(checks[src]);
  }

  const image = new Image();

  image.onload = (): void => {
    checks[src] = true;
    callback(true);
  };

  image.onerror = (): void => {
    checks[src] = false;
    callback(false);
  };

  image.src = src;
}
