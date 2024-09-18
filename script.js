class Card {
  constructor({ title, img, desc, github, site, imageType }) {
    this.title = title;
    this.img = img;
    this.desc = desc;
    this.github = github;
    this.site = site;
    this.imageType = imageType;
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("projeto_card");
    div.innerHTML = `
        <div class="projeto_card">
            <!-- Inicio Card -->
            <div class="projeto_card_infos">
              <div class="projeto_card_img">
                <img
                  class=${this.imageType == "potrait" ? "projeto_card_img--scroll" : "projeto_card_img--scale"}
                  src="${this.img}"
                  alt=""
                />
              </div>
              <div class="projeto_card_texts">
                <h5>${this.title}</h5>
                <p>${this.desc}</p>
              </div>
            </div>
            <div class="projeto_card_buttons">
              <a
                href="${this.github}"
                target="_blank"
                rel="noopener noreferrer"
                class="description description--repositorio"
                ><img src="img/icons/github.svg" alt="Repositorio"
              /></a>
              <a
                href="${this.site}"
                target="_blank"
                rel="noopener noreferrer"
                class="description description--visualizar"
                ><img src="img/icons/show.svg" alt="Visualizar" 
              /></a>
            </div>
          </div>
          <!-- Fim Card -->
        `
    return div; ;
  }
}
class Tags {
  constructor([tagsList]) {
    this.tagsList = tagsList;
  }

  render() {
    return `
        ${this.tagsList.map((tag) => `<span class="card-tag">${tag}</span>`)}
        `;
  }
}

async function getProjects() {
    const projects = await fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
        return data.projects
    });
    return projects
}
window.onload = async function () {
  const projetosSession = document.querySelector(".projetos_row");
  const projetosList = await getProjects();

  projetosList.map((project) => {
    const ProjectCard = new Card(project).render();
    projetosSession.appendChild(ProjectCard);
  });
};
