// Nationality & Language

// États-Unis : environ 60-65% des joueurs viennent des États-Unis.
// République dominicaine : environ 10-12%.
// Venezuela : environ 5-7%.
// Cuba : environ 3-5%.
// Japon : environ 2-3%.
// Mexique : environ 2-3%.
// Corée du Sud : environ 1-2%.
// Canada : environ 1-2%.
// Colombie : environ 1-2%.
// Panama : environ 1-2%.

Dictionnary<string, List<string>> languages = new Dictionnary<string, List<string>>
{
    {
        "english",
        new List<string> 
        {
            "USA", "Canada", 
        }
    },
    {
        "spanish",
        new List<string> 
        {
            "Cuba", "Dominican Republic", "Mexico", "Venezuela", "Colombia", "Panama"
        }
    },
    {
        "french", 
        new List<string> 
        {
            "Canada", "France"
        }
    },
    {
        "japanese", 
        new List<string> 
        {
            "Japan"
        }
    },
    {
        "korean", 
        new List<string> 
        {
            "Korea"
        }
    }
}

Dictionary<string, Dictionnary<string, List<string>>> names = new Dictionary<string, Dictionnary<string, List<string>>>
{
    {"english", 
        new Dictionnary<string, List<string>>
        {
            {"firstnames", englishFirstnames},
            {"lastnames", englishLastnames}
        }
    },
    {"spanish",
        new Dictionnary<string, List<string>>
        {
            {"firstnames", spanishFirstnames},
            {"lastnames", spanishLastnames}
        }
    },
    {"french",
        new Dictionnary<string, List<string>>
        {
            {"firstnames", frenchFirstnames},
            {"lastnames", frenchLastnames}
        }
    },
    {"japanese", 
        new Dictionnary<string, List<string>>
        {
            {"firstnames", japaneseFirstnames},
            {"lastnames", japaneseLastnames}
        }
    },
    {"korean", 
        new Dictionnary<string, List<string>>
        {
            {"firstnames", koreanFirstnames},
            {"lastnames", koreanLastnames}
        }
    },
};

List<string> englishFirstnames = new List<string>
{
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas",
    "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian",
    "Ronald", "Anthony", "Kevin", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", 
    "Eric", "Stephen", "Andrew", "Gregory", "Joshua", "Jerry", "Dennis", "Walter", "Patrick", "Peter",
    "Harold", "Douglas", "Henry", "Arthur", "Ryan", "Jack", "Joe", "Albert", "Austin", "Jacob", "Ethan",
    "Nathan", "Aaron", "Samuel", "Caleb", "Lucas", "Owen", "Zachary", "Adam", "Luke", "Matthew", "Isaac",
    "Benjamin", "Elijah", "Liam", "Mason", "Alexander", "Oliver", "Michael", "Isaiah", "Cooper", "Carter",
    "Wyatt", "Grayson", "Dylan", "Gavin", "Austin", "Hunter", "Logan", "Jaxon", "Chase", "Landon", "Bryce",
    "Cole", "Alex", "Nathaniel", "Jace", "Miles", "Seth", "Max", "Nolan", "Xander", "Cameron", "Brayden",
    "Theo", "Benjamin", "Aidan", "Nash", "Simon", "Jared", "Mason", "Emmett", "Harrison", "Silas", "Victor",
    "Jasper", "Riley", "Christian", "Finn", "Kingston", "Asher", "Kai", "Jesse", "Bennett", "Milo", "Toby",
    "Levi", "Emerson", "Zane", "Blake", "Ryder", "Tristan", "Nash", "Zachary", "Spencer", "Maddox", "Eli",
    "Noah", "Jordan", "Travis", "Brock", "Nico", "Ford", "Malcolm", "Theo", "Baxter", "Calvin", "Victor",
    "Bryan", "Eli", "Julian", "Francis", "Dylan", "Chandler", "Graham", "Louis", "Arthur", "Mason", "Jared",
    "Jensen", "Lincoln", "Liam", "Quinn", "Mack", "Coleman", "Rory", "Dean", "Bennett", "Zane", "Clyde", 
    "Dante", "Gage", "Lennox", "Cyrus", "Finnian", "Beau", "Wade", "Dax", "Bennett", "Damien", "Brock",
    "Caden", "Jaden", "Cale", "Graham", "Tate", "Rowan", "Beckett", "Vance", "Jett", "Colton", "Julius",
    "Reed", "Zeke", "Rhett", "Hale", "Stefan", "Gordon", "Rufus", "Malcolm", "Trent", "Tanner", "Riley",
    "Quincy", "Felix", "Kendall", "Dillon", "Thaddeus", "Alfred", "Benson", "Franklin", "Sterling", "Blaise",
    "Harvey", "Maverick", "Dorian", "Elliot", "Ezekiel", "Thatcher", "Milo", "Trenton", "Soren", "Seth",
    "Winston", "Alden", "Niles", "Marvin", "Devon", "Lyle", "Saul", "Harlan", "Wilder"
};

