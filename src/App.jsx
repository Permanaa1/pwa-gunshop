import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './components/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')
  const [cart, setCart] = useState([])

  const addToCart = (gun) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.name === gun.name
      )

      if (existingItem) {
        return currentCart.map((item) =>
          item.name === gun.name
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...gun,
          quantity: 1,
        },
      ]
    })
  }

  const increaseQuantity = (name) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  const decreaseQuantity = (name) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (name) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.name !== name
      )
    )
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <div className="shell">
      <Header
        tab={tab}
        onTab={setTab}
        cartCount={cartCount}
      />

      <main className="main">
        {tab === 'Catalog' && (
          <Catalog
            onAddToCart={addToCart}
          />
        )}

        {tab === 'About' && <About />}

        {tab === 'Contact' && <Contact />}

        {tab === 'Cart' && (
          <Cart
            cart={cart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App