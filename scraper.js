/* This script should be pasted into the console (we've only tested it for
   one book). We skipped the first page (see the below comment). Having the
   browser in full screen and the console "minimised" and possibly zooming in
   will may increase the quality of the captured images!
   It's also important to not that the following should be done (or else the browser will pop up a
   save as dialog for each file (as opposed to just straight up saving them)!
   	1. Open Firefox Settings
	2. Go to General → Files and Applications
	3. Under Downloads
	4. Uncheck:
		✅ Always ask you where to save files

   Also note that if this code is entered into the console multiple times without a full page reload
   (ctrl+shift+r) multiple event listener functions will be registered!
*/


/* So in all of this code we're actually assuming that there's only one of these
   buttons. */
let buttons = document.querySelectorAll('.BRicon.book_right.book_flip_next');


let pageCounter = 0;

buttons.forEach(btn => {
    btn.addEventListener('click', () =>
	{
	    /* NOTE THAT console.log(img.length); RETURNS 6, WE ASSUME THIS IS
	       BECAUSE IT KEEPS A COPY OF THE LAST TWO PAGES, THE CURRENT TWO
	       AND THE NEXT TWO. HOWEVER THIS PROBABLY ISN'T TRUE FOR THE FIRST
	       AND LAST PAGES. IT WON'T HANDLE THOSE PROPERLY (SO THE SCRIP WILL
	       HAVE TO BE ALTERED TO GET THEM. AT LEAST FOR THE FIRST PAGE!) */
	    let img = document.querySelectorAll('.BRpageimage');

	    {
		if(img[2])
		{
		    // Create a canvas the same size as the image
		    let canvas = document.createElement('canvas');
		    canvas.width = img[2].naturalWidth;
		    canvas.height = img[2].naturalHeight;

		    let ctx = canvas.getContext('2d');
		    ctx.drawImage(img[2], 0, 0); // draw the blob image onto the canvas

		    // Convert canvas to a downloadable blob
		    canvas.toBlob(blob => {
			let link = document.createElement('a');
			// link.download = `multics_left_page_${pageCounter}.png`; // browser saves this in Downloads
			link.download = `multics_${pageCounter}.png`; // browser saves this in Downloads
			link.href = URL.createObjectURL(blob);
			link.click();
		    });
		    console.log('saved left');
		}
	    }
	    {
		if(img[3])
		{
		    // Create a canvas the same size as the image
		    let canvas = document.createElement('canvas');
		    canvas.width = img[3].naturalWidth;
		    canvas.height = img[3].naturalHeight;

		    let ctx = canvas.getContext('2d');
		    ctx.drawImage(img[3], 0, 0); // draw the blob image onto the canvas

		    // Convert canvas to a downloadable blob
		    canvas.toBlob(blob => {
			let link = document.createElement('a');
			// link.download = `multics_right_page_${pageCounter}.png`; // browser saves this in Downloads
			link.download = `multics_${pageCounter + 1}.png`; // browser saves this in Downloads
			link.href = URL.createObjectURL(blob);
			link.click();
		    });
		    console.log('saved right');
		}
	    }

	    pageCounter = pageCounter + 2;

	    console.log('Hello girls!');
	});
});



let iter = 0;
let maxPages = 210;

function clickNextRandom()
{
    if(iter >= maxPages)
    {
        console.log("Done.");
        return;
    }

    if(buttons[0])
    {
        buttons[0].click();
        console.log("Clicked page", iter + 1);
        iter++;
    }

    let delay = 1273 + Math.random() * 56791; // 1–30s
    // Notice the indirect recursive call below!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setTimeout(clickNextRandom, delay);
}

clickNextRandom();
