export function registerApp() {
    const formEl = document.querySelector(`form`);
    const regURL = `http://localhost:3030/users/register`;

    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);

        const exportData = {
            email: formData.get(`email`),
            password: formData.get(`password`),
        }

        const VALIDATION = (
            exportData.email.includes(`@`)
            && exportData.password.length > 5
            && exportData.password === formData.get(`rePass`)
        )

        if (!VALIDATION) return;

        const regResDATA = await (await fetch(regURL, {
            method: `POST`,
            body: JSON.stringify(exportData),
        })).json();

        if (regResDATA) {
            if(`accessToken` in regResDATA){
                localStorage.email = regResDATA.email;
                localStorage.accessToken = regResDATA.accessToken;
                localStorage._id = regResDATA._id;
                document.querySelector("body > header > h1 > a").click();
            }

        }

    })
}
