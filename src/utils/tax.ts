export function calculateTax(subtotal: number, location: string): number {
  // Check if location contains state indicators
  const isNorthCarolina = location.toLowerCase().includes('nc') || 
                         location.toLowerCase().includes('north carolina') ||
                         location.toLowerCase().includes('charlotte');
                         
  const isSouthCarolina = location.toLowerCase().includes('sc') || 
                         location.toLowerCase().includes('south carolina') ||
                         location.toLowerCase().includes('rock hill');

  // Apply appropriate tax rate
  if (isSouthCarolina) {
    return subtotal * 0.08; // 8% tax
  } else if (isNorthCarolina) {
    return subtotal * 0.075; // 7.5% tax
  }

  // Default to NC tax rate if location is unclear
  return subtotal * 0.08;
}
