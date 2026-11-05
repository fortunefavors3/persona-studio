/* Persona Generator + reusable reference photo library.
   Add only approved, accurately tagged portrait assets here.
   Each entry describes the traits shown in the photo and the traits that
   must already be selected for that photo to be a valid contextual match. */
(function(){
  var library = {
    version: 1,
    images: [
      /* Example entry (replace with a real hosted image asset):
      {
        id: "base-red-hair-oval-01",
        src: "/reference-library/base-red-hair-oval-01.webp",
        group: "Face shape",
        value: "Oval",
        context: {
          "Age range": "Adult 25–34",
          "Skin color": "Light",
          "Hair color": "Red",
          "Eye color": "Hazel"
        },
        characterId: "base-character-01",
        alt: "Photorealistic adult character with light skin, red hair and hazel eyes, oval face"
      }
      */
    ]
  };

  function matchesContext(entry, selections, group) {
    var context = entry.context || {};
    return Object.keys(context).every(function(key) {
      if (key === group) return true;
      return selections[key] === context[key];
    });
  }

  function find(group, value, selections) {
    var matches = library.images.filter(function(entry) {
      return entry.group === group &&
        entry.value === value &&
        entry.src &&
        matchesContext(entry, selections || {}, group);
    });
    matches.sort(function(a, b) {
      return Object.keys(b.context || {}).length - Object.keys(a.context || {}).length;
    });
    return matches[0] || null;
  }

  window.PERSONA_REFERENCE_LIBRARY = library;
  window.findPersonaReference = find;
})();