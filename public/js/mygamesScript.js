// /***************************** DOMCONTENTLOADED  *****************************/
window.addEventListener("DOMContentLoaded", async (event) => {


  /***************************** Page Selector  *****************************/
  const playedNums = {
    Played: 2,
    "Currently Playing": 1,
    "Want to Play": 0,
  };

  const playedStats = {
    2: "Played",
    1: "Currently Playing",
    0: "Want to Play",
  };

  const allSelects = document.querySelectorAll(".main__sidebar-status");
  allSelects.forEach((select) => {
    select.addEventListener("change", async (event) => {
      const [gameId] =
        event.target.previousElementSibling.previousElementSibling.href.match(
          /\d+$/g
        );
      if (event.target.value in playedNums) {
       
        const played = playedNums[event.target.value];
        try {
          const res = await fetch(`/mygames/${gameId}/played`, {
            method: "PUT",
            body: JSON.stringify({ played }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const { newPlayed } = await res.json();
        } catch (err) {
          // window.location.href = '/error'
        }
      } else if (parseInt(event.target.value)) {
        try {
          const res = await fetch(
            `/mygames/libraries/${event.target.value}/${gameId}/delete`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          location.reload();
        } catch (err) {
          // window.location.href = '/error'
        }
      } else {
        if (event.target.value === "-- Add to Library --") {
          return;
        }
        const allOptions = event.target.querySelectorAll(
          ".main__sidebar-status-option"
        );
        let id;
        allOptions.forEach((option) => {
          if (option.value === event.target.value) {
            id = option.id;
          }
        });

        try {
          let res = await fetch(`/mygames/libraries/${id}/${gameId}/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const { exists, libraryGame, mygame } = await res.json();

          if (exists) {
            return;
          }
        } catch (err) {
          // window.location.href = '/error'
        }
      }
    });
  });
});
