import {html, render} from 'https://cdn.jsdelivr.net/npm/lit-html@3.2.1/lit-html.js';
import { getCatch } from '../app.js';

export function homeApp(){
    const url = `http://localhost:3030/data/catches/`;
    const laodBtn = document.querySelector(".load");
    laodBtn.disabled = false;
    laodBtn.addEventListener(`click`, async (e) => {
        e.preventDefault();
        await load(await getCatch())
    })
    if (localStorage.accessToken) {document.querySelector("#addForm > fieldset > button").disabled = false}
    else {document.querySelector("#addForm > fieldset > button").disabled = true}    
    const formEl = document.querySelector(`#addForm`);
    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault();
        const formData = new FormData(formEl);

        const exportData = {
            angler : formData.get(`angler`),
            weight : formData.get(`weight`),
            species : formData.get(`species`),
            location : formData.get(`location`),
            bait : formData.get(`bait`),
            captureTime : formData.get(`captureTime`),
        }
        const req = await fetch(`http://localhost:3030/data/catches`, {
            method: `POST`,
            headers: {
                "X-Authorization": localStorage.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(exportData),
        }); if (req.status === 200) {laodBtn.click(); formEl.reset()}
    })
    
}

export async function load(data) {
    const url = `http://localhost:3030/data/catches/`;
    const laodBtn = document.querySelector("#home-view > aside > button");
    const temp = (data) => html `${data.map(e => {
        return html`
    <div id="${e._ownerId}" class="catch">
        <label>Angler</label>
        <input type="text" class="angler" value="${e.angler}">
        <label>Weight</label>
        <input type="text" class="weight" value="${e.weight}">
        <label>Species</label>
        <input type="text" class="species" value="${e.species}">
        <label>Location</label>
        <input type="text" class="location" value="${e.location}">
        <label>Bait</label>
        <input type="text" class="bait" value="${e.bait}">
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${e.captureTime}">
        <button class="update" data-id="${e._id}" id="${e._id}" disabled>Update</button>
        <button class="delete" data-id="${e._id}" id="${e._id}" disabled>Delete</button>
    </div>`
    })}`

    render(temp(data), document.querySelector(`#catches`));



    document.querySelectorAll(`.catch`).forEach(div => {
        const updateBtn = div.querySelector(`.update`);
        const curURL = url + updateBtn.id;
        const deleteBtn = div.querySelector(`.delete`);
        if (div.id == localStorage._id){
            updateBtn.disabled = false;
            deleteBtn.disabled = false;
        }

        updateBtn.addEventListener(`click`, async (e) => {
            e.preventDefault();
            const exportData = {
                angler : div.querySelector(`.angler`).value,
                weight : div.querySelector(`.weight`).value,
                species : div.querySelector(`.species`).value,
                location : div.querySelector(`.location`).value,
                bait : div.querySelector(`.bait`).value,
                captureTime : div.querySelector(`.captureTime`).value,
            }

            const req = await fetch(curURL, {
                method: `PUT`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(exportData),
            })
            if (req.ok) laodBtn.click();
        });

        deleteBtn.addEventListener(`click`, async (e) => {
            e.preventDefault();
            const req = await fetch(curURL, {
                method: `DELETE`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                },
            });
            if (req.status === 200) {div.remove(); laodBtn.click()}
        })

    })
}
// <label>Angler</label>
// <input type="text" class="angler" value="${e.angler}">
// <label>Weight</label>
// <input type="text" class="weight" value="${e.weight}">
// <label>Species</label>
// <input type="text" class="species" value="${e.species}">
// <label>Location</label>
// <input type="text" class="location" value="${e.location}">
// <label>Bait</label>
// <input type="text" class="bait" value="${e.bait}">
// <label>Capture Time</label>
// <input type="number" class="captureTime" value="${e.captureTime}">
// <button class="update" data-id="${e._id}" disabled>Update</button>
// <button class="delete" data-id="${e._id}" disabled>Delete</button>