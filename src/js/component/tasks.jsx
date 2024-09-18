import React, { useState } from "react";

const Task = ({ task, onRemove }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="d-flex justify-content-between border p m-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>   
            <p className="">{task?.label}</p>
            {isHovered && (
                <span onClick={onRemove}>
                    <button className="bg-transparent border-0">X</button>
                </span>
            )}
        </div>
    );
}

export default Task;