import { UNIT_CATEGORY_LABEL } from '../../admin/data/residenceUnits';
import { suites } from '../../landing/data/content';

/** Anteprima per categoria (prime foto delle suite marketing). */
const GARDEN_PREVIEW = suites[0]?.gallery?.[0] ?? suites[0]?.image ?? '';
const SEA_PREVIEW = suites[1]?.gallery?.[0] ?? suites[1]?.image ?? '';

/**
 * @param {'giardino' | 'mare'} category
 * @returns {string}
 */
export function getUnitPreviewImage(category) {
  return category === 'mare' ? SEA_PREVIEW : GARDEN_PREVIEW;
}

/**
 * @param {'giardino' | 'mare'} category
 */
export function getCategoryLabel(category) {
  return UNIT_CATEGORY_LABEL[category] ?? category;
}
