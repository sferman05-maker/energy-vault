export type Brand = {
  name: string
  slug: string
  description: string
  color: string
  emoji: string
  logo: string
  caffeine: number
  calories: number
  ingredients: { name: string; amount: string}[]
  website: string
}

export type Drink = {
  id: string
  brandSlug: string
  flavor: string
  description: string
  image: string
  caffeine?: number  // optional override
  calories?: number  // optional override
}

export const brands: Brand[] = [
  { name: "Ghost Energy", slug: "ghost", description: "Legendary flavors, transparent ingredients, and zero sugar. Feel good energy with authentic flavors and no BS.", color: "#8b5cf6", emoji: "👻", logo: "/assets/ghost-energy-logo.png", caffeine: 200, calories: 10, 
    ingredients: [{ name: "Caffeine", amount: "200mg" }, { name: "Alpha-GPC", amount: "150mg" }, { name: "NeuroFactor", amount: "100mg" }, { name: "L-Carnitine", amount: "1000mg" }, { name: "Taurine", amount: "1000mg" }, { name: "AstaGin", amount: "25mg" }, { name: "Vitamin C", amount: "90mg" }, { name: "Niacin (B3)", amount: "16mg" }, { name: "Vitamin B6", amount: "1.7mg" }, { name: "Vitamin B12", amount: "2.4mcg" }],
    website: "https://drinkghost.com/pages/energy" 
  },
  { name: "BUM Energy", slug: "bum", description: "Clean energy. Sharper Mind. Zero Compromise. Made by champions, for champions.", color: "#f59e0b", emoji: "💪", logo: "/assets/bum-energy-logo.png", caffeine: 112, calories: 5, 
    ingredients: [{ name: "Caffeine", amount: "112mg" }, { name: "Cognizin", amount: "250mg" }],
    website: "https://raw.rfrl.co/mm93r"
  },
  { name: "3D Energy", slug: "3d", description: "", color: "#00bfff", emoji: "3️⃣", logo: "/assets/3d-logo.png", caffeine: 200, calories: 10, 
    ingredients: [{ name: "Caffeine", amount: "200mg" }, { name: "Vitamin B12", amount: "100% DV" }], 
    website: "https://www.amazon.com/3D-Sugar-Free-Energy-Drink-Pre-Workout/dp/B0FJDYGY92/ref=sr_1_6?crid=2JH8FBBC8DIY4&dib=eyJ2IjoiMSJ9.UyYeMvH1xTfXYSOHRvgW7i-iPk2w1FLFO98ocQIx5Zz1zYQ94-DKWGYJ_34XjT8ckDmTfGc6Y_YB6gxH_V0zbFcOxbhf-9kIgTfbMBw41Sxdwk4Hdmuzyl2kFvEW6pXMsEJ8PWENcCxFksPGzsahLc-v8Y842qLbSavDeTUKLshBZidtN9R8ea6D4R3dO2ZaH6whu2T3AI7Py0pF1--2ag3o96mC8bfd9eTRPVpAuvY_Zr8AlovExg6Jy1aAEFVJ_7GcmtgucqR38lotj2KhW_L9q93AUXkKOM0Dv4AdDtk.wJmMVVyq1mT7ENplPpKmQoOHVyt5cZV5TM43DKhH728&dib_tag=se&keywords=3d%2Benergy&qid=1780524321&sprefix=3d%2Benergy%2Caps%2C415&sr=8-6&th=1"
  },
  { name: "Reign Fuel", slug: "reign", description: "", color: "#ff0000", emoji: "👑", logo: "/assets/reign-logo.png", caffeine: 200, calories: 10, 
    ingredients: [{ name: "Caffeine", amount: "200mg" }, { name: "BCAAs", amount: "Undisclosed" }, { name: "CoQ10", amount: "Undisclosed" }, { name: "Sodium", amount: "Undisclosed" }, { name: "Potassium", amount: "Undisclosed" }, { name: "Magnesium", amount: "Undisclosed" }, { name: "Niacin (B3)", amount: "100% DV" }, { name: "Vitamin B6", amount: "100% DV" }, { name: "Vitamin B12", amount: "100% DV" }], 
    website: "https://reignbodyfuel.com/en-us/products/"
  },
]

