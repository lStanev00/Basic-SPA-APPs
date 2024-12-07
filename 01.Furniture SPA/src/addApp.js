import { furValidation } from "./editApp.js";
export function addApp(){
    const formEl = document.querySelector(`form`);
    const url = `http://localhost:3030/data/catalog`;

    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);
        const val = furValidation(formData);

        if (!val) return;
        if (!localStorage._id) return;
        // val._ownerId = localStorage._id;

        const req = await fetch(url, {
            method: `POST`,
            headers: {
                "X-Authorization": localStorage.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(val),
        });
        if (req.ok) page(`/`);
    })
}