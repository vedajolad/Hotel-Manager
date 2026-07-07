// frontend/apiDemo/src/App.jsx

import { useState, useEffect } from "react";
import "./App.css";

const API = "http://localhost:5000/customers";

export default function App() {
  // Form State
  const [form, setForm] = useState({
    id: "",
    name: "",
    address: "",
    date: "",
    gender: "",
    phone: "",
  });

  // Other States
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [dark, setDark] = useState(false);

  // Load Customers
  const loadCustomers = async () => {
    setLoading(true);

    const res = await fetch(`${API}?page=${page}&search=${search}`);
    const data = await res.json();

    setCustomers(data.data);
    setTotalPages(data.totalPages);
    setLastUpdated(new Date().toLocaleString());
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  // Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save / Update
  const saveCustomer = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone) {
      setError("Name and Phone are required.");
      return;
    }

    const url = form.id ? `${API}/${form.id}` : API;
    const method = form.id ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await res.json();

    if (!res.ok) {
      setError(result.message);
      return;
    }

    setForm({
      id: "",
      name: "",
      address: "",
      date: "",
      gender: "",
      phone: "",
    });

    loadCustomers();
  };

  // Edit
  const editCustomer = (c) => {
    setForm(c);
  };

  // Delete
  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete Customer?")) return;

    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    loadCustomers();
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <h1>🏨 Hotel Manager</h1>

      <button onClick={() => setDark(!dark)}>
        {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Registration Form */}
      <form className="form" onSubmit={saveCustomer}>

        <input
          name="name"
          placeholder="Customer Name"
          maxLength="40"
          value={form.name}
          onChange={handleChange}
        />
        <small>{form.name.length}/40</small>

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {form.id ? "Update Customer" : "Register Customer"}
        </button>

      </form>

      <hr />

      <h2>
        Customers
        <span> (Last Updated: {lastUpdated})</span>
      </h2>

      {/* Search */}
      <input
        placeholder="Search Customer..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* Customer List */}
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        customers.map((c) => (
          <div className="card" key={c.id}>

            <div className="avatar">
              {c.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .toUpperCase()}
            </div>

            <div className="details">
              <h3>{c.name}</h3>
              <p>{c.address}</p>
              <p>{c.gender}</p>
              <p>{c.phone}</p>
              <small>{c.registered_at}</small>
            </div>

            <div>
              <button onClick={() => editCustomer(c)}>
                Edit
              </button>

              <button
                className="delete"
                onClick={() => deleteCustomer(c.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))
      )}

      {/* Pagination */}
      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
}