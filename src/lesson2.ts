const getUserData = (key: unknown, value: unknown) => {
  if (value !== null && key !== null) {
    const keyString = <string>key;
    const valueString = <string>value;
    localStorage.setItem(keyString, valueString);
  }
};
getUserData("user", {
  username: "John",
  avatarUrl:
    "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
});

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
