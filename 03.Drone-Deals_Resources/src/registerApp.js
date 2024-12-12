export function registerApp(){
    const formEl = document.querySelector(`form`);
    const url = `http://localhost:3030/users/register`
    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);
        if(formData.get(`re-password`) != formData.get(`password`)) {window.alert(`Passwords don't match`); return}
        const exportData = {
            email: formData.get(`email`),
            password: formData.get(`password`),
        }

        const data = await (await fetch(url, {
            method: `POST`,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exportData),
        })).json()

        if (`accessToken` in data) {
            localStorage.accessToken = data.accessToken;
            localStorage.email = data.email;
            localStorage._id = data._id;
            page(`/`);
        } else {
            window.alert(`Passwords don't match`)
        }
    })
}