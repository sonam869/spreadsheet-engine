import Grid from "./components/Grid"
import { useSpreadsheet } from "./hooks/useSpreadsheet"

function App() {
  const {
    cells,
    activeCell,
    setActiveCell,
    updateCell,
    undo,
    redo,
  } = useSpreadsheet()

  const formula =
    activeCell && cells[activeCell]
      ? cells[activeCell].formula
      : ""

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Spreadsheet Engine
      </h1>

      {/* Toolbar */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={undo}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Undo
        </button>

        <button
          onClick={redo}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Redo
        </button>
      </div>

      {/* Formula Bar */}
      <input
        className="border p-2 w-full mb-4"
        placeholder="Formula Bar"
        value={formula}
        onChange={(e) => {
          if (activeCell) {
            updateCell(activeCell, e.target.value)
          }
        }}
      />

      {/* Spreadsheet */}
      <Grid
        cells={cells}
        activeCell={activeCell}
        setActiveCell={setActiveCell}
        updateCell={updateCell}
      />
    </div>
  )
}

export default App