List<string> englishLastnames = new List<string>
{
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Roberts",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright", 
    "Scott", "Torres", "Nguyen", "Hill", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez", 
    "Robinson", "Gonzalez", "Sanchez", "Patel", "Ramirez", "Ross", "Cole", "Murphy", "Bailey", "Rivera",
    "Cooper", "Richardson", "Howard", "Ward", "Flores", "Diaz", "Lopez", "Graham", "Kelly", "Sanders", 
    "Price", "Bennett", "Wood", "Barnes", "Ross", "Hughes", "Chavez", "James", "Butler", "Simmons", 
    "Foster", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Henderson", "Douglas", "Carlson", 
    "Curtis", "Hoffman", "Gibson", "Gonzales", "Glover", "Mendoza", "McDonald", "McCarthy", "Stone",
    "Harrison", "Franklin", "Richards", "Jordan", "Ferguson", "Marshall", "Burns", "Phillips", "Reed", 
    "Vasquez", "Fox", "Warren", "Webb", "Simpson", "James", "Curtis", "Elliott", "Chavez", "Daniels",
    "Harper", "Gibson", "Jenkins", "Mills", "Griffith", "Jensen", "Stone", "Knight", "Meyers", "Davidson",
    "Palmer", "Murray", "Wheeler", "Gregory", "Sullivan", "Berry", "Murphy", "Chapman", "Curtis", "Bishop",
    "Hendrix", "Vega", "Woods", "Carr", "Hunter", "Pearson", "Wallace", "Gaines", "Norris", "Ryan", 
    "Jameson", "Robles", "Bates", "Harrison", "Kennedy", "Sutton", "Armstrong", "Schmidt", "Perry"
};

List<string> spanishFirstnames = new List<string>
{
    "José", "Juan", "Carlos", "Luis", "Jorge", "Miguel", "Antonio", "Francisco", "David", "Manuel", 
    "Pedro", "Alejandro", "Ricardo", "Fernando", "Daniel", "Eduardo", "Diego", "Sergio", "Raúl", "Andrés", 
    "Pablo", "Ramón", "Álvaro", "Víctor", "Antonio", "Emilio", "Mario", "Rafael", "Iván", "Héctor", 
    "César", "Julio", "Javier", "Esteban", "Martín", "Guillermo", "Salvador", "José Antonio", "Felipe", 
    "Cristian", "Samuel", "Ángel", "Adrián", "Óscar", "Lorenzo", "Isaac", "Tomás", "Simón", "Iván", 
    "Alfredo", "Félix", "Nicolás", "Hugo", "Benjamín", "Maximiliano", "Luis Ángel", "Ramiro", "Marcelo", 
    "Adolfo", "Santiago", "Ricardo", "Ezequiel", "Bernardo", "Joaquín", "Gonzalo", "Bautista", "Arturo", 
    "Martín", "José Luis", "Francisco Javier", "Emiliano", "Leonardo", "Rubén", "Aarón", "Santiago", 
    "Fernando", "Víctor Manuel", "Juan Carlos", "Raúl", "Carlos Alberto", "Carlos Javier", "Luis Fernando", 
    "Agustín", "Tobías", "Ángel David", "Sergio Daniel", "Mauricio", "René", "Germán", "Ricardo Alberto",
    "Pascual", "Gerardo", "Leandro", "José Miguel", "Eduardo Luis", "Juan José", "Pablo Antonio", "Martín Ángel",
    "Ricardo José", "Antonio José", "José Luis", "David Alejandro", "Julian", "Fabián", "Felipe", "Raúl Ángel"
};

