import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Стейти для форми
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [totalEndings, setTotalEndings] = useState('');
  const [editingId, setEditingId] = useState(null);

  // 1. Завантаження ігор
  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/games');
      if (!response.ok) throw new Error('Помилка сервера');
      const data = await response.json();
      setGames(data);
      setError(null);
    } catch (err) {
      setError('Не вдалося підключитися до бази. Перевір, чи працює бекенд!');
    } finally {
      setLoading(false);
    }
  };

  // 2. Збереження або редагування гри
  const handleSubmit = async (e) => {
    e.preventDefault();
    const gameData = { title, genre, totalEndings: Number(totalEndings) };

    try {
      if (editingId) {
        await fetch(`http://localhost:3000/games/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gameData)
        });
        setEditingId(null);
      } else {
        await fetch('http://localhost:3000/games', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(gameData)
        });
      }
      
      setTitle(''); setGenre(''); setTotalEndings('');
      fetchGames();
    } catch (err) {
      setError('Помилка при збереженні гри');
    }
  };

  // 3. Видалення гри
  const handleDelete = async (id) => {
    if (!window.confirm('Ти впевнений, що хочеш назавжди видалити цю гру?')) return;
    try {
      await fetch(`http://localhost:3000/games/${id}`, { method: 'DELETE' });
      fetchGames();
    } catch (err) {
      setError('Помилка при видаленні');
    }
  };

  // Підготовка форми до редагування
  const handleEdit = (game) => {
    setEditingId(game.id);
    setTitle(game.title);
    setGenre(game.genre);
    setTotalEndings(game.totalEndings);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎮 Game Log Tracker</h1>
        <p>Керуй своєю колекцією та кінцівками</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="main-content">
        <section className="form-section">
          <h2>{editingId ? '✏️ Редагувати гру' : '➕ Додати нову гру'}</h2>
          <form onSubmit={handleSubmit} className="game-form">
            <input 
              type="text" 
              placeholder="Назва гри (напр. The Stanley Parable)" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
            <input 
              type="text" 
              placeholder="Жанр (напр. Adventure)" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)} 
              required 
            />
            <input 
              type="number" 
              placeholder="Кількість кінцівок" 
              value={totalEndings} 
              onChange={(e) => setTotalEndings(e.target.value)} 
              required 
            />
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Зберегти зміни' : 'Додати гру'}
              </button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={() => {
                  setEditingId(null); setTitle(''); setGenre(''); setTotalEndings('');
                }}>
                  Скасувати
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="list-section">
          <h2>Твоя бібліотека</h2>
          {loading ? (
            <div className="loading">⏳ Завантаження бази даних...</div>
          ) : games.length === 0 ? (
            <div className="empty-state">У базі поки немає ігор. Додай першу!</div>
          ) : (
            <div className="games-grid">
              {games.map(game => (
                <div key={game.id} className="game-card">
                  <div className="game-info">
                    <h3>{game.title}</h3>
                    <span className="badge">{game.genre}</span>
                    <p>Кінцівок відкрито: <strong>{game.endings?.length || 0}</strong> з <strong>{game.totalEndings}</strong></p>
                  </div>
                  <div className="game-actions">
                    <button onClick={() => handleEdit(game)} className="btn-edit">✏️</button>
                    <button onClick={() => handleDelete(game.id)} className="btn-delete">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;