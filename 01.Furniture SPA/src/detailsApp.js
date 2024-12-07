export async function detailsApp(ctx) {
    const id = ctx.params.id;
    const furURL = `http://localhost:3030/data/catalog/${id}`;
    const data = await(await fetch(furURL)).json();
    const ownerCheck= localStorage._id === data._ownerId
    && localStorage.email
    && localStorage.accessToken
    if(!ownerCheck) {}
    else {
        const ownerControls = createOwnerControls(id);
        document.querySelector("body > div > div:nth-child(2) > div:nth-child(2) > p:nth-child(6)").after(ownerControls);
        document.querySelector("#isowner > a.btn.btn-red").addEventListener(`click`, async (e) => {
            e.preventDefault();
            confirmDelete(furURL)
            // const delREQ = await fetch(furURL, {
            //     method: `DELETE`,
            //     headers: {
            //         "X-Authorization": localStorage.accessToken,
            //         "Content-Type": "application/json"
            //     }
            // });

            // if(delREQ.ok) page(`/`);
        });

    }
}



function createOwnerControls(idd) {
    // Create the container div
    const container = document.createElement('div');
    container.id = 'isowner';

    // Create the Edit button
    const editButton = document.createElement('a');
    editButton.href = `/edit/${idd}`;
    editButton.className = 'btn btn-info';
    editButton.textContent = 'Edit';

    // Create the Delete button
    const deleteButton = document.createElement('a');
    deleteButton.href = `/delete/${idd}`;
    deleteButton.className = 'btn btn-red';
    deleteButton.textContent = 'Delete';

    // Append the buttons to the container
    container.appendChild(editButton);
    container.appendChild(deleteButton);

    return container;
}


async function confirmDelete(furURL) {
    const userConfirmed = confirm('Are you sure you want to delete this?');
    if (userConfirmed) {
        const delREQ = await fetch(furURL, {
            method: `DELETE`,
            headers: {
                "X-Authorization": localStorage.accessToken,
                "Content-Type": "application/json"
            }
        });

        if(delREQ.ok) page(`/`);
    } else {
        console.log(`none`);
        
    }
}