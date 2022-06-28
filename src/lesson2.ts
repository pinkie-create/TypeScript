const getUserData = (key: string) => {
  const value: unknown = localStorage.getItem(key);

  if (typeof value === "number" && !isNaN(value)) {
    return value;
  }
};

interface ISearchFormData {
  id: number;
  name: string;
}

const employee: ISearchFormData = {
  id: 1,
  name: "Tom",
};

function searchData(SearchForm: ISearchFormData): void {
  console.log("id: ", SearchForm.id, "name: ", SearchForm.name);
}

searchData(employee);
