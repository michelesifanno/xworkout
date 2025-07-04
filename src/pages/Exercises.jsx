import DebounceSearch from "../components/app/DebounceSearch";

export default function Exercises() {
  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "1rem 0" }}>
        Aggiungi un esercizio al tuo piano
      </h2>
      <DebounceSearch />
    </div>
  );
}
