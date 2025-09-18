import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, setPage, setSearch } from "./features/contriesSlice";
import {useThrottled} from './hooks/useThrottle'
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { items, status, search, page, perPage } = useSelector(
    (state) => state.countries
  );

  // throttle search
  const throttledSearch = useThrottled(search, 500);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  // search by name OR code (case-insensitive) using debounced value
  const filtered = items.filter(
    (c) =>
      c.name.toLowerCase().includes(throttledSearch.toLowerCase()) ||
      c.code.toLowerCase().includes(throttledSearch.toLowerCase())
  );

  const computedTotal = Math.ceil(filtered.length / perPage);
  const totalPages = computedTotal >= 1 ? computedTotal : 1;

  useEffect(() => {
    if (page > totalPages) dispatch(setPage(1));
  }, [filtered.length, totalPages, page, dispatch]);

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const placeholdersCount = Math.max(0, perPage - paginated.length);

  const goPrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };
  const goNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  return (
    <div className="app-container">
      <h1 className="main-title">
        <span className="emoji">🌍</span> Explore Countries
      </h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search by name or code..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </div>

      {status === "loading" && <p className="status">Loading countries...</p>}
      {status === "failed" && <p className="status error">Failed to fetch countries</p>}

      <div className="flags-wrapper">
        <button
          className="side-btn left"
          onClick={goPrev}
          disabled={page === 1}
        >
          ⬅
        </button>

        <div className="flags-container">
          {filtered.length === 0 && (
            <div className="no-results-overlay">No results found</div>
          )}

          <ul className="flags-grid">
            {paginated.map((c) => (
              <li key={c.code} className="country-card">
                <div className="flag-box">
                  <img
                    src={`https://flagcdn.com/w320/${c.code}.png`}
                    alt={c.name}
                    className="flag"
                    title={c.name}
                  />
                </div>
              </li>

            ))}
            {Array.from({ length: placeholdersCount }).map((_, i) => (
              <li key={`empty-${i}`} className="country-card empty" />
            ))}
          </ul>
        </div>

        <button
          className="side-btn right"
          onClick={goNext}
          disabled={page === totalPages || filtered.length === 0}
        >
          ➡
        </button>
      </div>

      <div className="pagination-info">
        Page {page} of {totalPages} • {filtered.length} results
      </div>
    </div>
  );
}

export default App;
