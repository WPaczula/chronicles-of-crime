const ghpages = require("gh-pages");

ghpages.publish("build", function(err) {
  if (err) {
    console.error("Failed to publish", err);
    process.exit(1);
  } else {
    console.log("Successfully published");
    process.exit(0);
  }
});
