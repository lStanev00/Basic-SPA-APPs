export function detailsApp(){
    const pel = document.querySelector(`#hater`);
    pel.style.display = `none`;
    const curid = pel.textContent;
    const btns = document.querySelector(`.buttons`);
    const owner = btns.id;
    if (owner !== localStorage._id) btns.remove();
    const delBtn = document.querySelector(`#delete-btn`);

    delBtn.addEventListener(`click`, async (e) => {
        e.preventDefault();
        const userConfirmed = confirm("Are you sure you want to delete the entry?");
        if (userConfirmed) {
            const data = await (await fetch(`http://localhost:3030/data/drones/${curid}`, {
                method: `DELETE`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                },
            })).json();
    
            if (`_deletedOn` in data) page(`/market`)
        } else {
            return;
        }

    })
}