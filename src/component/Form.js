import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid"

const Form = ({ input, setInput, todos, setTodos, editTodo, setEditTodo }) => {
    // const onInputChange = (e) => {
    //     setInput(e.target.value);
    // }

    const updateTodo = (id, title, completed) => {
        const newTodos = todos.map((todo) => todo.id === id ? { id, title, completed } : todo);
        setTodos(newTodos);
        setEditTodo("");
    }

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title)
        } else {
            setInput("")
        }
    }, [setInput, editTodo])

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!editTodo) {
            let todo = {
                id: uuidv4(),
                title: input,
                complete: false
            }
            setTodos([...todos, todo])
            setInput("")
        }
        else {
            updateTodo(editTodo.id, input, editTodo.completed)
        }
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                placeholder="Enter a Todo..."
                className="task-input"
                value={input}
                required
                onChange={(e) => setInput(e.target.value)}
            // onChange={(e) => onInputChange()}
            />
            <button className="button-add" type="submit">
                {
                    editTodo ? "OK" : "Add"
                }
            </button>
        </form>
    )
}

export default Form;