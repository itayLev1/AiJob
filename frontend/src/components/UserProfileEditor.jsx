import { useEffect, useState } from 'react';

export default function UserProfileEditor() {
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    techStack: [],
    experience: '',
    remote: true
  });

  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    fetch('/api/agents/user')
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTech = () => {
    if (newTech.trim()) {
      setProfile(prev => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTech = (tech) => {
    setProfile(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const saveProfile = () => {
    fetch('/api/agents/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
      .then(res => res.json())
      .then(() => alert(`Profile updated successfully`));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>🧠 User Profile</h2>
      <label>Name: <input name="name" value={profile.name} onChange={handleChange} /></label><br />
      <label>Location: <input name="location" value={profile.location} onChange={handleChange} /></label><br />
      <label>Experience:
        <select name="experience" value={profile.experience} onChange={handleChange}>
          <option value="">Select</option>
          <option>Junior</option>
          <option>Mid</option>
          <option>Senior</option>
        </select>
      </label><br />
      <label>
        Remote?
        <input type="checkbox" name="remote" checked={profile.remote} onChange={handleChange} />
      </label><br />

      <div>
        <label>Add Tech:</label>
        <input value={newTech} onChange={(e) => setNewTech(e.target.value)} />
        <button onClick={addTech}>Add</button>
        <div>
          {profile.techStack.map((t, i) => (
            <span key={i} style={{ marginRight: 10 }}>
              {t} <button onClick={() => removeTech(t)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <button onClick={saveProfile} style={{ marginTop: 20 }}>Save Profile</button>
    </div>
  );
}
