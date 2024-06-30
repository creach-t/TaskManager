import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskManager.css';

function TaskManager() {
    // State pour gérer les tâches, le titre de la nouvelle tâche, le titre en cours d'édition, l'ID de la tâche en cours d'édition et les erreurs
    const [tasks, setTasks] = useState([]); // Liste des tâches
    const [title, setTitle] = useState(''); // Titre de la nouvelle tâche
    const [editTitle, setEditTitle] = useState(''); // Titre en cours d'édition
    const [editingTaskId, setEditingTaskId] = useState(null); // ID de la tâche en cours d'édition (ou null)
    const [error, setError] = useState(null); // Erreur

    // Utilisation de useEffect pour charger les tâches initiales au chargement du composant
    useEffect(() => {
        fetchTasks(); // Appel à la fonction fetchTasks pour récupérer les tâches depuis l'API
    }, []);

    // Fonction pour récupérer les tâches depuis l'API
    const fetchTasks = () => {
        axios.get('http://localhost:8000/api/tasks/')
            .then(response => setTasks(response.data)) // Met à jour l'état 'tasks' avec les données récupérées depuis l'API
            .catch(error => {
                console.error('There was an error fetching the tasks!', error); // Affiche une erreur en cas d'échec
                setError('There was an error fetching the tasks!'); // Met à jour l'état 'error' avec un message d'erreur
            });
    };

    // Fonction pour marquer une tâche comme complétée ou non
    const handleComplete = (id, completed) => {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, completed } : task); // Met à jour l'état 'tasks' avec la tâche modifiée
        setTasks(updatedTasks); 

        axios.patch(`http://localhost:8000/api/tasks/${id}/`, { completed })
            .then(() => fetchTasks()) // Met à jour les tâches après la modification sur l'API
            .catch(error => {
                console.error('There was an error updating the task!', error); // Affiche une erreur en cas d'échec
                setError('There was an error updating the task!'); // Met à jour l'état 'error' avec un message d'erreur
                // Rétablit l'état précédent en cas d'échec de la mise à jour sur l'API
                setTasks(tasks.map(task => task.id === id ? { ...task, completed: !completed } : task));
            });
    };

    // Fonction pour supprimer une tâche
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/tasks/${id}/`)
            .then(() => fetchTasks()) // Met à jour les tâches après la suppression sur l'API
            .catch(error => {
                console.error('There was an error deleting the task!', error); // Affiche une erreur en cas d'échec
                setError('There was an error deleting the task!'); // Met à jour l'état 'error' avec un message d'erreur
            });
    };

    // Fonction pour soumettre le formulaire et ajouter une nouvelle tâche
    const handleSubmit = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        axios.post('http://localhost:8000/api/tasks/', { title, completed: false })
            .then(() => {
                setTitle(''); // Réinitialise le champ de saisie du titre
                fetchTasks(); // Met à jour les tâches après l'ajout sur l'API
            })
            .catch(error => console.error('There was an error!', error)); // Affiche une erreur en cas d'échec
    };

    // Fonction pour commencer l'édition d'une tâche
    const handleEdit = (id, title) => {
        setEditingTaskId(id); // Définit l'ID de la tâche en cours d'édition
        setEditTitle(title); // Met à jour le titre en cours d'édition
    };

    // Fonction pour mettre à jour une tâche après édition
    const handleUpdate = (id) => {
        axios.patch(`http://localhost:8000/api/tasks/${id}/`, { title: editTitle })
            .then(() => {
                setEditingTaskId(null); // Réinitialise l'ID de la tâche en cours d'édition
                setEditTitle(''); // Réinitialise le titre en cours d'édition
                fetchTasks(); // Met à jour les tâches après la modification sur l'API
            })
            .catch(error => {
                console.error('There was an error updating the task!', error); // Affiche une erreur en cas d'échec
                setError('There was an error updating the task!'); // Met à jour l'état 'error' avec un message d'erreur
            });
    };

    // Rendu du composant TaskManager
    return (
        <div className="container">
            <h1>Liste des tâches</h1>
            {error && <p>{error}</p>} {/* Affiche un message d'erreur s'il y a une erreur */}

            {/* Formulaire pour ajouter une nouvelle tâche */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Nouvelle tâche"
                />
                <button type="submit">➕</button>
            </form>

            {/* Liste des tâches */}
            <ul>
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${editingTaskId === task.id ? 'editing' : ''}`}>
                        {/* Contenu de la tâche */}
                        <div className="task-content" onClick={() => {
                            if (editingTaskId !== task.id) {
                                handleComplete(task.id, !task.completed); // Marque la tâche comme complétée ou non
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
                        {/* Actions sur la tâche */}
                        <div className="task-actions">
                            {editingTaskId === task.id ? (
                                // Affiche les champs d'édition si la tâche est en cours d'édition
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
                                // Affiche les boutons d'édition et de suppression sinon
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
