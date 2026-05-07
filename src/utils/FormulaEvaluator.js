// Regex for cell references like A1, B2
const CELL_REGEX = /([A-J])(10|[1-9])/g

// Convert value safely
const parseValue = (value) => {
  if (value === undefined || value === "") return 0

  if (!isNaN(value)) {
    return Number(value)
  }

  return value
}

// Evaluate formula
export const evaluateFormula = (formula, cells) => {
  try {
    // If not formula, return raw value
    if (!formula.startsWith("=")) {
      return parseValue(formula)
    }

    let expression = formula.slice(1)

    // Replace cell references
    expression = expression.replace(CELL_REGEX, (match) => {
      if (!(match in cells)) {
        throw new Error("#REF!")
      }

      const value = cells[match]?.value

      if (typeof value === "string" && isNaN(value)) {
        throw new Error("#VALUE!")
      }

      return value || 0
    })

    // Evaluate arithmetic
    const result = Function(`return ${expression}`)()

    if (result === undefined || Number.isNaN(result)) {
      throw new Error("#ERROR")
    }

    return result
  } catch (error) {
    return error.message || "#ERROR"
  }
}

// Extract dependencies
export const getCellDependencies = (formula) => {
  if (!formula.startsWith("=")) return []

  const matches = formula.match(CELL_REGEX)

  return matches || []
}