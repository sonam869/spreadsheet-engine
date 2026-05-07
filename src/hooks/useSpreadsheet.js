import { useState, useRef } from "react"
import {
  evaluateFormula,
  getCellDependencies,
} from "../utils/FormulaEvaluator"

import { DependencyGraph } from "../utils/DependencyGraph"

const createInitialCells = () => {
  const cells = {}

  for (let row = 1; row <= 10; row++) {
    for (let col = 65; col < 75; col++) {
      const id = `${String.fromCharCode(col)}${row}`

      cells[id] = {
        formula: "",
        value: "",
      }
    }
  }

  return cells
}

export const useSpreadsheet = () => {
  const [cells, setCells] = useState(createInitialCells())

  const [activeCell, setActiveCell] = useState(null)

  const history = useRef([])
  const redoStack = useRef([])

  const graph = useRef(new DependencyGraph())

  // Save state for undo
  const saveHistory = (state) => {
    history.current.push(JSON.stringify(state))

    if (history.current.length > 50) {
      history.current.shift()
    }
  }

  // Update Cell
  const updateCell = (cellId, formula) => {
    saveHistory(cells)

    const updatedCells = {
      ...cells,
    }

    updatedCells[cellId] = {
      formula,
      value: formula,
    }

    // Remove old dependencies
    graph.current.removeDependencies(cellId)

    // Add new dependencies
    const dependencies = getCellDependencies(formula)

    for (const dep of dependencies) {
      graph.current.addDependency(cellId, dep)
    }

    // Detect cycle
    if (graph.current.hasCycle(cellId)) {
      updatedCells[cellId].value = "#CIRCULAR"

      setCells(updatedCells)

      return
    }

    // Evaluate formula
    updatedCells[cellId].value = evaluateFormula(
      formula,
      updatedCells
    )

    // Recalculate dependent cells
    const order = graph.current.topologicalSort(cellId)

    for (const id of order) {
      const currentFormula = updatedCells[id].formula

      updatedCells[id].value = evaluateFormula(
        currentFormula,
        updatedCells
      )
    }

    setCells(updatedCells)
  }

  // Undo
  const undo = () => {
    if (history.current.length === 0) return

    redoStack.current.push(JSON.stringify(cells))

    const previous = JSON.parse(history.current.pop())

    setCells(previous)
  }

  // Redo
  const redo = () => {
    if (redoStack.current.length === 0) return

    history.current.push(JSON.stringify(cells))

    const next = JSON.parse(redoStack.current.pop())

    setCells(next)
  }

  return {
    cells,
    activeCell,
    setActiveCell,
    updateCell,
    undo,
    redo,
  }
}