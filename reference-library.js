/* Persona Generator + reusable reference photo library.
   Add only approved, accurately tagged portrait assets here.
   Each entry declares the traits actually visible in that image. This lets
   the library grow in useful batches without requiring every unrelated
   character setting to be duplicated in every image record. */
(function(){
  var library = {
    version: 2,
    images: [
      /* Add real, hosted assets using this format:
      {
        id: "face-oval-red-light-hazel-01",
        src: "/reference-library/face-oval-red-light-hazel-01.webp",
        group: "Face shape",
        value: "Oval",
        characterId: "base-character-01",
        visibleTraits: [
          "Age range", "Skin color", "Hair color", "Eye color", "Face shape"
        ],
        context: {
          "Age range": "Adult 25–34",
          "Skin color": "Light",
          "Hair color": "Red",
          "Eye color": "Hazel"
        },
        alt: "Photorealistic adult character with light skin, red hair and hazel eyes, oval face"
      }
      */
    ]
  };

  function matchesContext(entry, selections, group) {
    var context = entry.context || {};
    var visibleTraits = Array.isArray(entry.visibleTraits)
      ? entry.visibleTraits
      : Object.keys(context);

    // Every selected trait visible in this reference must match. Unrelated
    // traits (for example body type on a face close-up) do not block a match.
    var visibleSelectionsMatch = visibleTraits.every(function(key) {
      if (key === group || !selections[key]) return true;
      return context[key] === selections[key];
    });

    // Reject records whose tagged context conflicts with the current choices.
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