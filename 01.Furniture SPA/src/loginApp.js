export function loginApp() {
    const formEl = document.querySelector(`form`);
    const loginURL = `http://localhost:3030/users/login`
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
        )
        if(!VALIDATION) return;

        const loginReqDATA = await(await fetch(loginURL,{
            method: `POST`,
            body: JSON.stringify(exportData),
        })).json();
        // console.log(loginReqDATA.status);
        
        if (`accessToken` in loginReqDATA) {
            localStorage._id = loginReqDATA._id;
            localStorage.email = loginReqDATA.email;
            localStorage.accessToken = loginReqDATA.accessToken;
            document.querySelector("body > header > h1 > a").click();
        }
    })
}
