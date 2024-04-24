class H {
    constructor(name, src, thumbnail, studio, series, tags, desc) {
        Object.assign(this, {
            name,
            src,
            thumbnail,
            studios: studio.split(","),
            series: series.split(","),
            tags: tags.split(","),
            desc,
        });
    }
}

class Category {
    constructor(name, quantity) {
        Object.assign(this, { name, quantity });
    }
}

class Studio extends Category {
    constructor(name, quantity) {
        super(name, quantity);
    }
}

class Series extends Category {
    constructor(name, quantity) {
        super(name, quantity);
    }
}

class Tag extends Category {
    constructor(name, quantity) {
        super(name, quantity);
    }
}

class Db {
    static hStorage = [];
    static names = [];
    static studios = [];
    static series = [];
    static tags = [];

    static save(h) {
        const lists = [Db.studios, Db.series, Db.tags];
        const classList = [Studio, Series, Tag];

        Db.hStorage.push(h);
        Db.names.push(h.name.replaceAll(" ", "-"));
        [h.studios, h.series, h.tags].forEach((item, index) => {
            item.forEach((studio) => {
                Db.saveToList(lists[index], new classList[index](studio, 1));
            });
        });
    }

    static saveToList(list, data) {
        const index = list.findIndex((item) => item.name == data.name);
        if (index != -1) {
            list[index].quantity++;
        } else {
            list.push(data);
        }
    }

    static getGroup() {
        let groups = {};

        // Group by studio
        Db.hStorage.forEach(h => {
            h.studios.forEach(studio => {
                let studioName = studio.toUpperCase();
                if (!groups[studioName]) {
                    groups[studioName] = [h];
                } else {
                    groups[studioName].push(h);
                }                
            })
        });

        // Group within each studio group by name
        for (let studioName in groups) {
            let studioGroup = groups[studioName];
            let nameGroups = {};

            studioGroup.forEach(h => {
                let hName = h.name.toUpperCase();
                let groupName = null;

                for (let groupName in nameGroups) {
                    if (checkName(hName, groupName)) {
                        nameGroups[groupName].push(h);
                        return;
                    }
                }

                if (!groupName) {
                    groupName = hName;
                    nameGroups[groupName] = [h];
                }
            });

            groups[studioName] = nameGroups;
        }

        return groups;
    }

    static build() {
        const byName = (a, b) => a.name.localeCompare(b.name);

        console.log(Db.hStorage);
        console.log(Db.names);
        console.log(Db.studios.sort(byName));
        console.log(Db.series.sort(byName));
        console.log(Db.tags.sort(byName));
        return Db.names;
    }
}

Db.save(
    new H(
        "69 itsuwari no bishou 1",
        "https://play.sonar-cdn.com/play/a1252431-5718-4a1b-9495-75acd83ecde8",
        "https://irex.cc/images/thumb/69-Itsuwari-no-Bishou-1.jpg",
        "Nur",
        "69 Itsuwari no Bishou,69~偽りの微笑~",
        "big boobs,blow job,gang bang,ntr,rape,school girl,stocking,tsundere,virgin",
        "Tại một ngôi trường nơi thành tích đánh giá con người. Aoi Midori là nữ sinh luôn đứng Top 1 và được cả trường ngưỡng mộ. Trong một bài thi Aoi đã đạt số điểm thấp kỉ lục. Để cứu vãn hình tượng, cô phải đi năn nỉ các thầy giáo để họ sửa điểm cho cô. Riêng thầy giáo Izumi không hề bị lay chuyển bởi cơ thể của Aoi. Aoi biết tin Izumi và cô Yoshimura sắp kết hôn. Vì điểm số Aoi đã sai khiến đám fan của mình nảy ra một kế hoạch táo tợn để nhằm ép Izumi..."
    )
);
Db.save(
    new H(
        "shunka shuutou 2",
        "https://play.sonar-cdn.com/play/071ba0cb-6f67-4387-ab6e-3e14e1fbb101",
        "https://irex.cc/images/thumb/Shunka-Shuutou-2.jpg",
        "Nur",
        "Shunkashuutou,旬花蒐陶",
        "big boobs,blow job,rape,school girl,teacher,thủ dâm,tsundere,vanilla",
        "Miharu và Natsumi là hai nữ sinh rất thân với nhau như hình với bóng. Natsumi là cô gái ít nói dè dặt, cô có một cậu bạn trai nhưng ngày càng ít liên lạc với nhau dẫn đến tình cảm lạnh nhạt dần. Miharu thì hay phá đám muốn họ chia tay để Natsumi trở về với mình như xưa. Trong quá trình phá, Miharu thường để cậu sờ mó thân thể và vô tình cậu bạn trai của Natsumi đã phải lòng Miharu. Từ đó anh ta rất ít quan tâm đến Natsumi mà bỏ mặc cô..."
    )
);
window.rs = Db.build();