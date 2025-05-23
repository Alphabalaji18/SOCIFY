import React, { useMemo } from "react";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

// Fallback employee data
const employeesData = [
  { id: 1, name: "Balaji", age: 21, gender: "Male", phNo: "9342874173" },
  { id: 2, name: "Sandy", age: 28, gender: "Male", phNo: "9362622255" },
  { id: 3, name: "Dhanush", age: 35, gender: "Male", phNo: "8838319686" },
  { id: 4, name: "Emily Davis", age: 32, gender: "Female", phNo: "9566319064" },
  { id: 5, name: "Chris Wilson", age: 29, gender: "Male", phNo: "333-444-5555" },
  { id: 6, name: "Sophia Martinez", age: 31, gender: "Female", phNo: "222-333-4444" },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Call = () => {
  const employees = useMemo(() => {
    const localData = JSON.parse(localStorage.getItem("employees")) || employeesData;
    return shuffleArray(localData);
  }, []);

  const handleFeedbackSubmit = (id, feedback) => {
    const allFeedback = JSON.parse(localStorage.getItem("feedback")) || {};
    if (!allFeedback[id]) allFeedback[id] = [];
    allFeedback[id].push(feedback);
    localStorage.setItem("feedback", JSON.stringify(allFeedback));
    alert("Feedback submitted. Thank you!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex flex-col items-center pt-20 px-4 lg:px-12 pb-10 text-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-300 opacity-40 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-[30%] -right-28 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-pink-300 opacity-40 rounded-full blur-3xl animate-pulse-slow delay-500"></div>
      <div className="absolute bottom-[-100px] left-[20%] w-[300px] sm:w-[350px] h-[300px] sm:h-[350px] bg-indigo-300 opacity-30 rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,#cbd5ff_1px,transparent_1px)] bg-[length:20px_20px] opacity-20 -z-10 pointer-events-none" />

      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-pink-600 mb-14 z-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Meet the Heart of SafeSpace 💖
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 justify-items-center z-10 w-full max-w-7xl">
        {employees.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.04 }}
            className="relative p-[2px] rounded-3xl bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300 w-full max-w-xs"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 h-full">
              <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 animate-ping" />
              <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 mb-1">{employee.name}</h2>
              <p className="text-sm text-gray-800">Age: {employee.age}</p>
              <p className="text-sm text-gray-800 capitalize">Gender: {employee.gender}</p>

              <a
                href={`tel:${employee.phNo}`}
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-2.5 mt-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
              >
                <PhoneCall className="w-5 h-5" />
                Call Now
              </a>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.elements[`feedback-${employee.id}`];
                  if (input.value.trim()) {
                    handleFeedbackSubmit(employee.id, input.value.trim());
                    input.value = "";
                  }
                }}
                className="mt-4"
              >
                <input
                  name={`feedback-${employee.id}`}
                  type="text"
                  placeholder="Leave feedback..."
                  className="w-full p-2 rounded bg-white text-black placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="mt-1 w-full bg-pink-500 hover:bg-pink-600 text-white rounded py-1 text-sm"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Call;
