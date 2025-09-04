import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const initialState = {
  name: '',
  age: '',
  dateOfBirth: '',
  height: '',
  weight: '',
  location: '',
  level: '',
  avatar: '',
};

const EditProfile = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/player")
      .then((res) => res.json())
      .then((data) => setForm(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/player", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Profile updated!");
        navigate("/", { replace: true });
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      alert("Error updating profile.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      const res = await fetch("http://localhost:4000/api/player", { method: "DELETE" });
      if (res.ok) {
        alert("Profile deleted!");
        navigate("/", { replace: true });
      } else {
        alert("Failed to delete profile.");
      }
    }
  };

  const handleCreateNew = async () => {
    const newProfile = initialState;
    const res = await fetch("http://localhost:4000/api/player", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProfile),
    });
    if (res.ok) {
      alert("New profile created!");
      setForm(newProfile);
    } else {
      alert("Failed to create new profile.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded" />
        <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="w-full p-2 border rounded" />
        <input name="height" value={form.height} onChange={handleChange} placeholder="Height" className="w-full p-2 border rounded" />
        <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" className="w-full p-2 border rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
        <input name="level" value={form.level} onChange={handleChange} placeholder="Level" className="w-full p-2 border rounded" />
        <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL" className="w-full p-2 border rounded" />
        <Button type="submit" className="w-full">Save</Button>
      </form>
      <div className="flex justify-between mt-4">
        <Button variant="destructive" onClick={handleDelete}>Delete Profile</Button>
        <Button variant="secondary" onClick={handleCreateNew}>Create New Profile</Button>
      </div>
    </div>
  );
};

export default EditProfile;


