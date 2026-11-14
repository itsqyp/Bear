import { PROTOCOL_VERSION } from "@bear/shared";

export default function Home() {
  return (
    <main>
      <h1>Bear</h1>

      <p>Multiplayer Game Platform</p>

      <p>Protocol Version: {PROTOCOL_VERSION}</p>
    </main>
  );
}
