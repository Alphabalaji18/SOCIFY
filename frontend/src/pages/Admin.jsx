import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "", gender: "", phNo: "" });
  const [feedbackData, setFeedbackData] = useState({});
  const correctPassword = "Balaji18@";

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    const feedback = JSON.parse(localStorage.getItem("feedback")) || {};
    setEmployees(storedEmployees);
    setFeedbackData(feedback);
  }, []);

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmployee = { ...formData, id: Date.now() };
    const updated = [...employees, newEmployee];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
    setFormData({ name: "", age: "", gender: "", phNo: "" });
  };

  const handleRemoveEmployee = (id) => {
    const updated = employees.filter((emp) => emp.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-indigo-600 flex flex-col items-center pt-20 px-4 md:px-12 pb-10 text-white relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute -top-20 -left-20 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-300 opacity-40 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-[30%] -right-28 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-pink-300 opacity-40 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      <div className="absolute bottom-[-100px] left-[10%] w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-indigo-300 opacity-30 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,#cbd5ff_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 -z-10 pointer-events-none" />

      {/* Admin Login Section */}
      {!isAuthenticated ? (
        <motion.div
          className="bg-white shadow-2xl rounded-lg p-6 sm:p-8 w-full max-w-sm"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-900">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            className="w-full px-4 py-3 border border-indigo-500 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </motion.div>
      ) : (
        <div className="w-full max-w-4xl bg-white p-4 sm:p-8 rounded-lg shadow-2xl">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-900"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Add New Lintener
          </motion.h2>
          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              required
              className="border p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              className="border p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.age}
              onChange={handleChange}
            />
            <select
              name="gender"
              required
              className="border p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="phNo"
              placeholder="Phone Number"
              required
              className="border p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.phNo}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="col-span-1 sm:col-span-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Add Listener
            </button>
          </form>

          <motion.h3
            className="text-xl sm:text-2xl font-semibold mb-6 text-center text-indigo-900"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Current Listener
          </motion.h3>
          <ul className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            {employees.map((emp) => (
              <li key={emp.id} className="bg-gray-100 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-800">{emp.name}</p>
                    <p className="text-sm text-gray-600">Age: {emp.age} | Gender: {emp.gender}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveEmployee(emp.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-sm">Feedback:</p>
                  {(feedbackData[emp.id] || []).length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {feedbackData[emp.id].map((fb, idx) => <li key={idx}>{fb}</li>)}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No feedback yet.</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;
