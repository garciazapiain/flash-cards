import React, { useEffect, useState } from "react"
import './App.css';
import Home from './Home/Home'
import { Index } from './Deck/index'
import { Routes, Route } from "react-router-dom";
import { getCards } from "./api"

function App() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  useEffect(() => {
    async function loadCards() {
      setLoading(true)
      try {
        const data = await getCards()
        setCards(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadCards()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home cards={cards} />} /> {/* 👈 Renders at /app/ */}
      <Route path="/deck/:id" element={<Index />} /> {/* Render DeckView for /deck/:id */}
    </Routes>
  );
}

export default App;