export const drinks: Drink[] = [
  // Ghost Energy
  { id: "ghost-sour-patch-kids-redberry", brandSlug: "ghost", flavor: "Sour Patch Kids Redberry", description: "The legendary collab. Sour then sweet redberry flavor with 200mg of natural caffeine.", image: "/assets/ghost-spk-redberry.png" },
  { id: "ghost-sour-patch-kids-blue-raspberry", brandSlug: "ghost", flavor: "Sour Patch Kids Blue Raspberry", description: "The legendary collab. Sour then sweet blue raspberry flavor with 200mg of natural caffeine.", image: "/assets/ghost-spk-blue-raspberry.png" },
  { id: "ghost-warheads-watermelon", brandSlug: "ghost", flavor: "Warheads Sour Watermelon", description: "Extreme sour watermelon flavor inspired by the legendary Warheads candy.", image: "/assets/ghost-warheads-sour-watermelon.png" },
  { id: "ghost-swedish-fish", brandSlug: "ghost", flavor: "Swedish Fish", description: "The iconic Swedish Fish flavor in an energy drink. Sweet and smooth.", image: "/assets/ghost-swedish-fish.png" },
  { id: "ghost-orange-cream", brandSlug: "ghost", flavor: "Orange Cream", description: "Creamy orange flavor reminiscent of a classic creamsicle.", image: "/assets/ghost-orange-cream.png" },
  { id: "ghost-iced-tea-lemonade", brandSlug: "ghost", flavor: "Iced Tea Lemonade", description: "Arnold palmers would be proud of this one.", image: "/assets/ghost-iced-tea-lemonade.png" },
  { id: "ghost-7up-cream", brandSlug: "ghost", flavor: "7UP", description: "Just like the lemon lime soda you know and love.", image: "/assets/ghost-7up.png" },
  { id: "ghost-blue-raspberry", brandSlug: "ghost", flavor: "Blue Raspberry", description: "Blue Raspberry slush. Sweeter than the Sour Patch Kids, but just as good.", image: "/assets/ghost-blue-raspberry.png" },
  { id: "ghost-bub-cotton-candy", brandSlug: "ghost", flavor: "Bubbalicious Cotton Candy", description: "Cotton Candy in drink form.", image: "/assets/ghost-bub-cotton-candy.png" },
  { id: "ghost-bub-og", brandSlug: "ghost", flavor: "Bubbalicious Original", description: "You could basically blow a bubble with this one.", image: "/assets/ghost-bub-og.png" },
  { id: "ghost-bub-strawberry-splash", brandSlug: "ghost", flavor: "Bubbalicious Strawberry Splash", description: "Sweet strawberry that will leave you wanting more.", image: "/assets/ghost-bub-strawberry-splash.png" },
  { id: "ghost-citrus", brandSlug: "ghost", flavor: "Citrus", description: "Instead of lemon lime, its lime lemon.", image: "/assets/ghost-citrus.png" },
  { id: "ghost-electric-lime", brandSlug: "ghost", flavor: "Electric Limeade", description: "Lemonade but with lime.", image: "/assets/ghost-electric-lime.png" },
  { id: "ghost-merica-pop", brandSlug: "ghost", flavor: "'Merica Pop", description: "Red white and blue screams freedom.", image: "/assets/ghost-merica-pop.png" },
  { id: "ghost-og", brandSlug: "ghost", flavor: "OG", description: "Humble beginnings, big endings.", image: "/assets/ghost-og.png" },
  { id: "ghost-og-colada", brandSlug: "ghost", flavor: "OG Colada", description: "Think beach and you're halfway there.", image: "/assets/ghost-og-colada.png", caffeine: 100 },
  { id: "ghost-peaches", brandSlug: "ghost", flavor: "Peaches", description: "Peaches, peaches, peachespeachespeaches....", image: "/assets/ghost-peaches.png" },
  { id: "ghost-raspberry-cream", brandSlug: "ghost", flavor: "Raspberry Cream", description: "Creamy raspberry flavor reminiscent of a classic rassicle.", image: "/assets/ghost-raspberry-cream.png" },
  { id: "ghost-sour-strips", brandSlug: "ghost", flavor: "Sour Strips", description: "Iconic drink for an iconic candy.", image: "/assets/ghost-sour-strips.png" },
  { id: "ghost-strawbango", brandSlug: "ghost", flavor: "Strawbango", description: "Strawberry + mango = strawbango", image: "/assets/ghost-strawbango.png" },
  { id: "ghost-strawbango-marg", brandSlug: "ghost", flavor: "Strawbango Margarita", description: "Strawbango but for adults.", image: "/assets/ghost-strawbango-marg.png" },
  { id: "ghost-strawberry-watermelon", brandSlug: "ghost", flavor: "Strawberry Watermelon", description: "Exactly what it sounds like, but better.", image: "/assets/ghost-strawberry-watermelon.png", caffeine: 100 },
  { id: "ghost-tropical-mango", brandSlug: "ghost", flavor: "Tropical Mango", description: "Like Mangos on a beach.", image: "/assets/ghost-tropical-mango.png" },
  { id: "ghost-warheads-sour-black-cherry", brandSlug: "ghost", flavor: "Warheads Sour Black Cherry", description: "Prepare to pucker up.", image: "/assets/ghost-warheads-sour-black-cherry.png" },
  { id: "ghost-warheads-sour-green-apple", brandSlug: "ghost", flavor: "Warheads Sour Green Apple", description: "Granny Smith here packs a punch.", image: "/assets/ghost-warheads-sour-green-apple.png" },
  { id: "ghost-welches-grape", brandSlug: "ghost", flavor: "Welch's Grape", description: "Exactly like the juice from when you were little.", image: "/assets/ghost-welches-grape.png" },
  { id: "ghost-welches-grape-cran", brandSlug: "ghost", flavor: "Welch's Grape-Cran", description: "Grape + Cranberry is a dangerous combo.", image: "/assets/ghost-welches-grape-cran.png" },

  // BUM Energy
  { id: "bum-iced-tea-lemonade", brandSlug: "bum", flavor: "Iced Tea Lemonade", description: "Classic iced tea lemonade flavor. Black tea and sour lemonade done to perfection.", image: "/assets/bum-iced-tea-lemonade.png" },
  { id: "bum-cherry-frost", brandSlug: "bum", flavor: "Cherry Frost", description: "A refreshing mixed berry flavor that hits different after a workout.", image: "/assets/bum-cherry-frost.png" },
  { id: "bum-orange-sunrise", brandSlug: "bum", flavor: "Orange Sunrise", description: "Tropical vibes in a can. Escape to Orange Sunrise with every sip.", image: "/assets/bum-orange-sunrise.png" },
  { id: "bum-watermelon", brandSlug: "bum", flavor: "Watermelon", description: "Sweet meets refreshing watermelon. A summer classic.", image: "/assets/bum-watermelon.png", calories: 10 },
  { id: "bum-strawberry-kiwi", brandSlug: "bum", flavor: "Strawberry Kiwi", description: "Sweet strawberry and tart kiwi.", image: "/assets/bum-strawberry-kiwi.png", calories: 10 },
  { id: "bum-peach-mango", brandSlug: "bum", flavor: "Peach Mango", description: "Sweet peach mixed with even sweeter mango.", image: "/assets/bum-peach-mango.png", calories: 10 },
  { id: "bum-blue-snow-cone", brandSlug: "bum", flavor: "Blue Snow Cone", description: "Sweet yet tart blue raspberry flavor.", image: "/assets/bum-blue-snow-cone.png", calories: 10 },
  { id: "bum-root-beer", brandSlug: "bum", flavor: "Root Beer", description: "Classic root beer taste. Think A&W, but caffeinated.", image: "/assets/bum-root-beer.png", calories: 10 },
  { id: "bum-pink-lemonade", brandSlug: "bum", flavor: "Pink Lemonade", description: "Sweet and tart strawberry flavor mixed with classic sour lemonade.", image: "/assets/bum-pink-lemonade.png", calories: 10 },
  { id: "bum-blueberry-lemonade", brandSlug: "bum", flavor: "Blueberry Lemonade", description: "Sweet blueberry mixed with sour lemonade.", image: "/assets/bum-blueberry-lemonade.png", calories: 10 },
  { id: "bum-dr-bum", brandSlug: "bum", flavor: "Dr. Bum", description: "Is it a Dr. Pepper, or is it a different mixture of 23 flavors?", image: "/assets/bum-dr-bum.png", calories: 10 },
  { id: "bum-grape", brandSlug: "bum", flavor: "Grape", description: "If you think about a purple grape, you can think about the taste of this one.", image: "/assets/bum-grape.png", calories: 10 },
  { id: "bum-champions-mentality", brandSlug: "bum", flavor: "Champions Mentality", description: "Sweet citrus slush.", image: "/assets/bum-champions-mentality.png", calories: 10 },
  { id: "bum-hard-to-kill", brandSlug: "bum", flavor: "Hard to Kill", description: "Sweet strawberry and sweet lemonade.", image: "/assets/bum-hard-to-kill.png", calories: 10 },
  { id: "bum-gummy-thark", brandSlug: "bum", flavor: "Gummy Thark", description: "Sweet and tart blue raspberry mixed with a smooth vanilla end.", image: "/assets/bum-gummy-thark.png", calories: 10 },
  { id: "bum-cola", brandSlug: "bum", flavor: "Cola", description: "Sweet classic cola.", image: "/assets/bum-cola.png" },
  { id: "bum-cream-soda", brandSlug: "bum", flavor: "Cream Soda", description: "Sweet vanilla soda.", image: "/assets/bum-cream-soda.png", calories: 10 },
  { id: "bum-pina-colada", brandSlug: "bum", flavor: "Pina Colada", description: "Sweet coconut and sour pineapple, tastes like you're on the beach!", image: "/assets/bum-pina-colada.png", calories: 10 },

  // 3D Energy
  { id: "3d-watermelon-grape", brandSlug: "3d", flavor: "Watermelon Grape", description: "", image: "/assets/3d-watermelon-grape.png" },
  { id: "3d-cucumber-melon", brandSlug: "3d", flavor: "Cucumber Melon", description: "", image: "/assets/3d-cucumber-melon.png" },
  { id: "3d-blueberry-mist", brandSlug: "3d", flavor: "Blueberry Mist", description: "", image: "/assets/3d-blueberry-mist.png" },
  { id: "3d-strawberry-lemonade", brandSlug: "3d", flavor: "Strawberry Lemonade", description: "", image: "/assets/3d-strawberry-lemonade.png" },
  { id: "3d-liberty-pop", brandSlug: "3d", flavor: "Liberty Pop", description: "", image: "/assets/3d-liberty-pop.png" },
  { id: "3d-citrus-frost", brandSlug: "3d", flavor: "Citrus Frost", description: "", image: "/assets/3d-citrus-frost.png" },
  { id: "3d-orange-cream", brandSlug: "3d", flavor: "Orange Cream", description: "", image: "/assets/3d-orange-cream.png" },
  { id: "3d-raspberry-sorbet", brandSlug: "3d", flavor: "Raspberry Sorbet", description: "", image: "/assets/3d-raspberry-sorbet.png" },

  // Reign Fuel
  { id: "reign-watermelon-sour-gummy", brandSlug: "reign", flavor: "Watermelon Sour Gummy", description: "", image: "/assets/reign-watermelon-sour-gummy.png" },
  { id: "reign-sour-gummy-worm", brandSlug: "reign", flavor: "Sour Gummy Worm", description: "", image: "/assets/reign-sour-gummy-worm.png" },
  { id: "reign-white-gummy-bear", brandSlug: "reign", flavor: "White Gummy Bear", description: "", image: "/assets/reign-white-gummy-bear.png" },
  { id: "reign-white-haze", brandSlug: "reign", flavor: "White Haze", description: "", image: "/assets/reign-white-haze.png" },
  { id: "reign-orange-dreamsicle", brandSlug: "reign", flavor: "Orange Dreamsicle", description: "", image: "/assets/reign-orange-dreamsicle.png" },
  { id: "reign-reignbow-sherbet", brandSlug: "reign", flavor: "Reignbow Sherbet", description: "", image: "/assets/reign-reignbow-sherbet.png" },
  { id: "reign-lilikoi-lychee", brandSlug: "reign", flavor: "Lilikoi Lychee", description: "", image: "/assets/reign-lilikoi-lychee.png" },
  { id: "reign-cherry-limade", brandSlug: "reign", flavor: "Cherry Limade", description: "", image: "/assets/reign-cherry-limade.png" },
  { id: "reign-razzle-berry", brandSlug: "reign", flavor: "Razzle Berry", description: "", image: "/assets/reign-razzle-berry.png" },
  { id: "reign-tropical-storm", brandSlug: "reign", flavor: "Tropical Storm", description: "", image: "/assets/reign-tropical-storm.png" },
]