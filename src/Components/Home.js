import DisplayTracked from "./DisplayTracked";

function Home({ user }) {
  return (
    <div>
      <h1>Currently Tracked Shows: </h1>
      <DisplayTracked user={user} /> {/* Passing user to DisplayTracked */}
    </div>
  );
}

export default Home;