List<string> spanishLastnames = new List<string>
{
    "García", "Martínez", "López", "Hernández", "Pérez", "González", "Rodríguez", "Fernández", "Luna", "Díaz",
    "Álvarez", "Jiménez", "Morales", "Mendoza", "Ruiz", "Sánchez", "Ramírez", "Torres", "Vázquez", "Moreno",
    "Ríos", "Cruz", "Reyes", "Blanco", "Jiménez", "Castro", "Delgado", "Flores", "Vargas", "Gutiérrez",
    "Ramírez", "Chávez", "Cabrera", "Guerrero", "Soto", "Mora", "Guerrero", "Ortega", "Vázquez", "Torres",
    "Serrano", "Márquez", "Rojas", "Salazar", "Castillo", "Santos", "Acosta", "Hernández", "Morales", 
    "Valdez", "Ruiz", "Giménez", "Martín", "Cardoso", "Navarro", "Paredes", "Serrano", "Suárez", 
    "Gonzales", "Muñoz", "Zapata", "Del Río", "Navarro", "Barrios", "Escobar", "Molina", "Carvalho", 
    "Rosales", "Pinto", "Montoya", "Salas", "Bermúdez", "Gálvez", "López", "Ávila", "Cordero", "Bautista", 
    "Serrano", "Pizarro", "Castro", "Peña", "Moya", "Escobar", "Valencia", "López", "Reyes", "Sánchez",
    "Bravo", "González", "Mármol", "Guerra", "Gonzalo", "Hidalgo", "García", "Del Castillo", "Jiménez",
    "Zúñiga", "Guzmán", "Fuentes", "Salazar", "Gallegos", "Medina", "Acevedo", "Alvarado", "Cisneros",
    "Díaz", "Pacheco", "Serrato", "Lozano", "Castillo", "Navarro", "Vega", "Arias", "López", "Varela",
    "Domínguez", "Méndez", "Herrera", "Blanco", "Mora", "Bermúdez", "Cordero", "Ríos", "González", "Ferrer"
};

List<string> japaneseFirstnames = new List<string>
{
    "Hiroshi", "Takeshi", "Yuki", "Takashi", "Ryo", "Shota", "Satoshi", "Daiki", "Yusuke", "Kaito",
    "Shinji", "Sho", "Yuji", "Kenta", "Ren", "Tomo", "Kei", "Ryota", "Haruto", "Riku",
    "Keita", "Takuya", "Shohei", "Ryuji", "Issei", "Tetsuya", "Haruki", "Satoru", "Naoki",
    "Ryusei", "Seiji", "Takumi", "Hiroki", "Yuuto", "Junya", "Tsubasa", "Ichiro", "Masashi",
    "Kouki", "Yuya", "Hikaru", "Yoshiki", "Yuta", "Hosei", "Kazuki", "Kazuma", "Ryosuke",
    "Shou", "Yamato", "Shun", "Taichi", "Satoru", "Kazuya", "Kou", "Kiyoshi", "Shoma",
    "Genta", "Keisuke", "Satoshi", "Yuichiro", "Haruma", "Kouhei", "Rei", "Yuto", "Mitsuki",
    "Kiyoshi", "Seiji", "Natsuki", "Jiro", "Shiro", "Riki", "Yuki", "Taro", "Shohei",
    "Eita", "Takahiro", "Katsuo", "Ryu", "Kenta", "Koji", "Keiji", "Renji", "Ryohei",
    "Isao", "Masato", "Ichiro", "Naoya", "Shunya", "Eiji", "Aki", "Minoru", "Ryoji"
};

