import { useState } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

function Catalog({ onAddToCart }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  const filteredGuns = GUNS
    .filter((gun) => {
      const matchesSearch = gun.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const matchesType =
        typeFilter === 'All' || gun.type === typeFilter

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.localeCompare(b.name)

        return sortOrder === 'asc'
          ? comparison
          : -comparison
      }

      const comparison = a.price - b.price

      return sortOrder === 'asc'
        ? comparison
        : -comparison
    })

  const handleSort = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(type)
      setSortOrder('asc')
    }
  }

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>

        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed
          with its type, caliber, and price — nothing else.
        </p>
      </section>

      {/* SEARCH & FILTER */}
      <section className="catalog-controls">
        <div className="search-box">
          <label htmlFor="search">Search product</label>

          <input
            id="search"
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <label htmlFor="type">Filter by type</label>

          <select
            id="type"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pistol">Pistol</option>
            <option value="Rifle">Rifle</option>
            <option value="Shotgun">Shotgun</option>
          </select>
        </div>
      </section>

      {/* SORTING */}
      <section className="sort-controls">
        <span className="sort-label">Sort by:</span>

        <button
          className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
          onClick={() => handleSort('name')}
        >
          Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>

        <button
          className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
          onClick={() => handleSort('price')}
        >
          Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </section>

      <section>
        <div className="list-head">
          <h2>Current stock</h2>

          <span className="count">
            {filteredGuns.length} pieces
          </span>
        </div>

        {filteredGuns.length > 0 ? (
          <ul className="stock">
            {filteredGuns.map((gun) => (
              <GunCard
                key={gun.name}
                gun={gun}
                onAddToCart={onAddToCart}
              />
            ))}
          </ul>
        ) : (
          <p className="empty-result">
            No products found.
          </p>
        )}
      </section>
    </>
  )
}

export default Catalog