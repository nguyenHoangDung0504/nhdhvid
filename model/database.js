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
        Db.hStorage.forEach((h) => {
            h.studios.forEach((studio) => {
                if (!groups[studio]) {
                    groups[studio] = [h];
                } else {
                    groups[studio].push(h);
                }
            });
        });

        // Group within each studio group by name
        for (let studioName in groups) {
            let studioGroup = groups[studioName].sort();
            let nameGroups = {};

            studioGroup.forEach((h) => {
                let hName = h.name.toLowerCase();
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
Db.save(
    new H(
        "shunka shuutou 1",
        "https://play.sonar-cdn.com/play/28f06c53-6191-498b-a12f-1d131382e530",
        "https://irex.cc/images/thumb/Shunka-Shuutou-1.jpg",
        "Nur",
        "Shunkashuutou,旬花蒐陶",
        "big boobs,blow job,rape,school girl,tsundere,vanilla,virgin",
        "Miharu và Natsumi là hai nữ sinh rất thân với nhau như hình với bóng. Natsumi là cô gái ít nói dè dặt, cô có một cậu bạn trai nhưng ngày càng ít liên lạc với nhau dẫn đến tình cảm lạnh nhạt dần. Miharu thì hay phá đám muốn họ chia tay để Natsumi trở về với mình như xưa. Trong quá trình phá, Miharu thường để cậu sờ mó thân thể và vô tình cậu bạn trai của Natsumi đã phải lòng Miharu. Từ đó anh ta rất ít quan tâm đến Natsumi mà bỏ mặc cô..."
    )
);
Db.save(
    new H(
        "tsundero series 3",
        "https://play.sonar-cdn.com/play/67d16717-079e-4586-b3cf-9c8299081c3e",
        "https://irex.cc/images/thumb/Tsundero-Series-3.jpg",
        "Bunny Walker,T-Rex",
        "Tsundero Series,ツンデロシリーズ",
        "big boobs,ahegao,blow job,boob job,đồ bơi,femdom,school girl,stocking,tsundere,virgin",
        "Yosuke là một nam sinh viên, gia đình thì cắt tiền chi tiêu và bắt anh tự thây đi làm, họ giới thiệu kèo làm gia sư dạy riêng cho một cô bé tên Yuuna. Cô bé là một nữ sinh Tsundere đáng yêu, quyến rũ với bộ ngực khủng được bao chàng trai tỏ tình nhưng cô bé luôn muốn yêu một người đủ chân thành. Yosuke rất mê các cô bé Loli mặc đồ bơi, anh thường mua phim và game về chúng để tự thẩm và bị Yuuna phát hiện..."
    )
);
Db.save(
    new H(
        "tsundero series 1",
        "https://play.sonar-cdn.com/play/1ded620e-8506-4a86-a878-cbb4195e355e",
        "https://irex.cc/images/thumb/Tsundero-Series-1.jpg",
        "Bunny Walker,T-Rex",
        "Tsundero Series,ツンデロシリーズ",
        "big boobs,ahegao,blow job,boob job,femdom,school girl,tsundere,virgin",
        "Yoshii Yuuka là nữ sinh năm 2 của một học viện. Một nàng hậu xinh đẹp tài sắc vẹn toàn, tuy nhiên phía sau ánh hào quang là một người phụ nữ cuồng dâm nghiện chơi lỗ hậu. Coi vậy Yuuka vẫn còn là một trinh nữ vì ảo tưởng quá nhiều nên vẫn chưa có bồ... Một ngày Yuuka phát hiện kẻ rình rập mình bấy lâu là Kinoshita Takashi đang đứng sục cặc ngay bàn học của mình và vô tình xuất tinh lên người Yuuka. Thế là Yuuka lên cơn nứng lỗ đít..."
    )
);
Db.save(
    new H(
        "tsundero series 2",
        "https://play.sonar-cdn.com/play/07636afc-bd0f-4b5a-89f7-b821b56f103e",
        "https://irex.cc/images/thumb/Tsundero-Series-2.jpg",
        "Bunny Walker,T-Rex",
        "Tsundero Series,ツンデロシリーズ",
        "big boobs,ahegao,anal,blow job,boob job,double penetration,femdom,gang bang,mind break,school girl,stocking,tsundere,virgin",
        "Kizuno Hitomi là một chủ tịch hội học sinh của trường học. Hitomi nghiện cosplay nên thường tham gia các sự kiện lớn nhỏ với trang phục dung tục gợi cảm, đặc biệt là trang phục hầu gái Yuumi. Sau những sự kiện Hitomi thường nứng lồn và về nhà ngồi rên rỉ thủ dâm qua lỗ hậu tuy vậy cô vẫn còn trinh. Việc này học sinh trong trường không ai biết cả, nhưng cho đến một ngày, cô đến văn phòng một câu lạc bộ Anime đề nghị giải tán câu lạc bộ vì họ vi phạm quá nhiều nội quy CLB..."
    )
);
Db.save(
    new H(
        "tsundero series 6",
        "https://play.sonar-cdn.com/play/05c5131d-f09c-4431-ad8a-c6041660302a",
        "https://irex.cc/images/thumb/Tsundero-Series-6.jpg",
        "Bunny Walker,T-Rex",
        "Tsundero Series,ツンデロシリーズ",
        "big boobs,ahegao,blow job,boob job,femdom,foot job,harem,teacher,threesome,virgin",
        "Shiga Yuuto là một nam sinh viên năm nhất bình thường. Cuộc sống của anh bất ngờ thay đổi khi cha anh kết hôn với người phụ nữ hàng xóm. Từ ngày đó, Yuuto có thêm hai cô chị gái riêng là Ayaka, y tá ở trường anh và Haruka, giáo viên thể dục. Ayaka và Haruka định đợi khi Yuuto tốt nghiệp sẽ đè thằng bé ra thịt. Nhưng một ngày nọ, một tai nạn xảy ra đã khiến họ tiến xa hơn so với kế hoạch. Yuuto phải thực hiện lời hứa năm nào là phải cưới cả Ayaka và Haruka..."
    )
);
Db.save(
    new H(
        "tsundero series 5",
        "https://play.sonar-cdn.com/play/aedddbf9-0a0e-4095-8718-1a1074095008",
        "https://irex.cc/images/thumb/Tsundero-Series-5.jpg",
        "Bunny Walker,T-Rex",
        "Tsundero Series,ツンデロシリーズ",
        "big boobs,ahegao,anal,blow job,mind break,school girl,teacher",
        "Aoi là cô gái tài năng thuộc một câu lạc bộ thể dục nhịp điệu của trường. Dù Aoi vô cùng xuất sắc trong các màn trình diễn nhưng cô bé lại có một vấn đề là quá nhút nhát trước đám đông. Trước thềm giải đấu tiếp theo, cô tìm kiếm sự giúp đỡ từ một vị huấn luyện viên để vượt qua sự nhút nhát của mình. Mỗi đêm trong 10 ngày, Aoi sẽ phải làm tất cả những gì huấn luyện viên yêu cầu. Từ đó Aoi phải trải qua 10 ngày liên tục bị quấy rối tình dục. Thay vì sợ hãi, hoang mang thì Aoi dần quen với điều đó và từ khi nào cô bé đã trao cơ thể và cả trái tim mình cho vị huấn luyện viên..."
    )
);
Db.save(
    new H(
        "tsundero series 4",
        "https://play.sonar-cdn.com/play/cb36a281-529a-4d48-8253-1f2acc126b40",
        "https://irex.cc/images/thumb/Tsundero-Series-4.jpg",
        "Bunny Walker,T-Rex",
        "Tsundero Series,ツンデロシリーズ",
        "big boobs,ahegao,blow job,boob job,đồ bơi,femdom,lactation,school girl,tsundere,virgin",
        "Minato Saaya là một nữ sinh Tsundere thuộc một CLB bơi lội. Cô bé luôn tự ti về bộ ngực đầy gợi cảm với cặp ti khủng dài như cặc của mình. Saaya có một người bạn thời thơ ấu tên là Daisuke, cậu luôn tia zú Saya bất cứ khi nào có cơ hội khiến cho Saaya luôn nứng lồn khi gặp cậu. Tuy vậy Saaya khi thủ dâm thì luôn nghĩ đến Daisuke yêu quý của mình. Và rồi một hôm họ chạm mặt nhau ở bể bơi riêng vào ban đêm..."
    )
);
window.rs = Db.build();
