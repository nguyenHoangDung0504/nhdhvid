class Cih {
    static addedHen = [];
    static results = [];

    static async l(...names) {
        const urls = names.map((name) =>
            name.includes("http") ? name : `https://ihentai.icu/${name}/`
        );

        if (Cih.addedHen.length == 0) {
            const response = await fetch('https://nhdhvid.glitch.me/model/database.min.js');
            const script = await response.text();
            eval(script);
            Cih.addedHen = window.rs;
        }

        for (const url of urls) {
            const name = url.split('/').filter(e => e)[2];
            if(!Cih.addedHen.includes(name)) {
                Cih.leakData(url);
            } else {
                console.log('Duplicate data:', name);
            }
        }

        console.log('Done');
    }

    static async leakData(url) {
        try {
            const response = await fetch(url);
            if (response.status === 200 && response.ok) {
                const data = await response.text();
                Cih.results.push(Cih.parseFunction(data));
            }
        } catch (error) {
            console.error(error);
        }
    }

    static parseFunction(data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        const leakedData = {
            name: "",
            src: "",
            thumbnail: "",
            studio: "",
            series: "",
            tags: "",
            desc: "",

            toString() {
                const { name, src, thumbnail, studio, series, tags, desc } = leakedData;
                return `addData(new H('${name}', '${src}', '${thumbnail}', '${studio}', '${series}', '${tags}', '${desc}'))`;
            },
        };

        const ctn = doc.querySelector(
            'div[class="tw-col-span-3 lg:tw-col-span-2"]'
        );
        const iframe = ctn.querySelector("iframe");
        const inforBox = Array.from(ctn.querySelectorAll(".tw-mb-5"));
        const inforSheet = ctn.querySelector(".v-sheet");
        const [studioBox] = inforBox.filter((node) =>
            node
                .querySelector(".tw-text-sm")
                .textContent.toLowerCase()
                .includes("hãng")
        );
        const [seriesBox] = inforBox.filter((node) =>
            node
                .querySelector(".tw-text-sm")
                .textContent.toLowerCase()
                .includes("trọn bộ")
        );

        leakedData.name = standarlize(iframe.title);
        leakedData.src = iframe.src;
        leakedData.thumbnail = ctn
            .querySelector(".tw-grid")
            .querySelector("img").src;
        leakedData.studio = Array.from(studioBox.querySelectorAll("a"))
            .map((a) => a.textContent.trim())
            .join(",");
        leakedData.series = Array.from(seriesBox.querySelectorAll("a"))
            .map((a) => a.textContent.trim())
            .join(",");
        leakedData.tags = Array.from(inforSheet.querySelectorAll(".v-chip-group a"))
            .map((a) => standarlize(a.textContent))
            .join(",");
        leakedData.desc = inforSheet
            .querySelector(".tw-text-sm")
            .textContent.trim()
            .replaceAll("\n", " ")
            .replaceAll("'", "\\'");

        function standarlize(s) {
            return s.trim().toLowerCase();
        }

        return leakedData.toString();
    }

    static getResult() {
        const dummyTextArea = document.createElement('textarea');
        dummyTextArea.value = Cih.results.join('\n');
        dummyTextArea.style.position = 'fixed';
        document.body.appendChild(dummyTextArea);
        dummyTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(dummyTextArea);
        Cih.results = [];
    }
}
