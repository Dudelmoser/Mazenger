export const DELETE_ABBREVIATIONS = "AutoText.deleteAbbreviations";
export const ADD_ABBREVIATION = "AutoText.addAbbreviation";

export function deleteAbbreviations(keys) {
  return {
    type: DELETE_ABBREVIATIONS,
    keys
  }
}

export function addAbbreviation(abbr, full) {
  return {
    type: ADD_ABBREVIATION,
    abbr,
    full,
  }
}
