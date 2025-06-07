document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();

    // Přidání nového dílu
    document.getElementById('todo-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();

        if (!name) {
            alert('Název je povinný');
            return;
        }

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description })
            });
            if (response.ok) {
                document.getElementById('todo-form').reset();
                fetchTodos();
            } else {
                alert('Chyba při přidávání úkolu');
            }
        } catch (error) {
            console.error('Chyba:', error);
        }
    });

    // Delegování událostí pro tlačítka "Smazat" a "Upravit"
    document.getElementById('todo-list').addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('delete-btn')) {
            try {
                await fetch(`/api/items/${id}`, { method: 'DELETE' });
                fetchTodos();
            } catch (err) {
                console.error('Chyba při mazání:', err);
            }
        }

        if (e.target.classList.contains('edit-btn')) {
            try {
                const response = await fetch(`/api/items/${id}`);
                const item = await response.json();
                const newName = prompt('Nový název:', item.name);
                const newDesc = prompt('Nový popis:', item.description || '');
                if (newName !== null) {
                    await fetch(`/api/items/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: newName.trim(), description: newDesc.trim() })
                    });
                    fetchTodos();
                }
            } catch (err) {
                console.error('Chyba při úpravě:', err);
            }
        }
    });
});

// Načíst všechny díly ze serveru
async function fetchTodos() {
    try {
        const response = await fetch('/api/items');
        const todos = await response.json();
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${todo.name}</strong>: ${todo.description || ''}
                <button class="delete-btn" data-id="${todo.id}">Smazat</button>
                <button class="edit-btn" data-id="${todo.id}">Upravit</button>
            `;
            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Chyba při načítání úkolů:', error);
    }
}
