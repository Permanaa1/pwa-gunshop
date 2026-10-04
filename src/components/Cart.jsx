function Cart({ cart, onIncrease, onDecrease, onRemove }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="cart">
      <div className="cart-header">
        <h2 className="display">Shopping Cart</h2>
      </div>

      {cart.length === 0 ? (
        <p className="cart-empty">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <div className="cart-item-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />

                  <div>
                    <h3>{item.name}</h3>

                    <p>
                      ${item.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <button
                    onClick={() => onDecrease(item.name)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => onIncrease(item.name)}
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.name)}
                  >
                    Remove
                  </button>
                </div>

                <strong>
                  ${(item.price * item.quantity).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>${total.toLocaleString()}</strong>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart