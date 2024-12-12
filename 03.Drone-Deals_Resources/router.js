// import {html, render} from 'https://cdn.jsdelivr.net/npm/lit-html@3.2.1/lit-html.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { navs, containers } from './src/templates.js';
import { loginApp } from './src/loginApp.js';
import { registerApp } from './src/registerApp.js';
import { detailsApp } from './src/detailsAPP.JS';
import { editApp } from './src/editApp.js';
import { sellApp } from './src/sellApp.js';
import {    page    } from 'page';

(async function router(){
    page('/index.html',() => showPage(containers.home));
    page('/',async () => showPage(containers.home));
    page('/login', () => {showPage(containers.login); loginApp()});
    page('/register', () => {showPage(containers.register); registerApp();});
    page('/sell', () => {showPage(containers.sell); sellApp()})
    page('/market', async () => {
        const response = await fetch('http://localhost:3030/data/drones?sortBy=_createdOn%20desc');
        if (!response.ok) {
            return console.error('Failed to fetch drones:', response.statusText);
        }
        const dronesData = await response.json();
        showPage(containers.market(dronesData));
    });
    page('/:id',async (ctx) => {showPage(containers.details(await(await fetch(`http://localhost:3030/data/drones/${ctx.params.id}`)).json())); detailsApp()});
    page(`/edit/:id`, async (ctx) => {
        try {
            const response = await fetch(`http://localhost:3030/data/drones/${ctx.params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch drone data');
            }
            const droneData = await response.json();
            showPage(containers.edit(droneData));
            editApp();
        } catch (error) {
            console.error('Error in edit route:', error.message);
            alert('Failed to load the edit page. Please try again.');
        }
    });
    
    page.start();
})(); 

async function getFurniture() {return await(await fetch(`http://localhost:3030/data/catalog`)).json()}

function showPage(template) {
    const navEl = document.querySelector(`nav`);
    if(`accessToken` in localStorage && `_id` in localStorage && `email` in localStorage){
        render(navs.user, navEl);
        //LOGOUT LOGIC
        document.querySelector(".logoutBtn").addEventListener(`click`, async (e) => {
            e.preventDefault();
            const logoutURL = `http://localhost:3030/users/logout`; //EDIT

            const logoutREQ = await fetch(logoutURL, {
                method: `GET`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                }
            })
            if (logoutREQ.status == 204) {
                //IF LOGOUT IS OK
                localStorage.clear();
                render(navs.guest, navEl)
            }
        })
    }
    //RENDER NAV
    else {render(navs.guest, navEl)};

    //RENDER MAIN
    const conteinerEl = document.querySelector(`main#main-element`);
    render(template, conteinerEl);
}


// {
//     "_ownerId": "847ec027-f659-4086-8032-5173e2f9c93a",
//     "model": "DJI Mini 3 Pro",
//     "imageUrl": "/images/mini3.png",
//     "price": "520",
//     "condition": "New",
//     "weight": "249",
//     "phone": "0984234321",
//     "description": "The DJI Mini 3 Pro is a lightweight and compact drone that combines advanced features with user-friendly controls, making it perfect for both beginners and experienced pilots. Weighing just 249 grams, it boasts an impressive 4K HDR camera with a 1/1.3-inch sensor, enabling stunning image quality and vibrant colors even in challenging lighting conditions.",
//     "_createdOn": 1617194295480,
//     "_id": "136777f5-3277-42ad-b874-76d043b069cb"
// },