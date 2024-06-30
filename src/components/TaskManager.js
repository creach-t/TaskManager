import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskManager.css'; // Importer le fichier CSS pour les styles

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('http://localhost:8000/api/tasks/')
            .then(response => setTasks(response.data))
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
                setError('There was an error fetching the tasks!');
            });
    };

    const handleComplete = (id, completed) => {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed } : task);
        setTasks(updatedTasks);

        axios.patch(`http://localhost:8000/api/tasks/${id}/`, { completed })
            .then(() => fetchTasks())
            .catch(error => {
                console.error('There was an error updating the task!', error);
                setError('There was an error updating the task!');
                setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/tasks/${id}/`)
            .then(() => fetchTasks())
            .catch(error => {
                console.error('There was an error deleting the task!', error);
                setError('There was an error deleting the task!');
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/tasks/', { title, completed: false })
            .then(() => {
                setTitle('');
                fetchTasks();
            })
            .catch(error => console.error('There was an error!', error));
    };

    const handleEdit = (id, title) => {
        setEditingTaskId(id);
        setEditTitle(title);
    };

    const handleUpdate = (id) => {
        axios.patch(`http://localhost:8000/api/tasks/${id}/`, { title: editTitle })
            .then(() => {
                setEditingTaskId(null);
                setEditTitle('');
                fetchTasks();
            })
            .catch(error => {
                console.error('There was an error updating the task!', error);
                setError('There was an error updating the task!');
            });
    };

    return (
        <div className="container">
            <h1>Liste des tâches</h1>
            {error && <p>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Nouvelle tâche"
                />
                <button type="submit">➕</button>
            </form>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${editingTaskId === task.id ? 'editing' : ''}`}>
                        <div className="task-content" onClick={() => {
                            if (editingTaskId !== task.id) {
                                handleComplete(task.id, !task.completed);
                            }
                        }}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                readOnly
                                className="task-checkbox"
                                style={{ display: editingTaskId === task.id ? 'none' : 'inline-block' }}
                            />
                            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                                {task.title}
                            </span>
                        </div>
                        <div className="task-actions">
                            {editingTaskId === task.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                    />
                                    <button className="save-button" onClick={() => handleUpdate(task.id)}>💾</button>
                                    <button className="delete-button" onClick={() => setEditingTaskId(null)}>❌</button>
                                </>
                            ) : (
                                <>
                                    <button className="edit-button" onClick={() => handleEdit(task.id, task.title)}>🖊️</button>
                                    <button className="delete-button" onClick={() => handleDelete(task.id)}>❌</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskManager;
