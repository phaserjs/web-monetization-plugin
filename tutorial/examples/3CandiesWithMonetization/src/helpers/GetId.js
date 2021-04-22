export const GetId = (name) => {
    const name_array = name.split("_");
    return name_array[name_array.length - 1];
}