List<string> japaneseLastnames = new List<string>
{
    "Takahashi", "Yamamoto", "Kobayashi", "Sato", "Tanaka", "Watanabe", "Ito", "Nakamura", "Kato", "Yoshida",
    "Yamashita", "Fujimoto", "Matsumoto", "Inoue", "Kimura", "Shimizu", "Kaneko", "Hasegawa", "Ogawa", "Mori",
    "Ishikawa", "Murakami", "Sasaki", "Yamada", "Nakajima", "Hirata", "Goto", "Okada", "Fujii", "Shibata",
    "Suzuki", "Hashimoto", "Takahara", "Abe", "Nishimura", "Ueda", "Kusunoki", "Miyamoto", "Matsuda", "Oda",
    "Takeuchi", "Kobayashi", "Asano", "Endo", "Arakawa", "Noda", "Okamoto", "Saito", "Fukuda", "Sakai",
    "Mizuno", "Aoki", "Hoshino", "Kuroda", "Sakamoto", "Tani", "Kagawa", "Tomioka", "Sakamoto", "Wada",
    "Imai", "Yamaguchi", "Kubo", "Sekiguchi", "Okazaki", "Kobayashi", "Furukawa", "Taniguchi", "Kishi", "Murata",
    "Kobayashi", "Nakanishi", "Fujita", "Yokoyama", "Yamamoto", "Hirano", "Tachibana", "Kawai", "Kondo", "Tominari",
    "Sakai", "Kurosawa", "Oshima", "Hamada", "Ogino", "Yukimura", "Kawasaki", "Hiraki", "Otake", "Mukai",
    "Sakai", "Ichikawa", "Saeki", "Tominaga", "Sekiya", "Kawaguchi", "Kobori", "Yasuda", "Yamane", "Oda",
    "Kanemoto", "Hachiya", "Itoh", "Tsukamoto", "Tomiya", "Nagata", "Fukui", "Tanioka", "Toyoda", "Yamagishi",
    "Koyama", "Ishii", "Hasegawa", "Shibayama", "Fujisawa", "Harada", "Shinozaki", "Tomioka", "Mimura"
};

List<string> koreanFirstnames = new List<string>
{
    "Jin", "Minho", "Jiho", "Seojin", "Minseok", "Seungmin", "Jihoon", "Sungjae", "Jiwon", "Hyun",
    "Jiwon", "Kyung", "Seungwoo", "Hyunji", "Sungmin", "Jungwoo", "Sangho", "Hojin", "Jinhee", "Sumin",
    "Soojin", "Jiwon", "Seungwoo", "Jimin", "Sungjae", "Minseok", "Chanyeol", "Kyungsoo", "Sungkyu",
    "Seokjin", "Haein", "Jinwoo", "Minji", "Gyu", "Yujin", "Hyunseok", "Seungyoon", "Sungwoo", "Myeong",
    "Jaemin", "Jaeyoung", "Sungmin", "Jinmo", "Seungwoo", "Kyungmin", "Yunho", "Hoseok", "Jiwon",
    "Sungjae", "Sungjin", "Jisoo", "Seongmin", "Eunji", "Jungmin", "Sangmin", "Jinwook", "Sangho", 
    "Sangmin", "Minsu", "Yunji", "Haejun", "Sungjoo", "Kyungjoo", "Taehyung", "Seungjin", "Seonwoo", 
    "Taeyang", "Youngho", "Woobin", "Jaesun", "Yunho", "Jiwon", "Jungwoo", "Sungmin", "Gyuho", "Myeong",
    "Jiwon", "Sooho", "Hyeon", "Seongjin", "Dongho", "Jihyun", "Sungmin", "Hojin", "Jaekyung", "Jinsung"
};

List<string> koreanLastnames = new List<string>
{
    "Kim", "Lee", "Park", "Choi", "Jang", "Cho", "Yoon", "Im", "Han", "Kang",
    "Jeong", "Joo", "Ryu", "Oh", "Seo", "Lim", "Shin", "Jung", "Bae", "Chung",
    "Ahn", "Song", "Hwang", "Yang", "Moon", "Ko", "Choi", "Heo", "Hong",
    "Kim", "Sohn", "Yoo", "Noh", "Huh", "Kwon", "Park", "Suh", "Jung", "Jo",
    "Lee", "Cha", "Byun", "Oh", "Han", "Lee", "Kim", "Seo", "Park", "Jeong",
    "Son", "Baek", "Kang", "Nam", "Baek", "Kang", "Lim", "Lee", "Shim", "Cho",
    "Bae", "Ryu", "Joo", "Kim", "Yu", "Yun", "Kim", "Jang", "Go", "Kim",
    "Jung", "Yoo", "Choi", "Song", "Ahn", "Jung", "Hwang", "Bae", "Seo",
    "Noh", "Lee", "Jung", "Woo", "Hwang", "Lim", "Oh", "Baek", "Kim", "Song",
    "Jung", "Im", "Kim", "Park", "Yun", "Yoo", "Han", "Lee", "Jeong"
};

