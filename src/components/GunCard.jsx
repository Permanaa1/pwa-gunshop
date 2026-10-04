import { useRef } from 'react'

function GunCard({ gun, onAddToCart }) {
  const popup = useRef(null)

  return (
    <li className="card">
      <button
        className="card-btn"
        onClick={() => popup.current?.showModal()}
      >
        <div className="card-img-wrap">
          <img
            className="card-img"
            src={gun.image}
            alt={gun.name}
          />
        </div>

        <span className="name display">
          {gun.name}
        </span>

        <span className="type">
          {gun.type} · {gun.caliber}
        </span>

        <span className="price">
          ${gun.price.toLocaleString()}
        </span>
      </button>

      {/* ADD TO CART */}
      <button
        className="add-cart-btn"
        onClick={() => onAddToCart(gun)}
      >
        Add to Cart
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) =>
          e.target === popup.current &&
          popup.current.close()
        }
      >
        <div className="popup-img-wrap">
          <img
            className="popup-img"
            src={gun.image}
            alt={gun.name}
          />
        </div>

        <h3 className="display">
          {gun.name}
        </h3>

        <p className="type">
          {gun.type} · {gun.caliber} ·{' '}
          <span className="price">
            ${gun.price.toLocaleString()}
          </span>
        </p>

        <p>{gun.description}</p>

        <form method="dialog">
          <button className="popup-close">
            Close
          </button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard