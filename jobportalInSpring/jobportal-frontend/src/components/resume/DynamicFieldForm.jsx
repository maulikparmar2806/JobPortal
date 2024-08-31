// src/components/DynamicFieldForm.jsx

import React, { useState } from "react";

export const DynamicFieldForm = ({ fields, onAddField, onDeleteField }) => {
  const [newField, setNewField] = useState("");

  const handleInputChange = (e) => {
    setNewField(e.target.value);
  };

  const handleAddField = () => {
    if (newField.trim() !== "") {
      onAddField(newField);
      setNewField("");
    }
  };

  return (
    <div className="dynamic-field-form">
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            {field}
            <button type="button" onClick={() => onDeleteField(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="add-field">
        <input
          type="text"
          value={newField}
          onChange={handleInputChange}
          placeholder="Add new field"
        />
        <button type="button" onClick={handleAddField}>
          Add Field
        </button>
      </div>
    </div>
  );
};
