export const DELETE_ABBREVIATIONS = "AbbreviationsTab.deleteAbbreviations";
export const ADD_ABBREVIATION = "AbbreviationsTab.addAbbreviation";

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
