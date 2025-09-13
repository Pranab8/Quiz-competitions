(function () {
  function generateFAQSchema() {
    var faqs = [];

    document.querySelectorAll(".question-block").forEach(function (block) {
      var q = block.querySelector("strong")
        ? block.querySelector("strong").innerText.trim()
        : "";

      var a = block.querySelector(".pnl")
        ? block.querySelector(".pnl").innerText.trim()
        : "";

      if (q && a) {
        faqs.push({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": a
          }
        });
      }
    });

    if (faqs.length > 0) {
      var schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs
      };

      var script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema, null, 2);
      document.head.appendChild(script);
    }
  }

  // Run only on Blogger post pages
  if (document.querySelector(".post")) {
    window.addEventListener("DOMContentLoaded", generateFAQSchema);
  }
})();
