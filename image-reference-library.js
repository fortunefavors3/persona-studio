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
        src: "/assets/reference-images/1794023179059.jpg",
        group: "Hair color",
        value: "Blonde",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing blonde hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794023179059.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-platinum-blonde",
        src: "/assets/reference-images/1794023183734.jpg",
        group: "Hair color",
        value: "Platinum blonde",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing platinum blonde hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794023183734.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-silver",
        src: "/assets/reference-images/1794023188017.jpg",
        group: "Hair color",
        value: "Silver",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing silver hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794023188017.jpg",
        license: "User-provided image"
      },
      {
        id: "hair-color-pastel-pink",
        src: "/assets/reference-images/1794023192484.jpg",
        group: "Hair color",
        value: "Pastel pink",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic reference showing pastel pink hair",
        creator: "User-provided",
        source: "/assets/reference-images/1794023192484.jpg",
        license: "User-provided image"
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
      {
        id: "nose-shape-straight",
        src: "/assets/reference-images/1794036624670.jpg",
        group: "Nose shape",
        value: "Straight",
        visibleTraits: ["Nose shape"],
        context: {},
        alt: "Photorealistic close-up reference showing a straight nose profile and bridge",
        creator: "User-provided",
        source: "/assets/reference-images/1794036624670.jpg",
        license: "User-provided image"
      },
      {
        id: "nose-shape-button",
        src: "/assets/reference-images/1794036631889.jpg",
        group: "Nose shape",
        value: "Button",
        visibleTraits: ["Nose shape"],
        context: {},
        alt: "Photorealistic close-up reference showing a small button-shaped nose",
        creator: "User-provided",
        source: "/assets/reference-images/1794036631889.jpg",
        license: "User-provided image"
      },
      {
        id: "nose-shape-rounded",
        src: "/assets/reference-images/1794036637361.jpg",
        group: "Nose shape",
        value: "Rounded",
        visibleTraits: ["Nose shape"],
        context: {},
        alt: "Photorealistic close-up reference showing a rounded nose tip",
        creator: "User-provided",
        source: "/assets/reference-images/1794036637361.jpg",
        license: "User-provided image"
      },
      {
        id: "nose-shape-aquiline",
        src: "/assets/reference-images/1794036643487.jpg",
        group: "Nose shape",
        value: "Aquiline",
        visibleTraits: ["Nose shape"],
        context: {},
        alt: "Photorealistic close-up reference showing an aquiline nose shape",
        creator: "User-provided",
        source: "/assets/reference-images/1794036643487.jpg",
        license: "User-provided image"
      },
      {
        id: "nose-shape-wide",
        src: "/assets/reference-images/1794036649015.jpg",
        group: "Nose shape",
        value: "Wide",
        visibleTraits: ["Nose shape"],
        context: {},
        alt: "Photorealistic close-up reference showing a wider nose and nostril base",
        creator: "User-provided",
        source: "/assets/reference-images/1794036649015.jpg",
        license: "User-provided image"
      },
      {
        id: "nose-shape-narrow",
        src: "/assets/reference-images/1794036655196.jpg",
        group: "Nose shape",
        value: "Narrow",
        visibleTraits: ["Nose shape"],
        context: {},
        alt: "Photorealistic close-up reference showing a narrow nose shape",
        creator: "User-provided",
        source: "/assets/reference-images/1794036655196.jpg",
        license: "User-provided image"
      },
      {
        id: "lip-shape-full",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/29e7db0f-32cd-47a0-9878-f4afa52af6e3.jpeg",
        group: "Lip shape",
        value: "Full",
        visibleTraits: ["Lip shape"],
        context: {},
        alt: "User-provided photographic reference for full lip shape; placeholder label to be reviewed",
        creator: "User-provided",
        source: "https://github.com/fortunefavors3/image-hosting/blob/main/29e7db0f-32cd-47a0-9878-f4afa52af6e3.jpeg",
        license: "User-provided image"
      },
      {
        id: "lip-shape-medium",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/3b5b6cc2-7eed-4ec4-9243-8c03a746f232.jpeg",
        group: "Lip shape",
        value: "Medium",
        visibleTraits: ["Lip shape"],
        context: {},
        alt: "User-provided photographic reference for medium lip shape; placeholder label to be reviewed",
        creator: "User-provided",
        source: "https://github.com/fortunefavors3/image-hosting/blob/main/3b5b6cc2-7eed-4ec4-9243-8c03a746f232.jpeg",
        license: "User-provided image"
      },
      {
        id: "lip-shape-thin",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/c26e11c9-b415-43cd-9beb-a06dea146bce.jpeg",
        group: "Lip shape",
        value: "Thin",
        visibleTraits: ["Lip shape"],
        context: {},
        alt: "User-provided photographic reference for thin lip shape; placeholder label to be reviewed",
        creator: "User-provided",
        source: "https://github.com/fortunefavors3/image-hosting/blob/main/c26e11c9-b415-43cd-9beb-a06dea146bce.jpeg",
        license: "User-provided image"
      },
      {
        id: "lip-shape-cupid-bow",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/persona-studio-image%20(1).jpg",
        group: "Lip shape",
        value: "Cupid bow",
        visibleTraits: ["Lip shape"],
        context: {},
        alt: "User-provided photographic reference for cupid bow lip shape; placeholder label to be reviewed",
        creator: "User-provided",
        source: "https://github.com/fortunefavors3/image-hosting/blob/main/persona-studio-image%20(1).jpg",
        license: "User-provided image"
      },
      {
        id: "lip-shape-wide",
        src: "https://raw.githubusercontent.com/fortunefavors3/image-hosting/main/persona-studio-image%20(2).jpg",
        group: "Lip shape",
        value: "Wide",
        visibleTraits: ["Lip shape"],
        context: {},
        alt: "User-provided photographic reference for wide lip shape; placeholder label to be reviewed",
        creator: "User-provided",
        source: "https://github.com/fortunefavors3/image-hosting/blob/main/persona-studio-image%20(2).jpg",
        license: "User-provided image"
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