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