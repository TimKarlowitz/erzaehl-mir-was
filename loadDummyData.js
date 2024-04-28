import { addCategory, addAgeGroup } from "./utils/database";

export const handleCategoryAdd = () => {
  for (let i = 0; i < 3; i++) {
    addCategory("Test");
  }
};
export const handleAgeGroupAdd = () => {
  for (let i = 0; i < 3; i++) {
    addAgeGroup("Test");
  }
};
