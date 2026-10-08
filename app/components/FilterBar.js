export default function FilterBar({ categories, selectedCategory, onSelect }) {
  return (
    <section className="filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-chip ${selectedCategory === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}
