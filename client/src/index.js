import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [champions, setChampions] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    class_type: '',
    range_type: '',
    resource: '',
    release_date: '',
    region: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchChampions();
  }, []);

  const fetchChampions = async () => {
    try {
      const response = await fetch('/api/champions');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const textResponse = await response.text();
      console.log("Raw Response:", textResponse);
  
      const data = textResponse ? JSON.parse(textResponse) : [];
      setChampions(data);
    } catch (error) {
      console.error("Error fetching champions:", error);
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData, "Editing ID:", editingId);
    
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/champions/${editingId}` : '/api/champions';
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      fetchChampions();
      setFormData({ name: '', class_type: '', range_type: '', resource: '', release_date: '', region: '' });
      setEditingId(null);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };
  

  const handleEdit = (champion) => {
    console.log("Editing champion:", champion);
    setFormData({
      name: champion.name,
      class_type: champion.class_type,
      range_type: champion.range_type,
      resource: champion.resource,
      release_date: champion.release_date,
      region: champion.region
    });
    setEditingId(champion.champion_id);
  };

  const handleDelete = async (champion_id) => {
    await fetch(`/api/champions/${champion_id}`, { method: 'DELETE' });
    fetchChampions();
  };

  return (
    <div>
      <h1>Champion Management</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="class_type" value={formData.class_type} onChange={handleChange} placeholder="Class Type" required />
        <input type="text" name="range_type" value={formData.range_type} onChange={handleChange} placeholder="Range Type" required />
        <input type="text" name="resource" value={formData.resource} onChange={handleChange} placeholder="Resource" required />
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
        <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Region" required />
        <button type="submit">{editingId ? 'Update Champion' : 'Add Champion'}</button>
      </form>

      <h2>Champion List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class Type</th>
            <th>Range Type</th>
            <th>Resource</th>
            <th>Release Date</th>
            <th>Region</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champion) => (
            <tr key={champion.champion_id}>
              <td>{champion.champion_id}</td>
              <td>{champion.name}</td>
              <td>{champion.class_type}</td>
              <td>{champion.range_type}</td>
              <td>{champion.resource}</td>
              <td>{champion.release_date}</td>
              <td>{champion.region}</td>
              <td>
                <button onClick={() => handleEdit(champion)}>Edit</button>
                <button onClick={() => handleDelete(champion.champion_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
