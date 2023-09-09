var interval;
function check() {
  if (themeloaded == 1) {
    clearInterval(interval);
    const body = document.querySelector("body");
    body.style.removeProperty("display");
    if(Math.random() > 0.97) {
      if(confirm("Want to help Selenite? Try out the new UI and give feedback! Click OK to go to the new UI or click Cancel to ignore.") == true){
        window.location.href = "https://ui-test.selenite.pages.dev";
      }
    } 
  }
  if ($("#panicmode").length > 0) {
    $("#panicmode").prop({ href: panicurl });
  }
  if ($(".seleniteminified").length > 0) {
    $.get("https://raw.githubusercontent.com/skysthelimitt/selenite-optimized/main/build/bookmark.txt", function(data) {
      $(".seleniteminified").prop({ href: data });
    })
  }
}

window.onload = function () {
  checkAlert();
  interval = setInterval(check, 50);
};

window.addEventListener(
  "error",
  function (event) {
    if (event.target instanceof HTMLImageElement) {
      alert(
        "Error: Image failed to load." +
          "\nFull Image URL: " +
          event.target.src +
          '\nPlease take a screenshot WITH THIS ERROR VISIBLE and click "Report a Bug" or go to https://forms.gle/j75WUn6UhdqsRZgf7'
      );
      event.target.src = "/favicon.png";
    } else {
      alert(
        "Error: " +
          event.message +
          "\nScript: " +
          event.filename +
          "\nLine: " +
          event.lineno +
          "\nColumn: " +
          event.colno +
          "\nStackTrace: " +
          event.error +
          '\nPlease take a screenshot WITH THIS ERROR VISIBLE and click "Report a Bug" or go to https://forms.gle/j75WUn6UhdqsRZgf7'
      );
    }
  },
  true
);

function checkAlert() {
  if(!Cookies.get("supportalert")) {
    alert('Welcome to Selenite!\nTransferring from another website? Add "/transfer" to the end of the URL to see how to transfer your game data!\nI\'m a single developer that works on this website, so I would appreciate your support! You can pay on Patreon by clicking the "Support" button, which will have private links for all subscribers to use!\nPlease share this website with anyone you know, so this website can expand even more!\nGo to bookmarklets and then add "Selenite Minified" to your bookmarks :) \nJoin the Discord for the latest updates and newest links!\nI don\'t want to be annoying, so you won\'t see this message for another month (at least on this website) :)');
    Cookies.set('supportalert', true, { expires: 31 });
  }
}