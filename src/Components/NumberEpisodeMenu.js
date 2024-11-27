export default function NumberEpisodeMenu({ currentEpisode, episodeCount }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value=""
        onChange=""
        className="w-12 text-center border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:ring-blue-300"
        placeholder={currentEpisode}
      />
      <span>/ {episodeCount} </span>
    </div>
  );
}
