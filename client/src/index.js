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
  const [filterData, setFilterData] = useState({});

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

  const fetchFilteredChampions = async () => {
    const params = new URLSearchParams(filterData).toString();
    const response = await fetch(`/api/filter_champions?${params}`);
    const data = await response.json();
    setChampions(data);
  };

  return (
    <div>
      <h1>Champion Management</h1>
      <h3>Add Champion</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <select name="class_type" value={formData.class_type} onChange={handleChange} required>
          <option value="">Select Class Type</option>
          <option value="Enchanter">Enchanter</option>
          <option value="Catcher">Catcher</option>
          <option value="Juggernaut">Juggernaut</option>
          <option value="Diver">Diver</option>
          <option value="Burst">Burst</option>
          <option value="Battlemage">Battlemage</option>
          <option value="Artillery">Artillery</option>
          <option value="Marksman">Marksman</option>
          <option value="Assassin">Assassin</option>
          <option value="Skirmishers">Skirmishers</option>
          <option value="Vanguard">Vanguard</option>
          <option value="Warden">Warden</option>
          <option value="Specialist">Specialist</option>
        </select>
        <input type="text" name="range_type" value={formData.range_type} onChange={handleChange} placeholder="Range Type" required />
        <input type="text" name="resource" value={formData.resource} onChange={handleChange} placeholder="Resource" required />
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
        <select name="region" value={formData.region} onChange={handleChange} required>
          <option value="">Select Region</option>
          <option value="Bandle City">Bandle City</option>
          <option value="Bilgewater">Bilgewater</option>
          <option value="Demacia">Demacia</option>
          <option value="Ionia">Ionia</option>
          <option value="Ixtal">Ixtal</option>
          <option value="Noxus">Noxus</option>
          <option value="Piltover">Piltover</option>
          <option value="Shadow Isles">Shadow Isles</option>
          <option value="Shurima">Shurima</option>
          <option value="Targon">Targon</option>
          <option value="The Freljord">The Freljord</option>
          <option value="The Void">The Void</option>
          <option value="Zaun">Zaun</option>
        </select>
        <button type="submit">{editingId ? 'Update Champion' : 'Add Champion'}</button>
      </form>

      <h3>Filter Champions</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchFilteredChampions();
        }}
      >
        <input
          type="text"
          name="filter_name"
          placeholder="Filter by Name"
          value={filterData.filter_name || ""}
          onChange={(e) => setFilterData({ ...filterData, filter_name: e.target.value })}
        />

        <select
          name="filter_class"
          value={filterData.filter_class || ""}
          onChange={(e) => setFilterData({ ...filterData, filter_class: e.target.value })}
        >
          <option value="">Filter by Class</option>
          <option value="Enchanter">Enchanter</option>
          <option value="Catcher">Catcher</option>
          <option value="Juggernaut">Juggernaut</option>
          <option value="Diver">Diver</option>
          <option value="Burst">Burst</option>
          <option value="Battlemage">Battlemage</option>
          <option value="Artillery">Artillery</option>
          <option value="Marksman">Marksman</option>
          <option value="Assassin">Assassin</option>
          <option value="Skirmishers">Skirmishers</option>
          <option value="Vanguard">Vanguard</option>
          <option value="Warden">Warden</option>
          <option value="Specialist">Specialist</option>
        </select>

        <select
          name="filter_region"
          value={filterData.filter_region || ""}
          onChange={(e) => setFilterData({ ...filterData, filter_region: e.target.value })}
        >
          <option value="">Filter by Region</option>
          <option value="Bandle City">Bandle City</option>
          <option value="Bilgewater">Bilgewater</option>
          <option value="Demacia">Demacia</option>
          <option value="Ionia">Ionia</option>
          <option value="Ixtal">Ixtal</option>
          <option value="Noxus">Noxus</option>
          <option value="Piltover">Piltover</option>
          <option value="Shadow Isles">Shadow Isles</option>
          <option value="Shurima">Shurima</option>
          <option value="Targon">Targon</option>
          <option value="The Freljord">The Freljord</option>
          <option value="The Void">The Void</option>
          <option value="Zaun">Zaun</option>
        </select>

        <button type="submit">Apply Filters</button>
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
