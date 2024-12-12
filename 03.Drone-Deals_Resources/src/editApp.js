export function editApp(){
    const form = document.querySelector(`form`);
    const pEl = document.querySelector(`#hater`);
    pEl.style.display = `none`;
    form.addEventListener(`submit`, async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const exportData = {
            model: formData.get(`model`),
            imageUrl: formData.get(`imageUrl`),
            price: formData.get(`price`),
            weight: formData.get(`weight`),
            phone: formData.get(`phone`),
            condition: formData.get(`condition`),
            description: formData.get(`description`),
        }
        const url = `http://localhost:3030/data/drones/`;

        const data = (await fetch(url + pEl.textContent, {
            method: `PUT`,
            headers: {
                "X-Authorization": localStorage.accessToken,
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(exportData),
        }));
        if (data.ok) page(`/${pEl.textContent}`)
    })
}