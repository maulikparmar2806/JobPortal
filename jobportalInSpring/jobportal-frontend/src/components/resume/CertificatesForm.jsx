// src/components/CertificatesForm.jsx

import React, { useState } from "react";

export const CertificatesForm = ({ onAddCertificate }) => {
  const [name, setName] = useState("");
  const [issuingOrganization, setIssuingOrganization] = useState("");
  const [dateEarned, setDateEarned] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCertificate = { name, issuingOrganization, dateEarned };
    onAddCertificate(newCertificate);
    // Reset form fields
    setName("");
    setIssuingOrganization("");
    setDateEarned("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Certificate Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Issuing Organization:
        <input
          type="text"
          value={issuingOrganization}
          onChange={(e) => setIssuingOrganization(e.target.value)}
          required
        />
      </label>
      <label>
        Date Earned:
        <input
          type="text"
          value={dateEarned}
          onChange={(e) => setDateEarned(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Certificate</button>
    </form>
  );
};
