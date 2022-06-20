const getUserData = (key, value) => {
    if (value !== null && key !== null) {
        let keyString = key;
        let valueString = value;
        localStorage.setItem(keyString, valueString);
    }
};
getUserData("user", {
    username: "John",
    avatarUrl: "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png",
});
const getFavoritesAmount = (key, value) => {
    if (value !== null && key !== null) {
        let keyString = key;
        let valueString = value;
        localStorage.setItem(keyString, valueString);
        console.log(localStorage);
    }
};
getFavoritesAmount("favoritesAmount", "8");
const renderUserBlock = (name, url, count) => {
    return { name, url, count };
};
renderUserBlock("Bob", "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");
let employee = {
    id: 1,
    name: "Tom",
};
function searchData(SearchForm) {
    console.log("id: ", SearchForm.id, "name: ", SearchForm.name);
}
searchData(employee);
