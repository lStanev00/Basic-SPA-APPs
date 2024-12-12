import {html, render} from 'https://cdn.jsdelivr.net/npm/lit-html@3.2.1/lit-html.js';
export const navs = {
    user: html`<a id="home" href="/" class="active">Home</a>
    <div id="user">
        <a id="logout" href="javascript:void(0)">Logout</a>
    </div>
    <p class="email">Welcome, <span>${localStorage.email}</span></p>
    `,
    guest: html`<a id="home" href="/" class="active">Home</a>
    <div id="user">
        <a id="logout" href="javascript:void(0)">Logout</a>
    </div>
    <div id="guest">
        <a id="login" href="/login">Login</a>
        <a id="register" href="/register">Register</a>
    </div>
    <p class="email">Welcome, <span>guest</span></p>`
}

export const container = {
    home: html`<section id="home-view">
    <fieldset id="main">
        <legend>Catches</legend>
        <div id="catches">

        </div>
    </fieldset>
    <aside>
        <button class="load">Load</button>
        <form id="addForm">
            <fieldset>
                <legend>Add Catch</legend>
                <label>Angler</label>
                <input type="text" name="angler" class="angler" />
                <label>Weight</label>
                <input type="number" name="weight" class="weight" />
                <label>Species</label>
                <input type="text" name="species" class="species" />
                <label>Location</label>
                <input type="text" name="location" class="location" />
                <label>Bait</label>
                <input type="text" name="bait" class="bait" />
                <label>Capture Time</label>
                <input type="number" name="captureTime" class="captureTime" />
                <button disabled class="add">Add</button>
            </fieldset>
        </form>
    </aside>
</section>`,
    login: html`        <section id="login-view">
    <h2>Login</h2>
    <form id="login">
        <label>Email: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <p class="notification"></p>
        <button>Login</button>
    </form>
</section>`,
    register: html`        <section id="register-view">
    <h2>Register</h2>
    <form id="register">
        <label>Email: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="rePass"></label>
        <p class="notification"></p>
        <button>Register</button>
    </form>
</section>`
}