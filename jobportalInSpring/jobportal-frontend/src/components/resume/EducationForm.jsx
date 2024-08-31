// src/components/EducationForm.jsx

import React, { useState } from "react";

export const EducationForm = ({ onAddEducation }) => {
  const [degree, setDegree] = useState("");
  const [university, setUniversity] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEducation = { degree, university, location, date };
    onAddEducation(newEducation);
    // Reset form fields
    setDegree("");
    setUniversity("");
    setLocation("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Degree:
        <input
          type="text"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
        />
      </label>
      <label>
        University:
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          required
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Education</button>
    </form>
  );
};
