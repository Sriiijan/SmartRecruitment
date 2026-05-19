import { Search } from "lucide-react";

function JobSearchBar({
  query,
  setQuery,
  handleSearch,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="flex gap-4 mt-10"
    >

      <div className="flex-1 flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-5">

        <Search className="text-slate-400" />

        <input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none px-4 py-4 text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 rounded-2xl text-white font-semibold"
      >
        Search
      </button>

    </form>
  );
}

export default JobSearchBar;