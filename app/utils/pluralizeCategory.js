/**
 * Products category : oils, stains, accessories ( past: products, undefined, null)
 * Businesses category: clinics (past: doctors), dispensaries, producers
 */

export default function pluralizeCategory(category) {
  if (!category) {
    // in case of null or undefined
    return 'accessories';
  }

  switch (category.toLowerCase()) {
    case 'dispensary':
      return 'dispensaries';
    case 'product':
      return 'accessories';
    case 'doctor':
      return 'clinics';
    default:
      return `${category.toLowerCase()}s`;
  }
}
