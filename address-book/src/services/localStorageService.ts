const saveItem = <Type>(key: string, element: Type): void => {
  const items = getItems<Type>(key);
  localStorage.setItem(key, JSON.stringify([element, ...items]));
};

const replaceElement = <Type>(key: string, element: Type): void => {
  localStorage.setItem(key, JSON.stringify(element));
};

const getItems = <Type>(value: string): Type[] => {
  const saved = localStorage.getItem(value);
  if (saved) {
    const addressList: Type[] = JSON.parse(saved);
    return addressList;
  } else {
    return [];
  }
};

const localStorageService = {
  saveItem,
  getItems,
  replaceElement,
};

export default localStorageService;
