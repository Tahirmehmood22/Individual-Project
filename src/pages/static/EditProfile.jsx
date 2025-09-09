// ...existing code...
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const mockPlayer = {
  name: "Ram Charan Teja",
  age: 9,
  dateOfBirth: "2015-03-15",
  height: "130 cm",
  weight: "28 kg",
  location: "Stockholm, Sweden",
  level: "Rising Star",
  avatar: "https://content.tournamentsoftware.com/images/profile/3C3E88CA-FA0B-43B0-81E3-C5A8BC84F0EF/xlarge/9FB22704-6740-4049-A08B-D394C186C987.jpg?v=20250504153119"
};

const initialState = { ...mockPlayer };

const EditProfile = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/player")
      .then((res) => res.json())
      .then((data) => {
        if (data && Object.keys(data).length) {
          setForm(data);
        } else {
          setForm(initialState);
        }
        setLoading(false);
      })
      .catch(() => {
        setForm(initialState);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.age) newErrors.age = "Age is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!form.location) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
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
  // Only one correct handleSubmit function should exist above. Removed duplicate and misplaced code blocks.

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
  <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded shadow">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>
  <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Edit Profile</h2>
      {loading ? (
  <div className="text-center py-8 text-gray-800 dark:text-gray-200">Loading profile...</div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="height" value={form.height} onChange={handleChange} placeholder="Height" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="level" value={form.level} onChange={handleChange} placeholder="Level" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <input name="avatar" value={form.avatar} onChange={handleChange} placeholder="Avatar URL" className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-zinc-800" />
            <Button type="submit" className="w-full">Save</Button>
          </form>
          <div className="flex justify-between mt-4">
            <Button variant="destructive" onClick={handleDelete}>Delete Profile</Button>
            <Button variant="secondary" onClick={handleCreateNew}>Create New Profile</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProfile;
// ...existing code...


