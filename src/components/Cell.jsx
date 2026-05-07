import { useState, useEffect } from "react"

const Cell = ({
  id,
  data,
  activeCell,
  setActiveCell,
  updateCell,
}) => {
  const [inputValue, setInputValue] = useState(data.formula)

  useEffect(() => {
    setInputValue(data.formula)
  }, [data.formula])

  const isActive = activeCell === id

  return (
    <input
      className={`border p-2 w-24 h-10 outline-none
      ${isActive ? "border-blue-500 bg-blue-50" : ""}
      `}
      value={isActive ? inputValue : data.value}
      onChange={(e) => setInputValue(e.target.value)}
      onFocus={() => setActiveCell(id)}
      onBlur={() => {
        updateCell(id, inputValue)
      }}
    />
  )
}

export default Cell