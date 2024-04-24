class App {
    static data = Db.getGroup();

    static build() {
        const dataCtn = document.querySelector(".data-ctn");

        for (const studio in App.data) {
            if (Object.hasOwnProperty.call(App.data, studio)) {
                const series = App.data[studio];
                const studioView = document.createElement("details");
                studioView.innerHTML += `<summary>${studio}</summary>`;

                for (const hen in series) {
                    if (Object.hasOwnProperty.call(series, hen)) {
                        const hens = series[hen];
                        const hensView = document.createElement("details");
                        hensView.innerHTML += `<summary class="sub">${studio}</summary>`;

                        const grid = document.createElement("div");
                        grid.classList.add("gallery-grid");
                        hens.forEach((hen) => {
                            const henBox = document.createElement("div");
                            henBox.classList.add("gallery");
                            henBox.addEventListener("click", () => {
                                window.open(hen.src, "blank");
                            });
                            henBox.innerHTML = `<div class="gallery-image">
                                <img loading="lazy" src="${hen.thumbnail}">
                            </div>
                            <div class="gallery-name">${hen.name}</div>`;
                            grid.appendChild(henBox);
                        });

                        hensView.appendChild(grid);
                        studioView.appendChild(hensView);
                    }
                }

                dataCtn.appendChild(studioView)
            }
        }
    }
}

App.build();
