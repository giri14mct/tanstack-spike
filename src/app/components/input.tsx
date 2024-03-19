import React, { useState } from "react";

//@ts-ignore
export default function Input(props) {
  const [inputData, setInputData] = useState(props.data.getValue());

  async function handleChange(id: any) {
    try {
      const response = await fetch(
        `https://65f8a8c2df151452460fdd23.mockapi.io/api/v1/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: inputData }),
        }
      );

      if (response.ok) {
        alert("Save Successfully");
      } else {
        throw new Error("Failed to update the item");
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  }

  return (
    <input
      type="text"
      className="w-full p-4 rounded-xl"
      name="Name"
      value={inputData}
      onChange={(e) => setInputData(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleChange(props.data.row.original.id);
        }
      }}
    />
  );
}
