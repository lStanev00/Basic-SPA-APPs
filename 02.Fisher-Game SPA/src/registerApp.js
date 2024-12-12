export function registerApp(){
    const formEl = document.querySelector(`form`);
    const regURL = `http://localhost:3030/users/register`

    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault();

        const formData = new FormData(formEl);
        const email = formData.get(`email`);
        const pass = formData.get(`password`);
        const rePs = formData.get(`rePass`);

        const vali = email.length > 0
        && pass.length >0
        && rePs === pass

        if (!vali){alert("Incorrect input!\n Try again."); return}

        const req = await fetch(regURL, {
            method: `POST`,
            body : JSON.stringify({
                email: email,
                password: pass,
            })
        });
        if (req.ok){
            const data = await req.json();
            if (data._id) {
                localStorage._id = data._id;
                localStorage.accessToken = data.accessToken;
                localStorage.email = data.email;
                page(`/`)
            }
        }

    })
}