// Helper function to check deep equality for non-primitive elements
export function isEqual(a: any, b: any): boolean {
  // Use a deep equality check (you can use a library like Lodash for a more robust comparison)
  return JSON.stringify(a) === JSON.stringify(b)
}

export function uniquePush<T>(arr: T[], element: T): void {
  // Check if the element is not already in the array
  if (!arr.some((item) => isEqual(item, element))) {
    arr.push(element)
  }
}
