import { useState } from "react"

function InputBar() {
  return (
    <div className="flex items-center justify-center m-30">
      <form action="https://www.google.com/search" method="get" target="_blank">
        <input
          type="search"
          name="q"
          placeholder="Enter Player Name..."
          className="border rounded-lg px-3 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
}

export default InputBar;
