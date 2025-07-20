export default function timeSomething(startTime: number, label: string) {
  const duration = Date.now() - startTime;
  console.log(`${label} took ${duration}ms`);
}
