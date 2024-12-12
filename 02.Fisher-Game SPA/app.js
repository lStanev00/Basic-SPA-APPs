import {html, render} from 'https://cdn.jsdelivr.net/npm/lit-html@3.2.1/lit-html.js';
import { navs, container } from './src/templates.js';
import { loginApp } from './src/login.js';
import { registerApp } from './src/registerApp.js';
import { homeApp } from './src/homeApp.js';

const catchURL = `http://localhost:3030/data/catches`;

(async function router(){
    page(`/login`, () => {showPage(container.login); loginApp()})
    page(`/register`, () => {showPage(container.register); registerApp()})
    page(`/`,async () => {showPage(container.home); homeApp()})
    page(`/index.html`,async () => {showPage(container.home); homeApp()})
    page.start();
})();

function showPage(template) {
    const navEl = document.querySelector(`nav`);
    if(`accessToken` in localStorage && `_id` in localStorage && `email` in localStorage){
        render(navs.user, navEl);
        document.querySelector("#logout").addEventListener(`click`, async (e) => {
            e.preventDefault();
            const logoutURL = `http://localhost:3030/users/logout`;
            // homeApp()

            const logoutREQ = await fetch(logoutURL, {
                method: `GET`,
                headers: {
                    "X-Authorization": localStorage.accessToken,
                    "Content-Type": "application/json",
                }
            })
            if (logoutREQ.status == 204) {
                localStorage.clear();
                render(navs.guest, navEl);
            }
        })
    }
    else {render(navs.guest, navEl)};

    const mainEl = document.querySelector(`main`);
    render(template, mainEl);
}


export async function getCatch() {return await(await fetch(catchURL)).json()}