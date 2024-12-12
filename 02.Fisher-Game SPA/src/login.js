export function loginApp(){
    const formEl = document.querySelector(`form`);
    const loginURL = `http://localhost:3030/users/login`;

    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault();

        const formData = new FormData(formEl);

        const email = formData.get(`email`);
        const pass = formData.get(`password`);

        const val = email.length > 0
        && pass.length > 0

        if (!val){alert("Incorrect input!\n Try again."); return}

        const data = await(await fetch(loginURL, {
            method: `POST`,
            body: JSON.stringify({
                email: email,
                password: pass,
            })
        })).json();

        if (data.accessToken){
            localStorage._id = data._id;
            localStorage.accessToken = data.accessToken;
            localStorage.email = data.email;
            page(`/`);
        }else {
            alert("Incorrect input!\n Try again.")
        }
        
    })
}