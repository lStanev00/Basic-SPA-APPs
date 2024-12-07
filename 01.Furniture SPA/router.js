import {html, render} from 'https://cdn.jsdelivr.net/npm/lit-html@3.2.1/lit-html.js';
import { editApp } from './src/editApp.js';
import { addApp } from './src/addApp.js';
import { detailsApp } from './src/detailsApp.js';
import { navs, containers } from './src/templates.js';
import { loginApp } from './src/loginApp.js';
import { registerApp } from './src/registerApp.js';
(async function router(){
    // Define routes
    page('/index.html',async () => showPage(containers.home(await getFurniture())));
    page('/',async () => showPage(containers.home(await getFurniture())));
    page('//',async () => showPage(containers.home(await getFurniture())));
    page('/catalog',async () => showPage(containers.home(await getFurniture())));
    page('/register', () => {showPage(containers.register); registerApp();});
    page('/login', () => {showPage(containers.login); loginApp()});
    page('/create', () => {showPage(containers.create); addApp()});
    page('/details/:id',async (ctx) => {showPage(containers.details(await(await fetch(`http://localhost:3030/data/catalog/${ctx.params.id}`)).json( ))); detailsApp(ctx)});
    page('/edit/:id',async (ctx) => {showPage(containers.edit(await(await fetch(`http://localhost:3030/data/catalog/${ctx.params.id}`)).json( ))); editApp(ctx.params.id)});
    page('/my-furniture',async () => {showPage(containers.userFur(await(await fetch(`http://localhost:3030/data/catalog?where=_ownerId%3D%22${localStorage._id}%22`)).json())); userFurApp()});
    //run router
    page.start();
})(); //router self invoking 

async function getFurniture() {return await(await fetch(`http://localhost:3030/data/catalog`)).json()}

function showPage(template) {
    const navEl = document.querySelector(`nav`);
    if(`accessToken` in localStorage && `_id` in localStorage && `email` in localStorage){
        render(navs.user, navEl);
        document.querySelector("#logoutBtn").addEventListener(`click`, async (e) => {
            e.preventDefault();
            const logoutURL = `http://localhost:3030/users/logout`;

            const logoutREQ = await fetch(logoutURL, {
                method: `GET`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                }
            })
            if (logoutREQ.status == 204) {
                localStorage.clear();
                render(navs.guest, navEl)
            }
        })
    }
    else {render(navs.guest, navEl)};

    const conteinerEl = document.querySelector(`.container`);
    render(template, conteinerEl);
}
