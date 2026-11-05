/* Persona Generator + reusable reference photo library.
   Photos are independently labeled by the trait they visibly demonstrate.
   They do not need to match unrelated selections in other categories.
   Each record retains source, creator and license metadata. */
(function(){
  var library = {
    version: 3,
    images: [
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
        src: "https://images.pexels.com/photos/34369399/pexels-photo-34369399.jpeg",
        group: "Eye color",
        value: "Dark brown",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic macro photograph of a single human eye with a rich dark brown iris",
        creator: "Nitin Yadav",
        source: "https://www.pexels.com/photo/close-up-of-a-human-eye-with-rich-brown-iris-34369399/",
        license: "Pexels License"
      },
      {
        id: "eye-color-hazel-pexels-32679446",
        src: "https://images.pexels.com/photos/32679446/pexels-photo-32679446.jpeg",
        group: "Eye color",
        value: "Hazel",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic macro photograph of a single human eye with a hazel iris",
        creator: "Haim Charbit",
        source: "https://www.pexels.com/photo/close-up-of-a-human-eye-with-hazel-iris-32679446/",
        license: "Pexels License"
      },
      {
        id: "eye-color-green-pexels-33829464",
        src: "https://images.pexels.com/photos/33829464/pexels-photo-33829464.jpeg",
        group: "Eye color",
        value: "Green",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic macro photograph of a single human eye with a green iris",
        creator: "Burak Uney",
        source: "https://www.pexels.com/photo/close-up-of-a-human-eye-with-green-iris-33829464/",
        license: "Pexels License"
      },
      {
        id: "eye-color-blue-pexels-33441257",
        src: "https://images.pexels.com/photos/33441257/pexels-photo-33441257.jpeg",
        group: "Eye color",
        value: "Blue",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic macro photograph of a single human eye with a blue iris",
        creator: "Cem Gizep",
        source: "https://www.pexels.com/photo/close-up-of-a-human-blue-eye-33441257/",
        license: "Pexels License"
      },
      {
        id: "eye-color-grey-pexels-7516687",
        src: "https://images.pexels.com/photos/7516687/pexels-photo-7516687.jpeg",
        group: "Eye color",
        value: "Grey",
        visibleTraits: ["Eye color"],
        context: {},
        alt: "Photorealistic close-up photograph of a single human eye with a grey iris",
        creator: "David Selbert",
        source: "https://www.pexels.com/photo/gray-eye-of-anonymous-woman-7516687/",
        license: "Pexels License"
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
      }
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
        id: "hair-color-dark-brown",
        src: "https://images.pexels.com/photos/16397925/pexels-photo-16397925.jpeg",
        group: "Hair color",
        value: "Dark brown",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult woman with dark brown hair",
        creator: "Alexander Krivitskiy",
        source: "https://www.pexels.com/photo/woman-with-brown-hair-16397925/",
        license: "Pexels License"
      },
      {
        id: "hair-color-auburn",
        src: "https://images.pexels.com/photos/19012853/pexels-photo-19012853.jpeg",
        group: "Hair color",
        value: "Auburn",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult woman with auburn hair",
        creator: "Ноями Noyami",
        source: "https://www.pexels.com/photo/person-with-auburn-hair-staring-into-camera-19012853/",
        license: "Pexels License"
      },
      {
        id: "hair-color-red",
        src: "https://images.pexels.com/photos/18283225/pexels-photo-18283225.jpeg",
        group: "Hair color",
        value: "Red",
        visibleTraits: ["Hair color"],
        context: {},
        alt: "Photorealistic portrait of an adult woman with red hair",
        creator: "Alexander Zvir",
        source: "https://www.pexels.com/photo/portrait-of-redhead-woman-18283225/",
        license: "Pexels License"
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
        src: "https://images.pexels.com/photos/2149794/pexels-photo-2149794.jpeg",
        group: "Hair length",
        value: "Shoulder length",
        visibleTraits: ["Hair length"],
        context: {},
        alt: "Photograph showing a woman silhouette with shoulder-length hair",
        creator: "Luis Quintero",
        source: "https://www.pexels.com/photo/silhouette-photography-of-woman-with-shoulder-length-hair-2149794/",
        license: "Pexels License"
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