export const GARDENER_ISSUES = [

/* =======================
   🌿 NUTRIENT DEFICIENCIES
======================= */

{
  id: 1,
  title_en: "Nitrogen Deficiency",
  title_hi: "Nitrogen ki kami",
  symptoms: "Leaves pale green / yellow ho rahe hain, growth slow hai.",
  root_cause: "Soil me nitrogen kam hai ya plant ko khana nahi mil raha.",
  action_plan: "Vermicompost ya liquid fertilizer do. 10–15 din me repeat.",
  intent_key: "nitrogen_deficiency"
},
{
  id: 2,
  title_en: "Phosphorus Deficiency",
  title_hi: "Phosphorus ki kami",
  symptoms: "Leaves dark ho jati hain, growth ruk jati hai.",
  root_cause: "Roots weak hain ya soil me phosphorus kam hai.",
  action_plan: "Bone meal ya flower booster do. Drainage check karo.",
  intent_key: "phosphorus_deficiency"
},
{
  id: 3,
  title_en: "Potassium Deficiency",
  title_hi: "Potash ki kami",
  symptoms: "Leaf edges brown ho rahe hain, plant weak lag raha.",
  root_cause: "Soil exhausted ho chuki hai.",
  action_plan: "Potash-rich fertilizer ya liquid feed do.",
  intent_key: "potassium_deficiency"
},
{
  id: 4,
  title_en: "Iron Deficiency",
  title_hi: "Iron ki kami",
  symptoms: "New leaves pe yellowing, veins green rehti hain.",
  root_cause: "High pH soil me iron absorb nahi hota.",
  action_plan: "Chelated iron ya micronutrient spray karo.",
  intent_key: "iron_deficiency"
},
{
  id: 5,
  title_en: "Magnesium Deficiency",
  title_hi: "Magnesium ki kami",
  symptoms: "Old leaves me veins green, beech yellow.",
  root_cause: "Soil imbalance ya overwatering.",
  action_plan: "Epsom salt spray (1 tsp/L) do.",
  intent_key: "magnesium_deficiency"
},

/* =======================
   💧 WATER & SOIL STRESS
======================= */

{
  id: 6,
  title_en: "Overwatering Stress",
  title_hi: "Zyada paani se damage",
  symptoms: "Leaves yellow, soil hamesha geeli.",
  root_cause: "Daily watering, drainage poor.",
  action_plan: "Watering band karo jab tak soil sukhe. Drain holes banao.",
  intent_key: "overwatering"
},
{
  id: 7,
  title_en: "Underwatering Stress",
  title_hi: "Paani ki kami",
  symptoms: "Leaves wilted, dry, curl ho rahe.",
  root_cause: "Bahut kam paani mil raha.",
  action_plan: "Deep watering karo. Soil ko poori tarah bhigo.",
  intent_key: "underwatering"
},
{
  id: 8,
  title_en: "Poor Drainage",
  title_hi: "Drainage problem",
  symptoms: "Plant slow grow, roots smell.",
  root_cause: "Pot me hole nahi, heavy soil.",
  action_plan: "Soil mix loose banao, pot change karo.",
  intent_key: "poor_drainage"
},
{
  id: 9,
  title_en: "Soil Compaction",
  title_hi: "Mitti sakht ho jana",
  symptoms: "Paani upar hi ruk jata hai.",
  root_cause: "Heavy garden soil use karna.",
  action_plan: "Cocopeat aur compost mix karo.",
  intent_key: "soil_compaction"
},
{
  id: 10,
  title_en: "Salt Build-up",
  title_hi: "Namkeen mitti",
  symptoms: "White layer soil ke upar.",
  root_cause: "Tap water + excess fertilizer.",
  action_plan: "Pot ko deep flush karo, clean water se.",
  intent_key: "salt_buildup"
},

/* =======================
   ☀️ LIGHT & CLIMATE
======================= */

{
  id: 11,
  title_en: "Sun Burn",
  title_hi: "Dhoop se jalna",
  symptoms: "Leaves pe brown patches.",
  root_cause: "Sudden direct sunlight.",
  action_plan: "Shade me shift karo. Gradual sun exposure.",
  intent_key: "sun_burn"
},
{
  id: 12,
  title_en: "Low Light Stress",
  title_hi: "Roshni kam milna",
  symptoms: "Leggy growth, pale leaves.",
  root_cause: "Andhera area.",
  action_plan: "Bright indirect light me rakho.",
  intent_key: "low_light"
},
{
  id: 13,
  title_en: "Heat Stress",
  title_hi: "Garmi ka stress",
  symptoms: "Leaves droop, edges dry.",
  root_cause: "Extreme heat.",
  action_plan: "Morning/evening watering, mulch lagao.",
  intent_key: "heat_stress"
},
{
  id: 14,
  title_en: "Cold Shock",
  title_hi: "Thand ka jhatka",
  symptoms: "Leaves black ya limp.",
  root_cause: "Sudden winter exposure.",
  action_plan: "Plant ko cover ya indoor rakho.",
  intent_key: "cold_shock"
},
{
  id: 15,
  title_en: "Wind Damage",
  title_hi: "Tez hawa se nuksaan",
  symptoms: "Torn leaves, bent stems.",
  root_cause: "Open terrace.",
  action_plan: "Wind barrier lagao.",
  intent_key: "wind_damage"
},

/* =======================
   🐛 PEST ISSUES
======================= */

{
  id: 16,
  title_en: "Aphid Attack",
  title_hi: "Aphids ka attack",
  symptoms: "Sticky leaves, ants.",
  root_cause: "Soft new growth.",
  action_plan: "Neem oil spray har 5 din.",
  intent_key: "aphids"
},
{
  id: 17,
  title_en: "Mealybugs",
  title_hi: "Mealybugs",
  symptoms: "White cotton spots.",
  root_cause: "Dry indoor air.",
  action_plan: "Alcohol swab + neem spray.",
  intent_key: "mealybugs"
},
{
  id: 18,
  title_en: "Spider Mites",
  title_hi: "Red mites",
  symptoms: "Webs, tiny dots.",
  root_cause: "Dry hot climate.",
  action_plan: "Leaves wash + neem oil.",
  intent_key: "mites"
},
{
  id: 19,
  title_en: "Whiteflies",
  title_hi: "Safed makhi",
  symptoms: "Flying insects.",
  root_cause: "Crowded plants.",
  action_plan: "Sticky traps + neem spray.",
  intent_key: "whiteflies"
},
{
  id: 20,
  title_en: "Caterpillars",
  title_hi: "Sundi",
  symptoms: "Holes in leaves.",
  root_cause: "Butterfly eggs.",
  action_plan: "Hand remove + organic spray.",
  intent_key: "caterpillars"
},

/* =======================
   🦠 DISEASES
======================= */

{
  id: 21,
  title_en: "Fungal Leaf Spot",
  title_hi: "Fungal daag",
  symptoms: "Brown/black spots.",
  root_cause: "Wet leaves.",
  action_plan: "Avoid misting, fungicide spray.",
  intent_key: "fungal_spot"
},
{
  id: 22,
  title_en: "Powdery Mildew",
  title_hi: "Safed powder",
  symptoms: "White powder on leaves.",
  root_cause: "Humidity.",
  action_plan: "Milk spray ya fungicide.",
  intent_key: "powdery_mildew"
},
{
  id: 23,
  title_en: "Root Rot",
  title_hi: "Jad sadna",
  symptoms: "Plant collapse.",
  root_cause: "Waterlogging.",
  action_plan: "Repot in dry soil.",
  intent_key: "root_rot"
},
{
  id: 24,
  title_en: "Bacterial Wilt",
  title_hi: "Bacterial wilting",
  symptoms: "Sudden wilting.",
  root_cause: "Soil infection.",
  action_plan: "Isolate plant.",
  intent_key: "bacterial_wilt"
},
{
  id: 25,
  title_en: "Mosaic Virus",
  title_hi: "Virus infection",
  symptoms: "Patchy leaf color.",
  root_cause: "Insect carriers.",
  action_plan: "Remove plant.",
  intent_key: "virus"
},

/* =======================
   🌱 GROWTH ISSUES
======================= */

{
  id: 26,
  title_en: "Stunted Growth",
  title_hi: "Growth ruk jana",
  symptoms: "Plant chhota reh jata.",
  root_cause: "Root bound ya low nutrients.",
  action_plan: "Bigger pot + compost.",
  intent_key: "stunted"
},
{
  id: 27,
  title_en: "Leggy Plant",
  title_hi: "Lamba patla plant",
  symptoms: "Weak long stems.",
  root_cause: "Low light.",
  action_plan: "Sunlight badhao, prune karo.",
  intent_key: "leggy"
},
{
  id: 28,
  title_en: "Leaf Drop",
  title_hi: "Patte girna",
  symptoms: "Leaves falling.",
  root_cause: "Stress.",
  action_plan: "Routine stable karo.",
  intent_key: "leaf_drop"
},
{
  id: 29,
  title_en: "No Flowering",
  title_hi: "Phool nahi aana",
  symptoms: "Only leaves.",
  root_cause: "Low sun, high nitrogen.",
  action_plan: "Flower booster do.",
  intent_key: "no_flowering"
},
{
  id: 30,
  title_en: "Poor Fruiting",
  title_hi: "Fruit kam banna",
  symptoms: "Flowers fall.",
  root_cause: "Nutrient imbalance.",
  action_plan: "Potash feed do.",
  intent_key: "poor_fruiting"
},

/* =======================
   🪴 MISC COMMON ISSUES
======================= */

{
  id: 31,
  title_en: "Transplant Shock",
  title_hi: "Repotting shock",
  symptoms: "Plant droops after repot.",
  root_cause: "Root damage.",
  action_plan: "Shade + root tonic.",
  intent_key: "transplant_shock"
},
{
  id: 32,
  title_en: "Hard Water Damage",
  title_hi: "Khard pani ka asar",
  symptoms: "Leaf tips brown.",
  root_cause: "High salts.",
  action_plan: "Rain/RO water use.",
  intent_key: "hard_water"
},
{
  id: 33,
  title_en: "Pest Reinfestation",
  title_hi: "Dobara keede",
  symptoms: "Pests return.",
  root_cause: "Incomplete control.",
  action_plan: "Regular neem cycle.",
  intent_key: "pest_repeat"
},
{
  id: 34,
  title_en: "Weak Roots",
  title_hi: "Kamzor jad",
  symptoms: "Plant unstable.",
  root_cause: "Poor soil.",
  action_plan: "Root promoter.",
  intent_key: "weak_roots"
},
{
  id: 35,
  title_en: "Soil Exhaustion",
  title_hi: "Mitti thak gayi",
  symptoms: "Growth slow.",
  root_cause: "Old soil.",
  action_plan: "Soil refresh.",
  intent_key: "soil_exhausted"
},

/* Add remaining to reach 45 */

{
  id: 36, title_en: "Leaf Curl", title_hi: "Patte murhna", symptoms: "Leaves curl", root_cause: "Stress/pests", action_plan: "Neem spray", intent_key: "leaf_curl"
},
{
  id: 37, title_en: "Bud Drop", title_hi: "Kali girna", symptoms: "Buds fall", root_cause: "Stress", action_plan: "Stable care", intent_key: "bud_drop"
},
{
  id: 38, title_en: "Yellow New Leaves", title_hi: "Naye patte peele", symptoms: "New yellow leaves", root_cause: "Iron issue", action_plan: "Micronutrient", intent_key: "new_yellow"
},
{
  id: 39, title_en: "Dry Tips", title_hi: "Patte ke tip sukhe", symptoms: "Brown tips", root_cause: "Dry air", action_plan: "Mist + water", intent_key: "dry_tips"
},
{
  id: 40, title_en: "Algae on Soil", title_hi: "Hara layer mitti pe", symptoms: "Green soil", root_cause: "Too wet", action_plan: "Reduce water", intent_key: "algae"
},
{
  id: 41, title_en: "Mold on Soil", title_hi: "Safed fungus mitti pe", symptoms: "White growth", root_cause: "Humidity", action_plan: "Dry topsoil", intent_key: "mold"
},
{
  id: 42, title_en: "Broken Stem", title_hi: "Tuta tana", symptoms: "Stem break", root_cause: "Wind", action_plan: "Support stick", intent_key: "broken_stem"
},
{
  id: 43, title_en: "Overfertilization", title_hi: "Zyada khaad", symptoms: "Burnt leaves", root_cause: "Excess feed", action_plan: "Flush soil", intent_key: "over_fertilize"
},
{
  id: 44, title_en: "Seedling Damping Off", title_hi: "Beej plant marna", symptoms: "Seedling collapse", root_cause: "Fungus", action_plan: "Sterile soil", intent_key: "damping_off"
},
{
  id: 45, title_en: "Weak Branching", title_hi: "Kam branch", symptoms: "Single stem", root_cause: "No pruning", action_plan: "Pinch tips", intent_key: "weak_branching"
}

];
