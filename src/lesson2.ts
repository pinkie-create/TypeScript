const getUserData = (key: unknown, value: unknown) => {
  if (value !== null && key !== null) {
    let keyString = <string>key;
    let valueString = <string>value;
    localStorage.setItem(keyString, valueString);
  }
};
getUserData("user", {
  username: "John",
  avatarUrl:
    "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
});

const getFavoritesAmount = (key: unknown, value: unknown) => {
  if (value !== null && key !== null) {
    let keyString = <string>key;
    let valueString = <string>value;
    localStorage.setItem(keyString, valueString);
    console.log(localStorage);
  }
};
getFavoritesAmount("favoritesAmount", "8");

const renderUserBlock = (name: string, url: string, count?: number) => {
  return { name, url, count };
};

renderUserBlock(
  "Bob",
  "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png"
);

interface ISearchFormData {
  id: number;
  name: string;
}

let employee: ISearchFormData = {
  id: 1,
  name: "Tom",
};

function searchData(SearchForm: ISearchFormData): void {
  console.log("id: ", SearchForm.id, "name: ", SearchForm.name);
}

searchData(employee);
