import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("Enter your todo here...");


    const onSubtmitForm = async(e) => {
        // dont refresh after every submit
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //refresh after every todo added
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">
                Pern Todo List
            </h1>
            <form className="d-flex mt-5" onSubmit={onSubtmitForm}>
                <input type="text" 
                className="form-control" 
                value = {description} 
                onChange={e => setDescription(e.target.value)}/>
                <button className="btn btn-success">
                    Add Todo
                </button>
            </form>
        </Fragment>
    )
}

export default InputTodo;