import Cell from "./Cell"

const columns = ["A","B","C","D","E","F","G","H","I","J"]

const Grid = ({
  cells,
  activeCell,
  setActiveCell,
  updateCell,
}) => {

  const activeCol = activeCell?.charAt(0)
  const activeRow = activeCell?.slice(1)

  return (
    <div className="overflow-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="w-10 h-10 border bg-gray-200"></th>

            {columns.map((col) => (
              <th
                key={col}
                className={`w-24 h-10 border
                ${
                  activeCol === col
                    ? "bg-blue-300"
                    : "bg-gray-200"
                }
                `}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(10)].map((_, rowIndex) => {
            const row = rowIndex + 1

            return (
              <tr key={row}>
                <th
                  className={`border w-10
                  ${
                    activeRow == row
                      ? "bg-blue-300"
                      : "bg-gray-200"
                  }
                  `}
                >
                  {row}
                </th>

                {columns.map((col) => {
                  const id = `${col}${row}`

                  return (
                    <td key={id}>
                      <Cell
                        id={id}
                        data={cells[id]}
                        activeCell={activeCell}
                        setActiveCell={setActiveCell}
                        updateCell={updateCell}
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Grid