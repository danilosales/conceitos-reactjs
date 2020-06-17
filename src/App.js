import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  function removeRepositoryFromList(id) {
    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository teste ${Date.now()}`,
      url: 'http://www.github.com',
      techs: ['Javascript', 'Python']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status !== 204) {
      console.log('There is an error to remove item');
    }
    removeRepositoryFromList(id);
  }
  

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
