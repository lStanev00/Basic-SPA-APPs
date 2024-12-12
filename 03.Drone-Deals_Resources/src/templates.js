import { html, render } from "../node_modules/lit-html/lit-html.js";


export const navs = {
    user: html`<div>
    <a href="/market">Marketplace</a>
  </div>

  <!-- Logged-in users -->
  <div class="user">
    <a href="/sell">Sell</a>
    <a class="logoutBtn" href="#">Logout</a>
  </div>`,
    guest: html`<div>
    <a href="/market">Marketplace</a>
  </div>
  <!-- Guest users -->
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`,
    admin: html``,
}

export const containers = {
    home : html`<section id="hero">
    <p>
      Discover the best deals on drones! Buy, sell, and trade top-quality drones with ease on Drone Deals - your
      trusted marketplace for all things drone.</p>
  </section>`,
    login: html`<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input type="password" name="password" id="password" placeholder="password" />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>`,
    register: html`<section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form">
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
      </form>
    </div>
  </section>`,
    // dashboard: html``,
    sell: html `<section id="create">
    <div class="form form-item">
      <h2>Add Drone Offer</h2>
      <form class="create-form">
        <input type="text" name="model" id="model" placeholder="Drone Model" required/>
        <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" required/>
        <input type="number" name="price" id="price" placeholder="Price" required/>
        <input type="number" name="weight" id="weight" placeholder="Weight" required/>
        <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" required/>
        <input type="text" name="condition" id="condition" placeholder="Condition" required/>
        <textarea name="description" id="description" placeholder="Description" required></textarea>
        <button type="submit">Add</button>
      </form>

    </div>
  </section>`,
    edit: (data) => html`
    <p id="hater">${data._id}</p>
    <section id="edit">
      <div  class="form form-item">
        <h2>Edit Offer</h2>
        <form class="edit-form">
          <input 
            type="text" 
            name="model" 
            id="model" 
            placeholder="Drone Model" 
            value="${data.model}" 
          />
          <input 
            type="text" 
            name="imageUrl" 
            id="imageUrl" 
            placeholder="Image URL" 
            value="${data.imageUrl}" 
          />
          <input 
            type="number" 
            name="price" 
            id="price" 
            placeholder="Price" 
            value="${data.price}" 
          />
          <input 
            type="number" 
            name="weight" 
            id="weight" 
            placeholder="Weight" 
            value="${data.weight}" 
          />
          <input 
            type="number" 
            name="phone" 
            id="phone" 
            placeholder="Phone Number for Contact" 
            value="${data.phone}" 
          />
          <input 
            type="text" 
            name="condition" 
            id="condition" 
            placeholder="Condition" 
            value="${data.condition}" 
          />
          <textarea 
            name="description" 
            id="description" 
            placeholder="Description"
          >${data.description}</textarea>
          <button type="submit">Edit</button>
        </form>
      </div>
    </section>
  `,
    details: (data) => html`<section id="details">
      <p id="hater">${data._id}</p>
    <div id="details-wrapper">
      <div>
        <img id="details-img" src="${data.imageUrl}" alt="example1" />
        <p id="details-model">${data.model}</p>
      </div>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="details-price">Price: ${data.price}</p>
          <p class="details-condition">Condition: ${data.condition}</p>
          <p class="details-weight">Weight: ${data.weight}</p>
          <p class="drone-description">${data.description}</p>
          <p class="phone-number">Phone: ${data.phone}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        <div class="buttons" id="${data._ownerId}">
          <a href="/edit/${data._id}" id="edit-btn">Edit</a>
          <a href="" id="delete-btn">Delete</a>
        </div>
      </div>
    </div>
  </section>`,
market: (data) => {
  return html`
    <h3 class="heading">Marketplace</h3>
    <section id="dashboard">
      ${
        data.length > 0
          ? data.map(
              (e) => html`
                <div class="drone">
                  <img src="${e.imageUrl}" alt="Drone Image" />
                  <h3 class="model">${e.model}</h3>
                  <div class="drone-info">
                    <p class="price">Price: ${e.price}</p>
                    <p class="condition">Condition: ${e.condition}</p>
                    <p class="weight">Weight: ${e.weight}</p>
                  </div>
                  <a class="details-btn" href="/${e._id}">Details</a>
                </div>
              `
            )
          : html`<h3 class="no-drones">No Drones Available</h3>`
      }
    </section>
  `;
}


}
