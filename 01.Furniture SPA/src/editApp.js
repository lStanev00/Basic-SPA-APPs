export function editApp(id){
    const formEl = document.querySelector(`form`);
    const url = `http://localhost:3030/data/catalog/${id}`
    formEl.addEventListener(`submit`, async (e) => {
        e.preventDefault()
        const formData = new FormData(formEl);

        const vali = furValidation(formData);

        if(vali){
            const req = await fetch(url, {
                method: `PUT`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vali),
            });
            if (req.ok) page(`/`);
        }
    })
}


export function furValidation(formData) {
    const fields = [
        { name: 'make', minLength: 4 },
        { name: 'model', minLength: 4 },
        { name: 'description', minLength: 10 },
        { name: 'price', minValue: 0 },
        { name: 'year', minValue: 1950, maxValue: 2050 },
    ];

    let isValid = true;

    fields.forEach((field) => {
        const value = formData.get(field.name);
        const inputElement = document.querySelector(`[name="${field.name}"]`);

        if (field.minLength && (!value || value.length < field.minLength)) {
            addValidationClass(inputElement, false);
            isValid = false;
        }
        else if (field.minValue && (!value || Number(value) <= field.minValue)) {
            addValidationClass(inputElement, false);
            isValid = false;
        }
        else if (field.maxValue && Number(value) > field.maxValue) {
            addValidationClass(inputElement, false);
            isValid = false;
        } else {
            addValidationClass(inputElement, true);
        }
    });

    if (!isValid) return false;

    return {
        make: formData.get('make'),
        model: formData.get('model'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        year: Number(formData.get('year')),
        img: formData.get('img'),
        material: formData.get('material'),
    };
}

function addValidationClass(element, isValid) {
    if (!element) return;
    element.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        element.classList.add('is-valid');
    } else {
        element.classList.add('is-invalid');
    }
}



// {
//     "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//     "make": "Table",
//     "model": "Swedish",
//     "year": 2015,
//     "description": "Medium table",
//     "price": 235,
//     "img": "./images/table.png",
//     "material": "Hardwood",
//     "_createdOn": 1615545143015,
//     "_id": "53d4dbf5-7f41-47ba-b485-43eccb91cb95"
// }