import DisplayTracked from "./DisplayTracked";

function Home({ user }) {
  return (
    <div>
      <DisplayTracked user={user} /> {/* Passing user to DisplayTracked */}
    </div>
  );
}

export default Home;
