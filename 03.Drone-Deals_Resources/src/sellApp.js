export function sellApp(){
    const form = document.querySelector(`form`);
    const url = `http://localhost:3030/data/drones`
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
        };


        const req = await fetch(url, {
            method: `POST`,
            headers: {
                "X-Authorization": localStorage.accessToken,
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(exportData),
        });
        if (req.ok) page(`/market`)
    })
}