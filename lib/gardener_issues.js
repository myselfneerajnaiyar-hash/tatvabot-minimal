export const GARDENER_ISSUES = [
  {
    id: 1,
    name: "Nitrogen Deficiency",
    symptoms: [
      "Purane patte peele pad rahe hain",
      "Plant ki growth slow hai",
      "Stem patla aur kamzor lag raha hai"
    ],
    cause: "Mitti me nitrogen ki kami, ya bar-bar pani dene se nutrients wash ho jana.",
    diagnosis_hint: "Aksar lower leaves pe yellowing hoti hai, upar ke patte thode green rehte hain.",
    action_plan: [
      "Vermicompost 1 mutthi har pot me daalo",
      "Liquid nitrogen fertilizer 3–5 ml / liter pani me mix karke do",
      "7–10 din baad dobara repeat karo"
    ],
    dosage: "3–5 ml liquid fertilizer per liter, root watering",
    mistakes_to_avoid: [
      "Roz-roz fertilizer dena",
      "Dry soil me fertilizer dalna"
    ],
    recovery_time: "7–14 din me naye patte green hone lagenge",
    confidence_rule: "Medium"
  },

  {
    id: 2,
    name: "Iron Deficiency",
    symptoms: [
      "Naye patte peele, veins green",
      "Upper leaves pale ho rahe hain"
    ],
    cause: "High pH soil ya micronutrient imbalance.",
    diagnosis_hint: "Yellow leaf with green veins – mostly new growth me.",
    action_plan: [
      "Chelated iron ya micronutrient mix spray karo",
      "5–7 din ke gap par 2 spray"
    ],
    dosage: "1–2 g per liter (foliar spray)",
    mistakes_to_avoid: [
      "Dhoop me spray karna",
      "Overdose karna"
    ],
    recovery_time: "5–10 din",
    confidence_rule: "High"
  },

  {
    id: 3,
    name: "Potassium Deficiency",
    symptoms: [
      "Leaf edges brown ho rahe hain",
      "Flowering kam ho rahi hai"
    ],
    cause: "Soil me potassium ki kami.",
    diagnosis_hint: "Edges burn jaisi lagti hain.",
    action_plan: [
      "Balanced NPK fertilizer do",
      "Banana peel compost ya liquid potash use karo"
    ],
    dosage: "3–4 ml per liter",
    mistakes_to_avoid: ["Sirf nitrogen dena"],
    recovery_time: "10–15 din",
    confidence_rule: "Medium"
  },

  {
    id: 4,
    name: "Magnesium Deficiency",
    symptoms: [
      "Patte ke beech yellowing",
      "Veins green rehti hain"
    ],
    cause: "Magnesium ki kami.",
    diagnosis_hint: "Middle-aged leaves affected.",
    action_plan: [
      "Epsom salt 1 tsp / liter spray karo",
      "10 din baad repeat"
    ],
    dosage: "1 tsp per liter (spray)",
    mistakes_to_avoid: ["Over spray"],
    recovery_time: "7–12 din",
    confidence_rule: "Medium"
  },

  {
    id: 5,
    name: "Overwatering Stress",
    symptoms: [
      "Patte latak rahe hain",
      "Mitti hamesha geeli"
    ],
    cause: "Zyada pani aur poor drainage.",
    diagnosis_hint: "Soil smell bhi aa sakti hai.",
    action_plan: [
      "Pani dena band karo jab tak mitti sukhe",
      "Drainage holes check karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Daily watering"],
    recovery_time: "5–10 din",
    confidence_rule: "High"
  },

  {
    id: 6,
    name: "Underwatering Stress",
    symptoms: [
      "Patte murjha gaye",
      "Soil bilkul sookhi"
    ],
    cause: "Pani kam milna.",
    diagnosis_hint: "Pot halka lagta hai.",
    action_plan: [
      "Deep watering karo",
      "Mulching karo"
    ],
    dosage: "Soak till water drains",
    mistakes_to_avoid: ["Thoda-thoda pani roz dena"],
    recovery_time: "1–3 din",
    confidence_rule: "High"
  },

  {
    id: 7,
    name: "Root Rot",
    symptoms: [
      "Bad smell from soil",
      "Plant achanak gir jata hai"
    ],
    cause: "Fungal attack due to waterlogging.",
    diagnosis_hint: "Roots black aur soft.",
    action_plan: [
      "Plant nikaal ke sadi roots kaato",
      "Fresh soil me lagao",
      "Fungicide + Trichoderma do"
    ],
    dosage: "2 ml fungicide per liter",
    mistakes_to_avoid: ["Same wet soil reuse karna"],
    recovery_time: "10–20 din",
    confidence_rule: "High"
  },

  {
    id: 8,
    name: "Fungal Leaf Disease",
    symptoms: [
      "Black/brown spots",
      "Patte gir rahe"
    ],
    cause: "High humidity, poor air flow.",
    diagnosis_hint: "Spots irregular shape ke.",
    action_plan: [
      "Infected patte hatao",
      "Fungicide spray karo"
    ],
    dosage: "2 ml per liter",
    mistakes_to_avoid: ["Wet leaves raat me"],
    recovery_time: "7–14 din",
    confidence_rule: "High"
  },

  {
    id: 9,
    name: "Pest Infestation",
    symptoms: [
      "Patton ke niche keede",
      "Sticky layer"
    ],
    cause: "Aphids, mealybugs, mites.",
    diagnosis_hint: "White cotton jaisa mass ya tiny insects.",
    action_plan: [
      "Neem oil spray",
      "3–4 din me repeat"
    ],
    dosage: "3 ml neem oil per liter",
    mistakes_to_avoid: ["Direct noon sun me spray"],
    recovery_time: "5–10 din",
    confidence_rule: "High"
  },

  {
    id: 10,
    name: "Sun Stress",
    symptoms: [
      "White/burn patches",
      "Leaf curling"
    ],
    cause: "Direct harsh sunlight.",
    diagnosis_hint: "Mostly terrace plants me.",
    action_plan: [
      "Shade net lagao",
      "Morning sun, afternoon shade"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Sudden full sun exposure"],
    recovery_time: "7–14 din",
    confidence_rule: "Medium"
  },

  {
    id: 11,
    name: "Cold Stress",
    symptoms: ["Leaves dull", "Growth ruk gayi"],
    cause: "Low temperature.",
    diagnosis_hint: "Winter me common.",
    action_plan: [
      "Plant ko sheltered jagah rakho",
      "Mulch soil"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Cold night watering"],
    recovery_time: "Season dependent",
    confidence_rule: "Low"
  },

  {
    id: 12,
    name: "Heat Stress",
    symptoms: ["Leaf curl", "Wilting at noon"],
    cause: "Extreme heat.",
    diagnosis_hint: "Noon me plant droop.",
    action_plan: [
      "Morning watering",
      "Shade provide karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Afternoon watering"],
    recovery_time: "3–7 din",
    confidence_rule: "Medium"
  },

  {
    id: 13,
    name: "Poor Drainage",
    symptoms: ["Water stagnation", "Yellow leaves"],
    cause: "Blocked pot holes.",
    diagnosis_hint: "Pani nikalta nahi.",
    action_plan: [
      "Pot holes clean karo",
      "Soil me sand/perlite add karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Heavy clay soil"],
    recovery_time: "Immediate",
    confidence_rule: "High"
  },

  {
    id: 14,
    name: "Transplant Shock",
    symptoms: ["Wilting after repot"],
    cause: "Root disturbance.",
    diagnosis_hint: "Recently shifted plant.",
    action_plan: [
      "Shade me rakho",
      "Seaweed extract spray karo"
    ],
    dosage: "2 ml per liter",
    mistakes_to_avoid: ["Direct sun after repot"],
    recovery_time: "5–8 din",
    confidence_rule: "High"
  },

  {
    id: 15,
    name: "Nutrient Burn",
    symptoms: ["Leaf tips brown", "Crispy edges"],
    cause: "Over-fertilization.",
    diagnosis_hint: "Recently heavy feeding.",
    action_plan: [
      "Plain water se soil flush karo",
      "Fertilizer band karo 10 din"
    ],
    dosage: "—",
    mistakes_to_avoid: ["High dose fertilizer"],
    recovery_time: "7–12 din",
    confidence_rule: "High"
  },
 {
    id: 16,
    name: "Poor Flowering",
    symptoms: [
      "Plant healthy hai par phool nahi aa rahe",
      "Sirf leaves grow ho rahe hain"
    ],
    cause: "Excess nitrogen, kam sunlight, pruning galat time pe.",
    diagnosis_hint: "Green growth zyada, buds nahi.",
    action_plan: [
      "Flower booster 2–3 ml / liter do",
      "Roz kam se kam 4–5 ghante dhoop do",
      "Old branches prune karo"
    ],
    dosage: "2–3 ml flower booster per liter",
    mistakes_to_avoid: ["High nitrogen fertilizer"],
    recovery_time: "10–20 din",
    confidence_rule: "High"
  },

  {
    id: 17,
    name: "Bud Drop",
    symptoms: [
      "Buds gir ja rahe hain",
      "Phool khilne se pehle girte"
    ],
    cause: "Water stress, sudden weather change.",
    diagnosis_hint: "Buds bante hain par open nahi hote.",
    action_plan: [
      "Regular watering maintain karo",
      "Pot ko stable jagah rakho",
      "Liquid fertilizer light dose me do"
    ],
    dosage: "2 ml per liter",
    mistakes_to_avoid: ["Bar-bar pot move karna"],
    recovery_time: "7–14 din",
    confidence_rule: "Medium"
  },

  {
    id: 18,
    name: "Leggy Growth",
    symptoms: [
      "Plant lamba patla ho raha",
      "Nodes ke beech zyada gap"
    ],
    cause: "Low sunlight.",
    diagnosis_hint: "Plant ek side jhuk raha.",
    action_plan: [
      "Bright location me rakho",
      "Top pruning karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Dark corner placement"],
    recovery_time: "10–15 din",
    confidence_rule: "High"
  },

  {
    id: 19,
    name: "Soil Compaction",
    symptoms: [
      "Water upar hi ruk jata hai",
      "Roots growth kam"
    ],
    cause: "Heavy soil mix.",
    diagnosis_hint: "Soil hard lagti hai.",
    action_plan: [
      "Cocopeat + sand mix karo",
      "Top soil loosen karo"
    ],
    dosage: "30–40% cocopeat mix",
    mistakes_to_avoid: ["Pure garden mitti use karna"],
    recovery_time: "Immediate",
    confidence_rule: "High"
  },

  {
    id: 20,
    name: "Leaf Curl (Physiological)",
    symptoms: [
      "Patte andar ki taraf mud rahe",
      "No pests visible"
    ],
    cause: "Heat ya water stress.",
    diagnosis_hint: "Uniform curl, insects nahi.",
    action_plan: [
      "Morning watering",
      "Partial shade do"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Afternoon watering"],
    recovery_time: "3–7 din",
    confidence_rule: "Medium"
  },

  {
    id: 21,
    name: "White Powder on Leaves",
    symptoms: [
      "Safed powder jaisa layer",
      "Patte dull ho rahe"
    ],
    cause: "Powdery mildew (fungal).",
    diagnosis_hint: "White dusty coating.",
    action_plan: [
      "Affected leaves hatao",
      "Fungicide spray karo"
    ],
    dosage: "2 ml per liter",
    mistakes_to_avoid: ["Night watering"],
    recovery_time: "7–12 din",
    confidence_rule: "High"
  },

  {
    id: 22,
    name: "Sticky Leaves",
    symptoms: [
      "Leaves chipchipe",
      "Ants around plant"
    ],
    cause: "Aphids or mealybugs.",
    diagnosis_hint: "Honeydew presence.",
    action_plan: [
      "Neem oil spray",
      "Ants control karo"
    ],
    dosage: "3 ml per liter",
    mistakes_to_avoid: ["One-time spray only"],
    recovery_time: "5–10 din",
    confidence_rule: "High"
  },

  {
    id: 23,
    name: "Yellow Spots on Leaves",
    symptoms: [
      "Yellow circular patches",
      "Spread slowly"
    ],
    cause: "Early fungal infection.",
    diagnosis_hint: "Spots with border.",
    action_plan: [
      "Fungicide spray",
      "Airflow improve karo"
    ],
    dosage: "2 ml per liter",
    mistakes_to_avoid: ["Wet foliage overnight"],
    recovery_time: "7–14 din",
    confidence_rule: "Medium"
  },

  {
    id: 24,
    name: "Stunted Growth",
    symptoms: [
      "Plant chhota hi reh gaya",
      "No new shoots"
    ],
    cause: "Poor soil, nutrient deficiency.",
    diagnosis_hint: "Long time se same size.",
    action_plan: [
      "Repot in fresh mix",
      "Organic fertilizer do"
    ],
    dosage: "1–2 mutthi vermicompost",
    mistakes_to_avoid: ["Old exhausted soil"],
    recovery_time: "15–30 din",
    confidence_rule: "Medium"
  },

  {
    id: 25,
    name: "Leaf Drop (Indoor Plants)",
    symptoms: [
      "Indoor plant ke patte gir rahe"
    ],
    cause: "Light change or dry air.",
    diagnosis_hint: "Recently shifted plant.",
    action_plan: [
      "Stable location",
      "Light misting"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Frequent relocation"],
    recovery_time: "5–10 din",
    confidence_rule: "Medium"
  },

  {
    id: 26,
    name: "Algae on Soil",
    symptoms: [
      "Green layer on soil surface"
    ],
    cause: "Excess moisture.",
    diagnosis_hint: "Wet soil always.",
    action_plan: [
      "Top soil dry hone do",
      "Reduce watering"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Daily watering"],
    recovery_time: "3–5 din",
    confidence_rule: "High"
  },

  {
    id: 27,
    name: "Mosquito Breeding in Pots",
    symptoms: [
      "Small insects from soil",
      "Standing water"
    ],
    cause: "Water stagnation.",
    diagnosis_hint: "Larvae visible.",
    action_plan: [
      "Remove standing water",
      "Sand layer add karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Open trays with water"],
    recovery_time: "Immediate",
    confidence_rule: "High"
  },

  {
    id: 28,
    name: "Root Bound Plant",
    symptoms: [
      "Roots bahar nikal rahe",
      "Growth ruk gayi"
    ],
    cause: "Small pot.",
    diagnosis_hint: "Pot me roots ghoomi hui.",
    action_plan: [
      "Bigger pot me shift karo",
      "Fresh soil use karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Same small pot"],
    recovery_time: "7–14 din",
    confidence_rule: "High"
  },

  {
    id: 29,
    name: "Weak Stem",
    symptoms: [
      "Plant gir jata hai",
      "Stem soft"
    ],
    cause: "Low light, excess nitrogen.",
    diagnosis_hint: "Plant support maang raha.",
    action_plan: [
      "More sunlight",
      "Support stick lagao"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Shade only"],
    recovery_time: "10–20 din",
    confidence_rule: "Medium"
  },

  {
    id: 30,
    name: "Seedling Damping Off",
    symptoms: [
      "New seedlings gir jaate"
    ],
    cause: "Fungal infection in nursery stage.",
    diagnosis_hint: "Stem base thin ho jata.",
    action_plan: [
      "Fungicide soil drench",
      "Airflow improve karo"
    ],
    dosage: "1–2 ml per liter soil drench",
    mistakes_to_avoid: ["Overwatering seedlings"],
    recovery_time: "5–10 din",
    confidence_rule: "High"
  },
   {
    id: 31,
    name: "Sun Scorch",
    symptoms: [
      "Leaves par brown dry patches",
      "Edges jaley hue jaise"
    ],
    cause: "Harsh direct sunlight.",
    diagnosis_hint: "South-facing balcony me zyada common.",
    action_plan: [
      "Partial shade do",
      "Damaged leaves hatao"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Sudden full sun exposure"],
    recovery_time: "7–12 din",
    confidence_rule: "High"
  },

  {
    id: 32,
    name: "Cold Shock",
    symptoms: [
      "Leaves limp ho jaate",
      "Growth ruk jaata"
    ],
    cause: "Sudden thand ya raat ka thanda hawa.",
    diagnosis_hint: "Winter mornings ke baad.",
    action_plan: [
      "Plant ko sheltered jagah rakho",
      "Night me cover karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Cold draft"],
    recovery_time: "5–10 din",
    confidence_rule: "Medium"
  },

  {
    id: 33,
    name: "Iron Deficiency",
    symptoms: [
      "New leaves yellow, veins green",
      "Growth slow"
    ],
    cause: "High pH soil, micronutrient lack.",
    diagnosis_hint: "Young leaves pe pehle effect.",
    action_plan: [
      "Micronutrient spray",
      "Soil pH improve karo"
    ],
    dosage: "1–2 g per liter foliar spray",
    mistakes_to_avoid: ["Only NPK dena"],
    recovery_time: "7–14 din",
    confidence_rule: "High"
  },

  {
    id: 34,
    name: "Magnesium Deficiency",
    symptoms: [
      "Old leaves yellow between veins",
      "Edges green rehte"
    ],
    cause: "Poor nutrient balance.",
    diagnosis_hint: "Lower leaves pe pehle.",
    action_plan: [
      "Epsom salt spray",
      "Balanced fertilizer do"
    ],
    dosage: "1 tsp Epsom salt per liter",
    mistakes_to_avoid: ["Excess potassium"],
    recovery_time: "7–10 din",
    confidence_rule: "Medium"
  },

  {
    id: 35,
    name: "Calcium Deficiency",
    symptoms: [
      "New leaves deformed",
      "Flower end rot (veggies)"
    ],
    cause: "Irregular watering, low calcium.",
    diagnosis_hint: "Tomato, chilli me common.",
    action_plan: [
      "Calcium spray",
      "Consistent watering"
    ],
    dosage: "2 ml calcium per liter",
    mistakes_to_avoid: ["Dry-wet cycle"],
    recovery_time: "10–15 din",
    confidence_rule: "High"
  },

  {
    id: 36,
    name: "Excess Salt in Soil",
    symptoms: [
      "White crust on soil",
      "Leaf burn tips"
    ],
    cause: "Over-fertilization.",
    diagnosis_hint: "Hard water + fertilizer.",
    action_plan: [
      "Soil flush karo",
      "Fertilizer break lo"
    ],
    dosage: "Plain water leaching",
    mistakes_to_avoid: ["Weekly feeding"],
    recovery_time: "7–14 din",
    confidence_rule: "High"
  },

  {
    id: 37,
    name: "Spider Mites",
    symptoms: [
      "Fine webbing",
      "Speckled leaves"
    ],
    cause: "Dry hot conditions.",
    diagnosis_hint: "Leaf underside check.",
    action_plan: [
      "Neem oil spray",
      "Humidity badhao"
    ],
    dosage: "3 ml neem oil per liter",
    mistakes_to_avoid: ["Ignoring underside"],
    recovery_time: "5–8 din",
    confidence_rule: "High"
  },

  {
    id: 38,
    name: "Mealybugs",
    symptoms: [
      "Cotton-like clusters",
      "Sticky residue"
    ],
    cause: "Pest infestation.",
    diagnosis_hint: "Stem joints pe.",
    action_plan: [
      "Alcohol swab",
      "Neem oil spray"
    ],
    dosage: "3 ml neem oil per liter",
    mistakes_to_avoid: ["One-time cleaning"],
    recovery_time: "7–12 din",
    confidence_rule: "High"
  },

  {
    id: 39,
    name: "Thrips Damage",
    symptoms: [
      "Silvery streaks",
      "Distorted leaves"
    ],
    cause: "Thrips feeding.",
    diagnosis_hint: "Tiny fast-moving insects.",
    action_plan: [
      "Neem oil spray",
      "Sticky traps"
    ],
    dosage: "3 ml neem oil per liter",
    mistakes_to_avoid: ["Delayed treatment"],
    recovery_time: "5–10 din",
    confidence_rule: "Medium"
  },

  {
    id: 40,
    name: "Aphid Attack",
    symptoms: [
      "Clustered small insects",
      "Leaf curl"
    ],
    cause: "Soft new growth attracts pests.",
    diagnosis_hint: "Tender shoots pe.",
    action_plan: [
      "Neem oil spray",
      "Prune infected tips"
    ],
    dosage: "3 ml neem oil per liter",
    mistakes_to_avoid: ["Ignoring ants"],
    recovery_time: "4–7 din",
    confidence_rule: "High"
  },

  {
    id: 41,
    name: "Black Spot Disease",
    symptoms: [
      "Black round spots",
      "Yellow halo"
    ],
    cause: "Fungal infection (roses).",
    diagnosis_hint: "Rainy season me common.",
    action_plan: [
      "Remove infected leaves",
      "Fungicide spray"
    ],
    dosage: "2 ml per liter",
    mistakes_to_avoid: ["Wet foliage"],
    recovery_time: "10–15 din",
    confidence_rule: "High"
  },

  {
    id: 42,
    name: "Leaf Miners",
    symptoms: [
      "White zig-zag lines",
      "Transparent tunnels"
    ],
    cause: "Larvae inside leaf.",
    diagnosis_hint: "Patterned damage.",
    action_plan: [
      "Affected leaves remove",
      "Neem oil spray"
    ],
    dosage: "3 ml neem oil per liter",
    mistakes_to_avoid: ["Letting larvae mature"],
    recovery_time: "5–8 din",
    confidence_rule: "High"
  },

  {
    id: 43,
    name: "Overcrowding",
    symptoms: [
      "Plants competing",
      "Weak growth"
    ],
    cause: "Too many plants in one pot.",
    diagnosis_hint: "Roots tangled.",
    action_plan: [
      "Thin seedlings",
      "Repot separately"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Letting all survive"],
    recovery_time: "Immediate",
    confidence_rule: "High"
  },

  {
    id: 44,
    name: "Water Logging in Ground Beds",
    symptoms: [
      "Soil soggy",
      "Roots rotting"
    ],
    cause: "Poor drainage.",
    diagnosis_hint: "Puddles after watering.",
    action_plan: [
      "Raised beds banao",
      "Sand mix karo"
    ],
    dosage: "—",
    mistakes_to_avoid: ["Clay soil only"],
    recovery_time: "10–20 din",
    confidence_rule: "High"
  },

  {
    id: 45,
    name: "Transplant Shock",
    symptoms: [
      "Wilting after shifting",
      "Leaf drop"
    ],
    cause: "Root disturbance.",
    diagnosis_hint: "Recent repotting.",
    action_plan: [
      "Shade me rakho",
      "Light watering"
    ],
    dosage: "Root tonic 2 ml per liter",
    mistakes_to_avoid: ["Direct sun immediately"],
    recovery_time: "5–7 din",
    confidence_rule: "High"
  }
   ];
