// @flow

const renderCategoryName = (category: string) => {
  let name = `${category.toLowerCase()}`;
  if (category === 'Product') {
    name = 'accessory';
  }
  if (category === 'Strain') {
    name = `a ${name}`;
  } else {
    name = `an ${name}`;
  }
  return name;
};

export default renderCategoryName;