List<string> frenchFirstnames = new List<string>
{
    "Pierre", "Jean", "Michel", "Paul", "Jacques", "François", "Louis", "Henri", "André", "Claude",
    "Éric", "Bernard", "Robert", "Alain", "Georges", "Luc", "Thierry", "Christian", "Daniel", "Patrick",
    "Jacques", "Nicolas", "Marc", "Antoine", "Yves", "Mathieu", "David", "Vincent", "Gérard", "Frédéric",
    "Philippe", "Éric", "Charles", "Dominique", "Guillaume", "Thierry", "Benoît", "Régis", "Julien",
    "Laurent", "Sylvain", "Maurice", "René", "Olivier", "Pascal", "Michel", "Simon", "Sébastien", "Arnaud",
    "Armand", "Jacques", "Bruno", "Maxime", "Léon", "Julien", "Bastien", "Cédric", "Victor", "Romain",
    "Jérôme", "Stéphane", "Léonard", "Henri", "Marcel", "Claude", "Édouard", "Xavier", "Frédéric", 
    "Yannick", "Hervé", "Louis", "Thibault", "Lucien", "Bernard", "Eddy", "Félix", "Augustin", "Georges"
};

List<string> frenchLastnames = new List<string>
{
    "Dupont", "Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Lemoine", "Moreau", "Lemoine",
    "Durand", "Lefevre", "Benoit", "Girard", "Lambert", "David", "Caron", "Lemoine", "Gauthier", "Dufresne",
    "Leclerc", "Boucher", "Michaud", "Chartrand", "Faure", "Deschamps", "Chauvin", "Gagnon", "Joly",
    "Roy", "Lemoine", "Perrot", "Gérard", "Marchand", "Leclerc", "Pires", "Dufresne", "Faust",
    "Hebert", "Barbier", "Delacroix", "Mallet", "Lemoine", "Barreau", "Lemoine", "Brunet", "Meunier",
    "Boulanger", "Lemoine", "Dupuis", "Roux", "Perrin", "Lemoine", "Legrand", "Dufresne", "Boutin",
    "Roche", "Thibault", "Deslauriers", "Chauveau", "Laborde", "Francois", "Gagnon", "Lemoine", "Dupuy",
    "Lemoine", "Pelletier", "Caron", "Berthelot", "Côté", "Lemoine", "Descamps", "Fournier", "Chapelle",
    "Dufresne", "Gosselin", "Benoit", "Fortin", "Plante", "Caron", "Lemoine", "Lemoine", "Chaput", "Lemoine",
    "Marechal", "Chevalier", "Vermette", "Lemoine", "Malo", "Joly", "Lemoine"
};

// Age

// - - de 25 ans : 17 %
// - 25 - 29 ans : 30 %
// - 30 - 34 ans : 28 %
// - 35 - 39 ans : 18 %
// - + de 40 ans : 7 %

// Skills
// 18-22 ans : C'est l'âge où un joueur est en début de carrière, avec des compétences physiques plus élevées et un potentiel de développement important.
// 23-27 ans : Les joueurs sont en pleine forme, avec un haut niveau de potentiel dans la plupart des compétences.
// 28-32 ans : Compétences plus stables, avec des valeurs solides dans la plupart des domaines, mais certaines compétences (comme la vitesse ou stamina) peuvent commencer à décliner.
// 33 ans et plus : Les joueurs commencent à perdre des capacités physiques, notamment la vitesse, la puissance et l'endurance. Le mental (compétences de pitching et batting) peut rester stable, voire augmenter avec l'expérience.