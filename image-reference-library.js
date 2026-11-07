/* Persona Generator + reusable reference photo library.
   Photos are independently labeled by the trait they visibly demonstrate.
   They do not need to match unrelated selections in other categories.
   Each record retains source, creator and license metadata. */
(function(){
  var library = {
    version: 3,
    images: [
      {
        id: "ethnicity-afro-caribbean-jabari-timothy",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/jabari-timothy-Sj9kHF39jII-unsplash~2.jpg",
        group: "Ethnicity / heritage",
        value: "Afro-Caribbean",
        visibleTraits: ["Ethnicity / heritage"],
        context: {},
        alt: "Photorealistic portrait reference for the Afro-Caribbean heritage selection",
        creator: "Jabari Timothy",
        source: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/jabari-timothy-Sj9kHF39jII-unsplash~2.jpg",
        license: "User-provided image"
      },
      {
        id: "ethnicity-african-american-black-dellon-thomas",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/dellon-thomas-Fp8uh-Ls4ic-unsplash~2.jpg",
        group: "Ethnicity / heritage",
        value: "African American",
        visibleTraits: ["Ethnicity / heritage"],
        context: {},
        alt: "Photorealistic portrait reference for the African American / Black heritage selection",
        creator: "Dellon Thomas",
        source: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/dellon-thomas-Fp8uh-Ls4ic-unsplash~2.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-color-brown-pexels-32316907",
        src: "https://images.pexels.com/photos/32316907/pexels-photo-32316907.jpeg",
        group: "Eye color",
        value: "Brown",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic macro photograph of a single brown human eye and iris",
        creator: "Navneet Shanu",
        source: "https://www.pexels.com/photo/close-up-of-a-brown-human-eye-with-reflection-32316907/",
        license: "Pexels License"
      },
      {
        id: "eye-color-dark-brown-pexels-34369399",
        src: "/assets/reference-images/1794021837759.jpg",
        group: "Eye color",
        value: "Dark brown",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic close-up reference showing a dark brown iris",
        creator: "Nitin Yadav",
        source: "/assets/reference-images/1794021837759.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-color-hazel-pexels-32679446",
        src: "/assets/reference-images/1794021847068.jpg",
        group: "Eye color",
        value: "Hazel",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic close-up reference showing a hazel iris",
        creator: "Haim Charbit",
        source: "/assets/reference-images/1794021847068.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-color-green-pexels-33829464",
        src: "/assets/reference-images/1794021842718.jpg",
        group: "Eye color",
        value: "Green",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic close-up reference showing a green iris",
        creator: "Burak Uney",
        source: "/assets/reference-images/1794021842718.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-color-blue-pexels-33441257",
        src: "/assets/reference-images/1794021472384.jpg",
        group: "Eye color",
        value: "Blue",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic close-up reference showing a blue iris",
        creator: "Cem Gizep",
        source: "/assets/reference-images/1794021472384.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-color-grey-pexels-7516687",
        src: "/assets/reference-images/1794021852939.jpg",
        group: "Eye color",
        value: "Grey",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic close-up reference showing a grey iris",
        creator: "David Selbert",
        source: "/assets/reference-images/1794021852939.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-color-amber-pexels-16824177",
        src: "https://images.pexels.com/photos/16824177/pexels-photo-16824177.jpeg",
        group: "Eye color",
        value: "Amber",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic macro photograph of a single human eye with a golden amber iris",
        creator: "Yaren Aysan",
        source: "https://www.pexels.com/photo/a-close-up-of-a-person-s-eye-with-yellow-iris-16824177/",
        license: "Pexels License"
      },
      {
        id: "eye-shape-downturned-user",
        src: "/assets/reference-images/1794022337471.jpg",
        group: "Eye shape",
        value: "Downturned",
        visibleTraits: ["Eye shape"],
        context: {},
        alt: "Photorealistic close-up reference showing downturned eye shape",
        creator: "User-provided",
        source: "/assets/reference-images/1794022337471.jpg",
        license: "User-provided image"
      },
      {
        id: "eye-shape-monolid-user",
        src: "/assets/reference-images/1794022343874.jpg",
        group: "Eye shape",
        value: "Monolid",
        visibleTraits: ["Eye shape"],
        context: {},
        alt: "Photorealistic close-up reference showing monolid eye shape",
        creator: "User-provided",
        source: "/assets/reference-images/1794022343874.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-black",
        src: "https://images.pexels.com/photos/36120417/pexels-photo-36120417.jpeg",
        group: "Hair color",
        value: "Black",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult woman with natural black hair",
        creator: "Elo",
        source: "https://www.pexels.com/photo/portrait-of-a-woman-with-natural-hair-against-dark-background-36120417/",
        license: "Pexels License"
      },
      {
        id: "hair-color-chestnut-user",
        src: "/assets/reference-images/1794021478137.jpg",
        group: "Hair color",
        value: "Chestnut",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing chestnut-colored hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794021478137.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-dark-brown-user",
        src: "/assets/reference-images/1794022331213.jpg",
        group: "Hair color",
        value: "Dark brown",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing dark brown hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794022331213.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-auburn-user",
        src: "/assets/reference-images/1794022739185.jpg",
        group: "Hair color",
        value: "Auburn",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing auburn hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794022739185.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-red-user",
        src: "/assets/reference-images/1794022745704.jpg",
        group: "Hair color",
        value: "Red",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing red hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794022745704.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-copper-user",
        src: "/assets/reference-images/1794022751590.jpg",
        group: "Hair color",
        value: "Copper",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing copper-colored hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794022751590.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-honey-blonde-user",
        src: "/assets/reference-images/1794022757550.jpg",
        group: "Hair color",
        value: "Honey blonde",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing honey blonde hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794022757550.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-blonde",
        src: "https://images.pexels.com/photos/19309788/pexels-photo-19309788.jpeg",
        group: "Hair color",
        value: "Blonde",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult woman with blonde hair",
        creator: "Ekam Juneja",
        source: "https://www.pexels.com/photo/portrait-of-blonde-woman-19309788/",
        license: "Pexels License"
      },
      {
        id: "hair-color-platinum-blonde",
        src: "https://images.pexels.com/photos/35855452/pexels-photo-35855452.jpeg",
        group: "Hair color",
        value: "Platinum blonde",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult with platinum blonde hair",
        creator: "Khoa Võ",
        source: "https://www.pexels.com/photo/urban-portrait-of-a-young-adult-with-platinum-hair-35855452/",
        license: "Pexels License"
      },
      {
        id: "hair-color-silver",
        src: "https://images.pexels.com/photos/34943056/pexels-photo-34943056.jpeg",
        group: "Hair color",
        value: "Silver",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an older adult woman with silver hair",
        creator: "Tony Zohari",
        source: "https://www.pexels.com/photo/elderly-woman-with-silver-hair-in-thought-34943056/",
        license: "Pexels License"
      },
      {
        id: "hair-color-pastel-pink",
        src: "https://images.pexels.com/photos/9381420/pexels-photo-9381420.jpeg",
        group: "Hair color",
        value: "Pastel pink",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult woman with pastel pink hair",
        creator: "Paloma Clarice",
        source: "https://www.pexels.com/photo/close-up-photo-of-woman-with-pink-hair-9381420/",
        license: "Pexels License"
      },
      {
        id: "hair-color-fantasy",
        src: "https://images.pexels.com/photos/13417941/pexels-photo-13417941.jpeg",
        group: "Hair color",
        value: "Fantasy color",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic fantasy-styled portrait of an adult with purple hair",
        creator: "Quyn Phạm",
        source: "https://www.pexels.com/photo/a-woman-with-purple-hair-while-holding-a-sword-13417941/",
        license: "Pexels License"
      },
      {
        id: "hair-length-pixie",
        src: "https://images.pexels.com/photos/28969181/pexels-photo-28969181.jpeg",
        group: "Hair length",
        value: "Pixie",
        visibleTraits: ["Hair length"],
        context: {},
        alt: "Photorealistic portrait showing a short pixie haircut",
        creator: "pedro furtado",
        source: "https://www.pexels.com/photo/chic-portrait-of-person-with-blonde-pixie-haircut-28969181/",
        license: "Pexels License"
      },
      {
        id: "hair-length-short",
        src: "https://images.pexels.com/photos/28924266/pexels-photo-28924266.jpeg",
        group: "Hair length",
        value: "Short",
        visibleTraits: ["Hair length"],
        context: {},
        alt: "Photorealistic portrait showing short hair",
        creator: "pedro furtado",
        source: "https://www.pexels.com/photo/stylish-portrait-of-woman-with-short-hair-28924266/",
        license: "Pexels License"
      },
      {
        id: "hair-length-shoulder",
        src: "/assets/reference-images/1794021485120.jpg",
        group: "Hair length",
        value: "Shoulder length",
        visibleTraits: ["Hair length"],
        context: {},
        alt: "Photorealistic reference showing shoulder-length hair",
        creator: "Luis Quintero",
        source: "/assets/reference-images/1794021485120.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-length-long",
        src: "https://images.pexels.com/photos/17464333/pexels-photo-17464333.jpeg",
        group: "Hair length",
        value: "Long",
        visibleTraits: ["Hair length"],
        context: {},
        alt: "Photorealistic portrait showing long hair",
        creator: "Denner Trindade",
        source: "https://www.pexels.com/photo/portrait-of-a-woman-with-long-blonde-hair-17464333/",
        license: "Pexels License"
      },
      {
        id: "hair-texture-curly",
        src: "https://images.pexels.com/photos/39833234/pexels-photo-39833234.jpeg",
        group: "Hair texture",
        value: "Curly",
        visibleTraits: ["Hair texture"],
        context: {},
        alt: "Photorealistic portrait showing defined curly hair",
        creator: "Angel Rondon",
        source: "https://www.pexels.com/photo/stunning-portrait-of-a-woman-with-curly-hair-39833234/",
        license: "Pexels License"
      },
      {
        id: "hair-texture-natural",
        src: "https://images.pexels.com/photos/36120417/pexels-photo-36120417.jpeg",
        group: "Hair texture",
        value: "Natural texture",
        visibleTraits: ["Hair texture"],
        context: {},
        alt: "Photorealistic portrait showing natural textured hair",
        creator: "Elo",
        source: "https://www.pexels.com/photo/portrait-of-a-woman-with-natural-hair-against-dark-background-36120417/",
        license: "Pexels License"
      },
            {
        id: "age-18-24",
        src: "https://images.pexels.com/photos/27896914/pexels-photo-27896914.jpeg",
        group: "Age range",
        value: "Adult 18–24",
        visibleTraits: ["Age range"],
        context: {},
        alt: "Close-up portrait of a young adult woman",
        creator: "Ryan Garry",
        source: "https://www.pexels.com/photo/portrait-of-a-woman-27896914/",
        license: "Pexels License"
      },
      {
        id: "age-25-34",
        src: "https://images.pexels.com/photos/30468635/pexels-photo-30468635.jpeg",
        group: "Age range",
        value: "Adult 25–34",
        visibleTraits: ["Age range"],
        context: {},
        alt: "Portrait of a young adult woman in a white shirt",
        creator: "Augusto Carneiro Junior",
        source: "https://www.pexels.com/photo/elegant-portrait-of-a-young-woman-in-white-shirt-30468635/",
        license: "Pexels License"
      },
      {
        id: "age-35-44",
        src: "https://images.pexels.com/photos/34210856/pexels-photo-34210856.jpeg",
        group: "Age range",
        value: "Adult 35–44",
        visibleTraits: ["Age range"],
        context: {},
        alt: "Portrait of a mature adult woman with grey hair",
        creator: "melbourne ross",
        source: "https://www.pexels.com/photo/sophisticated-mature-woman-in-leather-jacket-34210856/",
        license: "Pexels License"
      },
      {
        id: "age-45-54",
        src: "https://images.pexels.com/photos/6874301/pexels-photo-6874301.jpeg",
        group: "Age range",
        value: "Adult 45–54",
        visibleTraits: ["Age range"],
        context: {},
        alt: "Portrait of a mature adult woman in side view",
        creator: "Teona Swift",
        source: "https://www.pexels.com/photo/concerned-mature-woman-standing-against-wall-in-room-6874301/",
        license: "Pexels License"
      },
      {
        id: "age-55-plus",
        src: "https://images.pexels.com/photos/12644998/pexels-photo-12644998.jpeg",
        group: "Age range",
        value: "Adult 55+",
        visibleTraits: ["Age range"],
        context: {},
        alt: "Close-up portrait of a smiling senior woman",
        creator: "BOOM Photography",
        source: "https://www.pexels.com/photo/portrait-of-smiling-old-grey-haired-woman-12644998/",
        license: "Pexels License"
      },
    ]
  };

  function matchesContext(entry, selections, group) {
    var context = entry.context || {};
    var visibleTraits = Array.isArray(entry.visibleTraits)
      ? entry.visibleTraits
      : Object.keys(context);
    var visibleSelectionsMatch = visibleTraits.every(function(key) {
      if (key === group || !selections[key]) return true;
      return context[key] === selections[key];
    });
    var noConflictingContext = Object.keys(context).every(function(key) {
      return key === group || !selections[key] || selections[key] === context[key];
    });
    return visibleSelectionsMatch && noConflictingContext;
  }

  function find(group, value, selections) {
    var matches = library.images.filter(function(entry) {
      return entry.group === group &&
        entry.value === value &&
        entry.src &&
        matchesContext(entry, selections || {}, group);
    });
    matches.sort(function(a, b) {
      return (b.visibleTraits || Object.keys(b.context || {})).length -
        (a.visibleTraits || Object.keys(a.context || {})).length;
    });
    return matches[0] || null;
  }

  window.PERSONA_REFERENCE_LIBRARY = library;
  window.findPersonaReference = find;
})();