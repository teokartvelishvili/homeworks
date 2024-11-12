import React from "react";

function ListItem({ item, onDelete }) {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white hover:bg-gray-100 transition transform hover:scale-105">
      <h3 className="text-lg font-bold text-gray-700">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
      <button
        onClick={() => onDelete(item.id)}
        className="mt-2 text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default ListItem;
