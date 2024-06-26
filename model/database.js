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

        console.log(
            Db.hStorage
                .sort((a, b) => a.studios[0].localeCompare(b.studio[0]))
                .sort(byName)
        );
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
Db.save(
    new H(
        "spectacled sensei’s reward diary 1",
        "https://play.sonar-cdn.com/play/d70f129e-2407-47f1-aa3d-0d6444212e81",
        "https://irex.cc/images/thumb/Spectacled-Senseis-Reward-Diary-1.jpg",
        "Amelialtie",
        "RJ01023645,Spectacled Sensei’s Reward Diary,眼鏡っ娘先生のごほうびダイアリー",
        "big boobs,3d,blow job,boob job,megane,teacher",
        "Thấy cậu học trò của mình tiến bộ hằng ngày. Cô giáo Thảo thường thưởng cho cậu học trò bất cứ thứ gì cậu muốn. Từ trò chơi mò ti trong áo vô tri đến mấy trò như vuốt trụ, mút kẹo... và tiến xa hơn là tạo em bé."
    )
);
Db.save(
    new H(
        "jk fuuzoku gakuensai 1",
        "https://play.sonar-cdn.com/play/d94482ac-e90d-4080-b5f1-30ab181204a4",
        "https://irex.cc/images/thumb/Fuuzoku-Gakuensai-01.jpg",
        "Bunny Walker",
        "Fuuzoku Gakuensai,J〇フーゾク学園祭,OVA J〇フーゾク学園祭 ＃1 ビッチなギャルたちとお祭り騒ぎ 本番接待と露出ミラーハウス",
        "ahegao,big boobs,blow job,boob job,đồ bơi,femdom,school girl,stocking",
        'JK Fuuzoku Gakuensai 1: Fuuzoku Gakuensai: Một ông chú được một nữ sinh bán cho 5 chiếc thẻ VIP của trường nữ sinh mà cô đang theo học. Những tấm thẻ đó là hàng hiếm cực phẩm bởi vì chỉ cần dùng thẻ với bất kỳ nữ sinh nào trong trường đó thì họ đều phải phục vụ một "dịch vụ đặc biệt"'
    )
);
Db.save(
    new H(
        "jk fuuzoku gakuensai 2",
        "https://play.sonar-cdn.com/play/0712b33c-b285-417e-85a5-8a39adf4d684",
        "https://irex.cc/images/thumb/Fuuzoku-Gakuensai-02.jpg",
        "Bunny Walker",
        "Fuuzoku Gakuensai,J〇フーゾク学園祭,OVA J〇フーゾク学園祭 ＃1 ビッチなギャルたちとお祭り騒ぎ 本番接待と露出ミラーハウス",
        "ahegao,big boobs,blow job,boob job,đồ bơi,femdom,school girl,stocking",
        'JK Fuuzoku Gakuensai 2: Fuuzoku Gakuensai: Một ông chú được một nữ sinh bán cho 5 chiếc thẻ VIP của trường nữ sinh mà cô đang theo học. Những tấm thẻ đó là hàng hiếm cực phẩm bởi vì chỉ cần dùng thẻ với bất kỳ nữ sinh nào trong trường đó thì họ đều phải phục vụ một "dịch vụ đặc biệt"'
    )
);
Db.save(
    new H(
        "mako-chan kaihatsu nikki 1",
        "https://play.sonar-cdn.com/play/246ac8a5-dea8-44a9-bc0e-fa5efb04111c",
        "https://irex.cc/images/thumb/mako-chan-Kaihatsu-Nikki-1.jpg",
        "Bunny Walker",
        "Mako-chan Kaihatsu Nikki,まこちゃん開発日記",
        "blow job,ahegao,big boobs,loạn luân,mind break,ntr,school girl,stocking,virgin",
        "Makoto cậu bạn thời thơ ấu Kaoru tỏ tình. Đó là lần đầu tiên cô hôn cậu ấy trong niềm vui sướng khi được cậu ấy đáp lại bằng nụ hôn nồng nàn, thắm thiết. Makoto có một ham muốn tình dục mạnh mẽ và cũng rất thích những thứ dâm dục. Thay vì kìm nén nó, cô dành nhiều thời gian mỗi ngày ngày để xem hentai và thủ dâm. Nhưng bí mật đó chẳng bao lâu đã bị anh trai cô phát hiện..."
    )
);
Db.save(
    new H(
        "mako-chan kaihatsu nikki 2",
        "https://play.sonar-cdn.com/play/b61eee01-ffac-4444-a697-ac122bba1c47",
        "https://irex.cc/images/thumb/Mako-chan-Kaihatsu-Nikki-2.jpg",
        "Bunny Walker",
        "Mako-chan Kaihatsu Nikki,まこちゃん開発日記",
        "blow job,ahegao,anal,big boobs,loạn luân,mind break,ntr,school girl,stocking",
        "Makoto được cậu bạn thời thơ ấu Kaoru tỏ tình. Đó là lần đầu tiên cô hôn cậu ấy trong niềm vui sướng khi được cậu ấy đáp lại bằng nụ hôn nồng nàn, thắm thiết. Makoto có một ham muốn tình dục mạnh mẽ và cũng rất thích những thứ dâm dục. Thay vì kìm nén nó, cô dành nhiều thời gian mỗi ngày ngày để xem hentai và thủ dâm. Nhưng bí mật đó chẳng bao lâu đã bị anh cô phát hiện..."
    )
);
Db.save(
    new H(
        "mako-chan kaihatsu nikki 3",
        "https://play.sonar-cdn.com/play/23de94f4-8fb7-4892-8017-1d673aee60ba",
        "https://irex.cc/images/thumb/Mako-chan-Kaihatsu-Nikki-3.jpg",
        "Bunny Walker",
        "Mako-chan Kaihatsu Nikki,まこちゃん開発日記",
        "blow job,ahegao,big boobs,loạn luân,mind break,ntr,school girl,stocking",
        "Makoto được cậu bạn thời thơ ấu Kaoru tỏ tình. Đó là lần đầu tiên cô hôn cậu ấy trong niềm vui sướng khi được cậu ấy đáp lại bằng nụ hôn nồng nàn, thắm thiết. Makoto có một ham muốn tình dục mạnh mẽ và cũng rất thích những thứ dâm dục. Thay vì kìm nén nó, cô dành nhiều thời gian mỗi ngày ngày để xem hentai và thủ dâm. Nhưng bí mật đó chẳng bao lâu đã bị anh cô phát hiện..."
    )
);
Db.save(
    new H(
        "mako-chan kaihatsu nikki 4",
        "https://play.sonar-cdn.com/play/fe3a793b-918a-48ba-98bd-ec3d9a3269f8",
        "https://irex.cc/images/thumb/Mako-chan-Kaihatsu-Nikki-4.jpg",
        "Bunny Walker",
        "Mako-chan Kaihatsu Nikki,まこちゃん開発日記",
        "blow job,ahegao,big boobs,loạn luân,mind break,ntr,school girl,stocking",
        "Makoto được cậu bạn thời thơ ấu Kaoru tỏ tình. Đó là lần đầu tiên cô hôn cậu ấy trong niềm vui sướng khi được cậu ấy đáp lại bằng nụ hôn nồng nàn, thắm thiết. Makoto có một ham muốn tình dục mạnh mẽ và cũng rất thích những thứ dâm dục. Thay vì kìm nén nó, cô dành nhiều thời gian mỗi ngày ngày để xem hentai và thủ dâm. Nhưng bí mật đó chẳng bao lâu đã bị anh cô phát hiện..."
    )
);
Db.save(
    new H(
        "bonyuu-chan wa dashitai 4",
        "https://play.sonar-cdn.com/play/5f087875-929c-4bc5-ace5-33e0cf9e6178",
        "https://irex.cc/images/thumb/Bonyuu-chan-wa-Dashitai-4.jpg",
        "Bunny Walker",
        "Bonyuu-chan wa Dashitai,母乳ちゃんは射したい。",
        "big boobs,ahegao,blow job,boob job,đồ bơi,femdom,harem,lactation,loạn luân,mind break,school girl,stocking,vanilla",
        "Kai Hikaru là một cậu học sinh bình thường như bao bạn học khác. Nhưng được cái tính tình cậu hiền lành và mặt hơi trẻ con nên được hội trưởng học sinh trên cậu 1 lớp là Tomomi để mắt. Cho đến một ngày hội trưởng Tomomi hẹn gặp cậu để nói một vấn đề thầm kín của cô mà mong muốn cậu sẽ giúp cô ấy."
    )
);
Db.save(
    new H(
        "bonyuu-chan wa dashitai 1",
        "https://play.sonar-cdn.com/play/9eaf7a97-973a-4265-931c-680bce5abbaa",
        "https://irex.cc/images/thumb/Bonyuu-chan-wa-Dashitai-1.jpg",
        "Bunny Walker",
        "Bonyuu-chan wa Dashitai,母乳ちゃんは射したい。",
        "big boobs,blow job,boob job,femdom,lactation,school girl,vanilla",
        "Kai Hikaru là một cậu học sinh bình thường như bao bạn học khác. Nhưng được cái tính tình cậu hiền lành và mặt hơi trẻ con nên được hội trưởng học sinh trên cậu 1 lớp là Tomomi để mắt. Cho đến một ngày hội trưởng Tomomi hẹn gặp cậu để nói một vấn đề thầm kín của cô mà mong muốn cậu sẽ giúp cô ấy."
    )
);
Db.save(
    new H(
        "bonyuu-chan wa dashitai 2",
        "https://play.sonar-cdn.com/play/2ce7c120-020e-44ec-ab38-2aa5df4c5dcd",
        "https://irex.cc/images/thumb/Bonyuu-chan-wa-Dashitai-2.jpg",
        "Bunny Walker",
        "Bonyuu-chan wa Dashitai,母乳ちゃんは射したい。",
        "big boobs,blow job,boob job,lactation,maid,school girl,stocking,vanilla",
        "Kai Hikaru là một cậu học sinh bình thường như bao bạn học khác. Nhưng được cái tính tình cậu hiền lành và mặt hơi trẻ con nên được hội trưởng học sinh trên cậu 1 lớp là Tomomi để mắt. Cho đến một ngày hội trưởng Tomomi hẹn gặp cậu để nói một vấn đề thầm kín của cô mà mong muốn cậu sẽ giúp cô ấy."
    )
);
Db.save(
    new H(
        "bonyuu-chan wa dashitai 3",
        "https://play.sonar-cdn.com/play/2f70e768-7be2-488f-98aa-8eab26798fee",
        "https://irex.cc/images/thumb/Bonyuu-chan-wa-Dashitai-3.jpg",
        "Bunny Walker",
        "Bonyuu-chan wa Dashitai,母乳ちゃんは射したい。",
        "big boobs,blow job,boob job,femdom,harem,lactation,loạn luân,school girl,stocking,threesome,vanilla,virgin",
        "Kai Hikaru là một cậu học sinh bình thường như bao bạn học khác. Nhưng được cái tính tình cậu hiền lành và mặt hơi trẻ con nên được hội trưởng học sinh trên cậu 1 lớp là Tomomi để mắt. Cho đến một ngày hội trưởng Tomomi hẹn gặp cậu để nói một vấn đề thầm kín của cô mà mong muốn cậu sẽ giúp cô ấy."
    )
);
Db.save(
    new H(
        "chizuru-chan kaihatsu nikki 2",
        "https://play.sonar-cdn.com/play/63a76e5e-759c-4630-ac19-a0e44e934fa4",
        "https://irex.cc/images/thumb/Chizuru-chan-Kaihatsu-Nikki-2.jpg",
        "Bunny Walker",
        "Chizuru-chan Kaihatsu Nikki,千鶴ちゃん開発日記",
        "ahegao,anal,big boobs,blow job,mind break,plot,rape,school girl,sex toy,stocking,teacher,tsundere,ugly bastard",
        "Shiina một cô gái là học sinh gương mẫu của trường, cô thường xuyên gây hấn với ông thầy trơ trẽn Tamura. Trong một lần cãi vã, Tamura định dơ tay đánh cô nhưng đã được thầy giáo Tsukino, người mà cô yêu mến cản lại. Từ ấy cô lại càng có tình cảm sâu đậm với thầy Tsukino hơn. Trong một ông thầy Tamura tính để cuốn sổ ghi nợ vào hộc bàn của Tsukino nhằm đổ tội tiền biển thủ của ông ta sang cho Tsukino thì bị Shiina bắt gặp. Ông ta đã nhanh trong đổi trắng thay đen, nói rằng đã phát hiện cuốn sổ nợ trong ngăn bàn của Tsukino. Cũng bất ngờ, điều đó lại khiến cho Shiina tin theo, và cô yêu cầu ông ta không nói ra và hứu sẽ làm bất cứ điều gì ông ta muốn, miễn là không kể chuyện cuốn sổ cho ai..."
    )
);
Db.save(
    new H(
        "chizuru-chan kaihatsu nikki 6",
        "https://play.sonar-cdn.com/play/9442015b-b737-4422-af3c-960e4e87b29d",
        "https://irex.cc/images/thumb/Chizuru-chan-Kaihatsu-Nikki-6.jpg",
        "Bunny Walker",
        "Chizuru-chan Kaihatsu Nikki,千鶴ちゃん開発日記",
        "ahegao,anal,big boobs,blow job,bondage,boob job,mind break,orgy,plot,school girl,sex toy,stocking,teacher,tsundere,ugly bastard,yuri",
        "Shiina một cô gái là học sinh gương mẫu của trường, cô thường xuyên gây hấn với ông thầy trơ trẽn Tamura. Trong một lần cãi vã, Tamura định dơ tay đánh cô nhưng đã được thầy giáo Tsukino, người mà cô yêu mến cản lại. Từ ấy cô lại càng có tình cảm sâu đậm với thầy Tsukino hơn. Trong một ông thầy Tamura tính để cuốn sổ ghi nợ vào hộc bàn của Tsukino nhằm đổ tội tiền biển thủ của ông ta sang cho Tsukino thì bị Shiina bắt gặp. Ông ta đã nhanh trong đổi trắng thay đen, nói rằng đã phát hiện cuốn sổ nợ trong ngăn bàn của Tsukino. Cũng bất ngờ, điều đó lại khiến cho Shiina tin theo, và cô yêu cầu ông ta không nói ra và hứu sẽ làm bất cứ điều gì ông ta muốn, miễn là không kể chuyện cuốn sổ cho ai..."
    )
);
Db.save(
    new H(
        "chizuru-chan kaihatsu nikki 1",
        "https://play.sonar-cdn.com/play/6ff58e4e-3772-435d-9634-6bbbf5bd2486",
        "https://irex.cc/images/thumb/Chizuru-chan-Kaihatsu-Nikki-1.jpg",
        "Bunny Walker",
        "Chizuru-chan Kaihatsu Nikki,千鶴ちゃん開発日記",
        "ahegao,big boobs,blow job,plot,rape,school girl,stocking,teacher,tsundere,ugly bastard,virgin",
        "Shiina một cô gái là học sinh gương mẫu của trường, cô thường xuyên gây hấn với ông thầy trơ trẽn Tamura. Trong một lần cãi vã, Tamura định dơ tay đánh cô nhưng đã được thầy giáo Tsukino, người mà cô yêu mến cản lại. Từ ấy cô lại càng có tình cảm sâu đậm với thầy Tsukino hơn. Trong một ông thầy Tamura tính để cuốn sổ ghi nợ vào hộc bàn của Tsukino nhằm đổ tội tiền biển thủ của ông ta sang cho Tsukino thì bị Shiina bắt gặp. Ông ta đã nhanh trong đổi trắng thay đen, nói rằng đã phát hiện cuốn sổ nợ trong ngăn bàn của Tsukino. Cũng bất ngờ, điều đó lại khiến cho Shiina tin theo, và cô yêu cầu ông ta không nói ra và hứu sẽ làm bất cứ điều gì ông ta muốn, miễn là không kể chuyện cuốn sổ cho ai..."
    )
);
Db.save(
    new H(
        "chizuru-chan kaihatsu nikki 5",
        "https://play.sonar-cdn.com/play/d1a0c0ed-df1c-41c9-8c9c-ae74b127a029",
        "https://irex.cc/images/thumb/Chizuru-chan-Kaihatsu-Nikki-5.jpg",
        "Bunny Walker",
        "Chizuru-chan Kaihatsu Nikki,千鶴ちゃん開発日記",
        "ahegao,big boobs,mind break,plot,school girl,sex toy,stocking,teacher,tsundere,ugly bastard",
        "Shiina một cô gái là học sinh gương mẫu của trường, cô thường xuyên gây hấn với ông thầy trơ trẽn Tamura. Trong một lần cãi vã, Tamura định dơ tay đánh cô nhưng đã được thầy giáo Tsukino, người mà cô yêu mến cản lại. Từ ấy cô lại càng có tình cảm sâu đậm với thầy Tsukino hơn. Trong một ông thầy Tamura tính để cuốn sổ ghi nợ vào hộc bàn của Tsukino nhằm đổ tội tiền biển thủ của ông ta sang cho Tsukino thì bị Shiina bắt gặp. Ông ta đã nhanh trong đổi trắng thay đen, nói rằng đã phát hiện cuốn sổ nợ trong ngăn bàn của Tsukino. Cũng bất ngờ, điều đó lại khiến cho Shiina tin theo, và cô yêu cầu ông ta không nói ra và hứu sẽ làm bất cứ điều gì ông ta muốn, miễn là không kể chuyện cuốn sổ cho ai..."
    )
);
Db.save(
    new H(
        "chizuru-chan kaihatsu nikki 3",
        "https://play.sonar-cdn.com/play/fbfd3f43-f0d2-4a4e-87e5-09d687394c88",
        "https://irex.cc/images/thumb/Chizuru-chan-Kaihatsu-Nikki-3.jpg",
        "Bunny Walker",
        "Chizuru-chan Kaihatsu Nikki,千鶴ちゃん開発日記",
        "ahegao,anal,big boobs,blow job,double penetration,mind break,plot,rape,school girl,sex toy,stocking,teacher,tsundere,ugly bastard",
        "Shiina một cô gái là học sinh gương mẫu của trường, cô thường xuyên gây hấn với ông thầy trơ trẽn Tamura. Trong một lần cãi vã, Tamura định dơ tay đánh cô nhưng đã được thầy giáo Tsukino, người mà cô yêu mến cản lại. Từ ấy cô lại càng có tình cảm sâu đậm với thầy Tsukino hơn. Trong một ông thầy Tamura tính để cuốn sổ ghi nợ vào hộc bàn của Tsukino nhằm đổ tội tiền biển thủ của ông ta sang cho Tsukino thì bị Shiina bắt gặp. Ông ta đã nhanh trong đổi trắng thay đen, nói rằng đã phát hiện cuốn sổ nợ trong ngăn bàn của Tsukino. Cũng bất ngờ, điều đó lại khiến cho Shiina tin theo, và cô yêu cầu ông ta không nói ra và hứu sẽ làm bất cứ điều gì ông ta muốn, miễn là không kể chuyện cuốn sổ cho ai..."
    )
);
Db.save(
    new H(
        "chizuru-chan kaihatsu nikki 4",
        "https://play.sonar-cdn.com/play/1d518c43-e449-438c-848c-bba7ab240813",
        "https://irex.cc/images/thumb/Chizuru-chan-Kaihatsu-Nikki-4.jpg",
        "Bunny Walker",
        "Chizuru-chan Kaihatsu Nikki,千鶴ちゃん開発日記",
        "ahegao,big boobs,blow job,bondage,mind break,plot,rape,school girl,sex toy,stocking,teacher,threesome,tsundere,ugly bastard",
        "Shiina một cô gái là học sinh gương mẫu của trường, cô thường xuyên gây hấn với ông thầy trơ trẽn Tamura. Trong một lần cãi vã, Tamura định dơ tay đánh cô nhưng đã được thầy giáo Tsukino, người mà cô yêu mến cản lại. Từ ấy cô lại càng có tình cảm sâu đậm với thầy Tsukino hơn. Trong một ông thầy Tamura tính để cuốn sổ ghi nợ vào hộc bàn của Tsukino nhằm đổ tội tiền biển thủ của ông ta sang cho Tsukino thì bị Shiina bắt gặp. Ông ta đã nhanh trong đổi trắng thay đen, nói rằng đã phát hiện cuốn sổ nợ trong ngăn bàn của Tsukino. Cũng bất ngờ, điều đó lại khiến cho Shiina tin theo, và cô yêu cầu ông ta không nói ra và hứu sẽ làm bất cứ điều gì ông ta muốn, miễn là không kể chuyện cuốn sổ cho ai..."
    )
);
Db.save(
    new H(
        "succubus yondara haha ga kita 1",
        "https://play.sonar-cdn.com/play/14042afc-5646-4842-b9ed-401cf8aa0f4b",
        "https://irex.cc/images/thumb/succubus-Yondara-Haha-Ga-Kita-1.jpg",
        "Bunny Walker",
        "Succubus Yondara Haha Ga Kita",
        "big boobs,blow job,loạn luân,megane,milf,stocking,succubus",
        "Takashi là một cậu học sinh vẫn dùng con cu 18 năm của mình chỉ để đái. Mặc dù anh rất muốn thoát khỏi kiếp trai tân, nhưng lại không có khiếu tán gái. Cho đến một ngày, anh tìm được trên mạng cách triệu hồi sắc yêu. Nhưng để thực hiện thành công thì người triệu hồi không được quay tay trong 72 ngày liên tiếp. Sau đó dù thành công trong việc triệu hồi một con sắc yêu, nhưng điều khiến anh ta ngạc nhiên là người đó rất giống người mẹ kế của mình..."
    )
);
Db.save(
    new H(
        "succubus yondara haha ga kita 2",
        "https://play.sonar-cdn.com/play/51f370df-3cb8-4c9e-a472-112bc8b48031",
        "https://irex.cc/images/thumb/succubus-Yondara-Haha-Ga-Kita-2.jpg",
        "Bunny Walker",
        "Succubus Yondara Haha Ga Kita",
        "big boobs,blow job,boob job,megane,milf,stocking,succubus",
        "Takashi là một cậu học sinh vẫn dùng con cu 18 năm của mình chỉ để đái. Mặc dù anh rất muốn thoát khỏi kiếp trai tân, nhưng lại không có khiếu tán gái. Cho đến một ngày, anh tìm được trên mạng cách triệu hồi sắc yêu. Nhưng để thực hiện thành công thì người triệu hồi không được quay tay trong 72 ngày liên tiếp. Sau đó dù thành công trong việc triệu hồi một con sắc yêu, nhưng điều khiến anh ta ngạc nhiên là người đó rất giống người mẹ kế của mình..."
    )
);
Db.save(
    new H(
        "himitsu no kichi 1",
        "https://play.sonar-cdn.com/play/1f4b42c0-1f55-482f-8555-72df95310f5a",
        "https://irex.cc/images/thumb/Himitsu-no-Kichi-1.jpg",
        "Queen Bee",
        "Himitsu no Kichi,ひみつのきち",
        "big boobs,blow job,femdom,stocking,vanilla,virgin",
        "Không hẹn mà đến, Ayano đã xuất hiện bất chợt tại phòng của Mine và bắt cậu ta ra nông trại nhà mình để phụ giúp làm vườn cùng cô. Khi tưới vườn rau, một tai nạn nhỏ đã xảy ra khiến quần áo cả hai ướt nhẹp. Dưới lớp áo mỏng manh, bầu ngực căng tràn cùng núm vú của cô dần lộ ra một cách khiêu gợi. Sau vụ tai nạn hai người điềm tĩnh ngồi tại một gốc cây và bắt đầu màn tỏ tình..."
    )
);
Db.save(
    new H(
        "himitsu no kichi 2",
        "https://play.sonar-cdn.com/play/2959685c-47d6-463d-8e69-537b96655e01",
        "https://irex.cc/images/thumb/Himitsu-no-Kichi-2.jpg",
        "Queen Bee",
        "Himitsu no Kichi,ひみつのきち",
        "big boobs,blow job,boob job,đồ bơi,femdom,harem,stocking,threesome,vanilla,virgin",
        "Tanabe không biết bơi, nên cậu rất ngại đi tắm biển. Nhưng để quyết tâm ra biển để cua gái cho dễ thì cậu đã đi học bơi. Cậu được dạy bởi Shinozaki, một nữ giáo viên dạy bơi. Trong một lần thích thể hiện trước mặt cô giáo thì cậu suýt chết đuối nhưng đã được cô cứu và hô hấp nhân tạo. Lúc đó tự nhiên cây gậy của cậu lòi ra làm cô giáo bất ngờ..."
    )
);
Db.save(
    new H(
        "seika jogakuin kounin sao ojisan 3",
        "https://play.sonar-cdn.com/play/ed8b9609-6f2d-4be8-a41f-23ed42d77bd2",
        "https://irex.cc/images/thumb/Seika-Jogakuin-Kounin-Sao-Ojisan-3.jpg",
        "Bunny Walker",
        "Seika Jogakuin Kounin Sao Ojisan,聖華女学院公認竿おじさん",
        "big boobs,ahegao,blow job,boob job,đồ bơi,femdom,harem,megane,school girl,stocking,threesome",
        "Học viện tư thục nữ sinh Seika là một trong những ngôi trường nổi tiếng bậc nhất của Nhật chỉ dành cho những học sinh kiệt suất và con của giới thượng lưu. Chính vì sự gò bó về áp lực học tập nên trường đã bí mật thuê trai bao để giúp các nữ sinh giải tỏa ham muốn sau những giờ học tập mệt mỏi. Tôi, một thằng con trai đã có vợ con nhưng vô tình bị dính vào khoản nợ khổng lồ của thằng bạn lồn. Để giấu gia đình và trả nợ hộ, tôi đã ứng cử vào vị trí trai bao của ngôi trường..."
    )
);
Db.save(
    new H(
        "seika jogakuin kounin sao ojisan 1",
        "https://play.sonar-cdn.com/play/4718de8c-5bb2-41a7-906d-23e6b81a03b0",
        "https://irex.cc/images/thumb/Seika-Jogakuin-Kounin-Sao-Ojisan-1.jpg",
        "Bunny Walker",
        "Seika Jogakuin Kounin Sao Ojisan,聖華女学院公認竿おじさん",
        "big boobs,ahegao,blow job,boob job,femdom,megane,stocking",
        "Học viện tư thục nữ sinh Seika là một trong những ngôi trường nổi tiếng bậc nhất của Nhật chỉ dành cho những học sinh kiệt suất và con của giới thượng lưu. Chính vì sự gò bó về áp lực học tập nên trường đã bí mật thuê trai bao để giúp các nữ sinh giải tỏa ham muốn sau những giờ học tập mệt mỏi. Tôi, một thằng con trai đã có vợ con nhưng vô tình bị dính vào khoản nợ khổng lồ của thằng bạn lồn. Để giấu gia đình và trả nợ hộ, tôi đã ứng cử vào vị trí trai bao của ngôi trường..."
    )
);
Db.save(
    new H(
        "seika jogakuin kounin sao ojisan 2",
        "https://play.sonar-cdn.com/play/2251d413-0c30-4575-aba9-1960001030fd",
        "https://irex.cc/images/thumb/Seika-Jogakuin-Kounin-Sao-Ojisan-2.jpg",
        "Bunny Walker",
        "Seika Jogakuin Kounin Sao Ojisan,聖華女学院公認竿おじさん",
        "big boobs,ahegao,blow job,megane,milf,stocking",
        "Học viện tư thục nữ sinh Seika là một trong những ngôi trường nổi tiếng bậc nhất của Nhật chỉ dành cho những học sinh kiệt suất và con của giới thượng lưu. Chính vì sự gò bó về áp lực học tập nên trường đã bí mật thuê trai bao để giúp các nữ sinh giải tỏa ham muốn sau những giờ học tập mệt mỏi. Tôi, một thằng con trai đã có vợ con nhưng vô tình bị dính vào khoản nợ khổng lồ của thằng bạn lồn. Để giấu gia đình và trả nợ hộ, tôi đã ứng cử vào vị trí trai bao của ngôi trường..."
    )
);
Db.save(
    new H(
        "seika jogakuin kounin sao ojisan 4",
        "https://play.sonar-cdn.com/play/7b923409-7cb4-4cbd-ad45-6e99f66ed076",
        "https://irex.cc/images/thumb/Seika-Jogakuin-Kounin-Sao-Ojisan-4.jpg",
        "Bunny Walker",
        "Seika Jogakuin Kounin Sao Ojisan,聖華女学院公認竿おじさん",
        "big boobs,ahegao,blow job,boob job,mind break,school girl,stocking,tsundere",
        "Học viện tư thục nữ sinh Seika là một trong những ngôi trường nổi tiếng bậc nhất của Nhật chỉ dành cho những học sinh kiệt suất và con của giới thượng lưu. Chính vì sự gò bó về áp lực học tập nên trường đã bí mật thuê trai bao để giúp các nữ sinh giải tỏa ham muốn sau những giờ học tập mệt mỏi. Tôi, một thằng con trai đã có vợ con nhưng vô tình bị dính vào khoản nợ khổng lồ của thằng bạn lồn. Để giấu gia đình và trả nợ hộ, tôi đã ứng cử vào vị trí trai bao của ngôi trường..."
    )
);
Db.save(
    new H(
        "imouto bitch ni shiboraretai 1",
        "https://play.sonar-cdn.com/play/4debe67e-1c56-4b46-be8e-ead77b40b04a",
        "https://irex.cc/images/thumb/Imouto-Bitch-ni-Shiboraretai.jpg",
        "Bunny Walker,T-Rex",
        "Imouto Bitch ni Shiboraretai,Imouto Bitch ni Shiboraretai không che,Imouto Bitch ni Shiboraretai uncensored full hd vietsub,Imouto Bitch ni Shiboraretai vietsub thuyết minh,xem hentai Imouto Bitch ni Shiboraretai",
        "big boobs,blow job,boob job,đồ bơi,loạn luân,school girl,stocking,virgin",
        "Imouto Bitch ni Shiboraretai 1: Vào một buổi gặp mặt hẹn hò nhóm các cặp đôi nam nữ có chung ham muốn tình dục. Nhưng thật bất ngờ khi anh main nhà ta lại gặp ngay phải cô em gái của mình, họ có chơi một trò chơi, người thua sẽ phải nghe lệnh người thắng..."
    )
);
Db.save(
    new H(
        "imouto bitch ni shiboraretai 2",
        "https://play.sonar-cdn.com/play/ae91169e-5258-4b80-a2c7-31238fe85433",
        "https://irex.cc/images/thumb/Imouto-Bitch-ni-Shiboraretai.jpg",
        "Bunny Walker,T-Rex",
        "Imouto Bitch ni Shiboraretai,Imouto Bitch ni Shiboraretai không che,Imouto Bitch ni Shiboraretai uncensored full hd vietsub,Imouto Bitch ni Shiboraretai vietsub thuyết minh,xem hentai Imouto Bitch ni Shiboraretai",
        "big boobs,blow job,boob job,đồ bơi,loạn luân,school girl,stocking,virgin",
        "Imouto Bitch ni Shiboraretai 2: Vào một buổi gặp mặt hẹn hò nhóm các cặp đôi nam nữ có chung ham muốn tình dục. Nhưng thật bất ngờ khi anh main nhà ta lại gặp ngay phải cô em gái của mình, họ có chơi một trò chơi, người thua sẽ phải nghe lệnh người thắng..."
    )
);
Db.save(
    new H(
        "no waifu no life 1",
        "https://play.sonar-cdn.com/play/ca8f9b01-069b-423f-b0cb-116f71843702",
        "https://irex.cc/images/thumb/No-Waifu-No-Life-1.jpg",
        "Queen Bee",
        "No Waifu No Life,NO 猥婦 NO LIFE！",
        "big boobs,ahegao,blow job,boob job,milf,mind break,ntr,rape,stocking",
        "Phần 1: Vợ của chủ nhà Marin là một phụ nữ vừa mới kết hôn. Cô cùng chồng chuyển đến một căn hộ mới sinh sống. Ngày đầu tiên sang chào hỏi hàng xóm, cô vô tình hội ngộ Murai, một huấn luyện viên bóng chày cũ của cô. Hắn ta là người từng quấy rối tình dục cô ngày xưa. Murai bắt đầu cuộc hành trình thưởng thức vợ thằng khác... Phần 2: Người mẹ dịu hiền Câu chuyện về một bà mẹ hết mực yêu thương cậu con trai Yuuri của mình. Yuuri cũng thường quay lén mẹ mình thay đồ để sục cặc và bị cô phát hiện. Một ngày khi bạn của Yuuri là Hiroki ghé chơi. Hiroki phát hiện cô đang thủ dâm vì chồng mình địt chưa đã. Và rồi ngày sang ngày Hiroki đều đến nhà thay thế ông chồng bất lực để thỏa mãn cô. Yuuri phát hiện mẹ mình bị thằng bạn giã cũng đành bất lực..."
    )
);
Db.save(
    new H(
        "sisters' sexual circumstances 1",
        "https://play.sonar-cdn.com/play/e115de49-d56b-4add-85c3-5809a07895a0",
        "https://irex.cc/images/thumb/Sisters-Sexual-circumstances.jpg",
        "Umemaro 3D",
        "Sisters' Sexual Circumstances,UMEMARO,umemaro vol 17,umemaro vol17",
        "3d,big boobs,blow job,boob job,foot job,harem,milf,school girl,threesome,thủ dâm",
        "Sisters' Sexual Circumstances 1: Bước vào nhà, cô em gái Yuika đã chờ sẵn, có vẻ cô và chị gái đã mong anh tới rất lâu rồi. Hôm nay có vẻ là một ngày dài... Đêm đó anh nghe thấy tiếng của chị gái mình phòng đối diện, chợt mở hé cửa, anh không còn tin vào mắt mình nữa...."
    )
);
Db.save(
    new H(
        "cheeky girl 1",
        "https://play.sonar-cdn.com/play/dc305859-039f-4d80-9b9f-6d22170ade8d",
        "https://1.bp.blogspot.com/-7wW6S7F6Es0/XIpfN29AUCI/AAAAAAAACwI/6i11Lyd9J78J3-i5JH28tVITSiwJNsjvwCLcBGAs/w300/cheeky-girl.jpg",
        "Umemaro 3D",
        "Cheeky Girl,Umemaro 3D,Umemaro 3D movie collection #14,いまどきのおんなのこ",
        "3d,big boobs,blow job,boob job,school girl,teacher",
        'Cheeky Girl (いまどきのおんなのこ ) 1: Cheeky Girl (Cô gái táo bạo) tiêu đề đã thấy khá nứng rồi. Kì thi sắp tới giờ đã đến lúc các cô gái phải gấp rút học hành để đạt kết quả tốt... Hoặc là "làm gì đó" như "Linh Ka" nói "Điểm giờ có thể mua được mà". #Umemaro 3D movie collection #14'
    )
);
Db.save(
    new H(
        "umemaro vol 20 - ntr sex friends game 1",
        "https://play.sonar-cdn.com/play/1feb85a2-1df5-4e98-a9aa-bdab20280878",
        "https://irex.cc/images/thumb/Umemaro-Vol-20-NTR-SEX-Friends-1.jpg",
        "Umemaro 3D",
        "UMEMARO,梅麻呂3D",
        "anal,big boobs,blow job,boob job,double penetration,ntr,rape,threesome",
        "Câu chuyện về tình cảm lạnh giữa giữa 3 người bạn."
    )
);
Db.save(
    new H(
        "ane wa yanmama junyuuchuu 1",
        "https://play.sonar-cdn.com/play/4acc6638-b5d6-4f35-bf36-f3646d4f90c6",
        "https://irex.cc/images/thumb/Ane-wa-Yanmama-Junyuuchuu-01.jpg",
        "Bunny Walker,T-Rex",
        "Ane wa Yanmama Junyuuchuu,Gishi wa Yan Mama Junyuu Chuu,義姉はヤンママ授乳中",
        "big boobs,blow job,boob job,đồ bơi,lactation,loạn luân,milf,ntr",
        'Ane wa Yanmama Junyuuchuu 1: Bà chị gái kế trở lên mập mạp, múp míp sau khi vừa sinh con, Takuya cũng thích những cô gái đầy đặn phổng phao như vậy. Nhìn thấy cảnh chị dâu mình cho con bú, anh vã lắm nhưng không thể làm gì. Chị ấy trêu cậu và nói "Này em có muốn làm một hớp không?". Cậu nghe xong mà cũng cay lắm chứ, vì chị gái suốt ngày chỉ coi cậu như thằng nhóc đầu 5 tuổi nhà chị...'
    )
);
Db.save(
    new H(
        "ane wa yanmama junyuuchuu 2",
        "https://play.sonar-cdn.com/play/caf1b0e7-9d80-4af2-a2e3-ed266279c227",
        "https://irex.cc/images/thumb/Ane-wa-Yanmama-Junyuuchuu-01.jpg",
        "Bunny Walker,T-Rex",
        "Ane wa Yanmama Junyuuchuu,Gishi wa Yan Mama Junyuu Chuu,義姉はヤンママ授乳中",
        "big boobs,blow job,boob job,đồ bơi,lactation,loạn luân,milf,ntr",
        'Ane wa Yanmama Junyuuchuu 2: Bà chị gái kế trở lên mập mạp, múp míp sau khi vừa sinh con, Takuya cũng thích những cô gái đầy đặn phổng phao như vậy. Nhìn thấy cảnh chị dâu mình cho con bú, anh vã lắm nhưng không thể làm gì. Chị ấy trêu cậu và nói "Này em có muốn làm một hớp không?". Cậu nghe xong mà cũng cay lắm chứ, vì chị gái suốt ngày chỉ coi cậu như thằng nhóc đầu 5 tuổi nhà chị...'
    )
);
Db.save(
    new H(
        "youkoso sukebe elf no mori e 2",
        "https://play.sonar-cdn.com/play/c708bc62-6d9b-4db0-a9bc-bfd7339cbe89",
        "https://irex.cc/images/thumb/Youkoso-Sukebe-Elf-no-Mori-e-1.jpg",
        "Bunny Walker,T-Rex",
        "xem phim Youkoso Sukebe Elf no Mori e vietsub hd,Youkoso Sukebe Elf no Mori e vietsub không che,Youkoso! Sukebe Elf no Mori e,ようこそ! スケベエルフの森へ",
        "ahegao,big boobs,blow job,boob job,dark skin,elf,femdom,gang bang,harem,loli,megane,milf,mind break,plot,threesome,virgin",
        "Youkoso Sukebe Elf no Mori e 2: Alfheim, một thế giới của Elf, nơi chỉ có phụ nữ sinh sống. Vùng đất xứ Shrine, cội nguồn sức mạnh ma thuật của các Elf, đã bắt yếu dần và chủng tộc có nguy cơ tuyệt chủng. Sau đó, có một lời tiên tri rằng một người đàn ông từ một thế giới khác đã được chọn là người cứu tinh cho chủng tộc elf. Ít lâu sau, vị anh hùng đã được đưa đến với thế giới của Elves ... Các Elf trụ cột họ phải sống sót qua việc tạo ra đứa trẻ với vị anh hùng. Nhưng nhiều Elf khác đã từ chối quyết định khiếm nhã này và do đó các Elf được chia thành hai nhóm: Những người khinh thường việc tạo ra đứa trẻ với một người đàn ông và những người chấp nhận sự thật. Nhưng những người đã chấp nhận đã khám phá ra một điều gì đó: Hóa ra khi quan hệ với anh ta và tinh dịch vào trong cơ thể họ, sức mạnh ma thuật của họ tăng lên. Vì vậy, họ tiến tới và hấp tinh đại pháp ( ͡° ᴥ ͡°) .... Còn tiếp"
    )
);
Db.save(
    new H(
        "youkoso sukebe elf no mori e 1",
        "https://play.sonar-cdn.com/play/a0727e68-079c-4036-ab31-fdbdc1764fe0",
        "https://irex.cc/images/thumb/Youkoso-Sukebe-Elf-no-Mori-e-1.jpg",
        "Bunny Walker,T-Rex",
        "xem phim Youkoso Sukebe Elf no Mori e vietsub hd,Youkoso Sukebe Elf no Mori e vietsub không che,Youkoso! Sukebe Elf no Mori e,ようこそ! スケベエルフの森へ",
        "ahegao,big boobs,blow job,boob job,dark skin,elf,femdom,gang bang,harem,loli,megane,milf,mind break,plot,threesome,virgin",
        "Youkoso Sukebe Elf no Mori e 1: Alfheim, một thế giới của Elf, nơi chỉ có phụ nữ sinh sống. Vùng đất xứ Shrine, cội nguồn sức mạnh ma thuật của các Elf, đã bắt yếu dần và chủng tộc có nguy cơ tuyệt chủng. Sau đó, có một lời tiên tri rằng một người đàn ông từ một thế giới khác đã được chọn là người cứu tinh cho chủng tộc elf. Ít lâu sau, vị anh hùng đã được đưa đến với thế giới của Elves ... Các Elf trụ cột họ phải sống sót qua việc tạo ra đứa trẻ với vị anh hùng. Nhưng nhiều Elf khác đã từ chối quyết định khiếm nhã này và do đó các Elf được chia thành hai nhóm: Những người khinh thường việc tạo ra đứa trẻ với một người đàn ông và những người chấp nhận sự thật. Nhưng những người đã chấp nhận đã khám phá ra một điều gì đó: Hóa ra khi quan hệ với anh ta và tinh dịch vào trong cơ thể họ, sức mạnh ma thuật của họ tăng lên. Vì vậy, họ tiến tới và hấp tinh đại pháp ( ͡° ᴥ ͡°) .... Còn tiếp"
    )
);
Db.save(
    new H(
        "kutsujoku 1",
        "https://play.sonar-cdn.com/play/b41a1514-4192-4b9f-b5e0-7764a224d836",
        "https://irex.cc/images/thumb/Kutsujoku.jpg",
        "Bunny Walker,T-Rex",
        "Kutsujoku,屈辱",
        "ahegao,anal,gang bang,mind break,rape,school girl,sex toy,stocking,teacher",
        "Kutsujoku 1: Anh ta chỉ là một học sinh có học lực bình thường, nhưng lại bị ép buộc học tại một trường danh tiếng bởi cha của mình. Tệ hơn nữa, mọi người ở đây đều ưu tú suất sắc nên có vẻ rất coi thường anh ta, thành ra anh ta dần dần bị cô lập... Tuy nhiên, vẫn còn một người đối xử tốt với anh là Ayana, cô trở thành chỗ dựa tinh thần của anh. Nhưng sau một sự cố xảy ra, anh hiểu nhầm rằng cô cũng coi thường anh như mọi người. Tình cảm biến thành oán giận, kết quả anh phát hiện mình có khả năng thao túng người khác, nhưng chỉ có cơ thể của họ chứ không phải tâm trí của họ. Và rồi, anh quyết định sử dụng sức mạnh mới tìm thấy này để thỏa mãn mọi mong muốn của mình..."
    )
);
Db.save(
    new H(
        "kutsujoku 2",
        "https://play.sonar-cdn.com/play/fd681028-802b-4b2f-8661-17ab0c7f0cf7",
        "https://irex.cc/images/thumb/Kutsujoku.jpg",
        "Bunny Walker,T-Rex",
        "Kutsujoku,屈辱",
        "ahegao,anal,gang bang,mind break,rape,school girl,sex toy,stocking,teacher",
        "Kutsujoku 2: Anh ta chỉ là một học sinh có học lực bình thường, nhưng lại bị ép buộc học tại một trường danh tiếng bởi cha của mình. Tệ hơn nữa, mọi người ở đây đều ưu tú suất sắc nên có vẻ rất coi thường anh ta, thành ra anh ta dần dần bị cô lập... Tuy nhiên, vẫn còn một người đối xử tốt với anh là Ayana, cô trở thành chỗ dựa tinh thần của anh. Nhưng sau một sự cố xảy ra, anh hiểu nhầm rằng cô cũng coi thường anh như mọi người. Tình cảm biến thành oán giận, kết quả anh phát hiện mình có khả năng thao túng người khác, nhưng chỉ có cơ thể của họ chứ không phải tâm trí của họ. Và rồi, anh quyết định sử dụng sức mạnh mới tìm thấy này để thỏa mãn mọi mong muốn của mình..."
    )
);
Db.save(
    new H(
        "daisuki na haha 1",
        "https://play.sonar-cdn.com/play/64d5b285-e84b-4a70-a7db-91221d914d33",
        "https://irex.cc/images/thumb/Daisuki-na-haha.jpg",
        "Bunny Walker,T-Rex",
        "Daisuki na Haha,大好きな母",
        "big boobs,blow job,bondage,boob job,loạn luân,milf,sex toy,shota",
        "Daisuki na Haha 1: Miyuki cố gắng trở thành người mẹ tốt nhất có thể cho con trai mình, Yutaka. Cô cố gắng mỗi ngày để trở thành tấm gương sáng của một người mẹ tốt. Yutaka có một người bạn tên là Masato, cậu ta hay đến nhà Yutaka chơi nhưng việc chính là để làm với mẹ Yutaka...Làm trong nhà bếp, trong phòng tắm, và ngay cả khi cậu bạn đang ngủ ngay bên cạnh mẹ, cậu ta cho rằng dì ấy là của riêng mình... Cho đến một ngày, cô ấy bị bịt mắt trong lúc làm tình.. Sau khi kết thúc cởi bỏ tấm bịt, cô ấy sốc khi nhận ra đó là con trai của mình...!?"
    )
);
Db.save(
    new H(
        "daisuki na haha 2",
        "https://play.sonar-cdn.com/play/655618ac-0b3a-4ca9-90e5-7ed21d63c37b",
        "https://irex.cc/images/thumb/Daisuki-na-haha.jpg",
        "Bunny Walker,T-Rex",
        "Daisuki na Haha,大好きな母",
        "big boobs,blow job,bondage,boob job,loạn luân,milf,sex toy,shota",
        "Daisuki na Haha 2: Miyuki cố gắng trở thành người mẹ tốt nhất có thể cho con trai mình, Yutaka. Cô cố gắng mỗi ngày để trở thành tấm gương sáng của một người mẹ tốt. Yutaka có một người bạn tên là Masato, cậu ta hay đến nhà Yutaka chơi nhưng việc chính là để làm với mẹ Yutaka...Làm trong nhà bếp, trong phòng tắm, và ngay cả khi cậu bạn đang ngủ ngay bên cạnh mẹ, cậu ta cho rằng dì ấy là của riêng mình... Cho đến một ngày, cô ấy bị bịt mắt trong lúc làm tình.. Sau khi kết thúc cởi bỏ tấm bịt, cô ấy sốc khi nhận ra đó là con trai của mình...!?"
    )
);
Db.save(
    new H(
        "ecchi na onee-chan ni shiboraretai 1",
        "https://play.sonar-cdn.com/play/bd178f72-894e-44d7-919b-ea272791d653",
        "https://irex.cc/images/thumb/ecchi-na-Onee-chan-ni-Shiboraretai.jpg",
        "Bunny Walker,T-Rex",
        "Ecchi na Onee-chan ni Shiboraretai,Onee-chan ni Shiboraretai,OVA エッチなお姉ちゃんに搾られたい",
        "ahegao,big boobs,blow job,boob job,femdom,harem,loạn luân,stocking,threesome,thủ dâm,vanilla",
        "Ecchi na Onee-chan ni Shiboraretai 1: Người em trai lâu ngày mới về nhà sau thời gian dài ở ký túc xá của trường. Để thể hiện tình chị em cũng như món quà lâu ngày không gặp mặt. Hai chị đã cho em trai khám phá cơ thể của mình..."
    )
);
Db.save(
    new H(
        "ecchi na onee-chan ni shiboraretai 2",
        "https://play.sonar-cdn.com/play/cfafd024-23c8-4e58-bd4d-1560f9dfc658",
        "https://irex.cc/images/thumb/ecchi-na-Onee-chan-ni-Shiboraretai.jpg",
        "Bunny Walker,T-Rex",
        "Ecchi na Onee-chan ni Shiboraretai,Onee-chan ni Shiboraretai,OVA エッチなお姉ちゃんに搾られたい",
        "ahegao,big boobs,blow job,boob job,femdom,harem,loạn luân,stocking,threesome,thủ dâm,vanilla",
        "Ecchi na Onee-chan ni Shiboraretai 2: Người em trai lâu ngày mới về nhà sau thời gian dài ở ký túc xá của trường. Để thể hiện tình chị em cũng như món quà lâu ngày không gặp mặt. Hai chị đã cho em trai khám phá cơ thể của mình..."
    )
);
Db.save(
    new H(
        "chijoku no seifuku 1",
        "https://play.sonar-cdn.com/play/7437b552-1b56-4e66-bc5e-05ffc7eb924b",
        "https://1.bp.blogspot.com/-tA4toou_bmQ/Wnra6ZkkxjI/AAAAAAAABwc/RkHt329GbCwqaMRP6SLAVTLyg_gc5FEUACLcBGAs/s1600/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Chijoku no Seifuku",
        "ahegao,anal,big boobs,blow job,boob job,harem,mind break,ntr,sex toy,stocking,thủ dâm,virgin,y tá",
        'Chijoku no Seifuku 1: Thằng hàng xóm dám thô lỗ hỗn láo với bạn à? Chịch vợ nó ngay. Đó là bài học rút ra từ câu truyện. Mọi chuyện có thể đã kết thúc, nếu nhân vật chính của chúng ta không quyết định sẽ giấu camera theo dõi vào căn hộ của một cô gái xinh đẹp nhằm tống tiền và chịch cô ấy. Ờ thì chả có lí do nào nữa ngoài việc làm cho "cậu nhỏ" của hắn "lên đỉnh". Theo tôi nghĩ thì thực ra thì đây là một lí do rất chính đáng! nếu thằng nào nó láo với mình.'
    )
);
Db.save(
    new H(
        "chijoku no seifuku 2",
        "https://play.sonar-cdn.com/play/c034b8bc-3382-4a66-bac1-69831cc020bc",
        "https://1.bp.blogspot.com/-tA4toou_bmQ/Wnra6ZkkxjI/AAAAAAAABwc/RkHt329GbCwqaMRP6SLAVTLyg_gc5FEUACLcBGAs/s1600/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Chijoku no Seifuku",
        "ahegao,anal,big boobs,blow job,boob job,harem,mind break,ntr,sex toy,stocking,thủ dâm,virgin,y tá",
        'Chijoku no Seifuku 2: Thằng hàng xóm dám thô lỗ hỗn láo với bạn à? Chịch vợ nó ngay. Đó là bài học rút ra từ câu truyện. Mọi chuyện có thể đã kết thúc, nếu nhân vật chính của chúng ta không quyết định sẽ giấu camera theo dõi vào căn hộ của một cô gái xinh đẹp nhằm tống tiền và chịch cô ấy. Ờ thì chả có lí do nào nữa ngoài việc làm cho "cậu nhỏ" của hắn "lên đỉnh". Theo tôi nghĩ thì thực ra thì đây là một lí do rất chính đáng! nếu thằng nào nó láo với mình.'
    )
);
Db.save(
    new H(
        "jk bitch ni shiboraretai 1",
        "https://play.sonar-cdn.com/play/75e587dc-4f1d-4fb1-b9fd-47d17f667dbe",
        "https://irex.cc/images/thumb/JK-Bitch-ni-Shiboraretai.jpg",
        "Bunny Walker,T-Rex",
        "JK Bitch,JK Bitch ni Shiboraretai,JKビッチに搾られたい",
        "ahegao,big boobs,blow job,boob job,femdom,harem,school girl,thủ dâm,virgin",
        "JK Bitch ni Shiboraretai 1: Có thứ gì có thể hơn việc 1 nữ sinh hứng tình thèm muốn trym của bạn? Là 3 nữ sinh thèm muốn nó ( ͡° ͜ʖ ͡°) nào hãy cùng nhau xem bộ OVA này"
    )
);
Db.save(
    new H(
        "jk bitch ni shiboraretai 2",
        "https://play.sonar-cdn.com/play/b7a2849e-7f64-43b7-9145-641892221e43",
        "https://irex.cc/images/thumb/JK-Bitch-ni-Shiboraretai.jpg",
        "Bunny Walker,T-Rex",
        "JK Bitch,JK Bitch ni Shiboraretai,JKビッチに搾られたい",
        "ahegao,big boobs,blow job,boob job,femdom,harem,school girl,thủ dâm,virgin",
        "JK Bitch ni Shiboraretai 2: Có thứ gì có thể hơn việc 1 nữ sinh hứng tình thèm muốn trym của bạn? Là 3 nữ sinh thèm muốn nó ( ͡° ͜ʖ ͡°) nào hãy cùng nhau xem bộ OVA này"
    )
);
Db.save(
    new H(
        "kyonyuu jk ga ojisan chinpo to jupo jupo iyarashii sex shitemasu. 1",
        "https://play.sonar-cdn.com/play/fab1379f-a524-45d9-95de-9e8de21789cb",
        "https://1.bp.blogspot.com/-Swr_hLMD_zI/W5NN078b-sI/AAAAAAAACZg/NkuX7NRVuL4DLKH4CixiykvKpJHQTVJHgCLcBGAs/w300/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Kyonyuu JK ga Ojisan Chinpo,Kyonyuu JK ga Ojisan Chinpo to Jupo Jupo Iyarashii Sex Shitemasu.,巨乳J○がオジさんチ○ポとじゅぽじゅぽいやらしいセックスしてます.",
        "anal,big boobs,blow job,boob job,dark skin,double penetration,đồ bơi,femdom,gang bang,orgy,school girl,stocking,teacher,ugly bastard",
        "Kyonyuu JK ga Ojisan Chinpo to Jupo Jupo Iyarashii Sex Shitemasu. 1: Kyonyuu JK ga Ojisan Chinpo. Những nữ sinh trung học rơi vào tình huống kích thích với những người đàn ông trung niên... Một phó hội trưởng hội học sinh và thầy hiệu trưởng bàn về chuyện dãn cơ, một đứa cháu gái mát xa cho ông cậu, và một nữ sinh được thầy giáo kèm thêm sau giờ học. Họ đều thấy mình phải có những hành vi biến thái với những người đàn ông trung niên này."
    )
);
Db.save(
    new H(
        "kyonyuu jk ga ojisan chinpo to jupo jupo iyarashii sex shitemasu. 2",
        "https://play.sonar-cdn.com/play/25b1b0c6-d0a2-4e12-afb7-34c39a187440",
        "https://1.bp.blogspot.com/-Swr_hLMD_zI/W5NN078b-sI/AAAAAAAACZg/NkuX7NRVuL4DLKH4CixiykvKpJHQTVJHgCLcBGAs/w300/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Kyonyuu JK ga Ojisan Chinpo,Kyonyuu JK ga Ojisan Chinpo to Jupo Jupo Iyarashii Sex Shitemasu.,巨乳J○がオジさんチ○ポとじゅぽじゅぽいやらしいセックスしてます.",
        "anal,big boobs,blow job,boob job,dark skin,double penetration,đồ bơi,femdom,gang bang,orgy,school girl,stocking,teacher,ugly bastard",
        "Kyonyuu JK ga Ojisan Chinpo to Jupo Jupo Iyarashii Sex Shitemasu. 2: Kyonyuu JK ga Ojisan Chinpo. Những nữ sinh trung học rơi vào tình huống kích thích với những người đàn ông trung niên... Một phó hội trưởng hội học sinh và thầy hiệu trưởng bàn về chuyện dãn cơ, một đứa cháu gái mát xa cho ông cậu, và một nữ sinh được thầy giáo kèm thêm sau giờ học. Họ đều thấy mình phải có những hành vi biến thái với những người đàn ông trung niên này."
    )
);
Db.save(
    new H(
        "muttsuri dosukebe tsuyu gibo shimai no honshitsu minuite sex sanmai 1",
        "https://play.sonar-cdn.com/play/36356fe5-048a-45cc-95ca-d9e67f39f28e",
        "https://1.bp.blogspot.com/-T4PfE3WAM7g/W0K3UYih6aI/AAAAAAAACS8/ldn8lW3Q03sObSCuNOfWnYr_vrNZVJy0gCLcBGAs/w300/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Muttsuri Do Sukebe,Muttsuri Dosukebe Russia Gibo Shimai no Honshitsu Minuite Sex Zanmai,むっつりドスケベ露義母姉妹の本質見抜いてセックス三昧",
        "ahegao,big boobs,blow job,boob job,harem,loạn luân,milf,mind break,school girl,stocking,threesome,tsundere",
        "Muttsuri Dosukebe Tsuyu Gibo Shimai no Honshitsu Minuite Sex Sanmai 1: Người mẹ ngoại quốc tóc bạch kim Komiya Yuria, người chị với mái tóc dài đen Anna, người em gái Otaku ngầm Ria. Nhân vật chính của chúng ta là kẻ may mắn sống cùng 3 người trên. Nhưng chỉ sống thôi không bao giờ là đủ trong 1 bộ hentai. Và nhân vật chính của chúng ta như bao chàng trai không có đôi mắt khác, lại âm thầm lên kế hoạch để th.. cùng 3 người phụ nữ xây dựng 1 gia đình hạnh phúc."
    )
);
Db.save(
    new H(
        "muttsuri dosukebe tsuyu gibo shimai no honshitsu minuite sex sanmai 2",
        "https://play.sonar-cdn.com/play/ef5d1a92-c91a-45f5-8d6b-0952c1d486c2",
        "https://1.bp.blogspot.com/-T4PfE3WAM7g/W0K3UYih6aI/AAAAAAAACS8/ldn8lW3Q03sObSCuNOfWnYr_vrNZVJy0gCLcBGAs/w300/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Muttsuri Do Sukebe,Muttsuri Dosukebe Russia Gibo Shimai no Honshitsu Minuite Sex Zanmai,むっつりドスケベ露義母姉妹の本質見抜いてセックス三昧",
        "ahegao,big boobs,blow job,boob job,harem,loạn luân,milf,mind break,school girl,stocking,threesome,tsundere",
        "Muttsuri Dosukebe Tsuyu Gibo Shimai no Honshitsu Minuite Sex Sanmai 2: Người mẹ ngoại quốc tóc bạch kim Komiya Yuria, người chị với mái tóc dài đen Anna, người em gái Otaku ngầm Ria. Nhân vật chính của chúng ta là kẻ may mắn sống cùng 3 người trên. Nhưng chỉ sống thôi không bao giờ là đủ trong 1 bộ hentai. Và nhân vật chính của chúng ta như bao chàng trai không có đôi mắt khác, lại âm thầm lên kế hoạch để th.. cùng 3 người phụ nữ xây dựng 1 gia đình hạnh phúc."
    )
);
Db.save(
    new H(
        "hatsukoi jikan 1",
        "https://play.sonar-cdn.com/play/88fd469c-1514-4595-ba21-36abb62bab1d",
        "https://irex.cc/images/thumb/Hatsukoi-Jikan-1.jpg",
        "Bunny Walker,T-Rex",
        "Hatsukoi Time,初恋時間.",
        "blow job,big boobs,femdom,school girl,vanilla,virgin",
        'Ena là một cô gái được đồn đại là chuyên gia về tình dục với kỉ lục đã nện nhau hơn 100 lần... Ena học khá tệ nên đã nhờ nam chính kèm cho. Ena hứa nếu vượt qua kỳ thi với điểm cao, cô sẽ cho nam chính biết thế nào là "đàn ông". Khi cả hai chuẩn bị trao thân cho nhau thì nam chính phát hiện những tin đồn về Ena đều là dối trá. Cô hoàn toàn không biết gì về tình dục giống hệt mình...'
    )
);
Db.save(
    new H(
        "hatsukoi jikan 6",
        "https://play.sonar-cdn.com/play/03269000-0be9-4164-8d31-250a9a7c4534",
        "https://irex.cc/images/thumb/Hatsukoi-Jikan-6.jpg",
        "Bunny Walker,T-Rex",
        "Hatsukoi Time,初恋時間.",
        "blow job,big boobs,femdom,foot job,romance,school girl,tsundere,vanilla,virgin",
        "Onii-chan và Kirika là hàng xóm của nhau. Dù không có máu mủ, Kirika vô cùng yêu quý Onii-chan còn anh luôn luôn xem Kirika là một đứa con nít. Onii-chan thường đèo Kirika theo vào mỗi buổi đi chơi. Lớn lên Onii-chan trở thành thầy giáo, Kirika thổ lộ với Onii-chan đồng thời muốn học ở người trường mà anh ta dạy nhưng bị từ chối. Từ đó tính cách Tsundere của Kirika phát triển, Kirika cố tỏ ra lạnh lùng bất cần nhưng trái tim vẫn yêu say đắm Onii-chan. Sau một chuyến đi chơi, Kirika bị mắc mưa và phải trú nhờ nhà Onii-chan, Kirika vô tình để lộ bộ phận nhạy cảm khiến Onii-chan vô cùng nứng cặc. Kirika muốn xác nhận liệu Onii-chan có yêu mình không? Nên cô đã hành động cực đoan. Onii-chan không thể chịu được những cuộc tra tấn tình dục nên đã phá bỏ rào cản giữa thầy và trò mà lao vào hiếp dâm Kirika!"
    )
);
Db.save(
    new H(
        "hatsukoi jikan 2",
        "https://play.sonar-cdn.com/play/42342ceb-f224-4e58-a702-eb001b483ab2",
        "https://irex.cc/images/thumb/Hatsukoi-Jikan-2.jpg",
        "Bunny Walker,T-Rex",
        "Hatsukoi Time,初恋時間.",
        "blow job,big boobs,boob job,femdom,maid,school girl,stocking,thủ dâm,tsundere,vanilla",
        "Anri là bạn cùng lớp của nam chính, không chỉ vậy cô còn là một nàng hầu gái Tsundere của cậu. Một ngày trở về phòng để lấy chiếc điện thoại bị bỏ quên, anh bắt quả tang Anri đang thẩm du trên giường mình..."
    )
);
Db.save(
    new H(
        "hatsukoi jikan 4",
        "https://play.sonar-cdn.com/play/edebd3a0-8e4d-4705-84d1-4909b77214e3",
        "https://irex.cc/images/thumb/Hatsukoi-Jikan-4.jpg",
        "Bunny Walker,T-Rex",
        "Hatsukoi Time,初恋時間.",
        "blow job,big boobs,femdom,romance,school girl,stocking,vanilla,virgin",
        "Tomura Sadahito là một chàng trai trẻ luôn đứng thứ hai trong các kỳ thi, cậu bị vượt qua bởi nữ sinh Ichinomiya Juri, một cô gái cùng trường khác lớp trung học của anh. Anh không ngừng học tập, nghiên cứu cách để vượt qua cô. Sự kình địch, hơn thua của họ có bước ngoặt bất ngờ khi Juri vượt qua ranh giới bạn bè và tiến xa hơn với Sadahito. Sau đó, cả hai quan hệ tình dục nhiều hơn mà không nhận ra rằng tình cảm của họ đang gắn kết với nhau."
    )
);
Db.save(
    new H(
        "hatsukoi jikan 3",
        "https://play.sonar-cdn.com/play/ca060818-3e17-4a02-8be2-f78f4f7fc8ef",
        "https://irex.cc/images/thumb/Hatsukoi-Jikan-3.jpg",
        "Bunny Walker,T-Rex",
        "Hatsukoi Time,初恋時間.",
        "blow job,big boobs,maid,romance,school girl,stocking,tsundere,vanilla",
        "Sau khi quan hệ tình dục với cô hầu gái Anri, Tayaka vô cùng đau lòng vì không thể nói cho cô biết cảm xúc của mình. Một ngày nọ, cậu lấy hết can đảm thổ lộ với Anri nhưng lại vô tình phát hiện Anri thổ lộ một mình về toàn bộ tình cảm dành cho cậu. Tayaka xong vào cưỡng hiếp và yêu cầu Anri hãy sinh con cho mình và bắt đầu cố gắng thụ tinh cho cô. Kể từ ngày đó, cả hai tiếp tục quan hệ tình dục cho đến khi trái tim họ hòa thành một."
    )
);
Db.save(
    new H(
        "hatsukoi jikan 5",
        "https://play.sonar-cdn.com/play/08d1fcdf-e0d4-491d-8474-ba9715b4efbc",
        "https://irex.cc/images/thumb/Hatsukoi-Jikan-5.jpg",
        "Bunny Walker,T-Rex",
        "Hatsukoi Time,初恋時間.",
        "blow job,big boobs,boob job,femdom,romance,school girl,vanilla,virgin",
        "Ayane từng là một cô bé bị bạn bè xa lánh vì ngoại hình cũng như có tính cách kì lạ. Ayane được Koshou tìm thấy khi bị bỏ rơi trong lúc trốn tìm. Koshou an ủi Ayane bằng một trò chơi, từ đó trở đi Koshou không còn gặp Ayane nữa. Trưởng thành Koshou quyết định cai Anime và Game, cậu cũng giảm béo và rời thị trấn nhỏ đến nơi thành thị học hành. Trớ trêu thay, cô bé Ayane ngày ấy đã trưởng thành và chuyển đến học cùng trường với Koshou. Koshou thì không nhận ra nhưng cô bé thì có. Trước khi Koshou kịp có bạn gái, Ayane đã chớp lấy thời cơ và thổ lộ toàn bộ tình cảm mà mình đã ấp ủ từ năm ấy với Koshou..."
    )
);
Db.save(
    new H(
        "baka dakedo chinchin shaburu no dake wa jouzu na chii-chan 2",
        "https://play.sonar-cdn.com/play/162bcfd4-9c95-4628-9a02-b8a426744afc",
        "https://1.bp.blogspot.com/-lFxA1Lwau40/WloGLVHxaKI/AAAAAAAABK4/ojQ0AMA7qqk8C7hx6JnzGB47TCFCl-KYQCLcBGAs/s1600/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Baka Dakedo Chinchin Shaburu no Dake wa Jouzu na Chii-chan,Xem phim Baka Dakedo Chinchin",
        "ahegao,big boobs,blow job,boob job,dark skin,femdom,school girl,vanilla",
        "Baka Dakedo Chinchin Shaburu no Dake wa Jouzu na Chii-chan 2: Trong cái nóng như đổ lửa 41 độ C. 1 học sinh ở 1 mình trong căn hộ không điều hòa nóng như chết cha chết mẹ. Trong cái nóng này anh tìm đến những nơi có điều hòa để hưởng chùa như là cửa hàng tiện lợi. Và tình cờ gặp được người bạn cùng lớp tại đó. Tên cô ấy là Shiinea Chieri, hay còn gọi là Chii-chan. Cô ấy có 1 đôi gò màu nâu sô cô la bạn chỉ muốn úp mặt vào. Cùng 1 thân hình quyến rũ nóng bỏng còn hơn cả cái trời 41 độ này. Đặc biệt là cô rất cởi mở về vấn đề tình dục. Cơ hội được ở cùng cô rất mong manh... nhưng rồi cô ấy cười.."
    )
);
Db.save(
    new H(
        "baka dakedo chinchin shaburu no dake wa jouzu na chii-chan 1",
        "https://play.sonar-cdn.com/play/a81c7609-e1e2-4442-9c8e-be4a15b7e461",
        "https://1.bp.blogspot.com/-lFxA1Lwau40/WloGLVHxaKI/AAAAAAAABK4/ojQ0AMA7qqk8C7hx6JnzGB47TCFCl-KYQCLcBGAs/s1600/Untitled-1.jpg",
        "Bunny Walker,T-Rex",
        "Baka Dakedo Chinchin Shaburu no Dake wa Jouzu na Chii-chan,Xem phim Baka Dakedo Chinchin",
        "ahegao,big boobs,blow job,boob job,dark skin,femdom,school girl,vanilla",
        "Baka Dakedo Chinchin Shaburu no Dake wa Jouzu na Chii-chan 1: Trong cái nóng như đổ lửa 41 độ C. 1 học sinh ở 1 mình trong căn hộ không điều hòa nóng như chết cha chết mẹ. Trong cái nóng này anh tìm đến những nơi có điều hòa để hưởng chùa như là cửa hàng tiện lợi. Và tình cờ gặp được người bạn cùng lớp tại đó. Tên cô ấy là Shiinea Chieri, hay còn gọi là Chii-chan. Cô ấy có 1 đôi gò màu nâu sô cô la bạn chỉ muốn úp mặt vào. Cùng 1 thân hình quyến rũ nóng bỏng còn hơn cả cái trời 41 độ này. Đặc biệt là cô rất cởi mở về vấn đề tình dục. Cơ hội được ở cùng cô rất mong manh... nhưng rồi cô ấy cười.."
    )
);
Db.save(
    new H(
        "tsumamigui 3 the animation 1",
        "https://play.sonar-cdn.com/play/17006662-d4eb-442e-b789-ab610ff6dee6",
        "https://irex.cc/images/thumb/Tsumamigui-3-The-Animation.jpg",
        "Pink Pineapple,T-Rex",
        "Tsumamigui 3 Animation,Xem phim Tsumamigui 3",
        "big boobs,blow job,boob job,harem,loạn luân,milf,ntr,plot,rape,romance,stocking,threesome,vanilla,y tá",
        'Tsumamigui 3 The Animation 1: Nội Dung- Nhân vật chính, Akito Natsuki quyết định quay trở về quê chơi vì chỗ làm đang phải tạm đóng cửa. Không có tiền và cũng chả có gì để làm để anh đã quyết định lại ăn bám anh ruột và chị dâu Miyuri. Tại đây anh gặp lại nhiều người bạn cũ trong đó có Sayoko một góa phụ luôn dành cho anh một chăm sóc đặc biệt. Akito cố gắng che dấu, hành xử như đứa em rể đúng mực trước mặt Miyuri. Nhưng vì một lần cao hứng anh tuột miệng nói với chị dâu là: "Em yêu chị". Hơn hết lý do mà Miyuri đã đem lòng yêu anh trai của Akito khi xưa là do chính thành quả của Akito làm ra. Không chỉ thế đùng cái một em nữ sinh, Ai xuất hiện gọi Akito là papa, kêu anh hãy abcxyz với mẹ mình để bà ấy có thể sinh ra con trai kế thừa điện thờ gia đình. Mọi thứ cứ thế rối tùm lùm hết cả. Phần trước: Tsumamigui Tải game VN tuyệt phẩm Tsumamigui 3 tại ĐÂY'
    )
);
Db.save(
    new H(
        "tsumamigui 3 the animation 2",
        "https://play.sonar-cdn.com/play/6a7d0f4e-72c0-43ab-bc87-7137e45541cb",
        "https://irex.cc/images/thumb/Tsumamigui-3-The-Animation.jpg",
        "Pink Pineapple,T-Rex",
        "Tsumamigui 3 Animation,Xem phim Tsumamigui 3",
        "big boobs,blow job,boob job,harem,loạn luân,milf,ntr,plot,rape,romance,stocking,threesome,vanilla,y tá",
        'Tsumamigui 3 The Animation 2: Nội Dung- Nhân vật chính, Akito Natsuki quyết định quay trở về quê chơi vì chỗ làm đang phải tạm đóng cửa. Không có tiền và cũng chả có gì để làm để anh đã quyết định lại ăn bám anh ruột và chị dâu Miyuri. Tại đây anh gặp lại nhiều người bạn cũ trong đó có Sayoko một góa phụ luôn dành cho anh một chăm sóc đặc biệt. Akito cố gắng che dấu, hành xử như đứa em rể đúng mực trước mặt Miyuri. Nhưng vì một lần cao hứng anh tuột miệng nói với chị dâu là: "Em yêu chị". Hơn hết lý do mà Miyuri đã đem lòng yêu anh trai của Akito khi xưa là do chính thành quả của Akito làm ra. Không chỉ thế đùng cái một em nữ sinh, Ai xuất hiện gọi Akito là papa, kêu anh hãy abcxyz với mẹ mình để bà ấy có thể sinh ra con trai kế thừa điện thờ gia đình. Mọi thứ cứ thế rối tùm lùm hết cả. Phần trước: Tsumamigui Tải game VN tuyệt phẩm Tsumamigui 3 tại ĐÂY'
    )
);
Db.save(
    new H(
        "majuu jouka shoujo utea 1",
        "https://play.sonar-cdn.com/play/1a364fde-43ee-4fe8-ab3e-7611b6be39fe",
        "https://1.bp.blogspot.com/-OmBJLVvO-08/Wlsed9CZw4I/AAAAAAAABMQ/b7GcPkWoiHoiqDGFG4Eay2zyKkTNBvo2wCLcBGAs/s1600/Untitled-1.jpg",
        "EDGE,T-Rex",
        "Majuu Jouka Shoujo Utea",
        "ahegao,anal,big boobs,blow job,boob job,double penetration,femdom,foot job,futanari,loạn luân,mind break,mind control,monster,plot,rape,school girl,sex toy,tentacle,threesome,thủ dâm,virgin,yuri",
        "Karen and Mizuki là những cô gái phép thuật Utea họ bảo vệ thế giới dưới sự tấn công của bọn quái vật ngoài hành tinh. Nhưng làm thế nào để họ chống lại bọn chúng? Bằng cách cho chúng chịch hai cô tới bến thì thôi"
    )
);
Db.save(
    new H(
        "majuu jouka shoujo utea 2",
        "https://play.sonar-cdn.com/play/9dd70bd2-4e4e-47df-998a-1309a4d0dd8c",
        "https://1.bp.blogspot.com/-OmBJLVvO-08/Wlsed9CZw4I/AAAAAAAABMQ/b7GcPkWoiHoiqDGFG4Eay2zyKkTNBvo2wCLcBGAs/s1600/Untitled-1.jpg",
        "EDGE,T-Rex",
        "Majuu Jouka Shoujo Utea",
        "ahegao,anal,big boobs,blow job,boob job,double penetration,femdom,foot job,futanari,loạn luân,mind break,mind control,monster,plot,rape,school girl,sex toy,tentacle,threesome,thủ dâm,virgin,yuri",
        "Karen and Mizuki là những cô gái phép thuật Utea họ bảo vệ thế giới dưới sự tấn công của bọn quái vật ngoài hành tinh. Nhưng làm thế nào để họ chống lại bọn chúng? Bằng cách cho chúng chịch hai cô tới bến thì thôi"
    )
);
Db.save(
    new H(
        "majuu jouka shoujo utea 3",
        "https://play.sonar-cdn.com/play/088f4b64-d9c8-4290-90bf-d622679577d4",
        "https://1.bp.blogspot.com/-OmBJLVvO-08/Wlsed9CZw4I/AAAAAAAABMQ/b7GcPkWoiHoiqDGFG4Eay2zyKkTNBvo2wCLcBGAs/s1600/Untitled-1.jpg",
        "EDGE,T-Rex",
        "Majuu Jouka Shoujo Utea",
        "ahegao,anal,big boobs,blow job,boob job,double penetration,femdom,foot job,futanari,loạn luân,mind break,mind control,monster,plot,rape,school girl,sex toy,tentacle,threesome,thủ dâm,virgin,yuri",
        "Karen and Mizuki là những cô gái phép thuật Utea họ bảo vệ thế giới dưới sự tấn công của bọn quái vật ngoài hành tinh. Nhưng làm thế nào để họ chống lại bọn chúng? Bằng cách cho chúng chịch hai cô tới bến thì thôi"
    )
);
Db.save(
    new H(
        "majuu jouka shoujo utea 4",
        "https://play.sonar-cdn.com/play/15a5537b-2707-40c8-bfaa-39859f8b465f",
        "https://1.bp.blogspot.com/-OmBJLVvO-08/Wlsed9CZw4I/AAAAAAAABMQ/b7GcPkWoiHoiqDGFG4Eay2zyKkTNBvo2wCLcBGAs/s1600/Untitled-1.jpg",
        "EDGE,T-Rex",
        "Majuu Jouka Shoujo Utea",
        "ahegao,anal,big boobs,blow job,boob job,double penetration,femdom,foot job,futanari,loạn luân,mind break,mind control,monster,plot,rape,school girl,sex toy,tentacle,threesome,thủ dâm,virgin,yuri",
        "Karen and Mizuki là những cô gái phép thuật Utea họ bảo vệ thế giới dưới sự tấn công của bọn quái vật ngoài hành tinh. Nhưng làm thế nào để họ chống lại bọn chúng? Bằng cách cho chúng chịch hai cô tới bến thì thôi"
    )
);
Db.save(
    new H(
        "akane wa tsumare somerareru 2",
        "https://play.sonar-cdn.com/play/f5cf3455-26b6-448c-9ae3-ca49f0edf8ef",
        "https://irex.cc/images/thumb/Akane-wa-Tsumare-Somerareru-2.jpg",
        "Antechinus",
        "Akane&#039;s In A Pinch,茜ハ摘マレ染メラレル",
        "ahegao,anal,big boobs,blow job,boob job,double penetration,femdom,gang bang,mind break,ntr,school girl,stocking",
        "Akane và Shouya là một cặp đôi, nhưng do đội tuyển bóng chày có luật không được phép có mối quan hệ nam nữ. Vì vậy trong một lần 2 người tình tứ với nhau thì bị huấn luyện viên bắt gặp. Để bảo vệ danh tiếng và tương lai của Shouya nên Akane đã chấp nhận gia nhập một khóa huấn luyện tình dục của gã huấn luyện viên biến thái..."
    )
);
Db.save(
    new H(
        "akane wa tsumare somerareru 1",
        "https://play.sonar-cdn.com/play/d74a0a73-97f1-4b4e-94c6-cd69f4af24ad",
        "https://irex.cc/images/thumb/Akane-wa-Tsumare-Somerareru-1.jpg",
        "Antechinus",
        "Akane&#039;s In A Pinch,茜ハ摘マレ染メラレル",
        "ahegao,big boobs,blow job,mind break,ntr,rape,school girl,stocking",
        "Akane và Shouya là một cặp đôi, nhưng do đội tuyển bóng chày có luật không được phép có mối quan hệ nam nữ. Vì vậy trong một lần 2 người tình tứ với nhau thì bị huấn luyện viên bắt gặp. Để bảo vệ danh tiếng và tương lai của Shouya nên Akane đã chấp nhận gia nhập một khóa huấn luyện tình dục của gã huấn luyện viên biến thái..."
    )
);
Db.save(
    new H(
        "ero konbini tenchou 2",
        "https://play.sonar-cdn.com/play/8429a03c-2a1e-410f-a0dd-b7ba72fa1b40",
        "https://irex.cc/images/thumb/Ero-Konbini-tenchou.jpg",
        "PoRO",
        "Ero Konbini Tenchou,エロコンビニ店長",
        "anal,big boobs,blow job,boob job,harem,mind break,ntr,plot,rape,school girl,stocking,tsundere,ugly bastard,virgin",
        'Ero Konbini Tenchou 2: Phần trước Yoshihiro đã "thu phục" được hai nhân viên bán hàng Yui và Shiori. Nhưng lần này hắn được mời sang cửa hàng của đối tác để làm quản lý tạm thời. Ở đó hắn đã gặp Miki, một cô gái bề ngoài có vẻ thân thiện nhưng bên trong thì khá xấc xược không ngừng chế diễu hắn ta... Hắn đang tìm cách trả thù con nhỏ hỗn láo này nhưng liệu bằng cách gì đây?Xem phần trước: JK to Ero Konbini Tenchou'
    )
);
Db.save(
    new H(
        "ero konbini tenchou 3",
        "https://play.sonar-cdn.com/play/0afd8465-d40f-44bc-a01a-05bce5ba3d50",
        "https://irex.cc/images/thumb/Ero-Konbini-Tenchou-3.jpg",
        "PoRO",
        "Ero Konbini Tenchou,エロコンビニ店長",
        "anal,big boobs,blow job,boob job,harem,mind break,ntr,plot,rape,school girl,stocking,tsundere,ugly bastard,virgin",
        'Ero Konbini Tenchou 3: Phần trước Yoshihiro đã "thu phục" được hai nhân viên bán hàng Yui và Shiori. Nhưng lần này hắn được mời sang cửa hàng của đối tác để làm quản lý tạm thời. Ở đó hắn đã gặp Miki, một cô gái bề ngoài có vẻ thân thiện nhưng bên trong thì khá xấc xược không ngừng chế diễu hắn ta... Hắn đang tìm cách trả thù con nhỏ hỗn láo này nhưng liệu bằng cách gì đây?Xem phần trước: JK to Ero Konbini Tenchou'
    )
);
Db.save(
    new H(
        "ero konbini tenchou 4",
        "https://play.sonar-cdn.com/play/07792583-ee91-410a-9275-c64ccef65c67",
        "https://irex.cc/images/thumb/Ero-Konbini-Tenchou-4.jpg",
        "PoRO",
        "Ero Konbini Tenchou,エロコンビニ店長",
        "big boobs,blow job,boob job,mind break,stocking",
        "Ero Konbini Tenchou 4: Lần này ông chú đột ngột nhận được email từ ông chủ cửa hàng yêu cầu cho một chỗ trống trong cửa hàng để phân công 1 nhân viên mới đến làm tại đó nhưng lại không rõ đó là ai. Nhân cơ hội đó hắn ra lời đe dạo Yui nếu không nghe lời hắn sẽ bị sa thải..."
    )
);
Db.save(
    new H(
        "ero konbini tenchou 1",
        "https://play.sonar-cdn.com/play/553139f4-8042-42ba-bf2c-27fb60dfed9c",
        "https://irex.cc/images/thumb/Ero-Konbini-Tenchou-1.jpg",
        "PoRO",
        "Ero Konbini Tenchou,エロコンビニ店長",
        "anal,big boobs,blow job,boob job,harem,mind break,ntr,plot,rape,school girl,stocking,tsundere,ugly bastard,virgin",
        'Ero Konbini Tenchou 1: Phần trước Yoshihiro đã "thu phục" được hai nhân viên bán hàng Yui và Shiori. Nhưng lần này hắn được mời sang cửa hàng của đối tác để làm quản lý tạm thời. Ở đó hắn đã gặp Miki, một cô gái bề ngoài có vẻ thân thiện nhưng bên trong thì khá xấc xược không ngừng chế diễu hắn ta... Hắn đang tìm cách trả thù con nhỏ hỗn láo này nhưng liệu bằng cách gì đây?Xem phần trước: JK to Ero Konbini Tenchou'
    )
);

//Cih.l(...Array(6).fill('boku-ni-sefri-ga-dekita-riyuu').map((n, index) => n.concat(`-${index+1}`)))
window.rs = Db.build();
