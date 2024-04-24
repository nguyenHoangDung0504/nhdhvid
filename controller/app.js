class App {
    static data = Db.getGroup();

    static build() {
        const dataCtn = document.querySelector(".data-ctn");

        for (const studio in App.data) {
            if (Object.hasOwnProperty.call(App.data, studio)) {
                const element = App.data[studio];
                console.log(element);
                const studioView = document.createElement("details");
            }
        }
    }
}

App.build();
