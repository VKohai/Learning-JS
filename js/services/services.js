const postDataAsync = async (url, data) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });
    return await response.json();
};
const getResoursesAsync = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    return await response.json();
};
export { postDataAsync, getResoursesAsync };