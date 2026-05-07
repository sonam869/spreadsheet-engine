export class DependencyGraph {
  constructor() {
    this.graph = {}
  }

  // Add dependency
  addDependency(from, to) {
    if (!this.graph[from]) {
      this.graph[from] = new Set()
    }

    this.graph[from].add(to)
  }

  // Remove all edges
  removeDependencies(cell) {
    this.graph[cell] = new Set()
  }

  // DFS Cycle Detection
  hasCycle(start) {
    const visited = new Set()
    const stack = new Set()

    const dfs = (node) => {
      if (stack.has(node)) return true
      if (visited.has(node)) return false

      visited.add(node)
      stack.add(node)

      const neighbors = this.graph[node] || []

      for (const neighbor of neighbors) {
        if (dfs(neighbor)) return true
      }

      stack.delete(node)

      return false
    }

    return dfs(start)
  }

  // Topological Sort
  topologicalSort(start) {
    const visited = new Set()
    const result = []

    const dfs = (node) => {
      if (visited.has(node)) return

      visited.add(node)

      const neighbors = this.graph[node] || []

      for (const neighbor of neighbors) {
        dfs(neighbor)
      }

      result.push(node)
    }

    dfs(start)

    return result.reverse()
  }
}